import { BsThreeDotsVertical } from "react-icons/bs";
import PropTypes from "prop-types";
import BlockWorkItem from "./BlockWorkItem";
import { useContext, useEffect, useState } from "react";
import { ContextBOQ } from "../../../../../context/BOQContext";
import Menu from "./ModalSubItem/Menu";
import { useTranslation } from "react-i18next";

export default function BlockSubItem({ indexSubItem, subitem }) {
  // Language
  const { t } = useTranslation();
  const { idOnlyOpen, setIdOnlyOpen } = useContext(ContextBOQ);
  const [openMore, setOpenMore] = useState(false);
  const toggleItem = () => {
    setIdOnlyOpen((prevIds) => {
      if (prevIds.includes(subitem._id)) {
        return prevIds.filter((id) => id !== subitem._id);
      } else {
        return [...prevIds, subitem._id];
      }
    });
  };
  // Total subitem
  const [totalSubItem, setTotalSubItem] = useState(0);
  useEffect(() => {
    if (subitem) {
      let totalArray = [];
      subitem.workItems?.map((workitem) => {
        const { total } = workitem.workDetails;
        totalArray.push(total);
      });
      setTotalSubItem(totalArray.reduce((ele, value) => ele + value));
    }
  }, [subitem]);

  return (
    <div className="flex flex-col">
      <div
        className={`p-3 flex items-center justify-between cursor-pointer gap-12 bg-bgWhite`}
        onClick={toggleItem}
      >
        <div className="flex-1 flex items-center gap-4 text-colorTextValueItem transform translate-x-7 ">
          <div className="flex-1 flex items-center justify-between">
            <div className="flex flex-col">
              <h4 className="text-black">
                {t("ContractsForms.BOQ.table.allItems.sub.text")}
              </h4>
              <p className="text-[0.8rem]">{subitem?.subItemName}</p>
            </div>
            <p className="text-sm ltr:mr-8 rtl:ml-8">Total: {totalSubItem}</p>
          </div>
        </div>
        <div
          className="cursor-pointer flex items-center gap-2 text-[0.9rem] relative text-colorTextValueItem"
          onClick={(e) => {
            e.stopPropagation();
            setOpenMore((e) => !e);
          }}
        >
          <p>{t("ContractsForms.BOQ.table.allItems.sub.moreButton")}</p>
          <BsThreeDotsVertical />
          {openMore && <Menu subItem={subitem} />}
        </div>
      </div>

      {idOnlyOpen?.includes(subitem?._id) &&
        subitem?.workItems?.map((workItem, index) => (
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
