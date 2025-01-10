import { IoIosArrowDown } from "react-icons/io";
import OneBlockWorkConfirmation from "./OneBlockWorkConfirmation";
import money1 from "../../../../assets/images/maney1.png";
import block from "../../../../assets/images/block2.png";
import close from "../../../../assets/images/close3.png";
import money4 from "../../../../assets/images/money4.png";
import victor from "../../../../assets/images/Vector.png";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
export default function CurrentWorkConfirmationDetails({ data }) {
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
          {t("ConfirmationForms.BOQ.currentWork.title")}
        </h4>

        <motion.div
          className="cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <IoIosArrowDown
            size={23}
            color="#777"
            className={`transform transition-transform ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(0,_260px))] smm:grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-3">
        {[
          {
            label: t("ConfirmationForms.BOQ.currentWork.data.totalCurrent"),
            value: data?.totalAmount,
            icon: <img src={money1} alt="victor" className="w-full h-full" />,
          },
          {
            label: t("ConfirmationForms.BOQ.currentWork.data.guaranteeDeduction"),
            value: "$0.00",
            icon: <img src={block} alt="victor" className="w-full h-full" />,
          },
          {
            label: t("ConfirmationForms.BOQ.currentWork.data.totalOtherDeductions"),
            value: data?.totalDeduction,
            icon: <img src={close} alt="victor" className="w-full h-full" />,
          },
          {
            label: t("ConfirmationForms.BOQ.currentWork.data.totalAdditions"),
            value: data?.totalAddition,
            icon: <img src={money4} alt="victor" className="w-full h-full" />,
          },
          {
            label: t("ConfirmationForms.BOQ.currentWork.data.dueAmount"),
            value: data?.dueAmount,
            icon: <img src={victor} alt="victor" className="w-full h-full" />,
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
CurrentWorkConfirmationDetails.propTypes = {
  data: PropTypes.any,
};
