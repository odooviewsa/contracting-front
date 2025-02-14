import PropTypes from "prop-types";
import Loading from "../../../../componant/Loading";
import { useTranslation } from "react-i18next";
function DeductionSureDelete({
  setSureDeleteModel,
  handleDeleteDeduction,
  loading,
  deductionId,
}) {
  // Language
  const { t } = useTranslation();
  return (
    <div className=" fixed top-0 left-0  w-full flex justify-center bg-bgOverlay items-center h-full  p-5 z-50">
      <div className="bg-white rounded-lg shadow p-4  w-[300px]  text-textLabalForm flex flex-col items-center gap-5">
        <h1 className="font-bold text-[25px]">
          {t("ConfirmationForms.sureDelete.text")}
        </h1>
        <div className="flex items-center justify-between w-full gap-5">
          <button
            className="border rounded-md py-2 px-5 font-semibold"
            onClick={() => setSureDeleteModel(false)}>
            {t("ConfirmationForms.sureDelete.buttons.backButton")}
          </button>
          <button
            className="border rounded-md py-2 px-5 font-semibold text-white bg-red-500"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteDeduction(deductionId);
            }}>
            {loading ? (
              <div className="flex justify-center items-center">
                <Loading />
              </div>
            ) : (
              t("ConfirmationForms.sureDelete.buttons.deleteButton.text")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

DeductionSureDelete.propTypes = {
  setSureDeleteModel: PropTypes.func,
  handleDeleteDeduction: PropTypes.func,
  loading: PropTypes.bool,
  deductionId: PropTypes.number,
};

export default DeductionSureDelete;
