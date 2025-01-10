import { useNavigate, useParams } from "react-router-dom";
import DeductionsTable from "./componantDeduction/DeductionsTable";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
export default function Deduction() {
  // Language
  const {t} = useTranslation()
  const { id } = useParams();
  const user = useSelector((state) => state?.user);

  const navigate = useNavigate();
  return (
    <div>
      <DeductionsTable />
      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
          onClick={() => navigate(-1)}
        >
          {t("ContractsForms.deduction.buttons.backButton")}
        </button>
        <button
          type="submit"
          onClick={() =>
            navigate(
              `/${user?.companyName}/contracts/addContract/addition/${id}`
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
