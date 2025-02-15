import React, { useState } from "react";
import {
  IoAddOutline,
  IoCalendarClearOutline,
  IoCameraOutline,
  IoCloseOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../../../../../../componant/Button";
import Input from "../../../../../../componant/elements/Input";
import Textarea from "../../../../../../componant/elements/Textarea";
import StatusTimeline from "./QualityControlComponents/statusTimeline";
import AddTaskForm from "./AddTaskForm";
import AddTaskFormQC from "./QualityControlComponents/AddTaskFormQC";
const TaskList = ({ tasks, setActiveAddForm }) => (
  <div className="mt-4">
    <div className="flex justify-between items-center mb-4">
      <h4 className="font-semibold">Related Tasks</h4>
      <button
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
              <h5 className="font-semibold">{task.title}</h5>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
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
          </div>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center">
              <IoPersonOutline className="h-4 w-4 mr-1" />
              {task.assignee}
            </div>
            <div className="flex items-center">
              <IoCalendarClearOutline className="h-4 w-4 mr-1" />
              {task.dueDate}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const formFields = [
  { name: "noteRelation", type: "select" },
  { name: "correction", type: "select" },
  { name: "category", type: "select" },
  { name: "repeated", type: "select" },
  { name: "qualityEngineer", type: "text" },
  { name: "itp", type: "text" },
  { name: "note", type: "textarea", direction: "rtl" },
  { name: "description", type: "textarea", direction: "rtl" },
];
const QualityControlForm = ({
  isLoading,
  setIsLoading,
  setIsQCPointForm,
  workItem,
}) => {
  // Translation
  const { t } = useTranslation();
  const [activeAddForm, setActiveAddForm] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(true);
    let res = await axiosInstance.put(
      `/api/work/${workItem?.workItemId._id}/details`,
      data
    );
    if (res.statusText === "OK") {
      refetch();
      setIsLoading(false);
      setIsQCPointForm(false);
      reset();
    }
  };
  const status = 1;
  return (
    <div className="fixed top-0 left-0 bg-black/60 w-screen h-screen flex items-center justify-center">
      <div className="bg-white w-3/4 h-[90vh] overflow-y-auto scrollbar rounded p-4 flex flex-col gap-4 sm:gap-6">
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
          <div className="flex justify-between *:font-medium">
            <p>
              {t("DetailsWorkLine.line.tabs.quality.form.date")}:{" "}
              <span className="text-grayColor font-normal">15-2-2025</span>
            </p>
            <div className="flex flex-col gap-1">
              <p>
                {t("DetailsWorkLine.line.tabs.quality.form.project")}:{" "}
                <span className="text-grayColor font-normal">test 1</span>
              </p>
              <p>
                {t("DetailsWorkLine.line.tabs.quality.form.contract")}:{" "}
                <span className="text-grayColor font-normal">6</span>
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Fields */}
            <div className="grid grid-cols-2 gap-4">
              {formFields.map((field, index) => (
                <div
                  key={index}
                  className={field.type === "textarea" ? "col-span-2" : ""}>
                  {field.type === "select" ? (
                    <Input
                      label={t(
                        `DetailsWorkLine.line.tabs.quality.form.${field.name}`
                      )}
                      register={register(field.name)}
                      errors={errors}
                      placeholder={t(
                        `DetailsWorkLine.line.tabs.quality.form.placeholders.${field.name}`
                      )}
                      errorMessage={t(
                        `DetailsWorkLine.line.tabs.quality.form.errorMessages.${field.name}`
                      )}
                      name={field.name}
                      className="w-full p-2 border rounded"
                      options={t(
                        `DetailsWorkLine.line.tabs.quality.form.options.${field.name}`,
                        {
                          returnObjects: true,
                        }
                      )}></Input>
                  ) : field.type === "textarea" ? (
                    <Textarea
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
                      register={register(field.name)}
                      errors={errors}
                      rows="4"
                      dir={field.direction || "ltr"}></Textarea>
                  ) : (
                    <Input
                      label={t(
                        `DetailsWorkLine.line.tabs.quality.form.${field.name}`
                      )}
                      type={field.type}
                      register={register(field.name)}
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
              <div className="cursor-pointer border-2 border-dashed rounded-lg p-4 text-center flex items-center justify-center flex-col text-grayColor">
                <IoCameraOutline size={32} />
                <p>{t("DetailsWorkLine.line.tabs.quality.form.attachments")}</p>
              </div>
            </div>
            {/* Tasks List */}
            <TaskList tasks={[]} setActiveAddForm={setActiveAddForm} />
            {activeAddForm && (
              <AddTaskFormQC
                setActiveAddForm={setActiveAddForm}
                workItemId={workItem.workItemId._id}
                usersGroup={workItem.workItemId.userId.usersGroup}
              />
            )}
            <div className="flex justify-between gap-4">
              <Button className="px-4 py-2 rounded flex-1">
                {t("DetailsWorkLine.line.tabs.quality.form.submit")}
              </Button>
              <Button className="!bg-gray-200 !text-gray-700 px-4 py-2 rounded flex-1">
                {t("DetailsWorkLine.line.tabs.quality.form.save")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QualityControlForm;
