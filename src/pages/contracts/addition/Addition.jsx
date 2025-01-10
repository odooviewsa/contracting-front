import { useNavigate, useParams } from "react-router-dom";
import AdditionsTable from "./componantAddition/AdditionsTable";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function Addition() {
  // Language
  const {t} = useTranslation()
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const param = useParams();
  return (
    <div>
      <AdditionsTable />
      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
          onClick={() => navigate(-1)}
        >
          {t("ContractsForms.addition.buttons.backButton")}
        </button>
        <button
          type="submit"
          onClick={() =>
            navigate(
              `/${user?.companyName}/contracts/addContract/summary/${param.id}`
            )
          }
          className="text-white bg-primaryColor border border-primaryColor px-3 pt-1 pb-2 rounded-md"
        >
          {t("ContractsForms.addition.buttons.nextButton")}
        </button>
      </div>
    </div>
  );
}
