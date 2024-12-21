import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "../../../componant/Loading";
import OptionsBoqTemplate from "./BoqComponents/OptionsBoqTemplate";
import BoqTemplateBlockSureDelete from "./BoqComponents/BoqTemplateBlockSureDelete";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../axios/axios";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// Fetch templates using useQuery
const fetchTemplates = async () => {
  const response = await axiosInstance.get("/api/templates");
  return response.data.data;
};

function BoqTemplateTable() {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(null);
  const [sureDelete, setSureDelete] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState("");
  const [templateId, setTemplateId] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    tags: [],
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.category.trim()) newErrors.category = "Category is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormUpdated = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.put(`/api/templates/${templateId}`, { ...formData });
      toast.success("Template Updated Successfully!");
      setFormData({ name: "", description: "", category: "", tags: [] });
      setShowPopup(false);

      refetch();
    } catch (error) {
      toast.error("Failed to update template. Please try again.");
      console.error(
        "Error updating template:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

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

  const [tagInput, setTagInput] = useState("");

  const handleSaveClick = (id) => {
    setTemplateId(id);
    const selectedTemplate = templates.find((t) => t._id === id);
    if (selectedTemplate) {
      setFormData({
        name: selectedTemplate.name || "",
        description: selectedTemplate.description || "",
        category: selectedTemplate.category || "",
        tags: selectedTemplate.tags || [],
      });
    }
    setShowPopup(true);
  };

  console.log(templates);

  // const handleFormUpdated = async (e) => {
  //   e.preventDefault();
  //   // setLoading(true);
  //   // setMessage("");
  //   try {
  //     const response = await axiosInstance.put(`/api/templates/${templateId}`, {
  //       ...formData,
  //     });

  //     setMessage("Template Updated Successfully!");
  //     setShowPopup(false);
  //     setFormData({ name: "", description: "", category: "", tags: [] });
  //     toast.success("Template Updated Successfully!");
  //   } catch (error) {
  //     // if (error.response && error.response.status === 400) {
  //     //   setMessage("Template with the same name already exists!");
  //     // } else {
  //     console.error("Failed to Updated template:", error);
  //     setMessage("Failed to Updated template. Please try again.");
  //     // }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleTagAdd = () => {
    if (tagInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleTagRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

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
    <>
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
                <td className="p-4">
                  {template._id.slice(4, 8) || "#Unknown"}
                </td>
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
                        handleSaveClick={() => handleSaveClick(template._id)}
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
                        setShowOptions((prev) =>
                          index === prev ? null : index
                        );
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
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-lg font-semibold mb-4">Save as Template</h3>
            <form onSubmit={handleFormUpdated}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="flex-grow border border-gray-300 rounded px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={handleTagAdd}
                    className="bg-blue-500 text-white px-3 py-2 rounded"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(index)}
                        className="text-red-500"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {loading ? "Waiting ..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default BoqTemplateTable;
