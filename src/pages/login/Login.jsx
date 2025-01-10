import { Link, useNavigate } from "react-router-dom";
import imageLogin from "../../assets/images/login.png";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../axios/axios";
import { toast } from "react-toastify";
import { setUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa"; // Icon for loading spinner
import { useTranslation } from "react-i18next";

export default function Login() {
  // language
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    try {
      const result = await axiosInstance.post("/api/auth/login", data);
      if (result.status === 200) {
        localStorage.setItem("inform_user", JSON.stringify(result?.data?.user));
        sessionStorage.removeItem("data_register");
        dispatch(setUser(result?.data?.user));
        navigate(`/${result?.data?.user?.companyName}/projects`);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center lg:justify-between overflow-x-hidden text-white bg-[#06385c]">
      <div className="lg:w-1/2 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-semibold text-center mb-4">
          {t("LoginPage.welcome")}
        </h1>
        <p className="text-lg text-gray-300 mb-8 text-center">
          {t("LoginPage.message")}
        </p>

        <form
          className="w-full max-w-md space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {t("LoginPage.fields", { returnObjects: true }).map(
            (field, index) => (
              <div key={index} className="flex flex-col w-full">
                <label
                  className="text-gray-100 font-medium mb-1"
                  htmlFor={field.name}
                >
                  {field.label} <span className="text-red-400">*</span>
                </label>
                <input
                  id={field.name}
                  type={field.type}
                  placeholder={`Enter ${field.label}`}
                  className={`py-2 px-3 placeholder-gray-400 outline-none border ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  } rounded-md bg-white text-black`}
                  {...register(field.name, {
                    required: `${field.label} is required`,
                    ...field.validation,
                  })}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.name].message}
                  </p>
                )}
              </div>
            )
          )}

          <button
            type="submit"
            className={`w-full py-2 font-semibold text-lg rounded-lg bg-blue-600 text-white flex items-center justify-center transition duration-300 hover:bg-blue-700 ${
              isSubmitting && "opacity-50 cursor-not-allowed"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              t("LoginPage.buttons.signInButton")
            )}
          </button>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
            <span> {t("LoginPage.buttons.dontHave")}</span>
            <Link to="/register" className="text-blue-400 hover:underline">
              {t("LoginPage.buttons.registerButton")}
            </Link>
          </div>
        </form>
      </div>

      {/* Image Section (only on large screens) */}
      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <img
          src={imageLogin}
          alt="login illustration"
          className="w-3/4 max-w-sm"
        />
      </div>
    </div>
  );
}
