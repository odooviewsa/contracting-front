import React from "react";
import Input from "../../../../../../componant/elements/Input";
import Textarea from "../../../../../../componant/elements/Textarea";
import Button from "../../../../../../componant/elements/Button";

const EditTaskForm = ({ setActiveEditTaskForm }) => {
  return (
    <div className="fixed z-50 top-0 left-0 w-screen h-screen flex items-center justify-center p-4 bg-black/30">
      <form
        action=""
        className="w-full md:w-[40rem] 2xl:w-[60rem] bg-white rounded-lg p-6 flex flex-col gap-6">
        <div>
          <h3 className="text-xl font-medium text-primaryColor">Edit Task</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Name"
            type="text"
            placeholder="Enter Task Name"
            errors={[]}
          />
          <Textarea
            label="Description"
            type="text"
            placeholder="Enter Task description"
            errors={[]}
          />
          <Input
            label="Assignee"
            type="text"
            options={[
              { value: "", text: "Select a user", asDefault: true },
              { value: "John Doe", text: "John Doe" },
              { value: "Jane Smith", text: "Jane Smith" },
              { value: "Mark Johnson", text: "Mark Johnson" },
            ]}
            errors={[]}
          />
          <Input
            label="Start Date"
            type="date"
            placeholder="Enter Task start date"
            errors={[]}
          />
          <Input
            label="End Date"
            type="date"
            placeholder="Enter Task end date"
            errors={[]}
          />
          <Input
            label="Status"
            type="text"
            options={[
              { value: "", text: "Select a priority", asDefault: true },
              { value: "critical", text: "Critical" },
              { value: "high", text: "High" },
              { value: "medium", text: "Medium" },
              { value: "low", text: "Low" },
            ]}
            errors={[]}
          />
          <Input
            label="Priority"
            type="text"
            options={[
              { value: "", text: "Select a status", asDefault: true },
              { value: "to-do", text: "To do" },
              { value: "in-progress", text: "In Progress" },
              { value: "review", text: "Review" },
              { value: "completed", text: "Completed" },
            ]}
            errors={[]}
          />
        </div>
        <div className="flex items-center gap-4">
          <Button
            className="!bg-gray-100 !text-primaryColor"
            onClick={() => setActiveEditTaskForm(false)}>
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
