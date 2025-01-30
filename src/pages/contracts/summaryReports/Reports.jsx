import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../componant/elements/Button";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../axios/axios";
import { toast } from "react-toastify";
import Loading from "../../../componant/Loading.jsx";
import { useEffect, useLayoutEffect, useState } from "react";
import moment from "moment/moment.js";

// Utility function to split array into chunks
const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const Reports = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id: contractId } = useParams();

  // States Values
  const [worksValues, setWorksValues] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [additions, setAdditions] = useState([]);
  const [vatValues, setVatValues] = useState([]);
  const [businessGuaranteeValues, setBusinessGuaranteeValues] = useState([]);
  const [netValues, setNetValues] = useState([]);
  const [previousPaymentsValues, setPreviousPaymentsValues] = useState(["-"]);
  const [dueAmountValues, setDueAmountValues] = useState([]);

  // States Values of sum
  const [allSumValues, setAllSumValues] = useState({
    works: 0,
    vat: 0,
    businessGuarantee: 0,
    deductions: 0,
    additions: 0,
    net: 0,
    dueAmount: 0,
  });

  // Work Confirmations data
  const { data, isLoading } = useQuery({
    queryKey: "getWorkConfirmationByContractId",
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/workConfirmation/${contractId}/contract`
      );
      if (res.status !== 200) {
        toast.error("Failed to fetch work confirmations");
      }
      return res.data;
    },
  });

  // Contract Data
  const { data: contract, isLoadingContract } = useQuery({
    queryKey: "GetContractById",
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/contracts/${contractId}`);
      if (res.status === 200) {
        return res.data.data;
      }
    },
  });

  // Calculate the arguments
  useLayoutEffect(() => {
    if (data && data.length > 0 && contract) {
      // Extract values properly
      const works = data.map((item) => item.totalAmount);
      const vats = data.map(
        (item) => item.totalAmount * (contract.taxValue / 100)
      );
      const guarantees = data.map(
        (item) => item.totalAmount * (contract.businessGuarantee / 100)
      );
      const deductionsList = data.map((item) => item.totalDeduction);
      const additionsList = data.map((item) => item.totalAddition);

      setWorksValues(works);
      setVatValues(vats);
      setBusinessGuaranteeValues(guarantees);
      setDeductions(deductionsList);
      setAdditions(additionsList);

      // Compute net values
      const netArray = data.map(
        (item, index) =>
          (works[index] || 0) +
          (vats[index] || 0) -
          (guarantees[index] || 0) -
          (deductionsList[index] || 0) +
          (additionsList[index] || 0)
      );
      setNetValues(netArray);

      // Compute previous payments (shift net values)
      let previousPayments = ["-", ...netArray.slice(0, -1)];
      setPreviousPaymentsValues(previousPayments);

      // Compute due amounts
      const dueAmounts = netArray.map((value, index) => {
        if (index === 0) return value;
        return value - previousPayments[index];
      });
      setDueAmountValues(dueAmounts);

      // Compute total for all rows
      setAllSumValues({
        works: works.reduce((acc, val) => acc + val, 0),
        vat: vats.reduce((acc, val) => acc + val, 0),
        businessGuarantee: guarantees.reduce((acc, val) => acc + val, 0),
        deductions: deductionsList.reduce((acc, val) => acc + val, 0),
        additions: additionsList.reduce((acc, val) => acc + val, 0),
        net: netArray.reduce((acc, val) => acc + val, 0),
        dueAmount: dueAmounts.reduce((acc, val) => acc + val, 0),
      });
    }
  }, [data, contract]);

  // Split data into chunks of 4 work confirmations
  const chunkedData = chunkArray(data || [], 4);

  return (
    <div>
      {data?.length > 0 ? (
        <div className="flex flex-col items-stretch justify-start gap-4">
          <div className="rounded-lg bg-slate-100 border shadow-md p-6 flex flex-col gap-6">
            <div className="flex items-start justify-between gap-y-6">
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold text-primaryColor">
                  {t("ContractsForms.summaryReports.title")}
                </h1>
                <div className="flex items-center gap-4">
                  {t("ContractsForms.summaryReports.subTitles", {
                    returnObjects: true,
                    date: "2021-10-10",
                  }).map((subTitle, key) => {
                    const Icon = subTitle.icon;
                    return (
                      <p
                        key={key}
                        className="flex items-center gap-2 text-grayColor lead"
                      >
                        <Icon size={24} /> {subTitle.text}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {t("ContractsForms.summaryReports.buttons", {
                  returnObjects: true,
                }).map((button, key) => {
                  const Icon = button.icon;
                  return (
                    <Button
                      key={key}
                      type="button"
                      className={`text-white flex gap-1 items-center`}
                      styleHtml={{
                        backgroundColor: `${button.bgColor}`,
                      }}
                      onClick={() => navigate(button.path)}
                    >
                      <Icon size={22} />
                      {button.text}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div>
              {t("ContractsForms.summaryReports.details", {
                returnObjects: true,
                contractNo: "CNT-2024-001",
                contractValue: String(contract?.totalContractValue),
                contractDuration: `${moment(contract?.endDate).diff(
                  moment(contract?.startDate),
                  "months"
                )} Months`,
              }).map((detail, key) => (
                <p key={key} className="text-grayColor text-lg">
                  {detail.text}
                </p>
              ))}
            </div>
          </div>
          {!isLoading ? (
            chunkedData.map((chunk, chunkIndex) => {
              // Calculate totals for this chunk
              const chunkTotals = {
                works: chunk.reduce((acc, item) => acc + item.totalAmount, 0),
                vat: chunk.reduce(
                  (acc, item) =>
                    acc + item.totalAmount * (contract.taxValue / 100),
                  0
                ),
                businessGuarantee: chunk.reduce(
                  (acc, item) =>
                    acc + item.totalAmount * (contract.businessGuarantee / 100),
                  0
                ),
                deductions: chunk.reduce(
                  (acc, item) => acc + item.totalDeduction,
                  0
                ),
                additions: chunk.reduce(
                  (acc, item) => acc + item.totalAddition,
                  0
                ),
                net: chunk.reduce(
                  (acc, item, index) =>
                    acc +
                    item.totalAmount +
                    item.totalAmount * (contract.taxValue / 100) -
                    item.totalAmount * (contract.businessGuarantee / 100) -
                    item.totalDeduction +
                    item.totalAddition,
                  0
                ),
              };

              return (
                <div
                  key={chunkIndex}
                  className="rounded-lg bg-slate-100 border shadow-md mb-6"
                >
                  <table className="w-full">
                    <thead>
                      <tr className="*:py-6 odd:bg-slate-200">
                        <th>Description</th>
                        {chunk.map((item, i) => (
                          <th key={item._id}>
                            Work Confirmation #{chunkIndex * 4 + i + 1}
                          </th>
                        ))}
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="odd:bg-slate-200 even:bg-slate-50 *:py-6">
                        <td>
                          <strong>Works Value</strong>
                        </td>
                        {chunk.map((item, i) => (
                          <td key={i}>{item.totalAmount} EGP</td>
                        ))}
                        <td>{chunkTotals.works} EGP</td>
                      </tr>
                      <tr className="odd:bg-slate-200 even:bg-slate-50 *:py-6">
                        <td>
                          <strong>VAT ({contract?.taxValue}%)</strong>
                        </td>
                        {chunk.map((item, i) => (
                          <td key={i}>
                            {item.totalAmount * (contract.taxValue / 100)} EGP
                          </td>
                        ))}
                        <td>{chunkTotals.vat} EGP</td>
                      </tr>
                      <tr className="odd:bg-slate-200 even:bg-slate-50 *:py-6">
                        <td>
                          <strong>
                            Business Guarantee ({contract?.businessGuarantee}%)
                          </strong>
                        </td>
                        {chunk.map((item, i) => (
                          <td key={i}>
                            (
                            {item.totalAmount *
                              (contract.businessGuarantee / 100)}{" "}
                            EGP)
                          </td>
                        ))}
                        <td>({chunkTotals.businessGuarantee} EGP)</td>
                      </tr>
                      <tr className="odd:bg-slate-200 even:bg-slate-50 *:py-6">
                        <td>
                          <strong>Deductions</strong>
                        </td>
                        {chunk.map((item, i) => (
                          <td key={i}>({item.totalDeduction} EGP)</td>
                        ))}
                        <td>({chunkTotals.deductions} EGP)</td>
                      </tr>
                      <tr className="odd:bg-slate-200 even:bg-slate-50 *:py-6">
                        <td>
                          <strong>Additions</strong>
                        </td>
                        {chunk.map((item, i) => (
                          <td key={i}>{item.totalAddition} EGP</td>
                        ))}
                        <td>{chunkTotals.additions} EGP</td>
                      </tr>
                      <tr className="odd:bg-slate-200 even:bg-slate-50 *:py-6">
                        <td>
                          <strong>Net</strong>
                        </td>
                        {chunk.map((item, i) => (
                          <td key={i}>
                            {item.totalAmount +
                              item.totalAmount * (contract.taxValue / 100) -
                              item.totalAmount *
                                (contract.businessGuarantee / 100) -
                              item.totalDeduction +
                              item.totalAddition}{" "}
                            EGP
                          </td>
                        ))}
                        <td>{chunkTotals.net} EGP</td>
                      </tr>
                      <tr className="odd:bg-slate-200 even:bg-slate-50 *:py-6">
                        <td>
                          <strong>Previous Payments</strong>
                        </td>
                        {chunk.map((item, i) => {
                          if (i === 0) {
                            return <td key={i}>-</td>;
                          } else {
                            return (
                              <td key={i}>
                                ({netValues[chunkIndex * 4 + i - 1]} EGP)
                              </td>
                            );
                          }
                        })}
                        <td>-</td>
                      </tr>
                      <tr className="odd:bg-slate-200 even:bg-slate-50 *:py-6">
                        <td>
                          <strong>Due Amount</strong>
                        </td>
                        {chunk.map((item, i) => (
                          <td key={i}>
                            {dueAmountValues[chunkIndex * 4 + i]} EGP
                          </td>
                        ))}
                        <td>{chunkTotals.net} EGP</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })
          ) : (
            <Loading />
          )}
        </div>
      ) : (
        <p>No Work Confirmation Found</p>
      )}

      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
          onClick={() => navigate(-1)}
        >
          {t("ContractsForms.summary.backButton")}
        </button>
      </div>
    </div>
  );
};
export default Reports;
