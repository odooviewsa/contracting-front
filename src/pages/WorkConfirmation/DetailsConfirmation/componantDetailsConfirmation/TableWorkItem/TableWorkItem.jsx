import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../../../axios/axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
export default function TableWorkItem({ work, refetch }) {
  const nav = useNavigate();
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
  console.log(work);
  // function calcute
  async function handleSubmitCalculate(id, assign, index) {
    if (valueInputCurrentQuantity[index] <= 0)
      return toast.error("you must enter current geather from 0");
    setLoading(id);
    await axiosInstance
      .put(`/api/workConfirmation/workConfirmation/${workId}/${id}`, {
        currentQuantity:
          work?.data?.data?.typeOfProgress === "Percentage per Line"
            ? (valueInputCurrentQuantity[index] / 100) * assign
            : valueInputCurrentQuantity[index],
        invoicing: valueInputInvoicePercentage[index] || 100,
        completion: valueInputCompletionPercentage[index] || 100,
      })
      .then((result) => {
        console.log(result);
        toast.success("calculate successfully");
        refetch();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
      })
      .finally(() => setLoading(null));
  }

  return (
    <div>
      <ToastContainer />
      <div className="scrollbar min-h-[60vh] overflow-auto">
        <table>
          <thead>
            <tr className=" bg-[#F5FAFE]  text-blue-950">
              <th className="border-none">work item</th>
              <th className="border-none">Unit Of Measure</th>
              <th className="border-none">Contract Quantity</th>
              <th className="border-none">Previous Quantity</th>
              {work?.data?.data?.typeOfProgress === "Percentage per Line" ? (
                <th className="border-none">Current Work %</th>
              ) : (
                <th className="border-none">Current Work QTY</th>
              )}

              {work?.data?.data?.typeOfProgress === "Percentage per Line" && (
                <th className="border-none">Current Work </th>
              )}
              <th className="border-none">Total Quantity</th>
              <th className="border-none">Price</th>
              <th className="border-none">Total Amount</th>
              {work?.data?.data?.completionPercentage && (
                <th className="border-none">Completion %</th>
              )}
              {work?.data?.data?.activateInvoicingByPercentage && (
                <th className="border-none">Invoicing %</th>
              )}
              <th className="border-none">Net Amount</th>
              <th className="border-none">Duo Amount</th>
              <th className="border-none">Calculate</th>
            </tr>
          </thead>
          <tbody>
            {work?.data?.data?.workItems?.map((e, i) => (
              <tr className="cursor-pointer text-primaryColor" key={i}>
                <td className="border-none">{e?.workItemId?.workItemName}</td>
                <td className="border-none">
                  {e?.workItemId?.workDetails?.unitOfMeasure}
                </td>
                <td className="border-none">
                  {e?.workItemId?.workDetails?.assignedQuantity}
                </td>
                {/* // previeous quantity */}
                <td className="border-none">{e?.previousQuantity}</td>

                {/* // current quantity */}
                <td className="border-none">
                  <input
                    type="number"
                    className="outline-none border px-1"
                    onChange={(e) =>
                      handleChangeCurrentQuantity(e.target.value, i)
                    }
                    value={
                      e?.currentQuantity
                        ? work?.data?.data?.typeOfProgress ===
                          "Percentage per Line"
                          ? (e?.currentQuantity * 100) /
                            e?.workItemId?.workDetails?.assignedQuantity
                          : e?.currentQuantity
                        : valueInputCurrentQuantity[i]
                    }
                  />
                </td>
                {/* // special of percentage  */}
                {work?.data?.data?.typeOfProgress === "Percentage per Line" && (
                  <td>{e?.currentQuantity || 0}</td>
                )}
                {/* // total quantity  */}
                <td className="border-none">{e?.totalQuantity}</td>
                {/* // price  */}
                <td className="border-none">
                  {e?.workItemId?.workDetails?.price}
                </td>
                {/* /getTotalAmount/ */}
                <td className="border-none">{e?.totalAmount}</td>
                {/* /completionPercentage/ */}
                {work?.data?.data?.completionPercentage && (
                  <td className="border-none">
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
                {work?.data?.data?.activateInvoicingByPercentage && (
                  <td className="border-none">
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
                <td className="border-none">{e?.netAmount || 0}</td>
                {/* // getDuoAmount */}
                <td className="border-none">{e?.dueAmount || 0}</td>
                {/* // calculate  */}
                <td>
                  <button
                    className="text-white border border-primaryColor px-3 pt-1 pb-2 rounded-md bg-primaryColor"
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
            Previous
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
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
TableWorkItem.propTypes = {
  work: PropTypes.any,
  refetch: PropTypes.func,
};
