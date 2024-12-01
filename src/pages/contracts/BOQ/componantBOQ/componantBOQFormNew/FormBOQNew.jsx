import { IoCloseOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import Loading from "../../../../../componant/Loading";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
export default function FormBOQNew({ setOpenFormBOQ, refetch }) {
  // get previes main item , sub item

  function getAllPreviousItemNames() {
    return axiosInstance.get(`/api/contracts/user/previous-item-names`);
  }
  const { data } = useQuery({
    queryKey: ["getAllPreviousItemNames"],
    queryFn: getAllPreviousItemNames,
  });

  const optionsMainItem = data?.data?.mainItemNames.map((item) => ({
    value: item,
    label: item,
  }));
  const optionsSubItem = data?.data?.subItemNames?.map((item) => ({
    value: item,
    label: item,
  }));
  const { id } = useParams();
  // add main item new
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  async function onSubmit(data) {
    const formDate = {
      ...data,
      itemName: data.itemName?.value ,
      subItemName: data.subItemName?.value
    };
    await axiosInstance
      .post(`/api/work/boq/${id}`, formDate)
      .then(() => {
        refetch();
        setOpenFormBOQ(false);
        toast.success("Add Item Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className=" fixed top-0 left-0  w-full flex justify-center bg-bgOverlay items-center h-full  p-5 z-50">
      <div className="bg-white rounded-lg shadow p-3 md:w-[70%] w-full max-h-[90vh] scrollbar overflow-auto text-textLabalForm">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 ">+AddItem</h3>
          <div
            className="p-1 ms-3 rounded-full bg-red-300 text-red-500 cursor-pointer"
            onClick={() => setOpenFormBOQ(false)}
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
              { label: "Main Item", type: "text", name: "itemName" },
              { label: "Sub Item", type: "text", name: "subItemName" },
              { label: "Work statement ", type: "text", name: "workItemName" },
              { label: "Unit Of Measure", type: "text", name: "unitOfMeasure" },
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
              { label: "Price", type: "number", name: "price" },
            ].map((input, index) => {
              if (input.name === "itemName") {
                return (
                  <div className="flex flex-col gap-2" key={index}>
                    <label htmlFor="" className="text-[0.9rem]">
                      {input.label}
                    </label>
                    <Controller
                      name={input.name}
                      control={control}
                      rules={{ required: `${input.label} is required` }}
                      render={({ field }) => (
                        <CreatableSelect
                          {...field}
                          options={optionsMainItem}
                          placeholder={`enter ${input.label}`}
                          onChange={(selectedOption) =>
                            field.onChange(selectedOption)
                          }
                        />
                      )}
                    />
                    <p className="text-red-400 text-[0.8rem] -mb-3">
                      {errors[input.name] && errors[input.name].message}
                    </p>
                  </div>
                );
              } else if (input.name === "subItemName") {
                return (
                  <div className="flex flex-col gap-2" key={index}>
                    <label htmlFor="" className="text-[0.9rem]">
                      {input.label}
                    </label>
                    <Controller
                      name={input.name}
                      control={control}
                      rules={{ required: `${input.label} is required` }}
                      render={({ field }) => (
                        <CreatableSelect
                          {...field}
                          options={optionsSubItem}
                          placeholder={`enter ${input.label}`}
                          onChange={(selectedOption) =>
                            field.onChange(selectedOption)
                          }
                        />
                      )}
                    />
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
          <div className="flex justify-end mt-5">
            <button className="text-white bg-primaryColor border text-[0.9rem] border-primaryColor px-12 py-1 rounded-md">
              {isSubmitting ? <Loading /> : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
FormBOQNew.propTypes = {
  setOpenFormBOQ: PropTypes.func,
  refetch: PropTypes.func,
};
