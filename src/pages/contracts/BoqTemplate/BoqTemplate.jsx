import React from "react";
import BoqTemplateTable from "./BoqTemplateTable";
import Header from "../../../componant/layout/Header";

function BoqTemplate() {
  return (
    <div>
      <Header first={"BoqTemplate"} />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 mt-6">
        <div className="flex gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Template..."
            className="border px-3 py-2 rounded-md w-full sm:w-60"
          />
          <div className="flex items-center"></div>
        </div>
      </div>
      <BoqTemplateTable />
    </div>
  );
}

export default BoqTemplate;
