import { useForm } from "react-hook-form";
import { axiosInstance } from "../../axios/axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
function EditSingleContract() {
  // Language
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { contractId } = useParams();
  const [consultants, setConsultants] = useState([]);
  const [projects, setProjects] = useState([]);
  const [partners, setPartners] = useState([]);
  const user = useSelector((state) => state?.user);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  // asiggn previeous data
  const location = useLocation();
  const previeousData = location.state || {};

  useEffect(() => {
    setValue("contractType", previeousData.contractType);
    setValue("project", previeousData?.project?._id);
    setValue("partner", previeousData?.partner?._id);
    setValue("consultant", previeousData?.consultant?._id);

    const formattedStartDate = new Date(previeousData?.startDate)
      .toISOString()
      .split("T")[0];
    setValue("startDate", formattedStartDate);
    const formattedEndDate = new Date(previeousData?.endDate)
      .toISOString()
      .split("T")[0];
    setValue("endDate", formattedEndDate);
    setValue("typeOfProgress", previeousData.typeOfProgress);
    setValue("description", previeousData.description);
  }, [
    previeousData.contractType,
    previeousData.description,
    previeousData.endDate,
    previeousData?.partner?._id,
    previeousData?.project?._id,
    previeousData?.consultant?._id,
    previeousData.startDate,
    previeousData.typeOfProgress,
    setValue,
  ]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("/api/projects");

        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    const fetchPartners = async () => {
      try {
        const response = await axiosInstance.get("/api/partners");
        setPartners(response.data.partners);
      } catch (error) {
        console.log("Error fetching partners:", error.message);
      }
    };
    const fetchConsultants = async () => {
      try {
        const response = await axiosInstance.get("/api/partners/consultants");
        setConsultants(response.data.consultants);
      } catch (erorr) {
        toast.error(erorr?.response?.data?.message);
      }
    };
    fetchConsultants();
    fetchProjects();
    fetchPartners();
  }, [contractId]);

  const onUpdate = async (data) => {
    try {
      const response = await axiosInstance.put(
        `/api/contracts/${contractId}`,
        data
      );
      if (response) {
        toast.success("Contract updated successfully!");
        navigate(`/${user?.companyName}/contracts`);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="p-4 bg-gray-50">
        <h2 className="text-2xl mb-6 font-semibold text-primaryColor">
          {t("EditContractForm.title")}
        </h2>
        <form
          onSubmit={handleSubmit(onUpdate)}
          className="flex flex-col gap-6 bg-white p-6 rounded-md shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contract Type */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
              {t("EditContractForm.fields.contractType")} <span className="text-red-500">*</span>
              </label>
              <select
                {...register("contractType", {
                  required: t("EditContractForm.fields.contractTypeRequired"),
                })}
                className={`py-[8px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full ${
                  errors.contractType ? "border-red-500" : ""
                }`}
              >
                {t("EditContractForm.fields.contractTypeOptions", {
                  returnObjects: true,
                }).map((item, key) => (
                  <option value={item.value} key={key}>
                    {item.text}
                  </option>
                ))}
              </select>
              {errors.contractType && (
                <p className="text-red-400 text-sm">
                  {errors.contractType.message}
                </p>
              )}
            </div>
            {/* Project */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
              {t("EditContractForm.fields.project")} <span className="text-red-500">*</span>
              </label>
              <select
                {...register("project", {
                  required: t("EditContractForm.fields.projectRequired"),
                })}
                className={`py-[8px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full `}
              >
                {projects?.map((e) => (
                  <option key={e?._id} value={e?._id}>
                    {e?.projectName}
                  </option>
                ))}
              </select>
              {errors.project && (
                <p className="text-red-400 text-sm">{errors.project.message}</p>
              )}
            </div>
            {/* Partner */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
              {t("EditContractForm.fields.partner")} <span className="text-red-500">*</span>
              </label>
              <select
                {...register("partner", {
                  required: t("EditContractForm.fields.partnerRequired"),
                })}
                className={`py-[8px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full `}
              >
                {partners?.map((e) => (
                  <option key={e?._id} value={e?._id}>
                    {e?.partnerName}
                  </option>
                ))}
              </select>
              {errors.partner && (
                <p className="text-red-400 text-sm">{errors.partner.message}</p>
              )}
            </div>
            {/* Start Date */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
              {t("EditContractForm.fields.startDate")} <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register("startDate", {
                  required: t("EditContractForm.fields.startDateRequired"),
                })}
                className={`py-[8px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full ${
                  errors.startDate ? "border-red-500" : ""
                }`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm">
                  {errors.startDate.message}
                </p>
              )}
            </div>
            {/* Type of Progress */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
              {t("EditContractForm.fields.typeOfProgress")} <span className="text-red-500">*</span>
              </label>
              <select
                {...register("typeOfProgress", {
                  required: t("EditContractForm.fields.typeOfProgressRequired"),
                })}
                className={`py-[8px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full ${
                  errors.typeOfProgress ? "border-red-500" : ""
                }`}
              >
                {t("EditContractForm.fields.typeOfProgressOptions", {
                  returnObjects: true,
                }).map((item, key) => (
                  <option value={item.value} key={key}>
                    {item.text}
                  </option>
                ))}
              </select>
              {errors.typeOfProgress && (
                <p className="text-red-400 text-sm">
                  {errors.typeOfProgress.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
              {t("EditContractForm.fields.consultant")} <span className="text-red-500">*</span>
              </label>

              <select
                {...register("consultant", {
                  required: t("EditContractForm.fields.consultantRequired"),
                })}
                className={`py-[8px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full `}
              >
                {consultants?.map((e) => (
                  <option key={e?._id} value={e?._id}>
                    {e?.partnerName}
                  </option>
                ))}
              </select>
              {errors.consultant && (
                <p className="text-red-400 text-sm">
                  {errors.consultant.message}
                </p>
              )}
            </div>
            {/* End Date */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
              {t("EditContractForm.fields.endDate")} <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register("endDate", { required: t("EditContractForm.fields.endDateRequired") })}
                className={`py-[8px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full ${
                  errors.endDate ? "border-red-500" : ""
                }`}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate.message}</p>
              )}
            </div>
            {/* Description */}
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
              {t("EditContractForm.fields.description")}
              </label>
              <textarea
                {...register("description")}
                className="py-2 px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full"
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {t("EditContractForm.updateButton")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditSingleContract;
