import React, { useRef, useState } from "react";
import {
  IoAddOutline,
  IoCalendarClearOutline,
  IoCameraOutline,
  IoCloseOutline,
  IoPersonOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../../../../../../componant/elements/Button";
import Input from "../../../../../../componant/elements/Input";
import Textarea from "../../../../../../componant/elements/Textarea";
import StatusTimeline from "./QualityControlComponents/statusTimeline";
import AddTaskFormQC from "./QualityControlComponents/AddTaskFormQC";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../../../axios/axios";
import Loading from "../../../../../../componant/Loading";
import moment from "moment";
const TaskList = ({ tasks, setTasks, setActiveAddForm }) => {
  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    toast.success("Task deleted successfully!");
  };
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold">Related Tasks</h4>
        <button
          type="button"
          className="flex items-center space-x-1 text-blue-500"
          onClick={() => setActiveAddForm(true)}>
          <IoAddOutline className="h-4 w-4" />
          <span>Add Task</span>
        </button>
      </div>
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-semibold">{task.name}</h5>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
              <div className="flex gap-2 items-center">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    task.priority === "high"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                  {task.priority}
                </span>
                <span>
                  <IoTrashOutline
                    onClick={() => handleDelete(index)}
                    size={18}
                    className="text-grayColor hover:text-red-500 cursor-pointer"
                  />
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center">
                <IoPersonOutline className="h-4 w-4 mr-1" />
                {task.assignee.split(",")[0]}
              </div>
              <div className="flex items-center">
                <IoCalendarClearOutline className="h-4 w-4 mr-1" />
                {task.startDate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const QualityControlForm = ({
  setIsQCPointForm,
  workItem,
  contractId,
  projectId,
}) => {
  // Translation
  const { t } = useTranslation();
  const [activeAddForm, setActiveAddForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [qcAsDraft, setQcAsDraft] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [draftLoading, setDraftingLoading] = useState(false);
  const imageInput = useRef(null);
  const formFields = [
    { name: "noteRelation", type: "select", validator: { required: true } },
    { name: "correctionStatus", type: "select", validator: { required: true } },
    { name: "category", type: "select", validator: { required: true } },
    { name: "repeatedIssue", type: "select", validator: { required: true } },
    {
      name: "assignedTo",
      type: "select",
      validator: { required: true },
      options: [
        {
          value: "",
          text: t(
            "DetailsWorkLine.line.tabs.quality.form.placeholders.assignedTo"
          ),
        },
        ...workItem.workItemId.userId.usersGroup.map((item) => ({
          value: item._id,
          text: `${item.firstName} ${item.secondName}`,
        })),
      ],
    },
    {
      name: "qualityEngineer",
      type: "select",
      validator: { required: true },
      options: [
        {
          value: "",
          text: t(
            "DetailsWorkLine.line.tabs.quality.form.placeholders.qualityEngineer"
          ),
        },
        ...workItem.workItemId.userId.usersGroup.map((item) => ({
          value: item._id,
          text: `${item.firstName} ${item.secondName}`,
        })),
      ],
    },
    {
      name: "itp",
      type: "number",
      validator: { required: true },
    },
    {
      name: "note",
      type: "textarea",
      direction: "rtl",
      validator: { required: true },
    },
    {
      name: "description",
      type: "textarea",
      direction: "rtl",
      validator: { required: true },
    },
    {
      name: "managerFeedback",
      type: "textarea",
      direction: "rtl",
    },
  ];
  const status = 1;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (qcAsDraft) {
      setDraftingLoading(true);
    } else {
      setFormLoading(true);
    }
    try {
      const res = await axiosInstance.post(`/api/quality-check/`, {
        attachments: selectedImages,
        tasks,
        contractId: contractId._id,
        projectId: projectId._id,
        workItemId: workItem.workItemId._id,
        ...data,
        isDraft: qcAsDraft,
        status,
      });
      if (res.status === 201) {
        setFormLoading(false);
        setDraftingLoading(false);
        toast.success("Quality Check created successfully");
        setIsQCPointForm(false);
      }
    } catch (error) {
      setFormLoading(false);
      toast.error(error.message);
    }
  };
  const handleImageInput = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prev) => [...prev, ...imageUrls]);
  };
  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };
  return (
    <div className="fixed top-0 left-0 bg-black/60 w-screen h-screen flex items-center justify-center">
      <div className="bg-white sm:w-3/4 h-screen sm:h-[90vh] overflow-y-auto scrollbar rounded p-4 flex flex-col gap-4 sm:gap-6">
        <div className="flex items-center justify-between">
          <button className="cursor-pointer">
            <IoCloseOutline size={18} onClick={() => setIsQCPointForm(false)} />
          </button>
        </div>
        {/* Status Timeline */}
        <StatusTimeline
          timeline={t("DetailsWorkLine.line.tabs.quality.timeline", {
            returnObjects: true,
          })}
          status={status}
        />
        <div className="p-4 border rounded-md space-y-6">
          {/* Details */}
          <h4 className="text-lg font-medium">
            {t("DetailsWorkLine.line.tabs.quality.form.formTitle", {
              quality: "QA-00005",
            })}
          </h4>
          <div className="flex justify-between *:font-medium flex-col md:flex-row">
            <p>
              {t("DetailsWorkLine.line.tabs.quality.form.date")}:{" "}
              <span className="text-grayColor font-normal">
                {moment().format("YYYY-MM-DD")}
              </span>
            </p>
            <div className="flex flex-col gap-1">
              <p>
                {t("DetailsWorkLine.line.tabs.quality.form.project")}:{" "}
                <span className="text-grayColor font-normal">
                  {projectId.projectName}
                </span>
              </p>
              <p>
                {t("DetailsWorkLine.line.tabs.quality.form.contract")}:{" "}
                <span className="text-grayColor font-normal">
                  {contractId.code}
                </span>
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Fields */}
            <div className="grid grid-rows-2 grid-cols-1 md:grid-cols-2 gap-4">
              {formFields.map((field, index) => (
                <div
                  key={index}
                  className={
                    field.type === "textarea"
                      ? "col-span-2"
                      : "col-span-2 md:col-span-1"
                  }>
                  {field.type === "select" ? (
                    <Input
                      id={field.name}
                      label={t(
                        `DetailsWorkLine.line.tabs.quality.form.${field.name}`
                      )}
                      register={register(field.name, field.validator)}
                      errors={errors}
                      placeholder={t(
                        `DetailsWorkLine.line.tabs.quality.form.placeholders.${field.name}`
                      )}
                      errorMessage={t(
                        `DetailsWorkLine.line.tabs.quality.form.errorMessages.${field.name}`
                      )}
                      name={field.name}
                      className="w-full p-2 border rounded"
                      options={
                        field.options
                          ? field.options
                          : t(
                              `DetailsWorkLine.line.tabs.quality.form.options.${field.name}`,
                              {
                                returnObjects: true,
                              }
                            )
                      }></Input>
                  ) : field.type === "textarea" ? (
                    <Textarea
                      id={field.name}
                      label={t(
                        `DetailsWorkLine.line.tabs.quality.form.${field.name}`
                      )}
                      placeholder={t(
                        `DetailsWorkLine.line.tabs.quality.form.placeholders.${field.name}`
                      )}
                      errorMessage={t(
                        `DetailsWorkLine.line.tabs.quality.form.errorMessages.${field.name}`
                      )}
                      className="w-full p-2 border rounded"
                      register={register(field.name, field.validator)}
                      errors={errors}
                      rows="4"
                      dir={field.direction || "ltr"}></Textarea>
                  ) : (
                    <Input
                      id={field.name}
                      label={t(
                        `DetailsWorkLine.line.tabs.quality.form.${field.name}`
                      )}
                      type={field.type}
                      register={register(field.name, field.validator)}
                      errors={errors}
                      placeholder={t(
                        `DetailsWorkLine.line.tabs.quality.form.placeholders.${field.name}`
                      )}
                      errorMessage={t(
                        `DetailsWorkLine.line.tabs.quality.form.errorMessages.${field.name}`
                      )}
                      className="w-full p-2 border rounded"
                      dir={field.direction || "ltr"}
                    />
                  )}
                </div>
              ))}
            </div>
            {/* Attachments */}
            <div>
              <label className="block mb-1">
                {t("DetailsWorkLine.line.tabs.quality.form.attachments")}
              </label>
              <div
                onClick={handleImageInput}
                className="hover:border-blue-500 hover:text-black transition-all cursor-pointer border-2 border-dashed rounded-lg p-4 text-center flex items-center justify-center flex-col text-grayColor">
                <IoCameraOutline size={32} />
                <p>{t("DetailsWorkLine.line.tabs.quality.form.attachments")}</p>
              </div>
              <input
                ref={imageInput}
                type="file"
                multiple
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />

              {selectedImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 mt-4">
                  {selectedImages.map((src, index) => (
                    <div key={index} className="relative">
                      <img
                        src={src}
                        alt="Selected"
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
                        <IoCloseOutline size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Tasks List */}
            <TaskList
              tasks={tasks}
              setTasks={setTasks}
              setActiveAddForm={setActiveAddForm}
            />
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Button
                disabled={formLoading}
                type="submit"
                className="px-4 py-2 rounded flex-1 flex items-center justify-center">
                {formLoading ? (
                  <Loading />
                ) : (
                  t("DetailsWorkLine.line.tabs.quality.form.submit")
                )}
              </Button>
              <Button
                disabled={draftLoading}
                onClick={() => setQcAsDraft(true)}
                type="submit"
                className="!bg-gray-200 !text-gray-700 px-4 py-2 rounded flex-1 flex items-center justify-center">
                {draftLoading ? (
                  <Loading />
                ) : (
                  t("DetailsWorkLine.line.tabs.quality.form.save")
                )}
                {t("DetailsWorkLine.line.tabs.quality.form.save")}
              </Button>
            </div>
          </form>
          {activeAddForm && (
            <AddTaskFormQC
              setTasks={setTasks}
              tasks={tasks}
              setActiveAddForm={setActiveAddForm}
              workItemId={workItem.workItemId._id}
              usersGroup={workItem.workItemId.userId.usersGroup}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QualityControlForm;
