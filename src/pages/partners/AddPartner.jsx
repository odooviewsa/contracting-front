import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { axiosInstance } from "../../axios/axios";
import { IoCloseOutline } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AddPartner({ setOpenPartner, refetch }) {
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
    formState: { errors, isSubmitting },
  } = useForm();
  async function onSubmit(data) {
    const formDate = new FormData();
    formDate.append("partnerName", data.partnerName);
    formDate.append("type", data.type);
    formDate.append("phone", data.phone);
    formDate.append("email", data.email);
    formDate.append("address", data.address);
    formDate.append("taxNumber", data.taxNumber);
    formDate.append("commercialNumber", data.commercialNumber);
    formDate.append("image", imgSend);

    await axiosInstance
      .post(`/api/partners/create`, formDate)
      .then((result) => {
        console.log(result);
        if (result?.status === 201) {
          refetch();
          setOpenPartner(false);
          toast.success("Add Partner Successfully");
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  }
  return (
    <motion.div
      className=" fixed top-0 left-0  w-full flex justify-center bg-bgOverlay items-center h-full  p-5 z-50"
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      transition={{
        duration: 0.5,
      }}
    >
      <div className="bg-white rounded-lg shadow p-3 md:w-[40%] w-full max-h-[90vh] scrollbar overflow-auto text-textLabalForm">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 ">Add Partner</h3>
          <div
            className="p-1 ms-3 rounded-full bg-red-300 text-red-500 cursor-pointer"
            onClick={() => setOpenPartner(false)}
          >
            <IoCloseOutline size={20} />
          </div>
        </div>
        <form
          className="flex flex-col gap-4 mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* // item name */}
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,1fr))] gap-5">
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

          <button className="text-white bg-primaryColor border text-[0.9rem] border-primaryColor px-12 py-1 mt-3 rounded-md">
            {isSubmitting ? "Loading..." : "Add Partner"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
AddPartner.propTypes = {
  setOpenPartner: PropTypes.func,
  refetch: PropTypes.func,
};
