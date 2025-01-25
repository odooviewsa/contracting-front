import { IoAddOutline, IoCloseOutline } from "react-icons/io5";
import Card from "../../../../../../componant/elements/Card";
import TabBody from "./TabBody";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../../../componant/elements/Button";
import { axiosInstance } from "../../../../../../axios/axios";
// import { useQuery } from "@tanstack/react-query";

const QualityControlTab = ({ workItem, workConfirmationId }) => {
  const [isQCPointForm, setIsQCPointForm] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  // const { data: QC_Points, isLoading, isError } = useQuery({
  //   queryKey: ["QC_Points"],
  //   queryFn: async () =>
  //     await axiosInstance.get(
  //       `/api/workConfirmation/workConfirmation/${workConfirmationId}/${workItem?.workItemId._id}/details`
  //     ),
  // });
  const onSubmit = async (data) => {
    await axiosInstance.put(
      `/api/workConfirmation/workConfirmation/${workConfirmationId}/${workItem?.workItemId._id}/details`,
      data
    );
    setIsQCPointForm(false);
  };
  return (
    <TabBody
      title="Quality Control Points"
      button={
        <button
          onClick={() => setIsQCPointForm(true)}
          className="flex items-center gap-2 text-blue-500"
        >
          <IoAddOutline size={24} /> Add QC Point
        </button>
      }
    >
      <div className="flex flex-col gap-4">
        {workItem?.QC_Point?.length > 0 ? (
          workItem?.QC_Point?.map((QC_Point) => (
            <Card
              handleDelete={async () => {
                await axiosInstance.delete(
                  `/api/workConfirmation/workConfirmation/${workConfirmationId}/${workItem?.workItemId._id}/details?qcPointId=${QC_Point._id}`
                );
              }}
              key={QC_Point._id}
              title={QC_Point.title}
              date={QC_Point.date}
              type={QC_Point.passed && "Passed"}
            />
          ))
        ) : (
          <p>No QC Points</p>
        )}
      </div>
      {/* Form */}
      {isQCPointForm && (
        <div className="fixed top-0 left-0 bg-black/60 w-screen h-screen flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white w-1/2 h-fit rounded p-4 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <h3>QC Point</h3>
              <button className="cursor-pointer">
                <IoCloseOutline
                  size={18}
                  onClick={() => setIsQCPointForm(false)}
                />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="title">QC Point</label>
              <input
                type="text"
                id={"title"}
                {...register("title", {
                  required: "QC Point is required",
                })}
                placeholder="Enter your QC Point"
                className="border px-4 py-2"
              />
              {errors.title && (
                <p className="text-red-600 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="flex flex-row gap-2 items-center">
              <input type="checkbox" id={"passed"} {...register("passed")} />
              <label htmlFor="passed">Is Passed?</label>
            </div>
            <Button type="submit">Add</Button>
          </form>
        </div>
      )}
    </TabBody>
  );
};
export default QualityControlTab;
