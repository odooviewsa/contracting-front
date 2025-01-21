import { useContext, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import PropTypes from "prop-types";
import BlockContantWorkItem from "./BlockContantWorkItem";
import Menu from "./ModalWorkItem/Menu";
import { ContextBOQ } from "../../../../../context/BOQContext";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../../../../../axios/axios";

export default function BlockWorkItem({ workItem }) {
  // Language
  const { t } = useTranslation();
  const [openMore, setOpenMore] = useState(false);
  const [materials, setMaterials] = useState();
  const { idOnlyOpen, setIdOnlyOpen } = useContext(ContextBOQ);
  const toggleItem = () => {
    setIdOnlyOpen((prevIds) => {
      if (prevIds.includes(workItem._id)) {
        return prevIds.filter((id) => id !== workItem._id);
      } else {
        return [...prevIds, workItem._id];
      }
    });
  };
  // Fetch materials
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/materials/${workItem._id}/boq`
        );
        if (res.data) {
          setMaterials(res?.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchMaterials();
  }, [workItem._id]);

  return (
    <div className="flex flex-col mb-1 w-full">
      <div
        className={`p-3 flex justify-between items-center gap-3  cursor-pointer  transform ltr:translate-x-14  rtl:-translate-x-14 w-[82%]`}
        onClick={toggleItem}
      >
        <div className="flex items-center gap-4 text-colorTextValueItem ">
          <div className="flex flex-col">
            <h4 className="text-black">
              {t("ContractsForms.BOQ.table.allItems.work.text")}
            </h4>
            <p className="text-[0.8rem] ">{workItem?.workItemName}</p>
          </div>
        </div>
        <div
          className="cursor-pointer flex items-center gap-2 text-[0.9rem] relative text-colorTextValueItem"
          onClick={(e) => {
            e.stopPropagation();
            setOpenMore((e) => !e);
          }}
        >
          <p> {t("ContractsForms.BOQ.table.allItems.work.moreButton")}</p>
          <BsThreeDotsVertical />
          {openMore && <Menu workItem={workItem} />}
        </div>
      </div>
      {idOnlyOpen?.includes(workItem?._id) && (
        <BlockContantWorkItem
          workItemDetails={workItem?.workDetails}
          materials={materials}
        />
      )}
    </div>
  );
}
BlockWorkItem.propTypes = {
  workItem: PropTypes.object,
};
