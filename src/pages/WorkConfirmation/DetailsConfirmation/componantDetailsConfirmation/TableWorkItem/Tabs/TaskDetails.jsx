import moment from "moment/moment";
import React, { useState } from "react";
import {
  IoCalendarOutline,
  IoCreateOutline,
  IoPersonOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { axiosInstance } from "../../../../../../axios/axios";
import { toast } from "react-toastify";

const TaskDetails = ({
  setActiveEditTaskForm,
  refetch,
  workItemId,
  name,
  description,
  assignee,
  priority,
  endDate,
  startDate,
  status,
  progress,
  _id,
  disabled,
}) => {
  const [inputProgress, setInputProgress] = useState(progress || 0);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(
        `/api/work/${workItemId}/details?task=${id}`
      );
      if (res.status === 204) {
        toast.success("Task deleted successfully");
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleProgressChange = (e) => {
    setInputProgress(e.target.value);
    setIsUpdating(true);
  };

  const updateProgress = async () => {
    if (!isUpdating) return;
    try {
      await axiosInstance.put(
        `/api/work/${workItemId}/details?task=${_id}&progress=${inputProgress}`
      );
      toast.success("Progress updated successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to update progress");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 py-4 border-b">
      {/* Heading Texts */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-grayColor">{description}</p>
          <h2 className="text-lg font-medium text-primaryColor">{name}</h2>
        </div>
        {!disabled && (
          <div className="flex gap-2">
            <IoTrashOutline
              size={18}
              className="text-grayColor hover:text-red-500 transition-all cursor-pointer"
              onClick={() => handleDelete(_id)}
            />
            <IoCreateOutline
              size={18}
              className="text-grayColor cursor-pointer"
              onClick={() =>
                setActiveEditTaskForm({
                  active: true,
                  data: {
                    name,
                    description,
                    assignee,
                    priority,
                    endDate,
                    startDate,
                    status,
                    id: _id,
                    progress,
                  },
                })
              }
            />
          </div>
        )}
      </div>

      {/* Details Options */}
      <div className="flex flex-wrap items-center justify-start gap-4">
        {/* User */}
        <div className="flex gap-1 items-center text-grayColor text-sm">
          <IoPersonOutline size={18} /> {assignee.firstName}{" "}
          {assignee.secondName}
        </div>
        {/* Due Date */}
        <div className="flex gap-1 items-center text-grayColor text-sm">
          <IoCalendarOutline size={18} />{" "}
          {moment(startDate).format("YYYY-MM-DD")} -{" "}
          {moment(endDate).format("YYYY-MM-DD")}
        </div>
        {/* Status */}
        <p
          className={`w-fit p-1 ${
            status === "Review"
              ? " text-yellow-700 bg-yellow-100"
              : status === "In Progress"
              ? "text-blue-700 bg-blue-100"
              : status === "To Do"
              ? "bg-slate-200 text-slate-700"
              : "bg-green-200 text-green-700"
          } rounded-md text-xs font-medium`}>
          {status}
        </p>
        <p
          className={`w-fit p-1 ${
            priority === "Medium"
              ? " text-yellow-700 bg-yellow-100"
              : priority === "High"
              ? "text-red-700 bg-red-100"
              : priority === "Critical"
              ? "bg-slate-200 text-slate-700"
              : "bg-green-200 text-green-700"
          } rounded-md text-xs font-medium`}>
          {priority}
        </p>
        {disabled && (
          <p className="w-fit p-1 rounded-md text-sm font-medium text-grayColor">
            Progress: {inputProgress}%
          </p>
        )}
      </div>
      {/* Progress */}
      {!disabled && (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium">Progress</h3>
            <p className="text-grayColor">{inputProgress}%</p>
          </div>
          <input
            type="range"
            name="progress"
            id="progress"
            value={inputProgress}
            onChange={handleProgressChange}
            onMouseUp={updateProgress}
            onBlur={updateProgress}
            className=""
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
