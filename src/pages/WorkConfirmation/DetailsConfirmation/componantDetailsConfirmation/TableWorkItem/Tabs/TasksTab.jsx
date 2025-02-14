import React, { useState } from "react";
import TabBody from "./TabBody";
import Button from "../../../../../../componant/elements/Button";
import {
  IoAddOutline,
  IoCalendarClearOutline,
  IoFunnelOutline,
} from "react-icons/io5";
import TaskDetails from "./TaskDetails";
import AddTaskForm from "./AddTaskForm";
import EditTaskForm from "./EditTaskForm";
import Input from "../../../../../../componant/elements/Input";
import { FaTasks, FaToggleOff, FaToggleOn } from "react-icons/fa";
import Loading from "../../../../../../componant/Loading";
import Tabs from "../../../../../../componant/layout/Tabs";
import { MdOutlineViewKanban } from "react-icons/md";

const TasksTab = ({
  workItem,
  refetch,
  imageId,
  data,
  disabled,
  title,
  button,
  myTask,
  setMyTask,
  loading,
}) => {
  const [activeAddForm, setActiveAddForm] = useState(false);
  const [activeEditTaskForm, setActiveEditTaskForm] = useState(false);
  const [activeFilterOptions, setActiveFilterOptions] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  // Filter tasks based on selected status and priority
  const filteredTasks = !data
    ? workItem?.workItemId.tasks.filter((task) => {
        return (
          (selectedStatus ? task.status === selectedStatus : true) &&
          (selectedPriority ? task.priority === selectedPriority : true) &&
          (imageId ? task.image === imageId : true)
        );
      })
    : data.filter((task) => {
        return (
          (selectedStatus ? task.status === selectedStatus : true) &&
          (selectedPriority ? task.priority === selectedPriority : true) &&
          (imageId ? task.image === imageId : true)
        );
      });
  const tabs = [
    {
      // Tasks
      title: (
        <span className="flex gap-1 items-center">
          <FaTasks size={14} /> Tasks
        </span>
      ),
      content: (
        <div className="flex flex-col pb-16 mb:pb-0">
          {loading ? (
            <div className="flex items-center justify-center py-8 lg:py-12">
              <Loading />
            </div>
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskDetails
                key={task._id}
                setActiveEditTaskForm={setActiveEditTaskForm}
                workItemId={!disabled && workItem.workItemId._id}
                refetch={refetch}
                disabled={disabled}
                {...task}
              />
            ))
          ) : (
            <p className="text-grayColor text-center py-8">No tasks found</p>
          )}
        </div>
      ),
    },
    {
      // Kanban
      title: (
        <span className="flex gap-1 items-center">
          <MdOutlineViewKanban size={18} /> Kanban
        </span>
      ),
      content: "Kanban",
    },
    {
      // Calendar
      title: (
        <span className="flex gap-1 items-center">
          <IoCalendarClearOutline size={18} /> Calendar
        </span>
      ),
      content: "Calendar",
    },
  ];
  return (
    <TabBody
      title={title}
      button={
        <div className="flex flex-col md:flex-row md:items-center justify-center gap-y-3 md:gap-6">
          <button
            onClick={() => setActiveFilterOptions(!activeFilterOptions)}
            className="flex items-center gap-2 text-grayColor">
            <IoFunnelOutline size={18} /> Filter
          </button>
          {disabled ? (
            button
          ) : (
            <Button
              onClick={() => setActiveAddForm(true)}
              className="flex items-center gap-2 text-blue-500 w-fit">
              <IoAddOutline size={18} /> Add Task
            </Button>
          )}
        </div>
      }>
      {/* Filter Options */}
      {activeFilterOptions && (
        <div className="flex items-center justify-start gap-4 py-6 border-b">
          <Input
            type="select"
            options={[
              { value: "", text: "Select a status" },
              { value: "To Do", text: "To Do" },
              { value: "In Progress", text: "In Progress" },
              { value: "Review", text: "Review" },
              { value: "Completed", text: "Completed" },
            ]}
            label="Status:"
            groupClassName="!flex !flex-row items-center gap-1 !w-fit text-base text-grayColor"
            className="!px-2 !py-1 text-primaryColor"
            errors={[]}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          />
          <Input
            type="select"
            options={[
              { value: "", text: "Select a priority" },
              { value: "Critical", text: "Critical" },
              { value: "High", text: "High" },
              { value: "Medium", text: "Medium" },
              { value: "Low", text: "Low" },
            ]}
            label="Priority:"
            groupClassName="!flex !flex-row items-center gap-1 !w-fit text-base text-grayColor"
            className="!px-2 !py-1 w-fit text-primaryColor"
            errors={[]}
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          />
          {disabled && (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setMyTask(!myTask)}>
              {myTask ? (
                <FaToggleOn className="text-blue-500 text-3xl" />
              ) : (
                <FaToggleOff className="text-gray-400 text-3xl" />
              )}
              <span className="text-base text-grayColor">My Tasks</span>
            </div>
          )}
        </div>
      )}

      <Tabs items={tabs} />

      {/* Add Task Form */}
      {activeAddForm && !disabled && (
        <AddTaskForm
          setActiveAddForm={setActiveAddForm}
          workItemId={workItem.workItemId._id}
          usersGroup={workItem.workItemId.userId.usersGroup}
          refetch={refetch}
          imageId={imageId}
        />
      )}

      {/* Task Edit Form */}
      {activeEditTaskForm.active && !disabled && (
        <EditTaskForm
          setActiveEditTaskForm={setActiveEditTaskForm}
          data={activeEditTaskForm.data}
          workItemId={workItem.workItemId._id}
          usersGroup={workItem.workItemId.userId.usersGroup}
          refetch={refetch}
          imageId={imageId}
        />
      )}
    </TabBody>
  );
};

export default TasksTab;
