import { Controller, useForm } from "react-hook-form";
import { axiosInstance } from "../../../axios/axios";
import { useNavigate } from "react-router-dom";
import ButtonLast from "./ButtonLast";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

function ContractForm() {
  const [projects, setProjects] = useState([]);
  const [partners, setPartners] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
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

    const fetchConsultants = async () => {
      try {
        const response = await axiosInstance.get("/api/partners/consultants");
        setConsultants(
          response.data.consultants.map((consultant) => ({
            value: consultant._id,
            label: consultant.partnerName,
          }))
        );
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchProjects();
    fetchConsultants();
  }, []);

  const fetchPartners = async (contractType) => {
    try {
      const response = await axiosInstance.get("/api/partners");

      const filteredPartners = contractType
        ? response.data.partners.filter(
            (partner) => partner.type === contractType
          )
        : response.data.partners;

      setPartners(
        filteredPartners.map((partner) => ({
          value: partner._id,
          label: partner.partnerName,
        }))
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  const selectedContractType = watch("contractType");

  useEffect(() => {
    fetchPartners(selectedContractType);
  }, [selectedContractType]);

  const onSubmit = async (data) => {

    const formDate = {
      ...data,
      projectId: data.projectId.value,
      partnerId: data.partnerId.value,
      consultantId: data.consultantId.value,
    };
    try {
      const response = await axiosInstance.post(`/api/contracts`, formDate);
      if (response.status === 201) {
        toast.success("Data sent successfully!");
        navigate(
          `/${user?.companyName}/contracts/addContract/BOQ/${response.data.data._id}`
        );
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="p-4 bg-gray-50">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 bg-white p-6 rounded-md shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contract Code */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter code"
                {...register("code", {
                  required: "Code is required",
                  maxLength: {
                    value: 10,
                    message: "Code must be at most 10 characters long",
                  },
                })}
                className={`py-[6px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full 
              
                `}
              />
              {errors.code && (
                <p className="text-red-400 text-sm">{errors.code.message}</p>
              )}
            </div>

            {/* Contract Type */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Contract Type <span className="text-red-500">*</span>
              </label>
              <select
                {...register("contractType", {
                  required: "Contract Type is required",
                })}
                className={`py-[8px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full 
              
                `}
              >
                <option value="">choose</option>
                <option value="Owner">Owner</option>
                <option value="Sub-contractor">Sub-Contractor Contract</option>
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
              <Controller
                name="projectId"
                control={control}
                rules={{ required: "Project is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={projects}
                    placeholder="Choose..."
                    className={`w-full 
                   
                    `}
                  />
                )}
              />
              {errors.projectId && (
                <p className="text-red-400 text-sm ">
                  {errors.projectId.message}
                </p>
              )}
            </div>

            {/* Partner */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Partner <span className="text-red-500">*</span>
              </label>
              <Controller
                name="partnerId"
                control={control}
                rules={{ required: "Partner is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={partners}
                    placeholder="Choose..."
                    className={`w-full 
                   
                    `}
                  />
                )}
              />
              {errors.partnerId && (
                <p className="text-red-400 text-sm ">
                  {errors.partnerId.message}
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
                className={`py-[8px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full 
                
                `}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm">
                  {errors.startDate.message}
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
                {...register("endDate", {
                  required: "End date is required.",
                  validate: (value) => {
                    const startDate = new Date(
                      document.querySelector(
                        'input[type="date"][name="startDate"]'
                      ).value
                    );
                    const endDate = new Date(value);
                    if (endDate < startDate) {
                      return "End date must be later than start date.";
                    }
                    return true;
                  },
                })}
                className={`py-[8px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full 
                
                `}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate.message}</p>
              )}
            </div>
            {/* Consultant */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Consultant <span className="text-red-500">*</span>
              </label>
              <Controller
                name="consultantId"
                control={control}
                rules={{ required: "Consultant is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={consultants}
                    placeholder="Choose..."
                    className={`w-full 
                   
                    `}
                  />
                )}
              />
              {errors.consultantId && (
                <p className="text-red-400 text-sm ">
                  {errors.consultantId.message}
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
                className={`py-[8px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full 
               
                `}
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
            {/* Description */}
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required.",
                })}
                className={`py-2 px-4 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full h-24 
                  
                `}
              />
              {errors.description && (
                <p className="text-red-400 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <ButtonLast
              title="Create Contract"
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit(onSubmit)}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default ContractForm;
