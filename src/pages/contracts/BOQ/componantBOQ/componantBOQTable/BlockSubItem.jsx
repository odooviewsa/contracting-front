import { BsThreeDotsVertical } from "react-icons/bs";
import PropTypes from "prop-types";
import BlockWorkItem from "./BlockWorkItem";
import { useContext } from "react";
import { ContextBOQ } from "../../../../../context/BOQContext";
export default function BlockSubItem({ indexSubItem, subitem }) {
  const { idOnlyOpen, setIdOnlyOpen } = useContext(ContextBOQ);
  const toggleItem = () => {
    setIdOnlyOpen((prevIds) => {
      if (prevIds.includes(subitem._id)) {
        return prevIds.filter((id) => id !== subitem._id);
      } else {
        return [...prevIds, subitem._id];
      }
    });
  };
  return (
    <div className="flex flex-col">
      <div
        className={`p-3 flex items-center justify-between cursor-pointer gap-12 bg-bgWhite`}
        onClick={toggleItem}
      >
        <div className="flex items-center gap-4 text-colorTextValueItem transform translate-x-10 ">
          <div className="flex flex-col">
            <h4 className="text-black">Sub Item</h4>
            <p className="text-[0.8rem]">{subitem?.subItemName}</p>
          </div>
        </div>
        <div className="cursor-pointer flex items-center gap-2 text-[0.9rem] text-colorTextValueItem">
          <p> More</p>
          <BsThreeDotsVertical />
        </div>
      </div>

      {idOnlyOpen?.includes(subitem?._id) && subitem?.workItems?.map((workItem, index) => (
        <BlockWorkItem
          key={index}
          indexWorkItem={index}
          indexSubItem={indexSubItem}
          workItem={workItem}
        />
      ))}
    </div>
  );
}
BlockSubItem.propTypes = {
  indexSubItem: PropTypes.number,

  subitem: PropTypes.object,
};
