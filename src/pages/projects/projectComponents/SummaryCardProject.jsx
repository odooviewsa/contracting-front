import PropTypes from "prop-types";

const SummaryCard = ({ title, value, bgColor, circleColor1, circleColor2 }) => (
  <div
    className={`relative w-full h-32 ${bgColor} rounded-lg p-4 text-white overflow-hidden`}
  >
    {/* Background Circles */}
    <div
      className={`absolute w-24 h-24 ${circleColor1} opacity-50 rounded-full top-0 left-0 transform translate-x-6 -translate-y-4`}
    ></div>
    <div
      className={`absolute w-32 h-32 ${circleColor2} opacity-50 rounded-full top-0 right-0 transform -translate-x-6 -translate-y-4`}
    ></div>

    {/* Content */}
    <div className="relative z-10">
      <p className="text-2xl font-medium">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

SummaryCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bgColor: PropTypes.string,
  circleColor1: PropTypes.string,
  circleColor2: PropTypes.string,
};

const SummarySection = ({
  content,
  totalProjects,
  totalRevenue,
  totalCost,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
    {content?.map((item, key) => (
      <SummaryCard
        key={key}
        title={item.title}
        value={totalProjects?.toLocaleString("en-US")}
        bgColor={item.bgColor}
        circleColor1={item.circleColor1}
        circleColor2={item.circleColor2}
      />
    ))}
  </div>
);

SummarySection.propTypes = {
  totalProjects: PropTypes.number,
  totalRevenue: PropTypes.number,
  totalCost: PropTypes.number,
};

export default SummarySection;
