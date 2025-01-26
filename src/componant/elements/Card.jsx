import { IoTrashOutline } from "react-icons/io5";

const Card = ({
  handleDelete,
  title,
  subText,
  type,
  icon,
  isLoading,
  className = "",
}) => {
  return (
    <div
      className={`group flex items-center justify-between rounded border p-2 relative ${className}`}
    >
      <div className="flex items-center gap-4">
        {icon && icon}
        <div className="flex flex-col gap-1">
          <h5>{title}</h5>
          <p className="textBlur">{subText}</p>
        </div>
      </div>
      {type && (
        <div className="bg-green-200 text-green-600 py-1 px-2 rounded font-medium text-sm group-hover:translate-x-[-40px] transition-all duration-500">
          {type}
        </div>
      )}
      <button
        disabled={isLoading}
        className="absolute right-0 bg-red-300 rounded p-1 mx-4 group-hover:opacity-100 opacity-0 transition-all duration-700"
      >
        <IoTrashOutline
          size={18}
          className="text-red-900 cursor-pointer"
          onClick={handleDelete}
        />
      </button>
    </div>
  );
};
export default Card;
