import { IoCloseOutline } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaUser, FaProjectDiagram, FaFileContract } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { axiosInstance } from "../../../axios/axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function CreateEstimator({ setOpenCreate, refetch }) {
  const [contractsCode, setContractsCode] = useState([]);
  // Language
  const { t } = useTranslation();
  const fetchProjectNameEstimator = async () => {
    const response = await axiosInstance.get(`/api/projects/names`);
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ["fetchProjectNameEstimator"],
    queryFn: fetchProjectNameEstimator,
    keepPreviousData: true,
  });

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    await axiosInstance
      .post("/api/estimators", data)
      .then((result) => {
        if (result?.status === 201) {
          refetch();
          setOpenCreate(false);
          toast.success("Estimator added successfully!", {
            icon: <IoMdCheckmarkCircleOutline />,
          });
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  }

  const projectName = watch("projectName") || "";
  useEffect(() => {
    async function getAllCodeContracts() {
      const response = await axiosInstance.get(
        `/api/projects/contracts/${projectName}`
      );
      setContractsCode(response?.data?.contracts);
    }
    if (projectName) {
      getAllCodeContracts();
    }
  }, [projectName]);

  return (
    <motion.div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-end z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full md:w-[40%] lg:w-[35%] h-full bg-white"
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800">
              {t("EstimationForm.title")}
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-red-100 text-gray-500 hover:text-red-600 transition-colors"
              onClick={() => setOpenCreate(false)}
            >
              <IoCloseOutline size={24} />
            </motion.button>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto p-6">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t("EstimationForm.fields.name")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                    placeholder={t("EstimationForm.fields.enterName")}
                    {...register("name", { required: t("EstimationForm.fields.nameRequired") })}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Project Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t("EstimationForm.fields.projectName")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaProjectDiagram className="text-gray-400" />
                  </div>
                  <select
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white appearance-none"
                    {...register("projectName", {
                      required: t("EstimationForm.fields.projectNameRequired"),
                    })}
                  >
                    <option value="">{t("EstimationForm.fields.selectProjectName")}</option>
                    {data?.data?.map((e, i) => (
                      <option key={i} value={e?._id}>
                        {e?.projectName}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.projectName && (
                  <p className="text-sm text-red-500">
                    {errors.projectName.message}
                  </p>
                )}
              </div>

              {/* Apply On Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t("EstimationForm.fields.applyOn")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdOutlineCategory className="text-gray-400" />
                  </div>
                  <select
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white appearance-none"
                    {...register("applyOn", {
                      required: t("EstimationForm.fields.applyOnRequired"),
                    })}
                  >
                    <option value="">{t("EstimationForm.fields.selectApplyOn")}</option>
                    <option value="Whole BOQ">{t("EstimationForm.fields.wholeBOQ")}</option>
                    <option value="BOQ Lines">{t("EstimationForm.fields.boqLines")}</option>
                  </select>
                </div>
                {errors.applyOn && (
                  <p className="text-sm text-red-500">
                    {errors.applyOn.message}
                  </p>
                )}
              </div>

              {/* Contract Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t("EstimationForm.fields.contract")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaFileContract className="text-gray-400" />
                  </div>
                  <select
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white appearance-none"
                    {...register("contract", {
                      required: t("EstimationForm.fields.contractRequired"),
                    })}
                  >
                    <option value="">{t("EstimationForm.fields.selectContract")}</option>
                    {contractsCode?.map((e, i) => (
                      <option key={i} value={e?._id}>
                        {e?.code}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.contract && (
                  <p className="text-sm text-red-500">
                    {errors.contract.message}
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Footer with Submit Button */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium 
                ${
                  isSubmitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } 
                transition-colors shadow-sm`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                  <span>{t("EstimationForm.addButton.loading")}</span>
                </div>
              ) : (
                t("EstimationForm.addButton.text")
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

CreateEstimator.propTypes = {
  setOpenCreate: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};
