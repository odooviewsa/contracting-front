import { useEffect, useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { BsDownload, BsTruckFlatbed } from "react-icons/bs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { axiosInstance } from "../../../../axios/axios";
import { useParams } from "react-router-dom";
import Loading from "../../../../componant/Loading";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
export default function ImportExcelAndGetTemplete({
  refetch,
  setIdTemplate,
  checkFetchData,
}) {
  // Language
  const { t } = useTranslation();
  const [checkGetTemplete, setCheckGetTemplete] = useState(true);
  const [templateNames, setTemplateNames] = useState([]);
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

  useEffect(() => {
    const getNames = async () => {
      const fetchNames = await axiosInstance.get(`/api/templates/names`);
      setTemplateNames(fetchNames.data.data);
    };
    getNames();
  }, []);

  return (
    <div className="flex md:items-center justify-between">
      <div className="flex md:items-center gap-3 md:flex-row flex-col">
        <div
          className={`${
            !checkFetchData && "opacity-50 cursor-not-allowed"
          } flex items-center gap-1 cursor-pointer`}
          onClick={() => {
            if (checkFetchData) {
              setCheckGetTemplete((e) => !e);
            }
          }}
          color={checkFetchData ? "green" : "gray"}
        >
          {!checkGetTemplete ? (
            <div className="w-[16px] h-[15px] rounded-sm border border-gray-500"></div>
          ) : (
            <FaCheckSquare color={checkFetchData ? "green" : "gray"} />
          )}

          <p className="text-primaryColor text-[0.9rem] font-semibold">
            {t("ContractsForms.BOQ.excelAndTemplate.getTemplate")}
          </p>
        </div>
        {checkFetchData ? (
          <select
            className={`text-[0.9rem] border outline-none border-blue-300 rounded-md w-48 md:w-64 p-[3px] text-grayColor
            ${!checkGetTemplete && !checkFetchData ? "opacity-0" : ""}
            `}
            onChange={(e) => {
              setIdTemplate(e.target.value);
              setCheckGetTemplete(false);
            }}
          >
            <option
              value={t("ContractsForms.BOQ.excelAndTemplate.options.value")}
              className="text-[0.8rem]"
            >
              {t("ContractsForms.BOQ.excelAndTemplate.options.text")}
            </option>
            {templateNames.map((name) => (
              <option key={name._id} value={name._id}>
                {name.name}
              </option>
            ))}
          </select>
        ) : (
          <></>
        )}
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
            <p> {t("ContractsForms.BOQ.excelAndTemplate.excelButton")}</p>
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
  setIdTemplate: PropTypes.func,
  checkFetchData: PropTypes.any,
};
