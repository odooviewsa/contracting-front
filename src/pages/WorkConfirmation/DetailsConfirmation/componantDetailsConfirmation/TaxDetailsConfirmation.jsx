import { IoIosArrowDown } from "react-icons/io";
import OneBlockWorkConfirmation from "./OneBlockWorkConfirmation";
import discount from "../../../../assets/images/iconamoon_discount.png";
import dollor from "../../../../assets/images/bx_dollar.png";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
export default function TaxDetailsConfirmation() {
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
          TAX Detils
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

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(0,_260px))] smm:grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-3">
        {[
          {
            label: "Total Untaxed Amount",
            value: "$0.00",
            icon: <img src={discount} alt="victor" className="w-full h-full" />,
          },
          {
            label: "Tax Amount",
            value: "$0.00",
            icon: <img src={dollor} alt="victor" className="w-full h-full" />,
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
