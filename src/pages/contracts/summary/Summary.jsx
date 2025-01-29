import { useNavigate, useParams } from "react-router-dom";
import ContractDetails from "./componantSummary/ContractDetails";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function Summary() {
  // Language
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state?.user);

  return (
    <div>
      <ContractDetails />
      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
          onClick={() => navigate(-1)}
        >
          {t("ContractsForms.summary.backButton")}
        </button>
        <button
          type="submit"
          onClick={() =>
            navigate(
              `/${user?.companyName}/contracts/addContract/summaryReports/${id}`
            )
          }
          className="text-white bg-primaryColor border border-primaryColor px-3 pt-1 pb-2 rounded-md"
        >
          {t("ContractsForms.deduction.buttons.nextButton")}
        </button>
      </div>
    </div>
  );
}
