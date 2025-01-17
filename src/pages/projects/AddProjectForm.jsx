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
        {options?.map((option, index) => {
          return (<option key={index} value={option.partnerName || option.value || option}>
            {isClient ? option.partnerName : option.text || option}
          </option>)
          }
        )}
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
  const { t } = useTranslation();

  // State to hold selected documents
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectResponse = await axiosInstance.get(
          "/api/projects/groups/names"
        );
        setManagers(projectResponse.data.groups);
        console.log(projectResponse);
        setTeamMembers(
          projectResponse?.data?.groups?.map((group) => ({
            label: group,
            value: group,
          }))
        );
        const clientResponse = await axiosInstance.get("/api/partners");
        console.log(clientResponse.data.partners);
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
      toast.success("Project created successfully!");
      navigate(`/${user?.companyName}/projects/projectdetails/${projectId}`);
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
              {t("AddProjectPage.feilds1", { returnObjects: true }).map(
                (feild, key) =>
                  !feild.type && !feild.multiSelect ? (
                    <InputField
                      key={key}
                      label={feild.label}
                      placeholder={feild.placeholder}
                      name={feild.name}
                      register={register}
                      required={feild.required || false}
                      errorMessage={errors.projectName && feild.errorMessage}
                    />
                  ) : feild.type === "date" ? (
                    <InputField
                      key={key}
                      label={feild.label}
                      placeholder={feild.placeholder}
                      name={feild.name}
                      register={register}
                      required={feild.required || false}
                      errorMessage={errors.projectName && feild.errorMessage}
                      type={feild.type}
                    />
                  ) : feild.type === "select" && !feild.multiSelect ? (
                    <InputField
                      key={key}
                      label={feild.label}
                      placeholder={feild.placeholder}
                      name={feild.name}
                      register={register}
                      required={feild.required || false}
                      errorMessage={errors.projectName && feild.errorMessage}
                      type={feild.type}
                      options={feild.options ? feild.options : managers}
                    />
                  ) : (
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">
                        {feild.label} <span className="text-red-500">*</span>
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
                            borderColor: state.isFocused
                              ? "#06385c"
                              : "#06385c",
                            padding: "2px",
                            "&:hover": {
                              borderColor: "#06385c",
                            },
                          }),
                        }}
                      />
                    </div>
                  )
              )}
              <p
                className="text-primaryColor font-semibold cursor-pointer mb-4"
                onClick={() => setShowRiskAssessment(!showRiskAssessment)}
              >
                {t("AddProjectPage.riskAssessment.text")}
              </p>
              {showRiskAssessment && (
                <div className="pl-4">
                  {t("AddProjectPage.riskAssessment.feilds", {
                    returnObjects: true,
                  }).map((feild, key) =>
                    feild.type === "date" ? (
                      <InputField
                        key={key}
                        label={feild.label}
                        placeholder={feild.placeholder}
                        type={feild.type}
                        name={feild.name}
                        register={register}
                        errorMessage={errors.impact && feild.errorMessage}
                      />
                    ) : (
                      <InputField
                        key={key}
                        label={feild.label}
                        placeholder={feild.placeholder}
                        name={feild.name}
                        register={register}
                        errorMessage={
                          errors.mitigationStrategies && feild.errorMessage
                        }
                      />
                    )
                  )}
                </div>
              )}
              <p
                className="text-primaryColor font-semibold cursor-pointer mt-4 mb-4"
                onClick={() => setShowMilestones(!showMilestones)}
              >
                {t("AddProjectPage.addMilestones.text")}
              </p>
              {showMilestones && (
                <div className="pl-4">
                  {t("AddProjectPage.riskAssessment.feilds", {
                    returnObjects: true,
                  }).map((feild, key) => (
                    <InputField
                      key={key}
                      label={feild.label}
                      placeholder={feild.placeholder}
                      type={feild.type}
                      name={feild.name}
                      register={register}
                      errorMessage={errors.taskStartDate && feild.errorMessage}
                    />
                  ))}
                </div>
              )}
            </div>
            <div>
              {t("AddProjectPage.feilds2", { returnObjects: true }).map(
                (feild, key) =>
                  feild.type ? (
                    feild.type === "select" ? (
                      <InputField
                        label={feild.label}
                        placeholder={feild.placeholder}
                        name={feild.name}
                        register={register}
                        required={feild.required}
                        errorMessage={
                          errors.clientName && feild.errorMessage
                        }
                        type={feild.type}
                        options={clients}
                        isClient={true}
                      />
                    ) : feild.type === "date" ? (
                      <InputField
                        label={feild.label}
                        placeholder={feild.placeholder}
                        type={feild.type}
                        name={feild.name}
                        register={register}
                        required={feild.required}
                        errorMessage={errors.endDate && feild.errorMessage}
                      />
                    ) : feild.type === "number" ? (
                      <InputField
                        label={feild.label}
                        placeholder={feild.placeholder}
                        name={feild.name}
                        register={register}
                        required={feild.required}
                        errorMessage={errors.budget && feild.errorMessage}
                        type={feild.type}
                      />
                    ) : (
                      <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">
                          {feild.label}
                        </label>
                        <input
                          type={feild.type}
                          name={feild.name}
                          multiple
                          onChange={handleDocumentChange}
                          className="w-full px-4 py-2 border rounded-md border-primaryColor focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {/* {errors.document && <p className="text-red-500 text-sm mt-2">Document is required</p>} */}
                      </div>
                    )
                  ) : (
                    <TextAreaField
                      key={key}
                      label={feild.label}
                      placeholder={feild.placeholder}
                      name={feild.name}
                      register={register}
                      errorMessage={errors.description && feild.errorMessage}
                    />
                  )
              )}
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-2 bg-primaryColor text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {t("AddProjectPage.backButton")}
            </button>
            <button
              type="submit"
              className="px-8 py-2 bg-primaryColor text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {t("AddProjectPage.saveButton")}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProjectForm;
