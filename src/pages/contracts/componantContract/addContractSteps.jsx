import { MdOutlineNoteAdd } from "react-icons/md";
import { IoListSharp } from "react-icons/io5";
import { FiMinusCircle } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { BiSticker } from "react-icons/bi";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function NavigationSteps() {
  // Language
  const { t } = useTranslation();
  const steps = [
    {
      name: t("ContractSteps.addContract"),
      icon: <MdOutlineNoteAdd />,
      path: "add-contract",
    },
    {
      name: "firstProgressDahedLine",
    },
    { name: t("ContractSteps.boq"), icon: <IoListSharp />, path: "BOQ" },
    {
      name: "secondProgressDahedLine",
    },
    {
      name: t("ContractSteps.deduction"),
      icon: <FiMinusCircle />,
      path: "deduction",
    },
    {
      name: "thirdProgressDahedLine",
    },
    {
      name: t("ContractSteps.addition"),
      icon: <FiPlusCircle />,
      path: "addition",
    },
    {
      name: "forthProgressDahedLine",
    },
    {
      name: t("ContractSteps.summary"),
      icon: <BiSticker />,
      path: "summary",
    },
    {
      name: "forthProgressDahedLine",
    },
    {
      name: t("ContractSteps.summaryReports"),
      icon: <BiSticker />,
      path: "summaryReports",
    },
  ];
  const location = useLocation();
  const [totalIndex, setTotalIndex] = useState(0);
  useEffect(() => {
    if (location?.pathname.includes("addContract")) {
      setTotalIndex(0);
    }
    if (location?.pathname.includes("BOQ")) setTotalIndex(2);
    if (location?.pathname.includes("deduction")) setTotalIndex(4);
    if (location?.pathname.includes("addition")) setTotalIndex(6);
    if (location?.pathname.includes("summary")) setTotalIndex(8);
    if (location?.pathname.includes("summaryReports")) setTotalIndex(10);
  }, [location?.pathname]);
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    if (path !== "add-contract") {
      navigate(
        location.pathname.replace(location.pathname.split("/")[4], path)
      );
    } else {
      if (location.pathname.split("/").length > 4) {
        navigate("");
      } else {
        navigate(
          location.pathname.replace(location.pathname.split("/")[4], path)
        );
      }
    }
  };
  return (
    <div className="print:hidden flex flex-row items-center justify-between  gap-2 sm:gap-8 md:gap-5   flex-nowrap  md:py-8">
      {steps.map((step, index) =>
        step.name.includes("ProgressDahedLine") ? (
          <div
            key={step.name}
            onClick={() => handleNavigate(step.path)}
            className={`w-[120px] border-t-2 border-dashed hidden sm:block ${
              index <= totalIndex
                ? "border-blue-500 transition-all duration-300 "
                : "border-gray-300"
            }`}></div>
        ) : (
          <div
            key={index}
            onClick={() => handleNavigate(step.path)}
            className={`flex flex-row gap-3 items-center  ${
              index <= totalIndex ? "text-blue-500" : "text-gray-500"
            }`}>
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full ${
                  index <= totalIndex
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}>
                <span className="text-lg md:text-4xl">{step.icon}</span>
              </div>
              <span className="mt-2 text-[8px] md:text-sm text-center">
                {step.name}
              </span>
            </div>
          </div>
        )
      )}
    </div>
  );
}
