import { GiReceiveMoney } from "react-icons/gi";
import DetailsSection from "./DetailsSection";
import { FaBalanceScale, FaPercent } from "react-icons/fa";
import { MdRequestPage, MdStickyNote2 } from "react-icons/md";
import { FaDollarSign, FaFileInvoice, FaTags } from "react-icons/fa6";
import { RiDiscountPercentLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../../axios/axios";
import Loading from "../../../../componant/Loading";
import { useTranslation } from "react-i18next";

const ContractDetails = () => {
  const { t } = useTranslation();
  const [contractData, setContractData] = useState([]);
  const [financialData, setFinancialData] = useState([]);
  const [taxData, setTaxData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const response = await axiosInstance.get(`/api/contracts/${id}`);
        const data = response.data.data;
        console.log(data);
        setContractData([
          {
            label: t(
              "ContractsForms.summary.contractDetails.data.totalContract"
            ),
            value: data.totalContractValue || "$0.00",
            icon: <MdRequestPage className="text-[#AF52DE]" />,
          },
          {
            label: t(
              "ContractsForms.summary.contractDetails.data.totalAdditon"
            ),
            value: data.totalAddition || "$0.00",
            icon: <MdStickyNote2 className="text-[#F44771]" />,
          },
          {
            label: t(
              "ContractsForms.summary.contractDetails.data.otherDetection"
            ),
            value: data.totalDeduction || "$0.00",
            icon: <FaTags className="text-[#AF52DE]" />,
          },
          {
            label: t(
              "ContractsForms.summary.contractDetails.data.workGuarantee"
            ),
            value: "$0.00",
            icon: <FaPercent className="text-[#FF9500]" />,
          },
        ]);

        setFinancialData([
          {
            label: t(
              "ContractsForms.summary.financialDetails.data.totalAmount"
            ),
            value: "$0.00",
            icon: <GiReceiveMoney className="text-[#14BA6D]" />,
          },
          {
            label: t("ContractsForms.summary.financialDetails.data.totalValue"),
            value: "$0.00",
            icon: <FaFileInvoice className="text-[#27509E]" />,
          },
          {
            label: t(
              "ContractsForms.summary.financialDetails.data.outstandingAmount"
            ),
            value: "$0.00",
            icon: <FaBalanceScale className="text-[#FF9500]" />,
          },
          {
            label: t(
              "ContractsForms.summary.financialDetails.data.otherAddition"
            ),
            value: "$0.00",
            icon: <FaTags className="text-[#FF2D55]" />,
          },
        ]);

        setTaxData([
          {
            label: t("ContractsForms.summary.taxDetails.data.currentWork"),
            value: "$0.00",
            icon: <RiDiscountPercentLine className="text-[#AF52DE]" />,
          },
          {
            label: t("ContractsForms.summary.taxDetails.data.totalTax"),
            value: data.taxValue || "$0.00",
            icon: <FaDollarSign className="text-[#14BA6D]" />,
          },
        ]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contract data:", error);
        setIsLoading(false);
      }
    };

    fetchContractData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="w-8 h-8">
          <Loading />
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <DetailsSection
        title={t("ContractsForms.summary.contractDetails.text")}
        data={contractData}
      />
      <DetailsSection
        title={t("ContractsForms.summary.financialDetails.text")}
        data={financialData}
      />
      <DetailsSection
        title={t("ContractsForms.summary.taxDetails.text")}
        data={taxData}
      />
    </div>
  );
};

export default ContractDetails;
