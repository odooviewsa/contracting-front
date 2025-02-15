import React from "react";

const StatusItem = ({ number, text, status }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className={`${
          status >= number ? "bg-blue-500" : "bg-slate-200"
        } rounded-full size-fit py-4 px-6 text-white font-medium `}>
        {number}
      </div>
      <div className="text-grayColor">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default StatusItem;
