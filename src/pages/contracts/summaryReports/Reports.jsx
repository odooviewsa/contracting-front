import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../componant/elements/Button";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../axios/axios";
import { toast } from "react-toastify";
import Loading from "../../../componant/Loading.jsx";
import { useLayoutEffect, useState } from "react";
import moment from "moment/moment.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

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
  const { data: contract } = useQuery({
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
        (item) => item.totalAmount * (contract.taxRate / 100)
      );
      const guarantees = data.map(
        (item) => item.totalAmount * (contract.businessGuarantee / 100)
      );
      const deductionsList = data.map((item) => item.totalDeduction);
      const additionsList = data.map((item) => item.totalAddition);

      // Compute net values
      const netArray = data.map(
        (item, index) =>
          (works[index] || 0) +
          (vats[index] || 0) -
          (guarantees[index] || 0) -
          (deductionsList[index] || 0) +
          (additionsList[index] || 0)
      );

      // Compute cumulative previous payments
      const cumulativePreviousPayments = netArray.reduce((acc, val, index) => {
        if (index === 0) return [netArray[index]]; // First item has no previous payments
        return [...acc, acc[index - 1] + netArray[index]];
      }, []);

      setPreviousPaymentsValues(["-", ...cumulativePreviousPayments]);

      // Compute due amounts
      const dueAmounts = netArray.map((value, index) => {
        if (index === 0) return value;
        return value - cumulativePreviousPayments[index - 1];
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

  // Activate buttons
  const handleButtonType = (type) => {
    switch (type) {
      case "print":
        window.print(); // Print the page
        break;
      case "pdf":
        exportToPDF(); // Export to PDF
        break;
      case "excel":
        exportToExcel(); // Export to Excel
        break;
      default:
        break;
    }
  };

  // Export to PDF
  const exportToPDF = () => {
    const input = document.getElementById("reports-content"); // Ensure the reports content has an ID

    // Hide buttons before capturing
    const buttons = document.querySelectorAll(".hide-on-pdf");
    buttons.forEach((button) => (button.style.display = "none"));

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // A4 size
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate height based on width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("reports.pdf"); // Save the file as reports.pdf

      // Show buttons after capturing
      buttons.forEach((button) => (button.style.display = "flex")); // Ensure buttons return to flex-row
    });
  };

  // Export to Excel
  const exportToExcel = () => {
    // Create a single table for all data
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Add header row
    const headerRow = document.createElement("tr");
    [
      "Description",
      ...data.map((_, i) => `Work Confirmation #${i + 1}`),
      "Total",
    ].forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    const previousExcel = previousPaymentsValues.slice(
      0,
      previousPaymentsValues.length - 1
    );
    // Add rows for each category
    const categories = [
      { label: "Works Value", values: data.map((item) => item.totalAmount) },
      {
        label: `VAT (${contract?.taxRate}%)`,
        values: data.map(
          (item) => item.totalAmount * (contract.taxRate / 100)
        ),
      },
      {
        label: `Business Guarantee (${contract?.businessGuarantee}%)`,
        values: data.map(
          (item) => item.totalAmount * (contract.businessGuarantee / 100)
        ),
      },
      {
        label: "Deductions",
        values: data.map((item) => item.totalDeduction),
      },
      {
        label: "Additions",
        values: data.map((item) => item.totalAddition),
      },
      {
        label: "Net",
        values: data.map(
          (item, index) =>
            item.totalAmount +
            item.totalAmount * (contract.taxRate / 100) -
            item.totalAmount * (contract.businessGuarantee / 100) -
            item.totalDeduction +
            item.totalAddition
        ),
      },
      {
        label: "Previous Payments",
        values: previousExcel,
      },
      {
        label: "Due Amount",
        values: dueAmountValues,
      },
    ];
    categories.forEach((category) => {
      const row = document.createElement("tr");
      const tdLabel = document.createElement("td");
      tdLabel.textContent = category.label;
      row.appendChild(tdLabel);

      category.values.forEach((value) => {
        const td = document.createElement("td");
        td.textContent = value;
        row.appendChild(td);
      });

      // Add total for each category
      const tdTotal = document.createElement("td");
      tdTotal.textContent =
        category.label !== "Previous Payments"
          ? category.values.reduce((acc, val) => acc + val, 0)
          : "-";
      row.appendChild(tdTotal);

      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Convert table to worksheet
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); // Add worksheet to workbook
    XLSX.writeFile(wb, "reports.xlsx"); // Save the file as reports.xlsx
  };
  return (
    <div id="reports-content">
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
            <div className="flex items-center gap-4 hide-on-pdf">
              {t("ContractsForms.summaryReports.buttons", {
                returnObjects: true,
              }).map((button, key) => {
                const Icon = button.icon;
                return (
                  <Button
                    key={key}
                    type="button"
                    onClick={() => handleButtonType(button.type)}
                    className={`text-white flex gap-1 items-center`}
                    styleHtml={{
                      backgroundColor: `${button.bgColor}`,
                    }}
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
              contractValue:
                contract?.totalContractValue.toLocaleString("en-US"),
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
          data?.length > 0 ? (
            chunkedData.map((chunk, chunkIndex) => {
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
                        <th>Total ({data.length} Items)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Works Value */}
                      <tr className="even:bg-slate-100 odd:bg-slate-50 *:py-6">
                        <td>
                          <strong>Works Value</strong>
                        </td>
                        {chunk.map((item, i) => (
                          <td key={i}>
                            {item.totalAmount.toLocaleString("en-US")} EGP
                          </td>
                        ))}
                        <td>{allSumValues.works.toLocaleString("en-US")} EGP</td>
                      </tr>
                      {/* Vat */}
                      <tr className="even:bg-slate-100 odd:bg-slate-50 *:py-6">
                        <td>
                          <strong>VAT ({contract?.taxRate}%)</strong>
                        </td>
                        {chunk.map((item, i) => (
                          <td key={i}>
                            {(
                              item.totalAmount *
                              (contract?.taxRate / 100)
                            ).toLocaleString("en-US")}{" "}
                            EGP
                          </td>
                        ))}
                        <td>{allSumValues.vat.toLocaleString("en-US")} EGP</td>
                      </tr>
                      {/* Business Guarantee */}
                      <tr className="bg-red-100 *:py-6">
                        <td>
                          <strong>
                            Business Guarantee ({contract?.businessGuarantee}
                            %)
                          </strong>
                        </td>
                        {chunk.map((item, i) => (
                          <td key={i}>
                            (
                            {(
                              item.totalAmount *
                              (contract?.businessGuarantee / 100)
                            ).toLocaleString("en-US")}{" "}
                            EGP)
                          </td>
                        ))}
                        <td>({allSumValues?.businessGuarantee.toLocaleString("en-US")} EGP)</td>
                      </tr>
                      {/* Deductions */}
                      <tr className="bg-red-100 *:py-6">
                        <td>
                          <strong>Deductions</strong>
                        </td>
                        {chunk.map((item, i) => (
                          <td key={i}>
                            ({item.totalDeduction.toLocaleString("en-US")} EGP)
                          </td>
                        ))}
                        <td>({allSumValues?.deductions.toLocaleString("en-US")} EGP)</td>
                      </tr>
                      {/* Additions */}
                      <tr className="bg-green-100 *:py-6">
                        <td>
                          <strong>Additions</strong>
                        </td>
                        {chunk.map((item, i) => (
                          <td key={i}>
                            {item.totalAddition.toLocaleString("en-US")} EGP
                          </td>
                        ))}
                        <td>{allSumValues?.additions.toLocaleString("en-US")} EGP</td>
                      </tr>
                      {/* Net */}
                      <tr className="even:bg-slate-100 odd:bg-slate-50 *:py-6">
                        <td>
                          <strong>Net</strong>
                        </td>
                        {chunk.map((item, i) => (
                          <td key={i}>
                            {(
                              item.totalAmount +
                              item.totalAmount * (contract?.taxRate / 100) -
                              item.totalAmount *
                                (contract?.businessGuarantee / 100) -
                              item.totalDeduction +
                              item.totalAddition
                            ).toLocaleString("en-US")}{" "}
                            EGP
                          </td>
                        ))}
                        <td>{allSumValues?.net.toLocaleString("en-US")} EGP</td>
                      </tr>
                      {/* Previous Payments */}
                      <tr className="even:bg-slate-100 odd:bg-slate-50 *:py-6">
                        <td>
                          <strong>Previous Payments</strong>
                        </td>
                        {chunk.map((item, i) => {
                          const paymentIndex = chunkIndex * 4 + i;
                          if (paymentIndex === 0) {
                            return <td key={i}>-</td>;
                          } else {
                            return (
                              <td key={i}>
                                ({previousPaymentsValues[paymentIndex]?.toLocaleString("en-US")} EGP)
                              </td>
                            );
                          }
                        })}
                        <td>-</td>
                      </tr>
                      {/* Due Amount */}
                      <tr className="bg-green-100 *:py-6">
                        <td>
                          <strong>Due Amount</strong>
                        </td>
                        {chunk.map((item, i) => (
                          <td key={i}>
                            {dueAmountValues[chunkIndex * 4 + i]?.toLocaleString("en-US")} EGP
                          </td>
                        ))}
                        <td>{allSumValues?.dueAmount.toLocaleString("en-US")} EGP</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })
          ) : (
            <p>
              <Loading />
            </p>
          )
        ) : (
          <Loading />
        )}
      </div>

      <div className="flex justify-end gap-4 mt-4 hide-on-pdf">
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
