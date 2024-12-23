import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
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
  defaultValue,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-semibold mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === "select" ? (
      <select
        name={name}
        defaultValue={defaultValue}
        {...register(name, { required })}
        className={`w-full px-4 py-2 border rounded-md border-primaryColor focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errorMessage ? "border-red-500" : ""
        }`}
      >
        {options?.map((option) => (
          <option
            key={option?._id || option}
            value={option?.partnerName || option}
          >
            {isClient ? option?.partnerName : option}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        {...register(name, { required })}
        className={`w-full px-4 py-2 border rounded-md border-primaryColor focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errorMessage ? "border-red-500" : ""
        }`}
      />
    )}
    {errorMessage && (
      <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
    )}
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  options: PropTypes.array,
  isClient: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
    <label className="block text-primaryColor font-semibold mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      placeholder={placeholder}
      name={name}
      {...register(name, { required: required })}
      className={`w-full px-4 py-2 border rounded-md border-primaryColor focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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

const UpdateProjectForm = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState({});
  const [managers, setManagers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);

  useEffect(() => {
    // Fetch other necessary data
    async function getManagers() {
      const namesResponse = await axiosInstance.get(
        "/api/projects/groups/names"
      );

      setManagers(namesResponse?.data?.groups);
      setTeamMembers(
        namesResponse?.data?.groups?.map((group) => ({
          label: group,
          value: group,
        }))
      );
    }
    getManagers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch project data
        const projectResponse = await axiosInstance.get(`/api/projects/${id}`);
        const project = projectResponse?.data?.project;
        setProjectData(project);
        setSelectedTeamMembers(
          projectData?.teamMember?.map((name) => ({
            label: name,
            value: name,
          }))
        );

        // Set form values with existing project data
        setValue("projectName", project?.projectName);
        const formattedStartDate = new Date(project?.startDate)
          .toISOString()
          .split("T")[0];
        setValue("startDate", formattedStartDate);
        setValue("projectLocation", project?.projectLocation);
        setValue("projectManger", project?.projectManger);
        setValue("status", project?.status);
        setValue("scopeOfWork", project?.scopeOfWork);
        setValue("clientName", project?.clientName);
        const formattedEndDate = new Date(project?.endDate)
          .toISOString()
          .split("T")[0];
        setValue("endDate", formattedEndDate);
        setValue("budget", project?.budget);
        setValue("description", project?.description);

        const clientsResponse = await axiosInstance.get("/api/partners");

        setClients(clientsResponse?.data?.partners);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id]);

  const onSubmit = async (data) => {
    const formDataToSend = new FormData();
    for (let key in data) {
      formDataToSend.append(key, data[key]);
    }
    const teamValues = selectedTeamMembers?.map((member) => member.value);
    formDataToSend.append("teamMember", teamValues);

    selectedDocuments?.forEach((file) => {
      formDataToSend.append("documents", file);
    });

    try {
      await axiosInstance.put(`/api/projects/${id}`, formDataToSend);
      toast.success("Project updated successfully!");
      navigate(`/${user?.companyName}/projects`);
    } catch (error) {
      toast.error(error.message);
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
          <Header first={"project"} second={"update project"} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <InputField
                label="Project name"
                placeholder="Enter project name"
                name="projectName"
                register={register}
                required={true}
                errorMessage={errors?.projectName && "Project Name is required"}
              />
              <InputField
                label="Start Date"
                placeholder="10/10/2023"
                type="date"
                name="startDate"
                register={register}
                required={true}
                errorMessage={errors?.startDate && "Start Date is required"}
              />
              <InputField
                label="Project Location"
                placeholder="Select"
                name="projectLocation"
                register={register}
                required={true}
                errorMessage={
                  errors?.projectLocation && "Project Location is required"
                }
              />
              <InputField
                label="Project Manager"
                placeholder="Select Project Manager"
                name="projectManger"
                register={register}
                required={true}
                errorMessage={
                  errors?.projectManager && "Project Manager is required"
                }
                type="select"
                options={managers}
                defaultValue={projectData?.projectManger}
              />
              <InputField
                label="Status"
                placeholder="Select Status"
                name="status"
                register={register}
                required={true}
                errorMessage={errors?.status && "Status is required"}
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
                  value={selectedTeamMembers}
                />
              </div>
              <TextAreaField
                label="Scope Of Work"
                placeholder="Enter details"
                name="scopeOfWork"
                register={register}
                required={true}
                errorMessage={
                  errors?.scopeOfWork && "Scope of Work is required"
                }
              />
            </div>
            <div>
              <InputField
                label="Client Name"
                placeholder="Select Client"
                name="clientName"
                register={register}
                required={true}
                errorMessage={errors?.clientName && "Client Name is required"}
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
                errorMessage={errors?.endDate && "End Date is required"}
              />
              <InputField
                label="Budget"
                placeholder="Enter budget"
                name="budget"
                register={register}
                required={true}
                errorMessage={errors?.budget && "Budget is required"}
              />
              <TextAreaField
                label="Description"
                placeholder="Enter project description"
                name="description"
                register={register}
                errorMessage={errors?.description && "Description is required"}
              />
              <div>
                <label className="block text-primaryColor font-semibold mb-2">
                  Documents
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  multiple
                  className="w-full px-4 py-2 border rounded-md border-primaryColor"
                  onChange={handleDocumentChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded-md"
            >
              Update Project
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateProjectForm;
