import React, { useState } from "react";
import { FaEllipsisV, FaSyncAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "../../../componant/Loading";
import OptionsBoqTemplate from "./BoqComponents/OptionsBoqTemplate";
import BoqTemplateBlockSureDelete from "./BoqComponents/BoqTemplateBlockSureDelete";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../axios/axios";
import { format } from "date-fns";
import { useSelector } from "react-redux";

// Fetch templates using useQuery
const fetchTemplates = async () => {
  const response = await axiosInstance.get("/api/templates");
  return response.data.data;
};

function BoqTemplateTable() {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(null);
  const [sureDelete, setSureDelete] = useState(false);

  const user = useSelector((state) => state?.user);

  // Use useQuery hook to fetch templates
  const {
    data: templates,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["templates"], // Query key for caching
    queryFn: fetchTemplates, // Function to fetch templates
    retry: 3, // Retry the request 3 times if it fails
    refetchOnWindowFocus: false, // Disable auto-refetch when window is focused
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-60">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-60">
        <p className="text-red-600 font-bold text-2xl">
          {error?.message || "Failed to load templates"}
        </p>
      </div>
    );
  }

  if (!templates || templates.length === 0) {
    return (
      <div className="flex items-center justify-center h-60">
        <p className="text-primaryColor font-bold text-2xl">
          No Templates Found
        </p>
      </div>
    );
  }

  return (
    <div className="scrollbar min-h-[60vh] overflow-x-auto shadow-md">
      <table className="min-w-full bg-white rounded-lg">
        <thead>
          <tr className="bg-primaryColor text-white">
            <th className="p-4">Code</th>
            <th className="p-4">Template Name</th>
            <th className="p-4">Template Description</th>
            <th className="p-4">Create Date</th>
            <th className="p-4">Category</th>
            <th className="p-4">Details</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template, index) => (
            <tr
              key={index}
              className="text-center border-b cursor-pointer"
              onClick={() =>
                navigate(`/${user?.companyName}/boqTemplate/${template._id}`)
              }
            >
              <td className="p-4">{template._id.slice(4, 8) || "#Unknown"}</td>
              <td className="p-4">{template.name}</td>
              <td className="p-4">{template.description}</td>
              <td className="p-4">
                {format(new Date(template.createdAt), "EEEE, dd MMMM yyyy")}
              </td>
              <td className="p-4">{template.category}</td>
              <td className="p-4">
                <div className="relative">
                  {OptionsBoqTemplate && index === showOptions && (
                    <OptionsBoqTemplate
                      setShowOptions={setShowOptions}
                      setSureDelete={setSureDelete}
                    />
                  )}
                  {sureDelete && (
                    <BoqTemplateBlockSureDelete
                      setShowOptions={setShowOptions}
                      setSureDelete={setSureDelete}
                      refreshTemplates={refetch}
                      item={template}
                    />
                  )}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowOptions((prev) => (index === prev ? null : index));
                    }}
                  >
                    <FaEllipsisV className="text-gray-600 hover:text-gray-800" />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BoqTemplateTable;
