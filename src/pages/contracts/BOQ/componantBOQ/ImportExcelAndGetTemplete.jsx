import { useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { BsDownload, BsTruckFlatbed } from "react-icons/bs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { axiosInstance } from "../../../../axios/axios";
import { useParams } from "react-router-dom";
import Loading from "../../../../componant/Loading";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
export default function ImportExcelAndGetTemplete({ refetch }) {
  const [checkGetTemplete, setCheckGetTemplete] = useState(false);
  const [fileExcel, setFileExcel] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  async function handleSubmit() {
    const formDate = new FormData();
    formDate.append("file", fileExcel);
    setLoading(BsTruckFlatbed);
    await axiosInstance
      .post(`/api/work/sheet/${id}`, formDate)
      .then((result) => {
        console.log(result);
        if (result?.data?.message === "Success") {
          refetch();
          toast.success("add excel file successfully");
        }
      })
      .catch((error) =>
        toast.error(error?.response?.data?.message || "Error handling")
      )
      .finally(() => {
        setFileExcel(null);
        setLoading(false);
      });
  }
  return (
    <div className="flex md:items-center justify-between">
      <div className="flex md:items-center gap-3 md:flex-row flex-col">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => setCheckGetTemplete((e) => !e)}
        >
          {!checkGetTemplete ? (
            <div className="w-[16px] h-[15px] rounded-sm border border-gray-500"></div>
          ) : (
            <FaCheckSquare color="green" />
          )}

          <p className="text-primaryColor text-[0.9rem] font-semibold">
            Get BOQ From Template
          </p>
        </div>
        <select
          className={`text-[0.9rem] border outline-none border-blue-300 rounded-md w-48 md:w-64 p-[3px] text-grayColor
            ${!checkGetTemplete ? "opacity-0" : ""}
            `}
        >
          <option value="" className="text-[0.8rem]">
          Template
          </option>
        </select>
      </div>
      <div className="flex  gap-2">
        {fileExcel && (
          <button
            className="rounded-md border border-green-500 p-1 h-fit text-green-600"
            onClick={handleSubmit}
          >
            {loading ? <Loading /> : "add"}
          </button>
        )}
        <div>
          <label
            htmlFor="importExcel"
            className="p-[4px] h-fit cursor-pointer flex items-center gap-1 text-[0.9rem] border border-green-500 rounded-md text-green-900 font-semibold"
          >
            <RiFileExcel2Fill />
            <p>Import</p>
            <BsDownload />
          </label>
          <input
            type="file"
            hidden
            id="importExcel"
            onChange={(e) => setFileExcel(e.target.files[0])}
          />
        </div>
      </div>
    </div>
  );
}
ImportExcelAndGetTemplete.propTypes = {
  refetch: PropTypes.func,
};
