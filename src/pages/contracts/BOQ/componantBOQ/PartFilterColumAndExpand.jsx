import { useContext, useEffect, useRef, useState } from "react";
import { FaCaretDown, FaCaretUp, FaExpandAlt } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { BiReset } from "react-icons/bi";
import save from "../../../../assets/images/save.jpg";
import { ContextBOQ } from "../../../../context/BOQContext";
import IncludeTaxAndDownPayment from "./IncludeTaxAndDownPayment";
import PropTypes from "prop-types";
export default function PartFilterColumAndExpand({ includeTax, DownPayment }) {
  const [openColumValue, setOpenColumValue] = useState(false);
  const {
    currentValueColum,
    setCurrentValueColum,
    idOnlyOpen,
    setIdOnlyOpen,
    allIdMainItemAndSubItemAndWorkItem,
  } = useContext(ContextBOQ);
  const nameColum = [
    "Unit Of Measure",
    "Assigned Quantity",
    "Previous Quantity",
    "Remaining Quantity",
    "Financial Category",
    "Price",
    "Total",
  ];
  const toggleSelect = (name) => {
    setCurrentValueColum((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  function handleExpand() {
    if (idOnlyOpen?.length > 0) {
      return setIdOnlyOpen([]);
    } else {
      setIdOnlyOpen(() => [...allIdMainItemAndSubItemAndWorkItem]);
    }
  }
  // close filter colum
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
    <>
      <div className="flex md:flex-row flex-col md:items-center justify-between">
        <div className="flex items-center gap-7 text-[0.9rem] flex-wrap">
          {/* //colums */}
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
                      i !== 6 && "border-b"
                    } p-1 flex items-center justify-between  border-gray-300 text-center w-full hover:bg-gray-300 cursor-pointer`}
                    onClick={() => toggleSelect(value)}
                  >
                    <p>{value}</p>
                    {currentValueColum[value] && <p>✔</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* // expand */}
          <div className="relative">
            <div
              className="flex items-center gap-1 cursor-pointer "
              onClick={handleExpand}
            >
              <FaExpandAlt size={20} />
              <p>Expand</p>
              {idOnlyOpen?.length > 0 ? (
                <FaCaretDown color="gray" size={20} />
              ) : (
                <FaCaretUp color="gray" size={20} />
              )}
            </div>
          </div>
          {/* // reset */}
          <div className="relative">
            <div
              className="flex items-center gap-1 cursor-pointer "
              onClick={() => setIdOnlyOpen([])}
            >
              <BiReset size={20} />
              <p>Reset</p>
            </div>
          </div>
        </div>
        <div className="flex -ml-4 items-center cursor-pointer text-primaryColor">
          <img src={save} alt="save" className="w-12" />
          <p className="-ml-2 text-[0.9rem]">Save as a Templete</p>
        </div>
      </div>
      <IncludeTaxAndDownPayment
        includeTax={includeTax}
        DownPayment={DownPayment}
      />
    </>
  );
}
PartFilterColumAndExpand.propTypes = {
  includeTax: PropTypes.number,
  DownPayment: PropTypes.number,
};
