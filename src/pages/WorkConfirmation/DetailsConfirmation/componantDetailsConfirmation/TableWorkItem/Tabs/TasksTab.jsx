import React, { useState } from "react";
import TabBody from "./TabBody";
import Button from "../../../../../../componant/elements/Button";
import { IoAddOutline, IoFunnelOutline } from "react-icons/io5";
import TaskDetails from "./TaskDetails";
import AddTaskForm from "./AddTaskForm";
import EditTaskForm from "./EditTaskForm";
import Input from "../../../../../../componant/elements/Input";
const TasksTab = () => {
  const [activeAddForm, setActiveAddForm] = useState(false);
  const [activeEditTaskForm, setActiveEditTaskForm] = useState(false);
  const [activeFilterOptions, setActiveFilterOptions] = useState(false);
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
            options={[{ value: "all", text: "All", asDefault: true }]}
            label="Status:"
            groupClassName="!flex !flex-row items-center gap-1"
            className="!px-2 !py-1"
            errors={[]}
          />
          <Input
            type="select"
            options={[{ value: "all", text: "All", asDefault: true }]}
            label="Priority:"
            groupClassName="!flex !flex-row items-center gap-1"
            className="!px-2 !py-1"
            errors={[]}
          />
          <Input
            type="select"
            options={[{ value: "all", text: "All", asDefault: true }]}
            label="Phase:"
            groupClassName="!flex !flex-row items-center gap-1"
            className="!px-2 !py-1"
            errors={[]}
          />
        </div>
      )}

      {/* Task List */}
      <div className="flex flex-col">
        <TaskDetails setActiveEditTaskForm={setActiveEditTaskForm} />
      </div>
      {/* Add Task Form */}
      {activeAddForm && <AddTaskForm setActiveAddForm={setActiveAddForm} />}
      {/* Task Edit Form */}
      {activeEditTaskForm && (
        <EditTaskForm setActiveEditTaskForm={setActiveEditTaskForm} />
      )}
    </TabBody>
  );
};

export default TasksTab;
