import { useContext, useEffect, useRef, useState } from "react";
import { ContextBOQ } from "../../../../context/BOQContext";
import { FaBars, FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
export default function FilterColum() {
  // Language
  const { t } = useTranslation();
  const menuRef = useRef(null);
  const [openColumValue, setOpenColumValue] = useState(false);
  const { currentValueColum, setCurrentValueColum } = useContext(ContextBOQ);
  const toggleSelect = (name) => {
    setCurrentValueColum((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const nameColum = [
    {
      value: "Unit Of Measure",
      text: t("ContractsForms.BOQ.filter.columns.unitOfMeasure"),
    },
    {
      value: "Assigned Quantity",
      text: t("ContractsForms.BOQ.filter.columns.assignedQuantity"),
    },
    {
      value: "Price",
      text: t("ContractsForms.BOQ.filter.columns.price"),
    },
    {
      value: "Total",
      text: t("ContractsForms.BOQ.filter.columns.total"),
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenColumValue(false);
      }
    };

    if (openColumValue) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openColumValue]);
  return (
    <div className="relative z-50" ref={menuRef}>
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => setOpenColumValue((e) => !e)}>
        <FaBars size={20} />
        <p>{t("ContractsForms.BOQ.filter.columns.text")}</p>
        {openColumValue ? (
          <FaCaretDown color="gray" size={20} />
        ) : (
          <FaCaretUp color="gray" size={20} />
        )}
      </div>
      {openColumValue && (
        <div className="absolute ltr:left-0 rtl:right-0 top-7 rounded-md flex flex-col border border-gray-300 w-[200px] bg-white">
          {nameColum?.map((ele, i) => (
            <div
              key={i}
              className={`${
                i !== 6 && "border-b"
              } p-1 flex items-center justify-between border-gray-300 text-center w-full hover:bg-gray-300 cursor-pointer`}
              onClick={() => toggleSelect(ele.value)}>
              <p>{ele.text}</p>
              {currentValueColum[ele.value] && <p>✔</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
