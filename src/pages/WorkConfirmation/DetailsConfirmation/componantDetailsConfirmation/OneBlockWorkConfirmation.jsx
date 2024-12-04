import PropTypes from "prop-types";
export default function OneBlockWorkConfirmation({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg relative">
      <div className="w-12 h-12">{icon}</div>
      <div className="text-sm text-[#06385C] font-semibold mb-8 mt-2 text-center ">
        {label}
      </div>
      <div className="text-lg mt-1 text-[#06385C] font-bold absolute bottom-5">
        {value}
      </div>
    </div>
  );
}

OneBlockWorkConfirmation.propTypes = {
  icon: PropTypes.any,
  label: PropTypes.any,
  value: PropTypes.any,
};
