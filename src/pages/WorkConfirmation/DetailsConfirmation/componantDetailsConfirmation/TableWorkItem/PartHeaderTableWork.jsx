import { useContext, useEffect, useRef, useState } from "react";
import { ContextBOQ } from "../../../../../context/BOQContext";
import { FaBars, FaCaretDown, FaCaretUp } from "react-icons/fa6";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Button from "../../../../../componant/elements/Button";
import { IoPrintOutline } from "react-icons/io5";

export default function PartHeaderTableWork({
  setSearchWorkConfirmation,
  dispalyDate,
  setPrintButton,
}) {
  // Language
  const { t } = useTranslation();
  const [openColumValue, setOpenColumValue] = useState(false);
  const {
    currentValueColumWorkConfirmation,
    setCurrentValueColumWorkConfirmation,
  } = useContext(ContextBOQ);
  const nameColum = [
    {
      header: "work item",
      text: t("ConfirmationForms.BOQ.table.columns.workItem"),
      display: true,
    },
    {
      header: "Unit Of Measure",
      text: t("ConfirmationForms.BOQ.table.columns.unitOfMeasure"),
      display: true,
    },
    {
      header: "Contract Quantity",
      text: t("ConfirmationForms.BOQ.table.columns.contractQuantity"),
      display: true,
    },
    {
      header: "Previous Quantity",
      text: t("ConfirmationForms.BOQ.table.columns.previousQuantity"),
      display: true,
    },
    {
      header: "Current Work %",
      text: t("ConfirmationForms.BOQ.table.columns.currentWorkPercent"),
      display:
        dispalyDate?.data?.data?.typeOfProgress === "Percentage per Line",
    },
    {
      header: "Current Work QTY",
      text: t("ConfirmationForms.BOQ.table.columns.currentWorkQty"),
      display:
        dispalyDate?.data?.data?.typeOfProgress !== "Percentage per Line",
    },
    {
      header: "Current Work",
      text: t("ConfirmationForms.BOQ.table.columns.currentWork"),
      display:
        dispalyDate?.data?.data?.typeOfProgress === "Percentage per Line",
    },
    {
      header: "Total Quantity",
      text: t("ConfirmationForms.BOQ.table.columns.totalQuantity"),
      display: true,
    },
    {
      header: "Price",
      text: t("ConfirmationForms.BOQ.table.columns.price"),
      display: true,
    },
    {
      header: "Total Amount",
      text: t("ConfirmationForms.BOQ.table.columns.totalAmount"),
      display: true,
    },
    {
      header: "Completion %",
      text: t("ConfirmationForms.BOQ.table.columns.completionPercent"),
      display: dispalyDate?.data?.data?.completionPercentage === true,
    },
    {
      header: "Invoicing %",
      text: t("ConfirmationForms.BOQ.table.columns.invoicingPercent"),
      display: dispalyDate?.data?.data?.activateInvoicingByPercentage === true,
    },
    {
      header: "Net Amount",
      text: t("ConfirmationForms.BOQ.table.columns.netAmount"),
      display: true,
    },
    {
      header: "Duo Amount",
      text: t("ConfirmationForms.BOQ.table.columns.duoAmount"),
      display: true,
    },
    {
      header: "Calculate",
      text: t("ConfirmationForms.BOQ.table.columns.calculate"),
      display: true,
    },
  ];

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
  const handlePrintButton = () => {
    window.print()
  }
  return (
    <>
      <div className="print:hidden flex items-center gap-7 text-[0.9rem] flex-wrap">
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
            <p>{t("ConfirmationForms.BOQ.table.columnsText")}</p>
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
              {nameColum
                ?.filter((e) => e.display)
                .map((value, i) => (
                  <div
                    key={i}
                    className={`${
                      i !== 13 && "border-b"
                    } p-1 flex items-center justify-between  border-gray-300 text-center w-full hover:bg-gray-300 cursor-pointer`}
                    onClick={() => toggleSelect(value.header)}
                  >
                    <p>{value.text}</p>
                    {currentValueColumWorkConfirmation[value.header] && (
                      <p>✔</p>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
        <div>
          <Button
            onClick={() => {
              handlePrintButton()
              setPrintButton(true);
            }}
            className="flex gap-2 items-center !px-3"
          >
            <IoPrintOutline size={22} /> Print
          </Button>
        </div>
      </div>
    </>
  );
}
PartHeaderTableWork.propTypes = {
  setSearchWorkConfirmation: PropTypes.any,
};
