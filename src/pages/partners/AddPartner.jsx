import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  IoCloseOutline, 
  IoPersonOutline,
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
  IoBusinessOutline,
  IoDocumentTextOutline,
  IoWarningOutline,
  IoImageOutline
} from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
import { axiosInstance } from "../../axios/axios";

const AddPartner = ({ setOpenPartner, refetch }) => {
  const [imgSend, setImgSend] = useState(null);
  const [imgReader, setImgReader] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB');
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError('Please upload a JPG or PNG image');
        return;
      }
      setImgSend(file);
      const reader = new FileReader();
      reader.onload = (e) => setImgReader(e.target.result);
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const formFields = [
    { 
      label: "Partner Name", 
      name: "partnerName", 
      type: "text",
      placeholder: "Enter partner's full name",
      required: true,
      icon: IoPersonOutline
    },
    {
      label: "Type",
      name: "type",
      type: "select",
      required: true,
      icon: IoBusinessOutline,
      options: [
        { value: "Owner", label: "Owner" },
        { value: "Sub-contractor", label: "Sub-contractor" },
        { value: "Consultant", label: "Consultant" }
      ]
    },
    { 
      label: "Email", 
      name: "email", 
      type: "email",
      placeholder: "partner@company.com",
      required: true,
      icon: IoMailOutline
    },
    { 
      label: "Phone Number", 
      name: "phone", 
      type: "tel",
      placeholder: "+1 (555) 000-0000",
      required: true,
      icon: IoCallOutline
    },
    { 
      label: "Address", 
      name: "address", 
      type: "textarea",
      placeholder: "Enter complete address",
      required: true,
      icon: IoLocationOutline
    },
    { 
      label: "Tax Number", 
      name: "taxNumber", 
      type: "text",
      placeholder: "Enter tax registration number",
      required: true,
      icon: IoDocumentTextOutline
    },
    { 
      label: "Commercial Number", 
      name: "commercialNumber", 
      type: "text",
      placeholder: "Enter commercial registration number",
      required: true,
      icon: IoBusinessOutline
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData();

      formFields.forEach((field) => {
        formData.append(field.name, e.target[field.name].value);
      });

      if (!imgSend) {
        setError('Please upload a partner image');
        setIsSubmitting(false);
        return;
      }
      formData.append('image', imgSend);

      await axiosInstance.post(`/api/partners/create`, formData)
        .then((result) => {
          if (result?.status === 201) {
            refetch?.();
            setOpenPartner(false);
            toast.success("Partner added successfully");
          }
        })
        .catch((error) => {
          setError(error?.response?.data?.message || 'An error occurred.');
        });
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-end">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bg-white rounded-l-lg shadow-lg w-full max-w-lg h-full overflow-auto"
      >
        <div className="sticky top-0 z-10 bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Add New Partner</h2>
            <button
              onClick={() => setOpenPartner(false)}
              className="p-2 rounded-full hover:bg-red-50 text-red-500"
            >
              <IoCloseOutline size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
              <IoWarningOutline size={16} />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <label
                  htmlFor="image-upload"
                  className="block w-32 h-32 rounded-full cursor-pointer group overflow-hidden"
                >
                  {imgReader ? (
                    <img
                      src={imgReader}
                      alt="Partner"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <FaCamera className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100">
                    <IoImageOutline className="w-6 h-6 text-white" />
                  </div>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleChangeImage}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {formFields.map((field) => {
                const Icon = field.icon;
                return (
                  <div 
                    key={field.name} 
                    className={field.type === 'textarea' ? 'md:col-span-2' : ''}
                  >
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>

                    <div className="relative">
                      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                      {field.type === 'select' ? (
                        <select
                          name={field.name}
                          required={field.required}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                          className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          name={field.name}
                          required={field.required}
                          placeholder={field.placeholder}
                          rows={3}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                          className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          required={field.required}
                          placeholder={field.placeholder}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                          className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Add Partner'
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddPartner;
