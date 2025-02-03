import { useTranslation } from "react-i18next";
import PrintDetails from "./PrintDetails";
import PrintTable from "./PrintTable";
import moment from "moment/moment";
import PrintSummary from "./PrintSummary";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../../axios/axios";

const PrintPageDetails = ({
  data,
  className = "",
}) => {
  // Translations
  const { t } = useTranslation();
  const date = moment().format("YYYY-MM-DD");
  const contractId = String(data.contractId._id);
  const [totalPayments, setTotalPayments] = useState(0);
  const { data: workConfirmations, isLoading } = useQuery({
    queryKey: "getWorkConfirmationsByContractId",
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/workConfirmation/${contractId}/contract`
      );
      return res.data;
    },
  });
  useEffect(() => {
    if (workConfirmations && data?.contractId) {
      const previousPaymentsArray = workConfirmations?.map((ele) => {
        const prevWorkValue = ele.workItems.reduce((total, item) => {
          return (
            total + item?.previousQuantity * item?.workItemId?.workDetails?.price
          );
        }, 0);
        const vatValue = data?.contractId.taxRate ? (data?.contractId.taxRate || 0 / 100) * prevWorkValue : 0;
        const businessGuaranteeValue = data?.contractId.businessGuarantee ?
          (data?.contractId.businessGuarantee / 100) * prevWorkValue : 0;
        const addition = ele.totalAddition;
        const deduction = ele.totalDeduction;
        console.log(workConfirmations)
        return (
          prevWorkValue +
          vatValue -
          businessGuaranteeValue -
          deduction +
          addition
        );
      });

      const total = previousPaymentsArray.reduce((pv, cv) => pv + cv, 0);
      setTotalPayments(total);
    }
  }, [workConfirmations, data]);
  console.log(totalPayments)
  const detailsValues = {
    project: data?.projectName?.projectName,
    contractor: data?.partner.partnerName,
    contractNumber: "CNT-2024-001",
    contractValue:
      data?.contractId.totalContractValue.toLocaleString("en-US") + " EGP",
    remainingAmount: `${
      data?.contractId.totalContractValue - totalPayments
    } EGP`,
    date: date,
    consultant: data?.contractId?.consultant?.partnerName,
    contractDuration: `${moment(data?.contractId?.endDate).diff(
      moment(data?.contractId?.startDate),
      "months"
    )} Months`,
    previousPayments: `${totalPayments} EGP`,
  };
  const summaryValues = {
    worksValue: data?.totalAmount.toLocaleString("en-US") + " EGP",
    vat:
      ((data?.contractId?.taxRate / 100) * data?.totalAmount).toLocaleString(
        "en-Us"
      ) + " EGP",
    businessGuarantee: `(${(
      (data?.contractId?.businessGuarantee / 100) *
      data?.totalAmount
    ).toLocaleString("en-Us")} EGP)`,
    deductions: `(${data?.totalDeduction.toLocaleString("en-US")} EGP)`,
    additions: `${data?.totalAddition.toLocaleString("en-US")} EGP`,
    downPayments: `${(
      (data?.contractId.downPaymentRate / 100) *
      data?.totalAmount
    ).toLocaleString("en-US")} EGP`,
    netDue: `${(
      data?.totalAmount -
      (data?.contractId?.taxRate / 100) * data?.totalAmount -
      (data?.contractId?.businessGuarantee / 100) * data?.totalAmount -
      data?.totalDeduction +
      data?.totalAddition -
      (data?.contractId.downPaymentRate / 100) * data?.totalAmount
    ).toLocaleString("en-US")} EGP`,
  };
  return (
    <div className={`w-[calc(100vw-132px)] hidden print:block ${className}`}>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-primaryColor">
          {t("PrintConfirmationDetails.title", { code: 1 })}
        </h1>
        <PrintDetails
          detailsValues={detailsValues}
          summaryValues={summaryValues}
        />
        <PrintTable
          data={data}
          columns={t("PrintConfirmationDetails.table.columns", {
            returnObjects: true,
          })}
        />
        <PrintSummary summaryValues={summaryValues} />
      </div>
    </div>
  );
};
export default PrintPageDetails;
