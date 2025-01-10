import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function ButtonLast({ onSubmit, isSubmitting }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNextClick = async () => {
    await onSubmit();
  };

  return (
    <div className="flex justify-end gap-4 mt-4">
      <button
        type="button"
        className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
        onClick={() => navigate(-1)}
      >
        {t("ContractsForms.buttons.backButton")}
      </button>
      <button
        onClick={handleNextClick}
        type="button"
        className={`text-white border border-primaryColor px-3 pt-1 pb-2 rounded-md ${
          isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-primaryColor"
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting
          ? t("ContractsForms.buttons.nextButton.loading")
          : t("ContractsForms.buttons.nextButton.text")}
      </button>
    </div>
  );
}

ButtonLast.propTypes = {
  onSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
};
