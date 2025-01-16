const Input = ({
  id,
  label,
  type,
  errorMessage,
  placeholder,
  className = "",
  groupClassName = "",
  register,
  errors,
  options,
}) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${groupClassName}`}>
      <label htmlFor={id}>{label}</label>
      {options ? (
        <select
          className={`bg-slate-100 p-3 rounded-lg outline-none ${className}`}
          {...register}
        >
          {options.map((option, key) => (
            <option value={option} key={key}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`bg-slate-100 p-3 rounded-lg outline-none ${className}`}
          {...register}
        />
      )}

      {errors[id] && <p className="text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
};
export default Input;
