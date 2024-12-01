import { Link, useNavigate } from "react-router-dom";
import imageLogin from "../../assets/images/login.png";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../axios/axios";
import { toast } from "react-toastify";
import { setUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  async function onSubmit(data) {
    await axiosInstance
      .post("/api/auth/login", data)
      .then( ( result ) => {
        console.log(result)
        if (result.status === 200) {
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
    <div className="w-full min-h-screen  flex items-center justify-between overflow-x-hidden text-white">
      <div className="lg:w-[49%] bg-[#06385c] min-h-screen w-[100%] flex justify-center items-center">
        <div className="w-[90%] flex flex-col gap-5 items-center">
          <h1 className="text-[2rem] font-semibold">Hi, Welcome back!</h1>
          <div className="w-[80%] h-[2px] bg-bgWhite  relative mt-2">
            <div className="absolute rounded-full left-[50%] translate-x-[-50%] -top-6 bg-[#06385c] font-semibold py-3 px-3">
              Sign in
            </div>
          </div>

          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            {[
              { label: "Email", type: "email", name: "email" },
              { label: "Password", type: "password", name: "password" },
              {
                label: "Organization Name",
                type: "text",
                name: "companyName",
              },
            ].map((email, item) => (
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
                  })}
                />
                <p className="text-red-400 text-[0.8rem] -mb-3">
                  {errors[email.name] && errors[email.name].message}
                </p>
              </div>
            ))}
            <button
              className={`border  rounded-lg w-full  p-1 font-semibold mt-2`}
            >
              {isSubmitting ? "Loading..." : "Sign in"}
            </button>
            <div className="flex items-center justify-between  font-semibold ">
              <Link to={"/register"} className="text-black text-[0.9rem]">
                Not have account?{" "}
                <span className=" cursor-pointer text-white"> Register</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="lg:w-[49%] hidden lg:flex justify-center items-center  relative">
        <img src={imageLogin} alt="login" className="w-[80%]" />
      </div>
    </div>
  );
}
