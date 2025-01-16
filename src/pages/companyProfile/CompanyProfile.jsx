import { useState } from "react";
import { IoAddOutline, IoImageOutline } from "react-icons/io5";
import Model from "../../componant/layout/Model";
import Input from "../../componant/elements/Input";
import { useForm } from "react-hook-form";
import Button from "../../componant/elements/Button";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosInstance, url } from "../../axios/axios";
import { toast, ToastContainer } from "react-toastify";
import { FaCamera } from "react-icons/fa6";

const CompanyProfile = () => {
  // Language
  const { t } = useTranslation();
  // Get user ID
  const { _id: userId } = useSelector((state) => state.user);
  const [openModel, setOpenModel] = useState(false);
  const [companyProfileData, setCompanyProfileData] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [logo, setLogo] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = async (values) => {
    try {
      let formData = new FormData();
      formData.append("logo", logoFile); // Add the file to FormData
      formData.append("companyName", values.companyName);
      formData.append("companySize", values.companySize);
      formData.append("companyType", values.companyType);
      formData.append("phone", values.phone);
      formData.append("website", values.website);
      formData.append("taxId", values.taxId);
      formData.append("companyId", values.companyId);

      console.log([...formData.entries()]); // Debugging: Check the entire FormData

      const res = await axiosInstance.put(
        `/api/companyProfile/${companyProfileData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res) {
        toast.success("Updated successfully!");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.msg);
        });
      } else {
        toast.error("Something went wrong!");
      }
    }
  };
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        errors.logo = "Image must be less than 5MB";
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        errors.logo = "Please upload a JPG or PNG image";
        return;
      }
      setLogoFile(file);
      // const reader = new FileReader();
      // reader.onload = (e) => setImgReader(e.target.result);
      // reader.readAsDataURL(file);
      errors.logo = "";
    }
  };
  // Fetch Company Data
  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/companyProfile/${userId}/user`
        );
        if (res) {
          setCompanyProfileData(res.data);
          setValue("companyName", res.data.companyName);
          setValue("companySize", res.data.companySize);
          setValue("companyType", res.data.companyType);
          setValue("phone", res.data.phone);
          setValue("website", res.data.website);
          setValue("taxId", res.data.taxId);
          setValue("companyId", res.data.companyId);
          setLogo(`${url}/companyProfileImages/${res.data.logo}`);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCompanyProfile();
  }, [userId, setValue]);
  return (
    <>
      <ToastContainer />
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-4"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <label
                htmlFor="image-upload"
                className="block w-32 h-32 rounded-full bg-slate-100 cursor-pointer group overflow-hidden"
              >
                {logo ? (
                  <img
                    src={logo}
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
          <Model
            onClick={() => setOpenModel(false)}
            isOpen={openModel}
            title="Image Profile"
          >
            <label
              htmlFor="uploadFile1"
              className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-11 mb-2 fill-gray-500"
                viewBox="0 0 32 32"
              >
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000"
                />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000"
                />
              </svg>
              Upload file
              <input
                type="file"
                id="logo"
                className=""
                onChange={(e) => setLogoFile(e.target.files[0])}
              />
              <p className="text-xs font-medium text-gray-400 mt-2">
                PNG, JPG SVG, and WEBP are Allowed.
              </p>
            </label>
          </Model>
          {t("CompanyProfile.form.fields", { returnObjects: true }).map(
            (field, key) => (
              <Input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                label={field.label}
                options={field.options}
                errorMessage={field.errorMessage}
                register={register(field.id, { required: field.required })}
                errors={errors}
                key={key}
              />
            )
          )}
          <Button>Update</Button>
        </form>
      </div>
    </>
  );
};
export default CompanyProfile;
