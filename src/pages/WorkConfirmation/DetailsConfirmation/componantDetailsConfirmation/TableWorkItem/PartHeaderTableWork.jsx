import { useContext, useEffect, useRef, useState } from "react";
import { ContextBOQ } from "../../../../../context/BOQContext";
import { FaBars, FaCaretDown, FaCaretUp } from "react-icons/fa6";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function PartHeaderTableWork({ setSearchWorkConfirmation }) {
  // Language
  const { t } = useTranslation();
  const [openColumValue, setOpenColumValue] = useState(false);
  const {
    currentValueColumWorkConfirmation,
    setCurrentValueColumWorkConfirmation,
  } = useContext(ContextBOQ);
  const nameColum = t("ConfirmationForms.BOQ.table.nameColumn", {
    returnObjects: true,
  });

  const toggleSelect = (name) => {
    setCurrentValueColumWorkConfirmation((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const menuRef = useRef(null);
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenColumValue(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex items-center gap-7  text-[0.9rem] flex-wrap">
      <input
        type="text"
        placeholder={t("ConfirmationForms.BOQ.table.searchBar")}
        className="border border-gray-400 rounded-md py-1 px-2  w-60 outline-none"
        onChange={(e) => setSearchWorkConfirmation(e.target.value)}
      />
      <div className="relative z-40">
        <div
          className="flex items-center gap-1 cursor-pointer "
          onClick={() => setOpenColumValue((e) => !e)}
        >
          <FaBars size={20} />
          <p>Colums</p>
          {openColumValue ? (
            <FaCaretDown color="gray" size={20} />
          ) : (
            <FaCaretUp color="gray" size={20} />
          )}
        </div>
        {openColumValue && (
          <div
            ref={menuRef}
            className="absolute left-0 top-7 rounded-md flex flex-col border border-gray-300 w-[200px] bg-white "
          >
            {nameColum?.map((value, i) => (
              <div
                key={i}
                className={`${
                  i !== 13 && "border-b"
                } p-1 flex items-center justify-between  border-gray-300 text-center w-full hover:bg-gray-300 cursor-pointer`}
                onClick={() => toggleSelect(value)}
              >
                <p>{value}</p>
                {currentValueColumWorkConfirmation[value] && <p>✔</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
PartHeaderTableWork.propTypes = {
  setSearchWorkConfirmation: PropTypes.any,
};
