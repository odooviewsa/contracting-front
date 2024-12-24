import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../axios/axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
const ConfirmationForm = () => {
  const [isWithContract, setIsWithContract] = useState(false);
  const [isInvoicingActive, setIsInvoicingActive] = useState(false);
  const [isCompletionActive, setIsCompletionActive] = useState(false);
  const [imformationContract, setInformationContract] = useState([{}]);
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
      projectName: imformationContract[0]?.project?.projectName,
      contractType: imformationContract[0]?.contractType,
      partner: imformationContract[0]?.partner?.partnerName,
      contractId: codeContract,
      activateInvoicingByPercentage: isInvoicingActive,
      completionPercentage: isCompletionActive,
      status: "Estimation",
    };
    if (!formData?.contractId) return toast.error("you must choose contract");
    await axiosInstance
      .post("/api/workConfirmation/create", formData)
      .then((result) => {
        console.log(result);
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
            Contract Type <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            placeholder=" Contract Type"
            readOnly
            value={imformationContract?.[0]?.contractType || ""}
          />
        </div>

        {/* With Contract Toggle */}
        <div className="flex md:flex-row flex-col  md:items-end gap-3  ">
          <div
            className="flex items-center space-x-2 cursor-pointer w-60"
            onClick={() => setIsWithContract(!isWithContract)}
          >
            {isWithContract ? (
              <FaToggleOn className="text-blue-500 text-3xl" />
            ) : (
              <FaToggleOff className="text-gray-400 text-3xl" />
            )}
            <span className="text-lg whitespace-nowrap">With Contract</span>
          </div>

          {isWithContract && (
            <div className="w-full">
              <select
                id="contractNumber"
                className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
                onChange={(e) => setCodeContract(e.target.value)}
                required
              >
                <option value="">Select Contract Number</option>

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
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            placeholder="Project Name"
            readOnly
            value={imformationContract?.[0]?.project?.projectName || ""}
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
            value={imformationContract?.[0]?.partner?.partnerName || ""}
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
              validate: (value) => {
                const inputDate = new Date(value);
                const contractStart = new Date(
                  imformationContract?.[0]?.startDate
                );
                const contractEnd = new Date(imformationContract?.[0]?.endDate);

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
            End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="endDate"
            className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500 text-lg"
            {...register("endDate", {
              required: "start Date is required",
              validate: (value) => {
                const inputDate = new Date(value);
                const contractStart = new Date(
                  imformationContract?.[0]?.startDate
                );
                const contractEnd = new Date(imformationContract?.[0]?.endDate);
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
            {isSubmitting ? "Loading..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmationForm;
