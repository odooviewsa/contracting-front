import { useForm } from "react-hook-form";
import { axiosInstance } from "../../axios/axios";
import { ToastContainer, toast } from 'react-toastify';

export default function AddUsersTanet() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  async function onSubmit(data) {
    const formData = {
      ...data,
      role: "User",
    };
    await axiosInstance
      .post("/api/auth/addTenantToGroup", formData)
      .then((result) => {
        if (result.status === 201) {
          toast.success("create user successfully");
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  }
  const password = watch("password");
  return (
    <>
    <ToastContainer/>
    <div className="flex justify-center">
      <div className="p-3 md:w-[60%] w-full   overflow-auto text-textLabalForm mt-5">
        <h3 className="font-semibold text-gray-900 text-[1.3rem] mb-3">
          Add User
        </h3>

        <form
          className="flex flex-col gap-4 mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* // item name */}
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,1fr))] gap-5">
            {[
              { label: "First Name", type: "text", name: "firstName" },
              { label: "Second Name", type: "text", name: "secondName" },
              { label: "Company Email", type: "email", name: "email" },
              { label: "Password", type: "password", name: "password" },
              {
                label: "Confirm Password",
                type: "password",
                name: "confirmPassword",
              },
              { label: "Phone number", type: "number", name: "phone" },
            ].map((email, index) => {
              return (
                <div className="flex flex-col gap-2" key={index}>
                  <label htmlFor="" className="text-[0.9rem]">
                    {email.label}
                  </label>
                  <input
                    type={email.type}
                    className="bg-bgInput py-1 px-2 rounded-md outline-none"
                    placeholder={`enter ${email.label}`}
                    name={email.name}
                    {...register(email.name, {
                      required: `${email.name} is required`,
                      minLength:
                        email.name === "password"
                          ? {
                              value: 6,
                              message: "min length 6 character",
                            }
                          : undefined,
                      validate:
                        email.name === "confirmPassword"
                          ? (value) =>
                              value === password ||
                              "   Confirm Password not match"
                          : undefined,
                      pattern:
                        email.name === "email"
                          ? {
                              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                              message: "invalid email",
                            }
                          : undefined,
                    })}
                  />
                  <p className="text-red-400 text-[0.8rem] -mb-3">
                    {errors[email.name] && errors[email.name].message}
                  </p>
                </div>
              );
            })}
          </div>

          <button className="text-white bg-primaryColor border text-[0.9rem] border-primaryColor px-12 py-1 mt-3 rounded-md">
            {isSubmitting ? "Loading..." : "Add User"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
