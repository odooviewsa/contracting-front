import { Link, useNavigate } from "react-router-dom";
import imageLogin from "../../assets/images/login.png";
import SignWithGoogle from "./componant/SignWithGoogle";
import { FaArrowRightLong } from "react-icons/fa6";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm, Controller } from "react-hook-form";

export default function Register() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    watch,
    control,
    register,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  function onSubmit(data) {
    sessionStorage.setItem("data_register",JSON.stringify(data));
    navigate("/register_complete");
  }
  return (
    <div className="w-full min-h-screen bgLogin flex items-center justify-between p-5 overflow-x-hidden text-white">
      <div className="lg:w-[49%] w-[100%] flex justify-center items-center">
        <div className="w-[90%] flex flex-col gap-5 items-center">
          <SignWithGoogle title="Create Account" />
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            {[
              { label: "Company Email", type: "email", name: "email" },
              { label: "Password", type: "password", name: "password" },
              {
                label: "Confirm Password",
                type: "password",
                name: "confirmPassword",
              },
              { label: "Phone number", type: "number", name: "phone" },
            ].map((email, item) => {
              if (email.name === "phone") {
                return (
                  <div className="flex flex-col gap-2 w-full" key={item}>
                    <label className="text-white">
                      Phone Number <span className="text-red-400 ">*</span>
                    </label>
                    <Controller
                      name={email.name}
                      control={control}
                      rules={{ required: `${email.label} is required` }}
                      render={({ field }) => (
                        <PhoneInput {...field} country={"eg"} />
                      )}
                    />
                    <p className="text-red-400 text-[0.8rem] -mb-3">
                      {errors[email.name] && errors[email.name].message}
                    </p>
                  </div>
                );
              } else {
                return (
                  <div className="flex flex-col gap-2 w-full" key={item}>
                    <label htmlFor="">
                      {email.label} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type={email.type}
                      placeholder={email.label}
                      className="py-2 px-3 placeholder:text-gray-400 outline-none border border-white rounded-md bg-transparent"
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
                          email.name === "ConfirmPassword"
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
              }
            })}
            <div className="flex items-center justify-between  font-semibold ">
              <Link to={"/"} className="text-black text-[0.9rem]">
                Already have account?{" "}
                <span className=" cursor-pointer text-white"> Login</span>
              </Link>
              <button className="flex items-center gap-2 text-white ">
                <span>Next</span>
                <FaArrowRightLong />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="lg:w-[49%] hidden lg:flex justify-center items-center containerImage relative">
        <img src={imageLogin} alt="login" className="w-[90%]" />
      </div>
    </div>
  );
}
