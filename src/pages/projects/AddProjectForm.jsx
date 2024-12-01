import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Header from "../../componant/layout/Header";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const animatedComponents = makeAnimated();

const InputField = ({
  label,
  placeholder,
  name,
  type = "text",
  register,
  required,
  errorMessage,
  options,
  isClient,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-semibold mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === "select" ? (
      <select
        name={name}
        {...register(name, { required })}
        className={`w-full px-4 py-2 border rounded-md border-primaryColor focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errorMessage ? "border-red-500" : ""
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.partnerName || option}>
            {isClient ? option.partnerName : option}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        {...register(name, { required })}
        className={`w-full px-4 py-2 border rounded-md border-primaryColor focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black ${
          errorMessage ? "border-red-500" : ""
        }`}
        onFocus={(e) => {
          if (type === "date") {
            e.target.max = new Date(3000, 0, 1).toISOString().split("T")[0];
          }
        }}
      />
    )}
    {errorMessage && (
      <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
    )}
  </div>
);

InputField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(["text", "date", "select"]),
  register: PropTypes.func,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  options: PropTypes.array,
  isClient: PropTypes.bool,
};

const TextAreaField = ({
  label,
  placeholder,
  name,
  register,
  required,
  errorMessage,
}) => (
  <div className="mb-4">
    <label className="block text-primaryColor font-semibold mb-2 mt-6">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      placeholder={placeholder}
      name={name}
      {...register(name, { required: required })}
      className={`w-full px-4 py-2 border rounded-md border-primaryColor focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black ${
        errorMessage ? "border-red-500" : ""
      }`}
      rows="3"
    />
    {errorMessage && (
      <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
    )}
  </div>
);

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
};

const AddProjectForm = () => {
  const [managers, setManagers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [clients, setClients] = useState([]);
  const [showRiskAssessment, setShowRiskAssessment] = useState(false);
  const [showMilestones, setShowMilestones] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);

  // State to hold selected documents
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectResponse = await axiosInstance.get("/api/projects/names");
        setManagers(projectResponse.data.groups);
        console.log(projectResponse.data);
        setTeamMembers(
          projectResponse.data.groups.map((group) => ({
            label: group,
            value: group,
          }))
        );
        const clientResponse = await axiosInstance.get("/api/partners");
        setClients(clientResponse.data.partners);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    const formDataToSend = new FormData();
    for (let key in data) {
      formDataToSend.append(key, data[key]);
    }
    const teamValues = selectedTeamMembers.map((member) => member.value);

    console.log(teamValues);
    formDataToSend.append("teamMember", teamValues);

    // Append each selected document to formData
    selectedDocuments.forEach((file) => {
      formDataToSend.append("documents", file);
    });

    try {
      const response = await axiosInstance.post(
        "/api/projects/create",
        formDataToSend
      );
      const projectId = response.data.data._id;
      console.log(response.data.data._id);
      // Show toast and navigate after it closes
      toast.success("Project created successfully!", {
        onClose: () =>
          navigate(
            `/${user?.companyName}/projects/projectdetails/${projectId}`
          ),
      });
    } catch (error) {
      console.error(error);
      toast.error("Error creating project");
    }
  };

  const handleDocumentChange = (e) => {
    setSelectedDocuments(Array.from(e.target.files));
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4">
          <Header first={"Project"} second={"Add project"} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <InputField
                label="Project name"
                placeholder="Enter project name"
                name="projectName"
                register={register}
                required={true}
                errorMessage={errors.projectName && "Project Name is required"}
              />
              <InputField
                label="Start Date"
                placeholder="10/10/2023"
                type="date"
                name="startDate"
                register={register}
                required={true}
                errorMessage={errors.startDate && "Start Date is required"}
              />
              <InputField
                label="Project Location"
                placeholder="Select"
                name="projectLocation"
                register={register}
                required={true}
                errorMessage={
                  errors.projectLocation && "Project Location is required"
                }
              />
              <InputField
                label="Project Manager"
                placeholder="Select Project Manager"
                name="projectManger"
                register={register}
                required={true}
                errorMessage={
                  errors.projectManager && "Project Manager is required"
                }
                type="select"
                options={managers}
              />
              <InputField
                label="Status"
                placeholder="Select Status"
                name="status"
                register={register}
                required={true}
                errorMessage={errors.status && "Status is required"}
                type="select"
                options={["Completed", "Planning", "in Progress"]}
              />
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Team Members <span className="text-red-500">*</span>
                </label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={teamMembers}
                  onChange={(e) => setSelectedTeamMembers(e)}
                  className="border-primaryColor"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused ? "#06385c" : "#06385c",
                      padding: "2px",
                      "&:hover": {
                        borderColor: "#06385c",
                      },
                    }),
                  }}
                />
              </div>
              <TextAreaField
                label="Scope Of Work"
                placeholder="Enter details"
                name="scopeOfWork"
                register={register}
                required={true}
                errorMessage={errors.scopeOfWork && "Scope of Work is required"}
              />
              <p
                className="text-primaryColor font-semibold cursor-pointer mb-4"
                onClick={() => setShowRiskAssessment(!showRiskAssessment)}
              >
                + Add Risk Assessment
              </p>
              {showRiskAssessment && (
                <div className="pl-4">
                  <InputField
                    label="Mitigation Strategies"
                    placeholder="Enter Mitigation Strategies"
                    name="mitigationStrategies"
                    register={register}
                    errorMessage={
                      errors.mitigationStrategies &&
                      "Mitigation Strategies are required"
                    }
                  />
                  <InputField
                    label="Impact"
                    placeholder="Enter impact"
                    type="date"
                    name="impact"
                    register={register}
                    errorMessage={errors.impact && "Impact is required"}
                  />
                  <InputField
                    label="Potential"
                    placeholder="Enter potential"
                    type="date"
                    name="potential"
                    register={register}
                    errorMessage={errors.potential && "Potential is required"}
                  />
                </div>
              )}
              <p
                className="text-primaryColor font-semibold cursor-pointer mt-4 mb-4"
                onClick={() => setShowMilestones(!showMilestones)}
              >
                + Add Milestones
              </p>
              {showMilestones && (
                <div className="pl-4">
                  <InputField
                    label="Start Date"
                    placeholder="Start Date"
                    type="date"
                    name="taskStartDate"
                    register={register}
                    errorMessage={
                      errors.taskStartDate && "Task Start Date is required"
                    }
                  />
                  <InputField
                    label="End Date"
                    placeholder="End Date"
                    type="date"
                    name="taskEndDate"
                    register={register}
                    errorMessage={
                      errors.taskEndDate && "Task End Date is required"
                    }
                  />
                </div>
              )}
            </div>
            <div>
              <InputField
                label="Client Name"
                placeholder="Select Client"
                name="clientName"
                register={register}
                required={true}
                errorMessage={errors.clientName && "Client Name is required"}
                type="select"
                options={clients}
                isClient={true}
              />
              <InputField
                label="End Date"
                placeholder="25/12/2023"
                type="date"
                name="endDate"
                register={register}
                required={true}
                errorMessage={errors.endDate && "End Date is required"}
              />
              <InputField
                label="Budget"
                placeholder="Enter budget"
                name="budget"
                register={register}
                required={true}
                errorMessage={errors.budget && "Budget is required"}
                type="number"
              />
              <TextAreaField
                label="Description"
                placeholder="Enter description"
                name="description"
                register={register}
                errorMessage={errors.description && "Description is required"}
              />
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Upload Document
                </label>
                <input
                  type="file"
                  name="documents"
                  multiple
                  onChange={handleDocumentChange}
                  className="w-full px-4 py-2 border rounded-md border-primaryColor focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* {errors.document && <p className="text-red-500 text-sm mt-2">Document is required</p>} */}
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-2 bg-primaryColor text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-8 py-2 bg-primaryColor text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProjectForm;
