import { useForm } from "react-hook-form";
import { axiosInstance } from "../../axios/axios";
import { useNavigate, useParams } from "react-router-dom";
// import EditButton from "../../componant/EditButton";
import { useEffect, useState } from "react";
// import Modal from "react-modal";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function EditSingleContract() {
  const navigate = useNavigate();
  const { contractId } = useParams();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [partners, setPartners] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const user = useSelector((state) => state?.user);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/contracts/${contractId}`
        );
        console.log(response.data.data);
        const contractData = response.data.data;
        setValue("contractType", contractData.contractType);
        setValue("project", contractData.project);
        setValue("partner", contractData.partner);
        setValue("consultant", contractData.consultant);

        const formattedStartDate = new Date(contractData.startDate)
          .toISOString()
          .split("T")[0];
        setValue("startDate", formattedStartDate);

        const formattedEndDate = new Date(contractData.endDate)
          .toISOString()
          .split("T")[0];
        setValue("endDate", formattedEndDate);

        setValue("typeOfProgress", contractData.typeOfProgress);
        setValue("description", contractData.description);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("/api/projects");
        setProjects(
          response.data.projects.map((project) => ({
            value: project._id,
            label: project.projectName,
          }))
        );
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const fetchPartners = async () => {
      try {
        const response = await axiosInstance.get("/api/partners");
        setPartners(
          response.data.partners.map((partner) => ({
            value: partner._id,
            label: partner.partnerName,
          }))
        );
      } catch (error) {
        console.log("Error fetching partners:", error.message);
      }
    };

    const fetchConsultants = async () => {
      try {
        const response = await axiosInstance.get("/api/partners/consultants");
        setConsultants(
          response.data.consultants.map((consultant) => ({
            value: consultant._id,
            label: consultant.partnerName,
          }))
        );
      } catch (error) {
        console.log("Error fetching consultants:", error.message);
      }
    };

    fetchContractData();
    fetchProjects();
    fetchPartners();
    fetchConsultants();
  }, [contractId, setValue]);

  const onUpdate = async (data) => {
    try {
      const response = await axiosInstance.put(
        `/api/contracts/${contractId}`,
        data
      );
      if (response) {
        toast.success("Contract updated successfully!", {
          onClose: () => navigate(`/${user?.companyName}/contracts`),
        });
      }
    } catch (error) {
      console.error(
        "Error updating contract:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="p-4 bg-gray-50">
        <h2 className="text-2xl mb-6 font-semibold text-primaryColor">
          Edit Contract
        </h2>
        <form
          onSubmit={handleSubmit(onUpdate)}
          className="flex flex-col gap-6 bg-white p-6 rounded-md shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contract Type */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Contract Type <span className="text-red-500">*</span>
              </label>
              <select
                {...register("contractType", {
                  required: "Contract Type is required",
                })}
                className={`py-[5px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full ${
                  errors.contractType ? "border-red-500" : ""
                }`}
              >
                <option value="">choose</option>
                <option value="Owner BOQ">Owner Contract</option>
                <option value="Sub-Contractor">Sub-Contractor Contract</option>
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
                Project <span className="text-red-500">*</span>
              </label>
              <Select
                options={projects}
                onChange={(selectedOption) => {
                  setValue("project", selectedOption.value);
                }}
                onBlur={() => {
                  register("project", { required: "Project is required" });
                  trigger("project");
                }}
                placeholder="Choose..."
                className={`w-full ${
                  errors.project ? "border border-red-500" : ""
                }`}
              />
              {errors.project && (
                <p className="text-red-400 text-sm">{errors.project.message}</p>
              )}
            </div>

            {/* Partner */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Partner <span className="text-red-500">*</span>
              </label>
              <Select
                options={partners}
                onChange={(selectedOption) => {
                  setValue("partner", selectedOption.value);
                  trigger("partner");
                }}
                onBlur={() =>
                  register("partner", { required: "Partner is required" })
                }
                placeholder="Choose..."
                className={`w-full ${
                  errors.partner ? "border border-red-500" : ""
                }`}
              />
              {errors.partner && (
                <p className="text-red-400 text-sm">{errors.partner.message}</p>
              )}
            </div>

            {/* Consultant */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Consultant <span className="text-red-500">*</span>
              </label>
              <Select
                options={consultants}
                onChange={(selectedOption) => {
                  setValue("consultant", selectedOption.value);
                  trigger("consultant");
                }}
                onBlur={() =>
                  register("consultant", { required: "Consultant is required" })
                }
                className={`w-full ${
                  errors.consultant ? "border border-red-500" : ""
                }`}
              />
              {errors.consultant && (
                <p className="text-red-400 text-sm">
                  {errors.consultant.message}
                </p>
              )}
            </div>

            {/* Start Date */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register("startDate", {
                  required: "Start date is required.",
                })}
                className={`py-[4px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full ${
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
                Type of Progress <span className="text-red-500">*</span>
              </label>
              <select
                {...register("typeOfProgress", {
                  required: "Type of Progress is required",
                })}
                className={`py-[5px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full ${
                  errors.typeOfProgress ? "border-red-500" : ""
                }`}
              >
                <option value="">choose</option>
                <option value="Progress">Progress</option>
                <option value="Progress Payment">Progress Payment</option>
                <option value="Invoice">Invoice</option>
              </select>
              {errors.typeOfProgress && (
                <p className="text-red-400 text-sm">
                  {errors.typeOfProgress.message}
                </p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register("endDate", { required: "End date is required." })}
                className={`py-[4px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full ${
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
                Description
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
              Update Contract
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditSingleContract;
