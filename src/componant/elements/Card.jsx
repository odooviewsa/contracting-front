import { IoDownloadOutline, IoTrashOutline } from "react-icons/io5";
import { url } from "../../axios/axios";
import { Link } from "react-router-dom";

const Card = ({
  handleDelete,
  title,
  subText,
  type,
  icon,
  isLoading,
  className = "",
  downloadLink,
}) => {
  console.log(downloadLink)
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
        <div className="bg-green-200 text-green-600 py-1 px-2 rounded font-medium text-sm group-hover:ltr:translate-x-[-40px] group-hover:rtl:translate-x-[40px] transition-all duration-500">
          {type}
        </div>
      )}
      <div className="absolute ltr:right-0 rtl:left-0 group-hover:opacity-100 opacity-0 transition-all duration-700 h-fit flex items-center justify-center gap-2 mx-4">
        {downloadLink && (
          <Link to={`${url}/download/${downloadLink}`} className="bg-blue-200 p-1 rounded">
            <IoDownloadOutline
              size={18}
              className="text-blue-500 cursor-pointer"
            />
          </Link>
        )}
        <button disabled={isLoading} className="bg-red-300 rounded p-1">
          <IoTrashOutline
            size={18}
            className="text-red-900 cursor-pointer"
            onClick={handleDelete}
          />
        </button>
      </div>
    </div>
  );
};
export default Card;
