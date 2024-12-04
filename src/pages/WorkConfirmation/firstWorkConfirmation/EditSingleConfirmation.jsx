import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { axiosInstance } from "../../../axios/axios";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function EditSingleConfirmation() {
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

  // console.log(data?.data?.data);

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
    };

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
            Contract Type <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            placeholder=" Contract Type"
            readOnly
            value={data?.data?.data?.contractType || ""}
          />
        </div>

        {/* With Contract Toggle */}
        <div>
          <label className="block text-lg font-medium mb-3" htmlFor="Contract">
            Contract Number <span className="text-red-500">*</span>
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
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            placeholder="Project Name"
            readOnly
            value={data?.data?.data?.projectName || ""}
          />
        </div>

        {/* Partner */}
        <div>
          <label className="block text-lg font-medium mb-3" htmlFor="partner">
            Partner <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            placeholder="Partner Name"
            readOnly
            value={data?.data?.data?.partner || ""}
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-lg font-medium mb-3" htmlFor="startDate">
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="startDate"
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            {...register("startDate", {
              required: "start Date is required",
            })}
          />
          <p className="text-red-400 text-[0.8rem] -mb-3">
            {errors["startDate"] && errors["startDate"].message}
          </p>
        </div>

        {/* End Date */}
        <div>
          <label className="block text-lg font-medium mb-3" htmlFor="endDate">
            End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="endDate"
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            {...register("endDate", {
              required: "start Date is required",
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
            Work Confirmation Type <span className="text-red-500">*</span>
          </label>
          <select
            id="workConfirmationType"
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            {...register("workConfirmationType", {
              required: "work Confirmation Type is required",
            })}
          >
            <option value="">Select</option>
            <option value="progress">Progress Work Confirmation</option>
            <option value="inspection">Inspection-Based Confirmation</option>
            <option value="substantial">
              Substantial Completion Confirmation
            </option>
            <option value="final">Final Work Confirmation</option>
            <option value="material">
              Material and Equipment Receipt Confirmation
            </option>
            <option value="safety">Safety and Compliance Confirmation</option>
            <option value="daily">Daily Work Reports (DWR)</option>
            <option value="punch">Punch List Completion Confirmation</option>
            <option value="changeOrder">Change Order Work Confirmation</option>
            <option value="warranty">
              Warranty and Maintenance Confirmation
            </option>
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
            Type of Progress <span className="text-red-500">*</span>
          </label>
          <select
            id="typeOfProgress"
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            {...register("typeOfProgress", {
              required: "type Of Progress is required",
            })}
          >
            <option value="">Select</option>
            <option value="Percentage per Line">Percentage per Line</option>
            <option value="Quantity per Line">Quantity per Line</option>
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
            <span className="text-lg">Activate Invoicing by %</span>
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
              Completion % - Based Work Confirmation
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
            Back
          </button>
          <button
            type="submit"
            className="text-white border border-primaryColor px-3 pt-1 pb-2 rounded-md bg-primaryColor"
          >
            {isSubmitting ? "Loading..." : "update"}
          </button>
        </div>
      </form>
    </div>
  );
}
