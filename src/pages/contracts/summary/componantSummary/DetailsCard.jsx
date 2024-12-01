import PropTypes from 'prop-types';
const DetailsCard = ({ icon, label, value }) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg relative">
      <div className="text-4xl">{icon}</div>
      <div className="text-sm text-[#06385C] font-semibold mb-8 mt-2 text-center ">{label}</div>
      <div className="text-lg mt-1 text-[#06385C] font-bold absolute bottom-5">{value}</div>
    </div>
  );
};

export default DetailsCard;

DetailsCard.propTypes = {
  icon: PropTypes.element.isRequired, 
  label: PropTypes.string, 
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
};
