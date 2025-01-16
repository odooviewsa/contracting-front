import { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
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
          <Button>{t("CompanyProfile.buttons.updateButton")}</Button>
        </form>
      </div>
    </>
  );
};
export default CompanyProfile;
