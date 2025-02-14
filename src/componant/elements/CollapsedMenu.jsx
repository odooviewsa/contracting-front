import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

const CollapsedMenu = ({ className = "", totalCost = 0, label, children }) => {
  const [isContentOpen, setIsContentOpen] = useState();
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div
          onClick={() => setIsContentOpen(!isContentOpen)}
          className="flex gap-2 items-center font-medium cursor-pointer select-none text-textLabalForm">
          <MdArrowDropDown
            size={18}
            className={`${!isContentOpen && "-rotate-90"} transition-all`}
          />
          {label}
        </div>
        <p className="text-sm text-colorTextValueItem">
          {label}: {totalCost}
        </p>
      </div>
      {isContentOpen && children }
    </div>
  );
};
export default CollapsedMenu;
