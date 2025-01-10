import { IoIosArrowDown } from "react-icons/io";
import OneBlockWorkConfirmation from "./OneBlockWorkConfirmation";
import { FaPercent, FaTags } from "react-icons/fa6";
import { MdRequestPage, MdStickyNote2 } from "react-icons/md";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
export default function ContractDetailsConfirmation({ data, totalAmount }) {
  // Language
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef();

  const updateHeight = () => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);
  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-3 p-3 rounded-lg shadowWork overflow-hidden"
      animate={{
        height: open ? height : 50,
      }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between">
        <h4 className="text-blue-950 font-semibold text-[0.8rem] md:text-[1rem]">
          {t("ConfirmationForms.BOQ.cuntractDetails.title")}
        </h4>
        <motion.div
          className="cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <IoIosArrowDown
            size={25}
            color="#777"
            className={`transform transition-transform ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </motion.div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(0,_260px))] smm:grid-cols-[repeat(auto-fit,_minmax(250px,1fr))]  gap-5">
        {[
          {
            label: t("ConfirmationForms.BOQ.cuntractDetails.data.totalContract"),
            value: data?.contractId?.totalContractValue,
            icon: <MdRequestPage className="text-[#AF52DE]" size={50} />,
          },
          {
            label: t("ConfirmationForms.BOQ.cuntractDetails.data.totalWorkConfirmation"),
            value: totalAmount,
            icon: <MdStickyNote2 className="text-[#F44771]" size={50} />,
          },
          {
            label: t("ConfirmationForms.BOQ.cuntractDetails.data.workGuarantee"),
            value: "$0.00",
            icon: <FaPercent className="text-[#f46a47]" size={50} />,
          },
          {
            label: t("ConfirmationForms.BOQ.cuntractDetails.data.otherDetection"),
            value: data?.totalDeduction,
            icon: <FaTags className="text-[#AF52DE]" size={50} />,
          },
          {
            label: t("ConfirmationForms.BOQ.cuntractDetails.data.totalAdditions"),
            value: data?.totalAddition,
            icon: <FaTags className="text-[#AF52DE]" size={50} />,
          },
          {
            label: t("ConfirmationForms.BOQ.cuntractDetails.data.remainingAmount"),
            value: "$0.00",
            icon: <FaTags className="text-[#AF52DE]" size={50} />,
          },
        ].map((e, i) => (
          <OneBlockWorkConfirmation
            key={i}
            icon={e.icon}
            label={e.label}
            value={e.value}
          />
        ))}
      </div>
    </motion.div>
  );
}
ContractDetailsConfirmation.propTypes = {
  data: PropTypes.any,
  totalAmount: PropTypes.any,
};
