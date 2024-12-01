import DetailsCard from "./DetailsCard";
import PropTypes from "prop-types";

const DetailsSection = ({ title, data }) => (
  <>
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <DetailsCard
            key={index}
            label={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  </>
);

export default DetailsSection;

DetailsSection.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};
