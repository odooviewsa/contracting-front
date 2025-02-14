import { useNavigate, useParams } from "react-router-dom";
import AdditionConfirmationTable from "./Components/AdditionConfirmationTable";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
function AdditionConfirmation() {
  // Language
  const { t } = useTranslation();
  const { id, contractId } = useParams();
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();

  return (
    <>
      <ToastContainer />
      <div>
        <AdditionConfirmationTable />

        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
            onClick={() => navigate(-1)}>
            {t("ContractsForms.addition.buttons.backButton")}
          </button>
          <button
            type="submit"
            onClick={() =>
              navigate(
                `/${user?.companyName}/workconfirm/addConfirmation/Details/${id}/${contractId}`
              )
            }
            className="text-white bg-primaryColor border border-primaryColor px-3 pt-1 pb-2 rounded-md">
            {t("ContractsForms.addition.buttons.nextButton")}
          </button>
        </div>
      </div>
    </>
  );
}

export default AdditionConfirmation;
