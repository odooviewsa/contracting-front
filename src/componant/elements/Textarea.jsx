import React from "react";

const Textarea = ({
  label,
  className = "",
  placeholder,
  id,
  register,
  errors,
  errorMessage,
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        className="w-full bg-slate-100 px-2 py-4 rounded"
        {...register}
        ></textarea>
      {errors[id] && <p className="text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
};

export default Textarea;
