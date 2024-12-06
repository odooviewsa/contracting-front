import { Link, useNavigate } from "react-router-dom";
import imageLogin from "../../assets/images/login.png";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../axios/axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../../redux/features/userSlice";
import { useEffect } from "react";

export default function RegisterComplete() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (!sessionStorage.getItem("data_register")) {
      navigate("/register");
    }
  }, [navigate]);

  async function onSubmit(data) {
    const data_Before = sessionStorage.getItem("data_register");
    const data_After = JSON.parse(data_Before);
    const formData = { ...data_After, ...data, role: "User" };
    try {
      const result = await axiosInstance.post("/api/auth/register", formData);
      if (result.status === 201) {
        localStorage.setItem("inform_user", JSON.stringify(result?.data?.user));
        sessionStorage.removeItem("data_register");
        dispatch(setUser(result?.data?.user));
        navigate(`/${result?.data?.user?.companyName}/projects`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed. Please try again.");
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center lg:justify-between p-5 overflow-x-hidden text-white bg-[#06385c]">
      <div className="lg:w-1/2 w-full flex justify-center items-center">
        <div className="w-full max-w-md flex flex-col gap-5 items-center">
          <Link to="/register" className="flex items-center text-white gap-2 mb-4 hover:underline">
            <FaArrowLeftLong />
            <span>Back</span>
          </Link>

          <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit(onSubmit)}>
            {[
              { label: "First Name", type: "text", name: "firstName" },
              { label: "Second Name", type: "text", name: "secondName" },
              { label: "Company Name", type: "text", name: "companyName" },
              { label: "Company Size", type: "select", name: "companySize", options: [
                  "1-10 employees (Small startup)",
                  "11-50 employees (Growing small business)",
                  "51-200 employees (Medium-sized business)",
                  "201-500 employees (Mid-large company)",
                  "501-1,000 employees (Large company)",
                  "1,001-5,000 employees (Enterprise level)",
                ] 
              },
              { label: "Company Type", type: "select", name: "companyType", options: ["Contractor", "Sub-Contractor"] },
            ].map((field, index) => (
              <div key={index} className="flex flex-col gap-2 w-full">
                <label className="text-gray-100 font-medium">
                  {field.label} <span className="text-red-400">*</span>
                </label>
                {field.type === "select" ? (
                  <select
                    className={`py-2 px-3 border rounded-md bg-white text-black ${errors[field.name] ? "border-red-500" : "border-gray-300"}`}
                    {...register(field.name, { required: `${field.label} is required` })}
                  >
                    <option value="" disabled>Select {field.label}</option>
                    {field.options?.map((option, idx) => (
                      <option key={idx} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    placeholder={`Enter ${field.label}`}
                    className={`py-2 px-3 placeholder-gray-400 border rounded-md bg-white text-black ${errors[field.name] ? "border-red-500" : "border-gray-300"}`}
                    {...register(field.name, { required: `${field.label} is required` })}
                  />
                )}
                {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name].message}</p>}
              </div>
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded-lg font-semibold transition duration-300 bg-blue-600 text-white hover:bg-blue-700 ${
                isSubmitting && "opacity-50 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Processing..." : "Create"}
            </button>

            <div className="flex items-center justify-between mt-4 text-sm text-gray-300 font-semibold">
              <span>Already have an account?</span>
              <Link to="/" className="text-blue-400 hover:underline">Login</Link>
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
