import { useState, useContext } from "react";
import { FaCaretDown, FaCaretUp, FaExpandAlt } from "react-icons/fa";

import { BiReset } from "react-icons/bi";
import save from "../../../../assets/images/save.jpg";
import { ContextBOQ } from "../../../../context/BOQContext";
import IncludeTaxAndDownPayment from "./IncludeTaxAndDownPayment";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../../axios/axios";
import { toast } from "react-toastify";
import FilterColum from "./FilterColum";
import { useTranslation } from "react-i18next";
export default function PartFilterColumAndExpand({ includeTax, DownPayment }) {
  // Language
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const { id } = useParams();
  const { idOnlyOpen, setIdOnlyOpen, allIdMainItemAndSubItemAndWorkItem } =
    useContext(ContextBOQ);
  const handleExpand = () => {
    if (idOnlyOpen?.length > 0) {
      setIdOnlyOpen([]);
    } else {
      setIdOnlyOpen([...allIdMainItemAndSubItemAndWorkItem]);
    }
  };

  const handleSaveClick = () => {
    setShowPopup(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await axiosInstance.post("/api/templates/save", {
        ...formData,
        contractId: id,
      });
      setMessage(
        t("ContractsForms.BOQ.filter.saveTemplateForm.messages.saveSuccess")
      );
      setShowPopup(false);
      setFormData({ name: "", description: "", category: "", tags: [] });
      toast.success(
        t("ContractsForms.BOQ.filter.saveTemplateForm.messages.saveSuccess")
      );
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage(
          t("ContractsForms.BOQ.filter.saveTemplateForm.messages.sameName")
        );
      } else {
        setMessage(
          t("ContractsForms.BOQ.filter.saveTemplateForm.messages.saveFailed")
        );
      }
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center justify-between">
        <div className="flex items-center gap-7 text-[0.9rem] flex-wrap">
          {/* Columns */}
          <FilterColum />
          {/* Expand */}
          <div className="relative">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={handleExpand}
            >
              <FaExpandAlt size={20} />
              <p> {t("ContractsForms.BOQ.filter.expand")}</p>
              {idOnlyOpen?.length > 0 ? (
                <FaCaretDown color="gray" size={20} />
              ) : (
                <FaCaretUp color="gray" size={20} />
              )}
            </div>
          </div>
          {/* Reset */}
          <div className="relative">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setIdOnlyOpen([])}
            >
              <BiReset size={20} />
              <p>{t("ContractsForms.BOQ.filter.reset")}</p>
            </div>
          </div>
        </div>
        <div
          className="flex -ml-4 items-center cursor-pointer text-primaryColor"
          onClick={handleSaveClick}
        >
          <img src={save} alt="save" className="w-12" />
          <p className="-ml-2 text-[0.9rem]">
            {loading ? "Saving..." : "Save as a Template"}
          </p>
        </div>
      </div>
      <IncludeTaxAndDownPayment
        includeTax={includeTax}
        DownPayment={DownPayment}
      />
      {message && <p className="text-red-500 mt-4">{message}</p>}
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-96 ">
            <h3 className="text-lg font-semibold mb-4">
              {t("ContractsForms.BOQ.filter.saveTemplateForm.title")}
            </h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {t("ContractsForms.BOQ.filter.saveTemplateForm.fields.name")}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {t(
                    "ContractsForms.BOQ.filter.saveTemplateForm.fields.description"
                  )}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {t(
                    "ContractsForms.BOQ.filter.saveTemplateForm.fields.category"
                  )}
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {t("ContractsForms.BOQ.filter.saveTemplateForm.fields.tags")}
                </label>
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
                    {t(
                      "ContractsForms.BOQ.filter.saveTemplateForm.fields.tagsButton"
                    )}
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
                  {t(
                    "ContractsForms.BOQ.filter.saveTemplateForm.fields.buttons.cancelButton"
                  )}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {t(
                    "ContractsForms.BOQ.filter.saveTemplateForm.fields.buttons.saveButton"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

PartFilterColumAndExpand.propTypes = {
  includeTax: PropTypes.number,
  DownPayment: PropTypes.number,
};
