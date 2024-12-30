import { useForm } from "react-hook-form";
import { axiosInstance } from "../../axios/axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
function EditSingleContract() {
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
                className={`py-[8px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full ${
                  errors.contractType ? "border-red-500" : ""
                }`}
              >
                <option value="Owner">Owner</option>
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
                project <span className="text-red-500">*</span>
              </label>
              <select
                {...register("project", {
                  required: "project is required",
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
                Partner <span className="text-red-500">*</span>
              </label>
              <select
                {...register("partner", {
                  required: "partner is required",
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
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register("startDate", {
                  required: "Start date is required.",
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
                Type of Progress <span className="text-red-500">*</span>
              </label>
              <select
                {...register("typeOfProgress", {
                  required: "Type of Progress is required",
                })}
                className={`py-[8px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full ${
                  errors.typeOfProgress ? "border-red-500" : ""
                }`}
              >
                <option value="">choose</option>
                <option value="In Progress">Quantity</option>
                <option value="Completed">Percentage Per Line</option>
                <option value="Suspended">
                  Percentage Applied to Total of Line
                </option>
                <option value="Suspended">Financial Progress</option>
                <option value="Suspended">Time-Based Progress</option>
              </select>
              {errors.typeOfProgress && (
                <p className="text-red-400 text-sm">
                  {errors.typeOfProgress.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Consaltant <span className="text-red-500">*</span>
              </label>

              <select
                {...register("consultant", {
                  required: "consultant is required",
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
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register("endDate", { required: "End date is required." })}
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
