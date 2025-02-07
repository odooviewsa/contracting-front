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
  disabled,
  onChange,
  value,
}) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${groupClassName}`}>
      <label htmlFor={id}>{label}</label>
      {options ? (
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`bg-slate-100 p-3 rounded-lg outline-none disabled:bg-gray-300 disabled:cursor-not-allowed ${className}`}
          {...register}>
          {options.map((option, key) => (
            <option
              value={option.value}
              key={key}
              defaultValue={option.asDefault && option.value}>
              {option.text}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className={`bg-slate-100 p-3 rounded-lg outline-none disabled:bg-gray-300 disabled:cursor-not-allowed ${className}`}
          disabled={disabled}
          {...register}
        />
      )}

      {errors[id] && <p className="text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
};
export default Input;
