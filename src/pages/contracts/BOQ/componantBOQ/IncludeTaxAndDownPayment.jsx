import { useEffect, useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { axiosInstance } from "../../../../axios/axios";
import { useParams } from "react-router-dom";
import Loading from "../../../../componant/Loading";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export default function IncludeTaxAndDownPayment({ includeTax, DownPayment }) {
  const { id } = useParams();
  const [checkDownPayment, setCheckDownPayment] = useState(null);
  const [checkIncludeTax, setCheckIncludeTax] = useState(null);

  useEffect(() => {
    setCheckIncludeTax(includeTax);
    setCheckDownPayment(DownPayment);
  }, [DownPayment, includeTax]);

  const [loading, setLoading] = useState(false);
  console.log(checkIncludeTax);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await axiosInstance
      .post(`/api/contracts/calculate/${id}`, {
        taxValue: checkIncludeTax,
        downPaymentValue: checkDownPayment,
      })
      .then((result) => {
        if (result?.status === 200) {
          toast.success("add successfully");
        }
      })
      .catch((error) => toast.error(error?.response?.data?.message))
      .finally(() => setLoading(false));
  }
  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="flex md:items-center md:flex-row flex-col gap-5"
    >
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <div
          className="flex gap-2 items-center"
          onClick={() => setCheckIncludeTax((e) => !e)}
        >
          {!checkIncludeTax ? (
            <div className="w-[16px] h-[15px] rounded-sm border border-gray-500"></div>
          ) : (
            <FaCheckSquare color="green" />
          )}
          <label htmlFor="" className="text-gray-700 w-20 font-medium">
            Include Tax
          </label>
        </div>
        <div className="w-full">
          <input
            type="number"
            placeholder="Tax Value"
            name="taxValue"
            required
            disabled={!checkIncludeTax}
            className={`py-1 px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full ${
              !checkIncludeTax ? "opacity-0" : ""
            }`}
            onChange={(e) => setCheckIncludeTax(e.target.value)}
            defaultValue={checkIncludeTax || ""}
          />
        </div>
      </div>

      {/* Down Payment */}
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <div
          className="flex gap-2 items-center"
          onClick={() => setCheckDownPayment((e) => !e)}
        >
          {!checkDownPayment ? (
            <div className="w-[16px] h-[15px] rounded-sm border border-gray-500"></div>
          ) : (
            <FaCheckSquare color="green" />
          )}
          <label htmlFor="" className="text-gray-700 w-32 font-medium ">
            Down Payment
          </label>
        </div>
        <div className="w-full">
          <input
            type="number"
            placeholder="Down Payment"
            name="downPaymentValue"
            required
            disabled={!checkDownPayment}
            className={`py-1 px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full *:
              ${!checkDownPayment ? "opacity-0" : ""}
              `}
            onChange={(e) => setCheckDownPayment(e.target.value)}
            defaultValue={checkDownPayment || ""}
          />
        </div>
      </div>

      <button
        className="py-[2px] px-2 rounded-md border bg-gray-400 text-white flex justify-center"
        disabled={!checkIncludeTax && !checkDownPayment}
      >
        {loading ? <Loading /> : "Add"}
      </button>
    </form>
  );
}

IncludeTaxAndDownPayment.propTypes = {
  includeTax: PropTypes.number,
  DownPayment: PropTypes.number,
};
