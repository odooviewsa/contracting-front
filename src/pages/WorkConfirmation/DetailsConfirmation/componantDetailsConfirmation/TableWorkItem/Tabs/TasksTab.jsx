import React, { useState } from "react";
import TabBody from "./TabBody";
import Button from "../../../../../../componant/elements/Button";
import { IoAddOutline, IoFunnelOutline } from "react-icons/io5";
import TaskDetails from "./TaskDetails";
import AddTaskForm from "./AddTaskForm";
import EditTaskForm from "./EditTaskForm";
import Input from "../../../../../../componant/elements/Input";

const TasksTab = ({ workItem, refetch }) => {
  const [activeAddForm, setActiveAddForm] = useState(false);
  const [activeEditTaskForm, setActiveEditTaskForm] = useState(false);
  const [activeFilterOptions, setActiveFilterOptions] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  // Filter tasks based on selected status and priority
  const filteredTasks = workItem.workItemId.tasks.filter((task) => {
    return (
      (selectedStatus ? task.status === selectedStatus : true) &&
      (selectedPriority ? task.priority === selectedPriority : true)
    );
  });

  return (
    <TabBody
      title={"Project Tasks"}
      button={
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => setActiveFilterOptions(!activeFilterOptions)}
            className="flex items-center gap-2 text-grayColor">
            <IoFunnelOutline size={18} /> Filter
          </button>
          <Button
            onClick={() => setActiveAddForm(true)}
            className="flex items-center gap-2 text-blue-500">
            <IoAddOutline size={18} /> Add Task
          </Button>
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
            groupClassName="!flex !flex-row items-center gap-1 !w-fit"
            className="!px-2 !py-1"
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
            groupClassName="!flex !flex-row items-center gap-1 !w-fit"
            className="!px-2 !py-1 w-fit"
            errors={[]}
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          />
        </div>
      )}

      {/* Task List */}
      <div className="flex flex-col">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskDetails
              key={task._id}
              setActiveEditTaskForm={setActiveEditTaskForm}
              workItemId={workItem.workItemId._id}
              refetch={refetch}
              {...task}
            />
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>

      {/* Add Task Form */}
      {activeAddForm && (
        <AddTaskForm
          setActiveAddForm={setActiveAddForm}
          workItemId={workItem.workItemId._id}
          usersGroup={workItem.workItemId.userId.usersGroup}
          refetch={refetch}
        />
      )}

      {/* Task Edit Form */}
      {activeEditTaskForm.active && (
        <EditTaskForm
          setActiveEditTaskForm={setActiveEditTaskForm}
          data={activeEditTaskForm.data}
          workItemId={workItem.workItemId._id}
          usersGroup={workItem.workItemId.userId.usersGroup}
          refetch={refetch}
        />
      )}
    </TabBody>
  );
};

export default TasksTab;
