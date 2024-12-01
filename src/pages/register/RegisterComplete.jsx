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
    const formData = {
      ...data_After,
      ...data,
      role: "User",
    };
    await axiosInstance
      .post("/api/auth/register", formData)
      .then((result) => {
        console.log(result);
        if (result.status === 201) {
          localStorage.setItem(
            "inform_user",
            JSON.stringify(result?.data?.user)
          );
          sessionStorage.removeItem("data_register");
          dispatch(setUser(result?.data?.user));
          navigate(`/${result?.data?.user?.companyName}/projects`);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  }
  return (
    <div className="w-full min-h-screen bgLogin flex items-center justify-between p-5 overflow-x-hidden text-white">
      <div className="lg:w-[49%] w-[100%] flex justify-center items-center">
        <div className="w-[90%] flex flex-col gap-5 items-center">
          <Link
            to={"/register"}
            className="flex items-center justify-start w-full gap-2"
          >
            <FaArrowLeftLong />
            <h4>back</h4>
          </Link>
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            {[
              { label: "First Name", type: "text", name: "firstName" },
              { label: "Second Name", type: "text", name: "secondName" },
              {
                label: "Company Name",
                type: "text",
                name: "companyName",
              },
              {
                label: "Company Size",
                type: "select",
                name: "companySize",
                option: [
                  "1-10 employees (Small startup)",
                  "11-50 employees (Growing small business)",
                  "51-200 employees (Medium-sized business)",
                  "201-500 employees (Mid-large company)",
                  "501-1,000 employees (Large company)",
                  "1,001-5,000 employees (Enterprise level)",
                ],
              },
              {
                label: "Company type",
                type: "select",
                name: "companyType",
                option: ["Contractor", "Sub-Contractor"],
              },
            ].map((email, item) => {
              if (email.type === "select") {
                return (
                  <div className="flex flex-col gap-2 w-full" key={item}>
                    <label htmlFor="">
                      {email.label} <span className="text-red-400">*</span>
                    </label>
                    <select
                      className="py-2 px-3 placeholder:text-gray-400 outline-none border border-white  rounded-md bg-transparent"
                      {...register(email.name, {
                        required: `${email.name} is required`,
                      })}
                    >
                      <option value="" className="text-black">
                        {email.label}
                      </option>
                      {email?.option?.map((e, i) => (
                        <option key={i} value={e} className="text-black">
                          {e}
                        </option>
                      ))}
                    </select>
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
                      className={`py-2 px-3 placeholder:text-gray-400 outline-none border border-white rounded-md bg-transparent ${
                        email.name === "companyName" ? "text-black" : ""
                      }`}
                      {...register(email.name, {
                        required: `${email.name} is required`,
                      })}
                    />
                    <p className="text-red-400 text-[0.8rem] -mb-3">
                      {errors[email.name] && errors[email.name].message}
                    </p>
                  </div>
                );
              }
            })}
            <button className="bg-white rounded-full w-full text-black p-2 font-semibold mt-2">
              {isSubmitting ? "Loading..." : "Create"}
            </button>
            <div className="flex items-center justify-between  font-semibold ">
              <Link to={"/"} className="text-black text-[0.9rem]">
                Already have account?{" "}
                <span className=" cursor-pointer text-white"> Login</span>
              </Link>
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
