import React from "react";
import StatusItem from "./StatusItem";
import { useTranslation } from "react-i18next";

const StatusTimeline = ({ timeline, status }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full grid grid-cols-4 items-start justify-center">
        {timeline.map((timeline, i) => (
          <StatusItem
            key={i}
            number={timeline.number}
            text={timeline.text}
            status={status}
          />
        ))}
      </div>
      <div className="bg-slate-200 w-full p-0.5 rounded-full relative">
        <div
          className="bg-blue-500 top-0 left-0 absolute p-0.5 rounded-full"
          style={{
            width: `${
              (timeline.findIndex((item) => status === item.number) + 1) * 25
            }%`,
          }}
        />
      </div>
    </div>
  );
};

export default StatusTimeline;
