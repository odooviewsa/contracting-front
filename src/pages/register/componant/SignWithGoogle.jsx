import { FcGoogle } from "react-icons/fc";
import PropTypes from 'prop-types'
export default function SignWithGoogle({ title }) {
  return (
    <>
      {/* // sign with google */}
      <div className="flex justify-center items-center gap-5 cursor-pointer text-white font-semibold border border-white rounded-full w-full p-2">
        <div className="p-[2px] rounded-full bg-white ">
          <FcGoogle size={20} />
        </div>
        <p>Sign up with google</p>
      </div>
      {/* // line or  */}
      <div className="w-[80%] h-[2px] bg-bgWhite  relative mt-2">
        <div className="absolute rounded-full left-[50%] translate-x-[-50%]  -top-4 bg-[#2571bd] font-semibold py-1 px-2">
          Or
        </div>
      </div>
      {/* // header */}
      <h4 className="font-semibold text-[1.1rem]">{title}</h4>
    </>
  );
}
SignWithGoogle.propTypes = {
    title:PropTypes.string
}