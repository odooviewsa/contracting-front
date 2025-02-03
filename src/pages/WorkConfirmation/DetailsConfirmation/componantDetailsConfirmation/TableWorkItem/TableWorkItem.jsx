import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../../../axios/axios";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import { ContextBOQ } from "../../../../../context/BOQContext";
import { useTranslation } from "react-i18next";
import DetailsWorkLine from "./DetailsWorkLine";
export default function TableWorkItem({
  dispalyDate,
  isNegativeActive,
  refetch,
}) {
  // Language
  const { t } = useTranslation();
  const nav = useNavigate();
  const { currentValueColumWorkConfirmation } = useContext(ContextBOQ);
  const user = useSelector((state) => state?.user);
  const [loading, setLoading] = useState(null);
  const [valueInputCurrentQuantity, setValueInputCurrentQuantity] = useState(
    {}
  );
  const [valueInputCompletionPercentage, setValueInputCompletionPercentage] =
    useState({});
  const [valueInputInvoicePercentage, setValueInputInvoicePercentage] =
    useState({});
  const { contractId, workId } = useParams();
  // Open Line Details
  const [lineDetails, setLineDetails] = useState(null);
  useEffect(() => {
    if (
      dispalyDate?.data?.data?.workItems &&
      dispalyDate?.data?.data?.workConfirmationType === "final"
    ) {
      const initialQuantities = dispalyDate.data.data.workItems.reduce(
        (acc, item, index) => ({
          ...acc,
          [index]:
            item?.workItemId?.workDetails?.assignedQuantity -
              item?.previousQuantity || 0,
        }),
        {}
      );
      setValueInputCurrentQuantity(initialQuantities);
    }
  }, [dispalyDate]);

  // handleChangeCurrentQuantity
  const handleChangeCurrentQuantity = (value, index) => {
    setValueInputCurrentQuantity((prev) => ({
      ...prev,
      [Number(index)]: Number(value),
    }));
  };
  // handleChangeCompletion
  const handleChangeCompletion = (value, index) => {
    setValueInputCompletionPercentage((prev) => ({
      ...prev,
      [Number(index)]: Number(value),
    }));
  };
  // handleChangeInvoice
  const handleChangeInvoice = (value, index) => {
    setValueInputInvoicePercentage((prev) => ({
      ...prev,
      [Number(index)]: Number(value),
    }));
  };

  // function calcute
  async function handleSubmitCalculate(id, assign, index) {
    if (valueInputCurrentQuantity[index] <= 0)
      return toast.error("you must enter current geather from 0");
    setLoading(id);
    await axiosInstance
      .put(`/api/workConfirmation/workConfirmation/${workId}/${id}`, {
        currentQuantity:
          dispalyDate?.data?.data?.typeOfProgress === "Percentage per Line"
            ? (valueInputCurrentQuantity[index] / 100) * assign
            : valueInputCurrentQuantity[index],
        invoicing: valueInputInvoicePercentage[index] || 100,
        completion: valueInputCompletionPercentage[index] || 100,
      })
      .then(() => {
        toast.success("calculate successfully");
        refetch();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => setLoading(null));
  }
  const colums = [
    {
      header: "work item",
      text: t("ConfirmationForms.BOQ.table.columns.workItem"),
      display: true,
    },
    {
      header: "Unit Of Measure",
      text: t("ConfirmationForms.BOQ.table.columns.unitOfMeasure"),
      display: true,
    },
    {
      header: "Contract Quantity",
      text: t("ConfirmationForms.BOQ.table.columns.contractQuantity"),
      display: true,
    },
    {
      header: "Previous Quantity",
      text: t("ConfirmationForms.BOQ.table.columns.previousQuantity"),
      display: true,
    },
    {
      header: "Current Work %",
      text: t("ConfirmationForms.BOQ.table.columns.currentWorkPercent"),
      display:
        dispalyDate?.data?.data?.typeOfProgress === "Percentage per Line",
    },
    {
      header: "Current Work QTY",
      text: t("ConfirmationForms.BOQ.table.columns.currentWorkQty"),
      display:
        dispalyDate?.data?.data?.typeOfProgress !== "Percentage per Line",
    },
    {
      header: "Current Work",
      text: t("ConfirmationForms.BOQ.table.columns.currentWork"),
      display:
        dispalyDate?.data?.data?.typeOfProgress === "Percentage per Line",
    },
    {
      header: "Total Quantity",
      text: t("ConfirmationForms.BOQ.table.columns.totalQuantity"),
      display: true,
    },
    {
      header: "Price",
      text: t("ConfirmationForms.BOQ.table.columns.price"),
      display: true,
    },
    {
      header: "Total Amount",
      text: t("ConfirmationForms.BOQ.table.columns.totalAmount"),
      display: true,
    },
    {
      header: "Completion %",
      text: t("ConfirmationForms.BOQ.table.columns.completionPercent"),
      display: dispalyDate?.data?.data?.completionPercentage === true,
    },
    {
      header: "Invoicing %",
      text: t("ConfirmationForms.BOQ.table.columns.invoicingPercent"),
      display: dispalyDate?.data?.data?.activateInvoicingByPercentage === true,
    },
    {
      header: "Net Amount",
      text: t("ConfirmationForms.BOQ.table.columns.netAmount"),
      display: true,
    },
    {
      header: "Duo Amount",
      text: t("ConfirmationForms.BOQ.table.columns.duoAmount"),
      display: true,
    },
    {
      header: "Calculate",
      text: t("ConfirmationForms.BOQ.table.columns.calculate"),
      display: true,
    },
  ];
  return (
    <div className="print:hidden">
      <ToastContainer />
      <div className="scrollbar min-h-[60vh] overflow-auto">
        <table>
          <thead>
            <tr className=" bg-[#F5FAFE]  text-blue-950">
              {colums
                .filter(
                  (e) =>
                    currentValueColumWorkConfirmation[e?.header] && e?.display
                )
                .map((col, index) => (
                  <th key={index} className="border-none">
                    {col?.text}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {dispalyDate?.data?.data?.workItems?.map((e, i) => (
              <>
                <tr
                  key={i}
                  className="text-primaryColor relative cursor-pointer"
                >
                  <td
                    onClick={() => setLineDetails(e?._id)}
                    className={`border-none ${
                      !currentValueColumWorkConfirmation["work item"]
                        ? "hidden"
                        : ""
                    }`}
                  >
                    {e?.workItemId?.workItemName}
                  </td>
                  <td
                    onClick={() => setLineDetails(e?._id)}
                    className={`border-none ${
                      !currentValueColumWorkConfirmation["Unit Of Measure"]
                        ? "hidden"
                        : ""
                    }`}
                  >
                    {e?.workItemId?.workDetails?.unitOfMeasure}
                  </td>
                  <td
                    onClick={() => setLineDetails(e?._id)}
                    className={`border-none   ${
                      !currentValueColumWorkConfirmation["Contract Quantity"]
                        ? "hidden"
                        : ""
                    }`}
                  >
                    {e?.workItemId?.workDetails?.assignedQuantity?.toLocaleString(
                      "en-US"
                    )}
                  </td>
                  {/* // previeous quantity */}
                  <td
                    onClick={() => setLineDetails(e?._id)}
                    className={`border-none    ${
                      !currentValueColumWorkConfirmation["Previous Quantity"]
                        ? "hidden"
                        : ""
                    }`}
                  >
                    {e?.previousQuantity?.toLocaleString("en-US")}
                  </td>
                  {/* // current quantity */}
                  <td
                    className={`border-none ${
                      !currentValueColumWorkConfirmation["Current Work %"]
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <input
                      type="number"
                      min={isNegativeActive ? "" : 0}
                      className={`outline-none border px-1 ${
                        !currentValueColumWorkConfirmation["Current Work QTY"]
                          ? "hidden"
                          : ""
                      }`}
                      onChange={(e) =>
                        handleChangeCurrentQuantity(e.target.value, i)
                      }
                      value={
                        dispalyDate?.data?.data?.workConfirmationType ===
                        "final"
                          ? e?.workItemId?.workDetails?.assignedQuantity -
                            e?.previousQuantity
                          : e?.currentQuantity
                          ? dispalyDate?.data?.data?.typeOfProgress ===
                            "Percentage per Line"
                            ? (e?.currentQuantity * 100) /
                              e?.workItemId?.workDetails?.assignedQuantity
                            : e?.currentQuantity
                          : valueInputCurrentQuantity[i]
                      }
                      disabled={
                        dispalyDate?.data?.data?.workConfirmationType ===
                        "final"
                      }
                    />
                  </td>
                  {/* // special of percentage  */}
                  {dispalyDate?.data?.data?.typeOfProgress ===
                    "Percentage per Line" && (
                    <td
                      onClick={() => setLineDetails(e?._id)}
                      className={`${
                        !currentValueColumWorkConfirmation["Current Work"]
                          ? "hidden"
                          : ""
                      }`}
                    >
                      {e?.currentQuantity || 0}
                    </td>
                  )}
                  {/* // total quantity  */}
                  <td
                    onClick={() => setLineDetails(e?._id)}
                    className={`border-none   ${
                      !currentValueColumWorkConfirmation["Total Quantity"]
                        ? "hidden"
                        : ""
                    }`}
                  >
                    {e?.totalQuantity?.toLocaleString("en-US")}
                  </td>
                  {/* // price  */}
                  <td
                    onClick={() => setLineDetails(e?._id)}
                    className={`border-none   ${
                      !currentValueColumWorkConfirmation["Price"]
                        ? "hidden"
                        : ""
                    }`}
                  >
                    {e?.workItemId?.workDetails?.price?.toLocaleString("en-US")}
                  </td>
                  {/* /getTotalAmount/ */}
                  <td
                    onClick={() => setLineDetails(e?._id)}
                    className={`border-none   ${
                      !currentValueColumWorkConfirmation["Total Amount"]
                        ? "hidden"
                        : ""
                    }`}
                  >
                    {e?.totalAmount?.toLocaleString("en-US")}
                  </td>
                  {/* /completionPercentage/ */}
                  {dispalyDate?.data?.data?.completionPercentage && (
                    <td
                      className={`border-none   ${
                        !currentValueColumWorkConfirmation["Completion %"]
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <input
                        type="number"
                        className="outline-none border px-1"
                        value={
                          valueInputCompletionPercentage[i] ??
                          e?.workItemId?.workDetails?.completion ??
                          100
                        }
                        onChange={(e) =>
                          handleChangeCompletion(e.target.value, i)
                        }
                      />
                    </td>
                  )}
                  {/* /activateInvoicingByPercentage/ */}
                  {dispalyDate?.data?.data?.activateInvoicingByPercentage && (
                    <td
                      className={`border-none   ${
                        !currentValueColumWorkConfirmation["Invoicing %"]
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <input
                        type="number"
                        className="outline-none border px-1"
                        value={
                          valueInputInvoicePercentage[i] ??
                          e?.workItemId?.workDetails?.invoicing ??
                          100
                        }
                        onChange={(e) => handleChangeInvoice(e.target.value, i)}
                      />
                    </td>
                  )}
                  {/* // Net Amount  */}
                  <td
                    onClick={() => setLineDetails(e?._id)}
                    className={`border-none   ${
                      !currentValueColumWorkConfirmation["Net Amount"]
                        ? "hidden"
                        : ""
                    }`}
                  >
                    {e?.netAmount?.toLocaleString("en-US") || 0}
                  </td>
                  {/* // getDuoAmount */}
                  <td
                    onClick={() => setLineDetails(e?._id)}
                    className={`border-none   ${
                      !currentValueColumWorkConfirmation["Duo Amount"]
                        ? "hidden"
                        : ""
                    }`}
                  >
                    {e?.dueAmount?.toLocaleString("en-US") || 0}
                  </td>
                  {/* // calculate  */}
                  <td className="flex justify-between items-center">
                    <button
                      className={`text-white border border-primaryColor px-3 pt-1 pb-2 rounded-md bg-primaryColor ${
                        !currentValueColumWorkConfirmation["Calculate"]
                          ? "hidden"
                          : ""
                      }`}
                      onClick={() =>
                        handleSubmitCalculate(
                          e?.workItemId?._id,
                          e?.workItemId?.workDetails?.assignedQuantity,
                          i
                        )
                      }
                    >
                      {loading === e?.workItemId?._id
                        ? t("ConfirmationPage.table.calcButton.loading")
                        : t("ConfirmationPage.table.calcButton.text")}
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      {lineDetails && (
        <DetailsWorkLine
          setLineDetails={setLineDetails}
          workConfirmation={dispalyDate?.data?.data}
          workItem={lineDetails}
          refetch={refetch}
        />
      )}
      <div className="flex justify-end items-center">
        {/* <div className="text-gray-600 mt-2">page 1 of 5 </div> */}

        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
            onClick={(event) => {
              event.preventDefault();
              nav(
                `/${user?.companyName}/workconfirm/addConfirmation/${workId}/edit`
              );
            }}
          >
            {t("ConfirmationForms.form1.buttons.previousButton")}
          </button>
          <button
            type="button"
            className="text-white border border-primaryColor px-3 pt-1 pb-2 rounded-md bg-primaryColor"
            onClick={(event) => {
              event.preventDefault();
              nav(
                `/${user?.companyName}/workconfirm/addConfirmation/deduction/${workId}/${contractId}`
              );
            }}
          >
            {t("ConfirmationForms.form1.buttons.nextButton.text")}
          </button>
        </div>
      </div>
    </div>
  );
}
TableWorkItem.propTypes = {
  dispalyDate: PropTypes.any,
  refetch: PropTypes.func,
};
