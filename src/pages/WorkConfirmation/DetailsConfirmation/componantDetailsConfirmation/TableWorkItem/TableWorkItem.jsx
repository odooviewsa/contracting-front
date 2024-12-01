import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../../axios/axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
export default function TableWorkItem({ work }) {
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

  // get work confiration for contract
  function getWorkConfirationForContract() {
    return axiosInstance.get(`/api/work/${contractId}`);
  }
  const { data, refetch } = useQuery({
    queryKey: ["getWorkConfirationForContract", contractId],
    queryFn: getWorkConfirationForContract,
  });

  // handleChangeCurrentQuantity
  const handleChangeCurrentQuantity = (value, index) => {
    setValueInputCurrentQuantity((prev) => ({
      ...prev,
      [Number(index)]: Number(value),
    }));
  };
  // get Total Quantity
  const getTotlalQuantity = (prev, assign, index, current) => {
    if (!valueInputCurrentQuantity[index]) {
      return work?.data?.data?.typeOfProgress === "Percentage per Line"
        ? prev + (current / 100) * assign
        : prev + current;
    }
    return work?.data?.data?.typeOfProgress === "Percentage per Line"
      ? prev + (valueInputCurrentQuantity[index] / 100) * assign || 0
      : prev + valueInputCurrentQuantity[index] || 0;
  };

  // get total amount
  const getTotalAmount = (prev, assign, index, price, current) => {
    const totalQuantity = getTotlalQuantity(prev, assign, index, current);
    return totalQuantity * price;
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
  // handleChangeInvoice
  const getNetAmount = (prev, assign, price, index) => {
    const totalAmount = getTotalAmount(prev, assign, index, price);
    return (
      totalAmount *
      (valueInputCompletionPercentage[index] / 100 || 100 / 100) *
      (valueInputInvoicePercentage[index] / 100 || 100 / 100)
    );
  };
  // handle Duo Amount
  const getDuoAmount = (prevNetAmount, prev, assign, price, index) => {
    const netAmount = getNetAmount(prev, assign, price, index);
    return netAmount - prevNetAmount;
  };
  // function calcute
  async function handleSubmitCalculate(
    id,
    current,
    netAmount,
    DuoAmount,
    totalQuantity,
    assign
  ) {
    if (!current || current === 0)
      return toast.error("you must enter different current quantity");
    setLoading(id);
    await axiosInstance
      .put(`/api/work/workConfirmation/${workId}/${id}`, {
        previousQuantity: totalQuantity,
        currentQuantity: current,
        totalOfQuantityAndPrevious: totalQuantity,
        newCurrent:
          work?.data?.data?.typeOfProgress === "Percentage per Line"
            ? (current / 100) * assign
            : current,
        netAmount: netAmount,
        dueAmount: DuoAmount,
        previousNetAmount: netAmount,
        previousDueAmount: DuoAmount,
      })
      .then(() => {
        toast.success("calculate successfully");
        refetch();
      })
      .catch((error) => toast.error(error?.response?.data?.message))
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
            {data?.data?.data.map((e, i) => (
              <tr className="cursor-pointer text-primaryColor" key={i}>
                <td className="border-none">{e?.workItemName}</td>
                <td className="border-none">{e?.workDetails?.unitOfMeasure}</td>
                <td className="border-none">
                  {e?.workDetails?.assignedQuantity}
                </td>
                {/* // previeous quantity */}
                <td className="border-none">
                  <input
                    type="number"
                    value={e?.previousQuantity}
                    readOnly
                    className="outline-none "
                  />
                </td>

                {/* // current quantity */}
                <td className="border-none">
                  <input
                    type="number"
                    className="outline-none border px-1"
                    onChange={(e) =>
                      handleChangeCurrentQuantity(e.target.value, i)
                    }
                    defaultValue={e?.currentQuantity}
                  />
                </td>
                {/* // special of percentage  */}
                {work?.data?.data?.typeOfProgress === "Percentage per Line" && (
                  <td>
                    <input
                      type="number"
                      className="outline-none "
                      readOnly
                      value={
                        (valueInputCurrentQuantity[i] / 100) *
                          e?.workDetails?.assignedQuantity ||
                        (e?.currentQuantity / 100) *
                          e?.workDetails?.assignedQuantity ||
                        0
                      }
                    />
                  </td>
                )}
                {/* // total quantity  */}
                <td className="border-none">
                  <input
                    type="number"
                    value={
                      e?.totalOfQuantityAndPrevious
                      // getTotlalQuantity(
                      // e?.previousQuantity,
                      // e?.workDetails?.assignedQuantity,
                      // i,
                      // e?.currentQuantity
                      // )
                    }
                    readOnly
                    className="outline-none "
                  />
                </td>
                {/* // price  */}
                <td className="border-none">{e?.workDetails?.price}</td>
                {/* /getTotalAmount/ */}
                <td className="border-none">
                  {getTotalAmount(
                    e?.previousQuantity,
                    e?.workDetails?.assignedQuantity,
                    i,
                    e?.workDetails?.price,
                    e?.currentQuantity
                  )}
                </td>
                {/* /completionPercentage/ */}
                {work?.data?.data?.completionPercentage && (
                  <td className="border-none">
                    <input
                      type="number"
                      className="outline-none border px-1"
                      value={valueInputCompletionPercentage[i] || 100}
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
                      value={valueInputInvoicePercentage[i] || 100}
                      onChange={(e) => handleChangeInvoice(e.target.value, i)}
                    />
                  </td>
                )}
                {/* // Net Amount  */}
                <td className="border-none">
                  <input
                    type="number"
                    readOnly
                    className="outline-none"
                    value={
                      // getNetAmount(
                      //   e?.previousQuantity,
                      //   e?.currentQuantity,
                      //   e?.workDetails?.price,
                      //   i
                      // ) ||

                      e?.previousNetAmount
                    }
                    defaultValue={0}
                  />
                </td>
                {/* // getDuoAmount */}
                <td className="border-none">
                  <input
                    type="number"
                    readOnly
                    className="outline-none"
                    value={
                      // getDuoAmount(
                      //   e?.previousDueAmount,
                      //   e?.previousQuantity,
                      //   e?.currentQuantity,
                      //   e?.workDetails?.price,
                      //   i
                      // ) ||

                      e?.previousDueAmount
                    }
                  />
                </td>
                {/* // calculate  */}
                <td>
                  <button
                    className="text-white border border-primaryColor px-3 pt-1 pb-2 rounded-md bg-primaryColor"
                    onClick={() =>
                      handleSubmitCalculate(
                        e?._id,
                        valueInputCurrentQuantity[i],
                        getNetAmount(
                          e?.previousQuantity,
                          e?.workDetails?.assignedQuantity,
                          e?.workDetails?.price,
                          i
                        ) || 0,
                        getDuoAmount(
                          e?.previousNetAmount,
                          e?.previousQuantity,
                          e?.workDetails?.assignedQuantity,
                          e?.workDetails?.price,
                          i
                        ) || 0,
                        getTotlalQuantity(
                          e?.previousQuantity,
                          e?.workDetails?.assignedQuantity,
                          i
                        ),
                        e?.workDetails?.assignedQuantity
                      )
                    }
                  >
                    {loading === e?._id ? "Loading..." : "Calculate"}
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
};
