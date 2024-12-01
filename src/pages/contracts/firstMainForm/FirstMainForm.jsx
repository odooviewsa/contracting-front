import { useForm } from "react-hook-form";
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
    setValue,
    trigger,
    watch,
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
      console.log(response.data.partners);

      const filteredPartners = contractType
        ? response.data.partners.filter(
            (partner) => partner.type === contractType
          )
        : response.data.partners;

      console.log(filteredPartners);
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
    try {
      const response = await axiosInstance.post(`/api/contracts`, data);

      if (response.status === 201) {
        toast.success("Data sent successfully!", {
          onClose: () => {
            navigate(
              `/${user?.companyName}/contracts/addContract/BOQ/${response.data.data._id}`
            );
          },
        });
      }
    } catch (error) {
      console.error(
        "Error creating contract:",
        error.response?.data?.message || error.message
      );
    }
  };

  // const fetchPartners = async (contractType) => {
  //   try {
  //     const response = await axiosInstance.get("/api/partners");
  //     console.log(response.data.partners);
  //     const filteredPartners = response.data.partners.filter(
  //       (partner) => partner.type === contractType
  //     );
  //     console.log(filteredPartners);
  //     setPartners(
  //       filteredPartners.map((partner) => ({
  //         value: partner._id,
  //         label: partner.partnerName,
  //       }))
  //     );
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };

  // const selectedContractType = watch("contractType");
  // useEffect(() => {
  //   if (selectedContractType) {
  //     fetchPartners(selectedContractType);
  //     console.log(selectedContractType);
  //   } else {
  //     setPartners([]);
  //   }
  // }, [selectedContractType]);

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
                {...register("code", {
                  required: "Code is required",
                  maxLength: {
                    value: 10,
                    message: "Code must be at most 10 characters long",
                  },
                })}
                className={`py-[5px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full ${
                  errors.code ? "border-red-500" : ""
                }`}
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
                className={`py-[5px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full ${
                  errors.contractType ? "border-red-500" : ""
                }`}
              >
                <option value="">choose</option>
                <option value="Owner">Owner Contract</option>
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

              <Select
                options={projects}
                onChange={(selectedOption) => {
                  setValue("projectId", selectedOption.value);
                }}
                onBlur={() => {
                  register("projectId", { required: "Project is required" });
                  trigger("projectId");
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
                  setValue("partnerId", selectedOption.value);
                  trigger("partnerId");
                }}
                onBlur={() =>
                  register("partnerId", { required: "Partner is required" })
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
                className={`py-[4px] px-2 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full ${
                  errors.endDate ? "border-red-500" : ""
                }`}
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
              <Select
                options={consultants}
                onChange={(selectedOption) => {
                  setValue("consultantId", selectedOption.value);
                  trigger("consultantId");
                }}
                onBlur={() =>
                  register("consultantId", {
                    required: "Consultant is required",
                  })
                }
                placeholder="Choose..."
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
                className={`py-2 px-4 border border-gray-300 outline-none rounded-md focus:border-blue-300 w-full h-24 ${
                  errors.description ? "border-red-500" : ""
                }`}
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
              isLoading={isSubmitting}
              onSubmit={handleSubmit(onSubmit)}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default ContractForm;
