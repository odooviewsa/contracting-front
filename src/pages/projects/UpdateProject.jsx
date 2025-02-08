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
import { useTranslation } from "react-i18next";

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
}) => {
  return (
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
          }`}>
          {options?.map((option) => {
            console.log("Current: ", defaultValue);
            console.log("Option: ", option);
            console.log(
              "Status: ",
              option?.partnerName
                ? option.partnerName === defaultValue
                : option === defaultValue
            );
            return (
              <option
                key={option?._id || option}
                value={option?.partnerName || option}>
                {isClient ? option?.partnerName : option}
              </option>
            );
          })}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          defaultValue={
            type === "date" && !defaultValue ? "2023-01-01" : defaultValue
          }
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
};

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
  // Language
  const { t } = useTranslation();
  const renderField = (field, key) => {
    switch (field.type) {
      case "textarea":
        return (
          <TextAreaField
            key={key}
            label={field.label}
            placeholder={field.placeholder}
            name={field.name}
            register={register}
            required={field.required}
            errorMessage={errors?.projectName && field.errorMessage}
          />
        );
      case "select":
        if (field.isMulti) {
          return (
            <div key={key}>
              <label className="block text-gray-700 font-semibold mb-2">
                {field.label} <span className="text-red-500">*</span>
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
          );
        }
        return (
          <InputField
            key={key}
            label={field.label}
            placeholder={field.placeholder}
            name={field.name}
            register={register}
            required={field.required}
            errorMessage={errors?.projectName && field.errorMessage}
            type="select"
            options={managers}
            defaultValue={projectData[field.name]}
          />
        );
      default:
        return (
          <InputField
            key={key}
            label={field.label}
            placeholder={field.placeholder}
            name={field.name}
            register={register}
            required={field.required}
            errorMessage={errors?.projectName && field.errorMessage}
            type={field.type || "text"}
            defaultValue={projectData[field.name] || "2023-10-10"}
          />
        );
    }
  };
  console.log("function: ", selectedTeamMembers);
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
        if (project?.teamMember) {
          setSelectedTeamMembers(
            project?.teamMember?.map((name) => ({
              label: name,
              value: name,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id]);

  const onSubmit = async (data) => {
    console.log(data);

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
      {projectData && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4">
            <Header first={"project"} second={"update project"} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <InputField
                  label={t("EditProjectPage.fields.projectName")}
                  placeholder={t("EditProjectPage.fields.enterProjectName")}
                  name="projectName"
                  register={register}
                  required={true}
                  errorMessage={
                    errors?.projectName &&
                    t("requiredField", {
                      field: t("EditProjectPage.fields.projectName"),
                    })
                  }
                />
                <InputField
                  label={t("EditProjectPage.fields.startDate")}
                  placeholder={t("EditProjectPage.fields.enterStartDate")}
                  type="date"
                  name="startDate"
                  register={register}
                  required={true}
                  errorMessage={
                    errors?.startDate &&
                    t("requiredField", {
                      field: t("EditProjectPage.fields.startDate"),
                    })
                  }
                />
                <InputField
                  label={t("EditProjectPage.fields.projectLocation")}
                  placeholder={t("EditProjectPage.fields.select")}
                  name="projectLocation"
                  register={register}
                  required={true}
                  errorMessage={
                    errors?.projectLocation &&
                    t("requiredField", {
                      field: t("EditProjectPage.fields.projectLocation"),
                    })
                  }
                />
                <InputField
                  label={t("EditProjectPage.fields.projectManager")}
                  placeholder={t("EditProjectPage.fields.selectProjectManager")}
                  name="projectManager"
                  register={register}
                  required={true}
                  errorMessage={
                    errors?.projectManager &&
                    t("requiredField", {
                      field: t("EditProjectPage.fields.projectManager"),
                    })
                  }
                  type="select"
                  options={managers}
                  defaultValue={projectData?.projectManager}
                />
                <InputField
                  label={t("EditProjectPage.fields.status")}
                  placeholder={t("EditProjectPage.fields.selectStatus")}
                  name="status"
                  register={register}
                  required={true}
                  errorMessage={
                    errors?.status &&
                    t("requiredField", {
                      field: t("EditProjectPage.fields.status"),
                    })
                  }
                  type="select"
                  options={["Completed", "Planning", "in Progress"]}
                />
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {t("EditProjectPage.fields.teamMembers")}{" "}
                    <span className="text-red-500">*</span>
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
                  label={t("EditProjectPage.fields.scopeOfWork")}
                  placeholder={t("EditProjectPage.fields.enterDetails")}
                  name="scopeOfWork"
                  register={register}
                  required={true}
                  errorMessage={
                    errors?.scopeOfWork &&
                    t("requiredField", {
                      field: t("EditProjectPage.fields.scopeOfWork"),
                    })
                  }
                />
              </div>

              <div>
                <InputField
                  label={t("EditProjectPage.fields.clientName")}
                  placeholder={t("EditProjectPage.fields.selectClient")}
                  name="clientName"
                  register={register}
                  required={true}
                  errorMessage={
                    errors?.clientName &&
                    t("requiredField", {
                      field: t("EditProjectPage.fields.clientName"),
                    })
                  }
                  type="select"
                  options={clients}
                  defaultValue={projectData.clientName}
                  isClient={true}
                />
                <InputField
                  label={t("EditProjectPage.fields.endDate")}
                  placeholder={t("EditProjectPage.fields.enterEndDate")}
                  type="date"
                  name="endDate"
                  register={register}
                  required={true}
                  errorMessage={
                    errors?.endDate &&
                    t("requiredField", {
                      field: t("EditProjectPage.fields.endDate"),
                    })
                  }
                />
                <InputField
                  label={t("EditProjectPage.fields.budget")}
                  placeholder={t("EditProjectPage.fields.enterBudget")}
                  name="budget"
                  register={register}
                  required={true}
                  errorMessage={
                    errors?.budget &&
                    t("requiredField", {
                      field: t("EditProjectPage.fields.budget"),
                    })
                  }
                />
                <TextAreaField
                  label={t("EditProjectPage.fields.description")}
                  placeholder={t("EditProjectPage.fields.enterDescription")}
                  name="description"
                  register={register}
                  errorMessage={
                    errors?.description &&
                    t("requiredField", {
                      field: t("EditProjectPage.fields.description"),
                    })
                  }
                />
                <div>
                  <label className="block text-primaryColor font-semibold mb-2">
                    {t("EditProjectPage.fields.documents")}
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
                className="bg-green-600 text-white py-2 px-6 rounded-md">
                {t("EditProjectPage.updateButton")}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default UpdateProjectForm;
