import { BsThreeDotsVertical } from "react-icons/bs";
import BlockSubItem from "./BlockSubItem";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ContextBOQ } from "../../../../../context/BOQContext";
export default function BlockMainItem({ mainItem }) {
  const { idOnlyOpen, setIdOnlyOpen } = useContext(ContextBOQ);
 
  const toggleItem = () => {
    setIdOnlyOpen((prevIds) => {
      if (prevIds.includes(mainItem._id)) {
        return prevIds.filter((id) => id !== mainItem._id);
      } else {
        return [...prevIds, mainItem._id];
      }
    });
  };
  return (
    <div className="flex flex-col">
      {/* // main item */}
      <div
        className="p-3 flex items-center justify-between gap-5 cursor-pointer"
        onClick={toggleItem}
      >
        <div className="flex items-center gap-4 text-colorTextValueItem ">
          <div className="flex flex-col">
            <h4 className="text-black">Main Item</h4>
            <p className="text-[0.8rem]">{mainItem?.itemName}</p>
          </div>
        </div>
        <div className="cursor-pointer flex items-center gap-2 text-colorTextValueItem text-[0.9rem]">
          <p> More</p>
          <BsThreeDotsVertical />
        </div>
      </div>
      {/* // sub item */}
      {idOnlyOpen?.includes(mainItem?._id) &&
        mainItem?.subItems?.map((subitem, index) => (
          <BlockSubItem key={index} indexSubItem={index} subitem={subitem} />
        ))}
    </div>
  );
}
BlockMainItem.propTypes = {
  indexMainItem: PropTypes.number,
  mainItem: PropTypes.object,
};
