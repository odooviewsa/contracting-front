// EditButton.jsx
import PropTypes from 'prop-types';

function EditButton({ isSubmitting }) {
  return (
    <button
      type="submit"
      className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none disabled:bg-gray-400"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Updating..." : "Update Contract"}
    </button>
  );
}

export default EditButton;

EditButton.propTypes = {
    isSubmitting: PropTypes.func,
};