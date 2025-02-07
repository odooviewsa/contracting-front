import React, { useState } from "react";
import Input from "../../../../../../componant/elements/Input";
import Textarea from "../../../../../../componant/elements/Textarea";
import Button from "../../../../../../componant/elements/Button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../../../axios/axios";
import Loading from "../../../../../../componant/Loading";
const AddTaskForm = ({ setActiveAddForm, workItemId, usersGroup, refetch }) => {
  const [formLoading, setFormLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    setFormLoading(true);
    try {
      const res = await axiosInstance.put(`/api/work/${workItemId}/details`, {
        task: { ...data },
      });
      console.log(res);
      if (res.statusText === "OK") {
        setActiveAddForm(false);
        setFormLoading(false);
        toast.success(`Task created successfully`);
        refetch()
      }
    } catch (error) {
      toast.error(error.message);
    }
    setActiveAddForm(false);
  };
  return (
    <div className="fixed z-50 top-0 left-0 w-screen h-screen flex items-center justify-center p-4 bg-black/30">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-[40rem] 2xl:w-[60rem] bg-white rounded-lg p-6 flex flex-col gap-6">
        <div>
          <h3 className="text-xl font-medium text-primaryColor">New Task</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Name"
            id="name"
            type="text"
            placeholder="Enter Task Name"
            errors={errors}
            register={register("name")}
            errorMessage="Please enter a task name."
          />
          <Textarea
            label="Description"
            id="description"
            type="text"
            placeholder="Enter Task description"
            errors={errors}
            register={register("description")}
          />
          <Input
            label="Assignee"
            id="assignee"
            type="text"
            options={usersGroup.map((user) => ({
              value: user._id,
              text: `${user.firstName} ${user.secondName}`,
            }))}
            errors={errors}
            register={register("assignee", { required: true })}
            errorMessage={"Please select a assignee user."}
          />
          <Input
            label="Start Date"
            id="startDate"
            type="date"
            placeholder="Enter Task start date"
            errorMessage={"Start date is required."}
            errors={errors}
            register={register("startDate", { required: true })}
          />
          <Input
            label="End Date"
            id="endDate"
            type="date"
            placeholder="Enter Task end date"
            errorMessage={"End date is required."}
            errors={errors}
            register={register("endDate", { required: true })}
          />
          <Input
            label="Status"
            id="status"
            type="text"
            options={[
              { value: "", text: "Select a status", asDefault: true },
              { value: "To Do", text: "To Do" },
              { value: "In Progress", text: "In Progress" },
              { value: "Review", text: "Review" },
              { value: "Completed", text: "Completed" },
            ]}
            errorMessage={"Please select a status."}
            errors={errors}
            register={register("status", { required: true })}
          />
          <Input
            label="Priority"
            id="priority"
            type="text"
            options={[
              { value: "", text: "Select a priority", asDefault: true },
              { value: "Critical", text: "Critical" },
              { value: "High", text: "High" },
              { value: "Medium", text: "Medium" },
              { value: "Low", text: "Low" },
            ]}
            errorMessage={"Please select a priority."}
            errors={errors}
            register={register("priority", { required: true })}
          />
        </div>
        <div className="flex items-center gap-4">
          <Button
            className="!bg-gray-100 !text-primaryColor"
            onClick={() => setActiveAddForm(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex items-center justify-center"
            disabled={formLoading}>
            {formLoading ? <Loading /> : "Add Task"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
