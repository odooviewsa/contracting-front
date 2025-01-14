import { BsThreeDotsVertical } from "react-icons/bs";
import BlockSubItem from "./BlockSubItem";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { ContextBOQ } from "../../../../../context/BOQContext";
import Menu from "./ModalMainItem/Menu";
import { useTranslation } from "react-i18next";

export default function BlockMainItem({ mainItem }) {
  // Language
  const { t } = useTranslation();
  const { idOnlyOpen, setIdOnlyOpen } = useContext(ContextBOQ);
  const [openMore, setOpenMore] = useState(false);
  const toggleItem = () => {
    setIdOnlyOpen((prevIds) => {
      if (prevIds.includes(mainItem._id)) {
        return prevIds.filter((id) => id !== mainItem._id);
      } else {
        return [...prevIds, mainItem._id];
      }
    });
  };
  // Total subitem
  const [totalMainItem, setTotalMainItem] = useState(0);

  useEffect(() => {
    if (mainItem) {
      let totalArray = [];
      mainItem.subItems.map((subItem) =>
        subItem.workItems?.map((workitem) => {
          const { total } = workitem.workDetails;
          totalArray.push(total);
        })
      );
      setTotalMainItem(totalArray.reduce((ele, value) => ele + value));
    }
  }, [mainItem]);
  console.log(mainItem)
  return (
    <div className="flex flex-col">
      {/* // main item */}
      <div
        className="p-3 flex items-center justify-between gap-5 cursor-pointer"
        onClick={toggleItem}
      >
        <div className="flex-1 flex items-center justify-between gap-4 text-colorTextValueItem ">
          <div className="flex flex-col">
            <h4 className="text-black">
              {t("ContractsForms.BOQ.table.allItems.main.text")}
            </h4>
            <p className="text-[0.8rem]">{mainItem?.itemName}</p>
          </div>
          <p className="text-sm ltr:mr-8 rtl:ml-8">{t("ContractsForms.BOQ.texts.total")}: {totalMainItem}</p>
        </div>
        <div
          className="cursor-pointer flex items-center gap-2 text-colorTextValueItem relative text-[0.9rem]"
          onClick={(e) => {
            e.stopPropagation();
            setOpenMore((e) => !e);
          }}
        >
          <p> {t("ContractsForms.BOQ.table.allItems.main.moreButton")}</p>
          <BsThreeDotsVertical />
          {openMore && <Menu mainItem={mainItem} />}
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
