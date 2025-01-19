import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../../../axios/axios";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import { ContextBOQ } from "../../../../../context/BOQContext";
import { useTranslation } from "react-i18next";
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
      header: t("ConfirmationForms.BOQ.table.columns.workItem"),
      display: true,
    },
    {
      header: t("ConfirmationForms.BOQ.table.columns.unitOfMeasure"),
      display: true,
    },
    {
      header: t("ConfirmationForms.BOQ.table.columns.contractQuantity"),
      display: true,
    },
    {
      header: t("ConfirmationForms.BOQ.table.columns.previousQuantity"),
      display: true,
    },
    {
      header: t("ConfirmationForms.BOQ.table.columns.currentWorkPercent"),
      display:
        dispalyDate?.data?.data?.typeOfProgress === "Percentage per Line",
    },
    {
      header: t("ConfirmationForms.BOQ.table.columns.currentWorkQty"),
      display:
        dispalyDate?.data?.data?.typeOfProgress !== "Percentage per Line",
    },
    {
      header: t("ConfirmationForms.BOQ.table.columns.currentWork"),
      display: dispalyDate?.data?.data?.typeOfProgress === "Percentage per Line",
    },
    {
      header: t("ConfirmationForms.BOQ.table.columns.totalQuantity"),
      display: true,
    },
    {
      header: t("ConfirmationForms.BOQ.table.columns.price"),
      display: true,
    },
    {
      header: t("ConfirmationForms.BOQ.table.columns.totalAmount"),
      display: true,
    },
    {
      header: t("ConfirmationForms.BOQ.table.columns.completionPercent"),
      display: dispalyDate?.data?.data?.completionPercentage === true,
    },
    {
      header: t("ConfirmationForms.BOQ.table.columns.invoicingPercent"),
      display: dispalyDate?.data?.data?.activateInvoicingByPercentage === true,
    },
    {
      header: t("ConfirmationForms.BOQ.table.columns.netAmount"),
      display: true,
    },
    {
      header: t("ConfirmationForms.BOQ.table.columns.duoAmount"),
      display: true,
    },
    {
      header: t("ConfirmationForms.BOQ.table.columns.calculate"),
      display: true,
    },
  ];
  return (
    <div>
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
                    {col?.header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {dispalyDate?.data?.data?.workItems?.map((e, i) => (
              <tr className="cursor-pointer text-primaryColor" key={i}>
                <td
                  className={`border-none ${
                    !currentValueColumWorkConfirmation["work item"]
                      ? "hidden"
                      : ""
                  }`}
                >
                  {e?.workItemId?.workItemName}
                </td>
                <td
                  className={`border-none ${
                    !currentValueColumWorkConfirmation["Unit Of Measure"]
                      ? "hidden"
                      : ""
                  }`}
                >
                  {e?.workItemId?.workDetails?.unitOfMeasure}
                </td>
                <td
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
                  className={`border-none    ${
                    !currentValueColumWorkConfirmation["Previous Quantity"]
                      ? "hidden"
                      : ""
                  }`}
                >
                  {e?.previousQuantity?.toLocaleString("en-US")}
                </td>
                {/* TODO: // current quantity */}
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
                      e?.currentQuantity
                        ? dispalyDate?.data?.data?.typeOfProgress ===
                          "Percentage per Line"
                          ? (e?.currentQuantity * 100) /
                            e?.workItemId?.workDetails?.assignedQuantity
                          : e?.currentQuantity
                        : valueInputCurrentQuantity[i]
                    }
                  />
                </td>
                {/* TODO: // special of percentage  */}
                {dispalyDate?.data?.data?.typeOfProgress ===
                  "Percentage per Line" && (
                  <td
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
                  className={`border-none   ${
                    !currentValueColumWorkConfirmation["Price"] ? "hidden" : ""
                  }`}
                >
                  {e?.workItemId?.workDetails?.price?.toLocaleString("en-US")}
                </td>
                {/* /getTotalAmount/ */}
                <td
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
                  className={`border-none   ${
                    !currentValueColumWorkConfirmation["Duo Amount"]
                      ? "hidden"
                      : ""
                  }`}
                >
                  {e?.dueAmount?.toLocaleString("en-US") || 0}
                </td>
                {/* // calculate  */}
                <td>
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
                      ? "Loading..."
                      : "Calculate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
