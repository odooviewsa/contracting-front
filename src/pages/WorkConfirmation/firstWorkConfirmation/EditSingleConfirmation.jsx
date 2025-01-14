import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { axiosInstance } from "../../../axios/axios";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function EditSingleConfirmation() {
  // Language
  const { t } = useTranslation();
  const nav = useNavigate();
  const { workconfirm } = useParams();
  // get Single Work Confirmation
  function getSingleWorkConfirmationForUpdate() {
    return axiosInstance.get(`/api/workConfirmation/${workconfirm}`);
  }
  const { data } = useQuery({
    queryKey: ["getSingleWorkConfirmationForUpdate", workconfirm],
    queryFn: getSingleWorkConfirmationForUpdate,
  });
  const [isInvoicingActive, setIsInvoicingActive] = useState(
    data?.data?.data?.activateInvoicingByPercentage
  );
  const [isCompletionActive, setIsCompletionActive] = useState(
    data?.data?.data?.completionPercentage
  );
  const [isNegativeActive, setIsNegativeActive] = useState(
    data?.data?.data?.negativeActive
  );
  // add work confirmation
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  async function onSubmit(data) {
    const formData = {
      ...data,
      activateInvoicingByPercentage: isInvoicingActive,
      completionPercentage: isCompletionActive,
      negativeActive: isNegativeActive,
    };
    console.log(formData)

    await axiosInstance
      .put(`/api/workConfirmation/${workconfirm}`, formData)
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          nav(-1);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  }

  // set value
  useEffect(() => {
    if (data) {
      setValue("startDate", data?.data?.data?.startDate?.slice(0, 10));
      setValue("endDate", data?.data?.data?.endDate?.slice(0, 10));
      setValue("workConfirmationType", data?.data?.data?.workConfirmationType);
      setValue("typeOfProgress", data?.data?.data?.typeOfProgress);
    }
  }, [data, setValue]);
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
            {t("ConfirmationForms.form1.contractType")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            placeholder={t("ConfirmationForms.form1.contractTypePlaceholder")}
            readOnly
            value={data?.data?.data?.contractType || ""}
          />
        </div>

        {/* With Contract Toggle */}
        <div>
          <label className="block text-lg font-medium mb-3" htmlFor="Contract">
            {t("ConfirmationForms.form1.contractType")}
            <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            placeholder="Contract Number"
            readOnly
            value={data?.data?.data?.contractId?.code || ""}
          />
        </div>

        {/* Project Name */}
        <div>
          <label
            className="block text-lg font-medium mb-3"
            htmlFor="projectName"
          >
            {t("ConfirmationForms.form1.projectName")}
            <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            placeholder={t("ConfirmationForms.form1.projectNamePlaceholder")}
            readOnly
            value={data?.data?.data?.projectName.projectName || ""}
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
            value={data?.data?.data?.partner.partnerName || ""}
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
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsInvoicingActive(!isInvoicingActive)}
          >
            {isInvoicingActive ? (
              <FaToggleOn className="text-blue-500 text-3xl" />
            ) : (
              <FaToggleOff className="text-gray-400 text-3xl" />
            )}
            <span className="text-lg">
              {" "}
              {t("ConfirmationForms.form1.toggles.activate")}
            </span>
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsCompletionActive(!isCompletionActive)}
          >
            {isCompletionActive ? (
              <FaToggleOn className="text-blue-500 text-3xl" />
            ) : (
              <FaToggleOff className="text-gray-400 text-3xl" />
            )}
            <span className="text-lg">
              {t("ConfirmationForms.form1.toggles.completion")}{" "}
            </span>
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsNegativeActive(!isNegativeActive)}
          >
            {isNegativeActive ? (
              <FaToggleOn className="text-blue-500 text-3xl" />
            ) : (
              <FaToggleOff className="text-gray-400 text-3xl" />
            )}
            <span className="text-lg">
              {t("ConfirmationForms.form1.toggles.negative")}{" "}
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
            {isSubmitting ? t("ConfirmationForms.form1.buttons.updateButton.loading") : t("ConfirmationForms.form1.buttons.updateButton.text")}
          </button>
        </div>
      </form>
    </div>
  );
}
