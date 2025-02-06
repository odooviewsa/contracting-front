import React from "react";
import {
  IoCalendarOutline,
  IoCreateOutline,
  IoPersonOutline,
  IoTrashOutline,
} from "react-icons/io5";

const TaskDetails = ({ setActiveEditTaskForm }) => {
  return (
    <div className="flex flex-col gap-2 py-4 border-b">
      {/* Heading Texts */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-grayColor">
            High Rise Building - CNT-2025-001
          </p>
          <h2 className="text-lg font-medium text-primaryColor">
            Foundation Inspection
          </h2>
          <p className="text-sm text-grayColor">Phase: Foundation</p>
        </div>
        <div className="flex gap-2">
          <IoTrashOutline
            size={18}
            className="text-grayColor hover:text-red-500 transition-all cursor-pointer"
          />
          <IoCreateOutline
            size={18}
            className="text-grayColor cursor-pointer"
            onClick={() => setActiveEditTaskForm(true)}
          />
        </div>
      </div>

      {/* Details Options */}
      <div className="flex items-center justify-start gap-4">
        {/* User */}
        <div className="flex gap-1 items-center text-grayColor text-sm">
          <IoPersonOutline size={18} /> John Doe
        </div>
        {/* Due Date */}
        <div className="flex gap-1 items-center text-grayColor text-sm">
          <IoCalendarOutline size={18} /> 2025-2-5
        </div>
        {/* Status */}
        <div className="w-fit p-1 text-yellow-700 bg-yellow-100 rounded-md text-xs font-medium">
          Pending
        </div>
      </div>
      {/* Progress */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium">Progress</h3>
          <p className="text-grayColor">75%</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-sky-500 h-2.5 rounded-full"
            style={{ width: `75%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
