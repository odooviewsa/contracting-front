import { toast, ToastContainer } from "react-toastify";
import { axiosInstance } from "../../axios/axios";
import { useForm } from "react-hook-form";

const EditUsersTanet = ({ userData, className = "" }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: userData, // Pre-fill form with userData
  });

  async function onSubmit(data) {
    try {
      const response = await axiosInstance.put(
        `/api/auth/${userData._id}`,
        data
      );
      if (response.status === 200) {
        toast.success("User updated successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating user");
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center">
        <div
          className={`p-3 md:w-[60%] w-full overflow-auto text-textLabalForm mt-5 ${className}`}
        >
          <h3 className="font-semibold text-gray-900 text-[1.3rem] mb-3">
            Edit User
          </h3>

          <form
            className="flex flex-col gap-4 mt-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,1fr))] gap-5">
              {[
                { label: "First Name", type: "text", name: "firstName" },
                { label: "Second Name", type: "text", name: "secondName" },
                { label: "Company Email", type: "email", name: "email" },
                { label: "Phone number", type: "number", name: "phone" },
              ].map((field, index) => (
                <div className="flex flex-col gap-2" key={index}>
                  <label htmlFor={field.name} className="text-[0.9rem]">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    className="bg-bgInput py-1 px-2 rounded-md outline-none"
                    placeholder={`Enter ${field.label}`}
                    {...register(field.name, {
                      required: `${field.name} is required`,
                      pattern:
                        field.name === "email"
                          ? {
                              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                              message: "Invalid email",
                            }
                          : undefined,
                    })}
                  />
                  <p className="text-red-400 text-[0.8rem] -mb-3">
                    {errors[field.name]?.message}
                  </p>
                </div>
              ))}
            </div>

            <button className="text-white bg-primaryColor border text-[0.9rem] border-primaryColor px-12 py-1 mt-3 rounded-md">
              {isSubmitting ? "Saving..." : "Update User"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUsersTanet;
