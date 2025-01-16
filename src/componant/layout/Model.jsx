import { IoCloseOutline } from "react-icons/io5";

const Model = ({
  title,
  isOpen = false,
  className = "",
  onClick,
  children,
}) => {
  return (
    <div
      className={`w-[calc(100vw-60px)] h-screen absolute inset-0 bg-black/60 z-[60] ${
        isOpen ? "flex items-center justify-center" : "hidden"
      }`}
    >
      <div className={`w-1/2 min-h-1/2 p-4 rounded-lg bg-white  ${className}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">{title}</h3>
          <div onClick={onClick} className="cursor-pointer">
            <IoCloseOutline
              size={20}
              className="text-primaryColor/60 hover:text-primaryColor"
            />
          </div>
        </div>
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
};
export default Model;
