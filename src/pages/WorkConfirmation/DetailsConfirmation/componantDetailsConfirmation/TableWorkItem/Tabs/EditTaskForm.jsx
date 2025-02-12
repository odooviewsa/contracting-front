import React, { useEffect, useState } from "react";
import Input from "../../../../../../componant/elements/Input";
import Textarea from "../../../../../../componant/elements/Textarea";
import Button from "../../../../../../componant/elements/Button";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../../../axios/axios";
import { useForm } from "react-hook-form";
import Loading from "../../../../../../componant/Loading";

const EditTaskForm = ({
  setActiveEditTaskForm,
  data,
  usersGroup,
  workItemId,
  refetch,
  imageId,
}) => {
  const [formLoading, setFormLoading] = useState(false);
  const formatDate = (isoString) => (isoString ? isoString.split("T")[0] : "");

  // Handle form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      assignee: data?.assignee?._id || "",
      startDate: formatDate(data.startDate) || "",
      endDate: formatDate(data.endDate) || "",
      priority: data?.priority || "",
      status: data?.status || "",
    },
  });
  const onSubmit = async (dataForm) => {
    try {
      setFormLoading(true);
      const res = await axiosInstance.put(
        `/api/work/${workItemId}/details?task=${data.id}&image=${imageId}`,
        {
          task: { ...dataForm, progress: data.progress || 0 },
        }
      );
      if (res.status === 200) {
        setFormLoading(false);
        setActiveEditTaskForm({ active: false });
        toast.success("Task updated successfully");
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="fixed z-50 top-0 left-0 w-screen h-screen flex items-center justify-center md:p-4 bg-black/30">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="w-full md:w-[40rem] 2xl:w-[60rem] h-screen md:h-fit overflow-y-auto scrollbar bg-white md:rounded-lg p-6 flex flex-col gap-6">
        <div>
          <h3 className="text-xl font-medium text-primaryColor">Edit Task</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Name"
            type="text"
            placeholder="Enter Task Name"
            errors={errors}
            errorMessage="Task name is required"
            register={register("name", { required: true })}
          />
          <Textarea
            label="Description"
            type="text"
            placeholder="Enter Task description"
            errors={errors}
            register={register("description")}
          />
          <Input
            label="Assignee"
            type="text"
            options={usersGroup.map((user) => ({
              value: user._id,
              text: `${user.firstName} ${user.secondName}`,
            }))}
            errors={errors}
            errorMessage="Assignee is required"
            register={register("assignee", { required: true })}
          />
          <Input
            label="Start Date"
            type="date"
            placeholder="Enter Task start date"
            errors={errors}
            errorMessage="Start date is required"
            register={register("startDate", { required: true })}
          />
          <Input
            label="End Date"
            type="date"
            placeholder="Enter Task end date"
            errors={errors}
            errorMessage="End date is required"
            register={register("endDate", { required: true })}
          />
          <Input
            label="Priority"
            type="text"
            options={[
              { value: "", text: "Select a priority" },
              { value: "Critical", text: "Critical" },
              { value: "High", text: "High" },
              { value: "Medium", text: "Medium" },
              { value: "Low", text: "Low" },
            ]}
            errors={errors}
            errorMessage="Priority is required"
            register={register("priority", { required: true })}
          />
          <Input
            label="Status"
            type="text"
            options={[
              { value: "", text: "Select a status" },
              { value: "To Do", text: "To Do" },
              { value: "In Progress", text: "In Progress" },
              { value: "Review", text: "Review" },
              { value: "Completed", text: "Completed" },
            ]}
            errors={errors}
            errorMessage="Status is required"
            register={register("status", { required: true })}
          />
        </div>
        <div className="flex items-center gap-4">
          <Button
            className="!bg-gray-100 !text-primaryColor"
            onClick={() => setActiveEditTaskForm(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={formLoading}>
            {formLoading ? <Loading /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
