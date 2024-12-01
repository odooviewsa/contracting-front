import PropTypes from "prop-types";
import { IoCloseOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { axiosInstance, url } from "../../axios/axios";
import { motion } from "framer-motion";

export default function EditPartners({
  refetch,
  openEditPartnerId,
  setOpenEfitPartnerId,
}) {
  const [imgSend, setImgSend] = useState(null);
  const [imgReader, setImgReader] = useState(null);

  function handleChangeImage(e) {
    const file = e.target.files[0];
    setImgSend(file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        setImgReader(e.target.result);
      };
    }
  }

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  console.log(openEditPartnerId);
  async function onSubmit(data) {
    const formDate = new FormData();
    formDate.append("partnerName", data.partnerName);
    formDate.append("type", data.type);
    formDate.append("phone", data.phone);
    formDate.append("email", data.email);
    formDate.append("address", data.address);
    formDate.append("taxNumber", data.taxNumber);
    formDate.append("commercialNumber", data.commercialNumber);
    if (imgSend) {
      formDate.append("image", imgSend);
    }
    await axiosInstance
      .put(`/api/partners/${openEditPartnerId._id}`, formDate)
      .then((result) => {
        if (result?.status === 200) {
          setOpenEfitPartnerId(null);
          toast.success("update partner successfully");
          refetch();
        }
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    if (openEditPartnerId) {
      setValue("partnerName", openEditPartnerId.partnerName);
      setValue("type", openEditPartnerId.type);
      setValue("email", openEditPartnerId.email);
      setValue("phone", openEditPartnerId.phone);
      setValue("address", openEditPartnerId.address);
      setValue("taxNumber", openEditPartnerId.taxNumber);
      setValue("commercialNumber", openEditPartnerId.commercialNumber);
    }
  }, [openEditPartnerId, setValue]);
  return (
    <motion.div
      className=" fixed top-0 left-0  w-full flex justify-center bg-bgOverlay items-center h-full  p-5 z-50"
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      transition={{
        duration: 0.5,
      }}
    >
      <div className="bg-white rounded-lg shadow p-3 md:w-[50%] w-full max-h-[90vh] scrollbar overflow-auto text-textLabalForm">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 ">update Partner</h3>
          <div
            className="p-1 ms-3 rounded-full bg-red-300 text-red-500 cursor-pointer"
            onClick={() => setOpenEfitPartnerId(null)}
          >
            <IoCloseOutline size={20} />
          </div>
        </div>
        <form
          className="flex flex-col gap-4 mt-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-center">
            <label
              htmlFor="camera"
              className="w-20 h-20 cursor-pointer bg-gray-200 rounded-full flex justify-center items-center text-gray-700"
            >
              {imgReader ? (
                <img
                  src={imgReader}
                  alt="partner"
                  className="w-full h-full rounded-full"
                />
              ) : openEditPartnerId?.image ? (
                <img
                  src={`${url}/partnerImages/${openEditPartnerId?.image}`}
                  className="w-full h-full rounded-full"
                />
              ) : (
                <FaCamera size={25} />
              )}
            </label>
            <input
              type="file"
              id="camera"
              hidden
              onChange={handleChangeImage}
            />
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,1fr))] gap-5">
            {[
              { label: "Partner Name", type: "text", name: "partnerName" },
              {
                label: "Type",
                type: "select",
                name: "type",
                option: ["Owner", "Sub-contractor", "Consultant"],
              },
              { label: "Email ", type: "email", name: "email" },
              { label: "Phone Number", type: "number", name: "phone" },
              {
                label: " Address",
                type: "text",
                name: "address",
              },

              {
                label: "Tax Number",
                type: "number",
                name: "taxNumber",
              },
              {
                label: "Commercial number",
                type: "number",
                name: "commercialNumber",
              },
            ].map((input, index) => {
              if (input.type === "select") {
                return (
                  <div className="flex flex-col gap-2 w-full" key={index}>
                    <label htmlFor="">
                      {input.label} <span className="text-red-400">*</span>
                    </label>
                    <select
                      className="bg-bgInput p-2 rounded-md outline-none"
                      {...register(input.name, {
                        required: `${input.name} is required`,
                      })}
                    >
                      <option value="">{input.label}</option>
                      {input.option?.map((e, i) => (
                        <option key={i} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                    <p className="text-red-400 text-[0.8rem] -mb-3">
                      {errors[input.name] && errors[input.name].message}
                    </p>
                  </div>
                );
              } else {
                return (
                  <div className="flex flex-col gap-2" key={index}>
                    <label htmlFor="" className="text-[0.9rem]">
                      {input.label}
                    </label>
                    <input
                      type={input.type}
                      className="bg-bgInput py-1 px-2 rounded-md outline-none"
                      placeholder={`enter ${input.label}`}
                      name={input.name}
                      {...register(input.name, {
                        required: `${input.name} is required`,
                      })}
                    />
                    <p className="text-red-400 text-[0.8rem] -mb-3">
                      {errors[input.name] && errors[input.name].message}
                    </p>
                  </div>
                );
              }
            })}
          </div>

          <button className="text-white bg-primaryColor border text-[0.9rem] border-primaryColor px-12 py-1 rounded-md mt-3">
            {isSubmitting ? "Loading..." : "Update Item"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
EditPartners.propTypes = {
  refetch: PropTypes.func,
  openEditPartnerId: PropTypes.object,
  setOpenEfitPartnerId: PropTypes.func,
};
