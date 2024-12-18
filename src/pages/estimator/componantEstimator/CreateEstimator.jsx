import { IoCloseOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { axiosInstance } from "../../../axios/axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
export default function CreateEstimator({ setOpenCreate, refetch }) {
  const [contractsCode, setContractsCode] = useState([]);
  // fetch project
  const fetchProjectNameEstimator = async () => {
    const response = await axiosInstance.get(`/api/projects/names`);
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ["fetchProjectNameEstimator"],
    queryFn: fetchProjectNameEstimator,
    keepPreviousData: true,
  });

  // create Estimator
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  async function onSubmit(data) {
    await axiosInstance
      .post("/api/estimators", data)
      .then((result) => {
        console.log(result);
        if (result?.status === 201) {
          refetch();
          setOpenCreate(false);
          toast.success("Add Estimator Successfully");
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  }
  // contract Code
  const projectName = watch("projectName") || "";
  useEffect(() => {
    async function getAllCodeContracts() {
      const response = await axiosInstance.get(
        `/api/projects/contracts/${projectName}`
      );
      setContractsCode(response?.data?.contracts);
    }
    if (projectName) {
      getAllCodeContracts();
    }
  }, [projectName]);
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
          <h3 className="font-semibold text-gray-900 ">Add Estimator</h3>
          <div
            className="p-1 ms-3 rounded-full bg-red-300 text-red-500 cursor-pointer"
            onClick={() => setOpenCreate(false)}
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
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-[0.9rem]">
                name
              </label>
              <input
                type="text"
                className="bg-bgInput py-1 px-2 rounded-md outline-none"
                placeholder={`enter name`}
                name={"name"}
                {...register("name", {
                  required: `name is required`,
                })}
              />
              <p className="text-red-400 text-[0.8rem] -mb-3">
                {errors["name"] && errors["name"].message}
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="">Project Name</label>
              <select
                className="bg-bgInput p-2 rounded-md outline-none"
                {...register("projectName", {
                  required: `projectName is required`,
                })}
              >
                <option value="">Select Project Name</option>
                {data?.data?.map((e, i) => (
                  <option key={i} value={e?._id}>
                    {e?.projectName}
                  </option>
                ))}
              </select>
              <p className="text-red-400 text-[0.8rem] -mb-3">
                {errors["projectName"] && errors["projectName"].message}
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="">Apply On</label>
              <select
                className="bg-bgInput p-2 rounded-md outline-none"
                {...register("applyOn", {
                  required: `applyOn is required`,
                })}
              >
                <option value=""> Select Apply On</option>

                <option value="Whole BOQ">Whole BOQ</option>
                <option value="BOQ Lines">BOQ Lines</option>
              </select>
              <p className="text-red-400 text-[0.8rem] -mb-3">
                {errors["applyOn"] && errors["applyOn"].message}
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="">Contract</label>
              <select
                className="bg-bgInput p-2 rounded-md outline-none"
                {...register("contract", {
                  required: `contract is required`,
                })}
              >
                <option value=""> Select Apply On</option>
                {contractsCode?.map((e, i) => (
                  <option key={i} value={e?._id}>
                    {e?.code}
                  </option>
                ))}
              </select>
              <p className="text-red-400 text-[0.8rem] -mb-3">
                {errors["contract"] && errors["contract"].message}
              </p>
            </div>
          </div>

          <button className="text-white bg-primaryColor border text-[0.9rem] border-primaryColor px-12 py-1 mt-3 rounded-md">
            {isSubmitting ? "Loading..." : "Add Estimator"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
CreateEstimator.propTypes = {
  setOpenCreate: PropTypes.func,
  refetch: PropTypes.func,
};
