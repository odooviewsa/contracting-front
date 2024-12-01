import PropTypes from "prop-types";
import { axiosInstance } from "../../../../../../axios/axios";
import Loading from "../../../../../../componant/Loading";
import { IoCloseOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { ContextBOQ } from "../../../../../../context/BOQContext";
import { toast } from "react-toastify";
export default function ModalUpdateWorkItem({ refetch }) {
  const { openModalUpdateWorkItemId, setOpenModalUpdateWorkItemId } =
    useContext(ContextBOQ);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  async function onSubmit(data) {
    await axiosInstance
      .put(`/api/work/${openModalUpdateWorkItemId._id}`, data)
      .then((result) => {
        if (result?.status === 200) {
          setOpenModalUpdateWorkItemId(null);
          toast.success("update work item successfully");
          refetch();
        }
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    if (openModalUpdateWorkItemId) {
      setValue("workItemName", openModalUpdateWorkItemId.workItemName);
      setValue(
        "unitOfMeasure",
        openModalUpdateWorkItemId.workDetails.unitOfMeasure
      );
      setValue(
        "assignedQuantity",
        openModalUpdateWorkItemId.workDetails.assignedQuantity
      );
      setValue(
        "previousQuantity",
        openModalUpdateWorkItemId.workDetails.previousQuantity
      );
      setValue(
        "remainingQuantity",
        openModalUpdateWorkItemId.workDetails.remainingQuantity
      );
      setValue(
        "financialCategory",
        openModalUpdateWorkItemId.workDetails.financialCategory
      );
      setValue("price", openModalUpdateWorkItemId.workDetails.price);
    }
  }, [openModalUpdateWorkItemId, setValue]);
  return (
    <div className=" fixed top-0 left-0  w-full flex justify-center bg-bgOverlay items-center h-full  p-5 z-50">
      <div className="bg-white rounded-lg shadow p-3 md:w-[70%] w-full max-h-[90vh] scrollbar overflow-auto text-textLabalForm">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 ">update work item</h3>
          <div
            className="p-1 ms-3 rounded-full bg-red-300 text-red-500 cursor-pointer"
            onClick={() => setOpenModalUpdateWorkItemId(null)}
          >
            <IoCloseOutline size={20} />
          </div>
        </div>
        <form
          className="flex flex-col gap-4 mt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* // item name */}
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,1fr))] gap-5">
            {[
              {
                label: "Work statement ",
                type: "text",
                name: "workItemName",
              },
              {
                label: "Unit Of Measure",
                type: "text",
                name: "unitOfMeasure",
              },
              {
                label: "Assigned Quantity",
                type: "number",
                name: "assignedQuantity",
              },
              {
                label: "Previous Quantity",
                type: "number",
                name: "previousQuantity",
              },
              {
                label: "Remaining Quantity",
                type: "number",
                name: "remainingQuantity",
              },
              {
                label: "Financial Category",
                type: "number",
                name: "financialCategory",
              },
              {
                label: "Price",
                type: "number",
                name: "price",
              },
            ].map((input, index) => (
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
            ))}
          </div>
          <div className="flex justify-end mt-5">
            <button className="text-white bg-primaryColor border text-[0.9rem] border-primaryColor px-12 py-1 rounded-md">
              {isSubmitting ? <Loading /> : "Update Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
ModalUpdateWorkItem.propTypes = {
  refetch: PropTypes.func,
};
