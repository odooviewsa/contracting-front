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
    formState: { errors, isSubmitting },
  } = useForm();
  const password = watch("password");

  function onSubmit(data) {
    sessionStorage.setItem("data_register", JSON.stringify(data));
    navigate("/register_complete");
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center lg:justify-between p-5 overflow-x-hidden text-white bg-[#06385c]">
      <div className="lg:w-1/2 w-full flex justify-center items-center">
        <div className="w-full max-w-md flex flex-col gap-5 items-center">
          <SignWithGoogle title="Create Account" />

          <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit(onSubmit)}>
            {[
              { label: "Company Email", type: "email", name: "email", validation: { pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ } },
              { label: "Password", type: "password", name: "password", validation: { minLength: { value: 6, message: "Password must be at least 6 characters long" } } },
              { label: "Confirm Password", type: "password", name: "confirmPassword", validation: { validate: value => value === password || "Passwords do not match" } },
              { label: "Phone Number", type: "number", name: "phone" },
            ].map((field, index) => {
              if (field.name === "phone") {
                return (
                  <div key={index} className="flex flex-col gap-2 w-full">
                    <label className="text-gray-100 font-medium">
                      {field.label} <span className="text-red-400">*</span>
                    </label>
                    <Controller
                      name={field.name}
                      control={control}
                      rules={{ required: `${field.label} is required` }}
                      render={({ field }) => (
                        <PhoneInput {...field} country={"eg"} containerClass="text-black" />
                      )}
                    />
                    {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name].message}</p>}
                  </div>
                );
              } else {
                return (
                  <div key={index} className="flex flex-col gap-2 w-full">
                    <label className="text-gray-100 font-medium">
                      {field.label} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type={field.type}
                      placeholder={`Enter ${field.label}`}
                      className={`py-2 px-3 placeholder-gray-400 outline-none border ${errors[field.name] ? "border-red-500" : "border-gray-300"} rounded-md bg-white text-black`}
                      {...register(field.name, { required: `${field.label} is required`, ...field.validation })}
                    />
                    {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name].message}</p>}
                  </div>
                );
              }
            })}

            <div className="flex items-center justify-between mt-4 font-semibold text-sm text-gray-300">
              <Link to="/" className="hover:underline">
                Already have an account? <span className="text-blue-400">Login</span>
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 text-lg font-semibold rounded-lg py-2 px-4 bg-blue-600 hover:bg-blue-700 transition duration-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? "Processing..." : "Next"}
                {!isSubmitting && <FaArrowRightLong />}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Image Section (only on large screens) */}
      <div className="lg:w-1/2 hidden lg:flex justify-center items-center">
        <img src={imageLogin} alt="Register" className="w-3/4 max-w-md" />
      </div>
    </div>
  );
}
