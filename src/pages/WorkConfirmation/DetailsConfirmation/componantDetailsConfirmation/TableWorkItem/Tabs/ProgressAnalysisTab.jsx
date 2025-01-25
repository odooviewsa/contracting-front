import { Line } from "react-chartjs-2";

const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
};
const data = {
  labels,
  datasets: [
    {
      label: "Actual",
      data: [160,60,-56,600],
      borderColor: "rgb(37, 99, 235)",
      backGroundColor: "rgb(59, 130, 246)",
      yAxisId: "Actual",
    },
  ],
};
const ProgressAnalysisTab = () => {
  return (
    <div className="h-[22rem] flex items-start justify-center">
      <Line options={options} data={data} />
    </div>
  );
};
export default ProgressAnalysisTab;
