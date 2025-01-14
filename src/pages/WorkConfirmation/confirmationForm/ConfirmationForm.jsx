import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../axios/axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const ConfirmationForm = () => {
  // Language
  const { t } = useTranslation();
  const [isWithContract, setIsWithContract] = useState(false);
  const [isInvoicingActive, setIsInvoicingActive] = useState(false);
  const [isCompletionActive, setIsCompletionActive] = useState(false);
  const [isNegativeActive, setIsNegativeActive] = useState(false);
  const [informationContract, setInformationContract] = useState([{}]);
  const [codeContract, setCodeContract] = useState(null);
  const nav = useNavigate();
  const user = useSelector((state) => state?.user);
  // get code contract
  function getAllContractCodeForUser() {
    return axiosInstance.get(`/api/contracts/code`);
  }
  const { data } = useQuery({
    queryKey: ["getAllContractCodeForUser"],
    queryFn: getAllContractCodeForUser,
  });

  useEffect(() => {
    setInformationContract(
      data?.data?.contracts?.filter((e) => e?._id === codeContract)
    );
  }, [codeContract, data?.data?.contracts]);
  // add work confirmation
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  async function onSubmit(data) {
    const formData = {
      ...data,
      projectName: informationContract[0]?.project?._id,
      contractType: informationContract[0]?.contractType,
      partner: informationContract[0]?.partner?._id,
      contractId: codeContract,
      activateInvoicingByPercentage: isInvoicingActive,
      completionPercentage: isCompletionActive,
      negativeActive: isNegativeActive,
      status: "Estimation",
    };
    if (!formData?.contractId)
      return toast.error(
        t("ConfirmationForms.form1.messages.mustChooseContract")
      );
    await axiosInstance
      .post("/api/workConfirmation/create", formData)
      .then((result) => {
        if (result.status === 201) {
          nav(
            `/${user?.companyName}/workconfirm/addConfirmation/Details/${result?.data?.data?._id}/${formData?.contractId}`
          );
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  }

  return (
    <div className="  bg-white rounded-md">
      <ToastContainer />
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Contract Type */}
        <div>
          <label className="block text-lg font-medium mb-3">
            {t("ConfirmationForms.form1.contractType")}
            <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            placeholder={t("ConfirmationForms.form1.contractTypePlaceholder")}
            readOnly
            value={informationContract?.[0]?.contractType || ""}
          />
        </div>

        {/* With Contract Toggle */}
        <div className="flex md:flex-row flex-col md:mt-8  md:items-center gap-3  ">
          <div
            className="flex items-center cursor-pointer w-60"
            onClick={() => setIsWithContract(!isWithContract)}
          >
            {isWithContract ? (
              <FaToggleOn className="text-blue-500 text-3xl" />
            ) : (
              <FaToggleOff className="text-gray-400 text-3xl" />
            )}
            <span className="text-lg whitespace-nowrap ltr:ml-2 rtl:mr-2">
              {t("ConfirmationForms.form1.contractType")}
            </span>
          </div>

          {isWithContract && (
            <div className="w-full">
              <select
                id="contractNumber"
                className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
                onChange={(e) => setCodeContract(e.target.value)}
                required
              >
                <option value="">
                  {t("ConfirmationForms.form1.withContract")}
                </option>

                {data?.data?.contracts?.map((e, i) => (
                  <option value={e?._id} key={i}>
                    {e?.code}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Project Name */}
        <div>
          <label
            className="block text-lg font-medium mb-3"
            htmlFor="projectName"
          >
            {t("ConfirmationForms.form1.projectName")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            placeholder={t("ConfirmationForms.form1.projectNamePlaceholder")}
            readOnly
            value={informationContract?.[0]?.project?.projectName || ""}
          />
        </div>

        {/* Partner */}
        <div>
          <label className="block text-lg font-medium mb-3" htmlFor="partner">
            {t("ConfirmationForms.form1.partner")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            placeholder={t("ConfirmationForms.form1.partnerPlaceholder")}
            readOnly
            value={informationContract?.[0]?.partner?.partnerName || ""}
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-lg font-medium mb-3" htmlFor="startDate">
            {t("ConfirmationForms.form1.startDate")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="startDate"
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            {...register("startDate", {
              required: t("ConfirmationForms.form1.startDateRequired"),
              validate: (value) => {
                const inputDate = new Date(value);
                const contractStart = new Date(
                  informationContract?.[0]?.startDate
                );
                const contractEnd = new Date(informationContract?.[0]?.endDate);

                if (inputDate < contractStart || inputDate > contractEnd) {
                  return `Start Date must be between ${contractStart.toLocaleDateString()} and ${contractEnd.toLocaleDateString()}`;
                }
                return true;
              },
            })}
          />
          <p className="text-red-400 text-[0.8rem] -mb-3">
            {errors["startDate"] && errors["startDate"].message}
          </p>
        </div>

        {/* End Date */}
        <div>
          <label className="block text-lg font-medium mb-3" htmlFor="endDate">
            {t("ConfirmationForms.form1.endDate")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="endDate"
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            {...register("endDate", {
              required: t("ConfirmationForms.form1.endDateRequired"),
              validate: (value) => {
                const inputDate = new Date(value);
                const contractStart = new Date(
                  informationContract?.[0]?.startDate
                );
                const contractEnd = new Date(informationContract?.[0]?.endDate);
                const startDate = new Date(getValues("startDate"));

                if (inputDate < contractStart || inputDate > contractEnd) {
                  return `End Date must be between ${contractStart.toLocaleDateString()} and ${contractEnd.toLocaleDateString()}`;
                }

                if (inputDate <= startDate) {
                  return `End Date must be greater than Start Date ${startDate.toLocaleDateString()}`;
                }

                return true;
              },
            })}
          />
          <p className="text-red-400 text-[0.8rem] -mb-3">
            {errors["endDate"] && errors["endDate"].message}
          </p>
        </div>

        {/* Work Confirmation Type */}
        <div>
          <label
            className="block text-lg font-medium mb-3"
            htmlFor="workConfirmationType"
          >
            {t("ConfirmationForms.form1.workConfirmationType")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            id="workConfirmationType"
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            {...register("workConfirmationType", {
              required: t(
                "ConfirmationForms.form1.workConfirmationTypeRequired"
              ),
            })}
          >
            {t("ConfirmationForms.form1.workConfirmationTypeOptions", {
              returnObjects: true,
            }).map((item, key) => (
              <option value={item.value} key={key}>
                {item.text}
              </option>
            ))}
          </select>

          <p className="text-red-400 text-[0.8rem] -mb-3">
            {errors["workConfirmationType"] &&
              errors["workConfirmationType"].message}
          </p>
        </div>

        {/* Type of Progress */}
        <div>
          <label
            className="block text-lg font-medium mb-3"
            htmlFor="typeOfProgress"
          >
            {t("ConfirmationForms.form1.typeOfProgress")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            id="typeOfProgress"
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            {...register("typeOfProgress", {
              required: t("ConfirmationForms.form1.typeOfProgressRequired"),
            })}
          >
            {t("ConfirmationForms.form1.typeOfProgressOptions", {
              returnObjects: true,
            }).map((item, key) => (
              <option key={key} value={item.value}>
                {item.text}
              </option>
            ))}
          </select>
          <p className="text-red-400 text-[0.8rem] -mb-3">
            {errors["typeOfProgress"] && errors["typeOfProgress"].message}
          </p>
        </div>

        {/* Toggles */}
        <div className=" flex flex-col gap-3">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsInvoicingActive(!isInvoicingActive)}
          >
            {isInvoicingActive ? (
              <FaToggleOn className="text-blue-500 text-3xl" />
            ) : (
              <FaToggleOff className="text-gray-400 text-3xl" />
            )}
            <span className="text-lg ltr:ml-2 rtl:mr-2">
              {t("ConfirmationForms.form1.toggles.activate")}
            </span>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsCompletionActive(!isCompletionActive)}
          >
            {isCompletionActive ? (
              <FaToggleOn className="text-blue-500 text-3xl" />
            ) : (
              <FaToggleOff className="text-gray-400 text-3xl" />
            )}
            <span className="text-lg ltr:ml-2 rtl:mr-2">
              {t("ConfirmationForms.form1.toggles.completion")}
            </span>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsNegativeActive(!isNegativeActive)}
          >
            {isNegativeActive ? (
              <FaToggleOn className="text-blue-500 text-3xl" />
            ) : (
              <FaToggleOff className="text-gray-400 text-3xl" />
            )}
            <span className="text-lg ltr:ml-2 rtl:mr-2">
              {t("ConfirmationForms.form1.toggles.negative")}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="col-span-1 md:col-span-2 flex justify-end gap-4">
          <button
            type="button"
            className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
            onClick={() => nav(-1)}
          >
            {t("ConfirmationForms.form1.buttons.backButton")}
          </button>
          <button
            type="submit"
            className="text-white border border-primaryColor px-3 pt-1 pb-2 rounded-md bg-primaryColor"
          >
            {isSubmitting
              ? t("ConfirmationForms.form1.buttons.nextButton.loading")
              : t("ConfirmationForms.form1.buttons.nextButton.text")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmationForm;
