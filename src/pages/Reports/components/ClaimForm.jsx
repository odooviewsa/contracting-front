import React, { useState } from "react";
import Input from "../../../componant/elements/Input";
import Textarea from "../../../componant/elements/Textarea";
import Button from "../../../componant/elements/Button";
import { IoCloseOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { axiosInstance, url } from "../../../axios/axios";
import Loading from "../../../componant/Loading";
import { toast } from "react-toastify";

const ClaimForm = ({
  setOpenClaimForm,
  className = "",
  contractId,
  refetch,
}) => {
  const [errorForm, setErrorForm] = useState();
  const [loadingForm, setLoadingForm] = useState();
  // Handle Form Submit
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoadingForm(true);
      const res = await axiosInstance.post(
        `${url}/api/contracts/${contractId}/claim`,
        data
      );
      if (res.status === 201) {
        setLoadingForm(false);
        setOpenClaimForm(false);
        toast.success("Claim added successfully!");
        refetch();
      }
    } catch (error) {
      setErrorForm(error.message);
    }
  };
  return (
    <div className="fixed p-8 top-0 left-0 w-screen h-screen bg-black/30 z-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`relative flex flex-col gap-4 w-full sm:w-[18rem] md:w-[24rem] h-fit bg-white rounded-lg p-6 md:p-8 md:pt-12 ${className}`}>
        {/* Close Form */}
        <div className="absolute top-0 left-0 p-3 cursor-pointer">
          <IoCloseOutline size={18} onClick={() => setOpenClaimForm(false)} />
        </div>
        <Textarea
          placeholder="Enter your description..."
          id={"description"}
          errors={errors}
          register={register("description")}
          label="Description"
        />
        <Input
          type="number"
          id="claimValue"
          label="Value"
          placeholder={"Enter a value"}
          errors={errors}
          register={register("claimValue", { required: true })}
          errorMessage={"Value is required"}
        />
        <Textarea
          placeholder="Enter your notes..."
          id={"notes"}
          errors={errors}
          register={register("notes")}
          label="Notes"
        />
        {errorForm && <p className="text-red-500">{errorForm}</p>}
        <Button
          type="submit"
          className="flex items-center justify-center"
          disabled={loadingForm}>
          {loadingForm ? <Loading /> : "Add"}
        </Button>
      </form>
    </div>
  );
};

export default ClaimForm;
