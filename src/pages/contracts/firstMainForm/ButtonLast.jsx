import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ButtonLast({ onSubmit, isSubmitting }) {
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
        Back
      </button>
      <button
        onClick={handleNextClick}
        type="button"
        className={`text-white border border-primaryColor px-3 pt-1 pb-2 rounded-md ${
          isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-primaryColor"
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Next"}
      </button>
    </div>
  );
}

ButtonLast.propTypes = {
  onSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
};
