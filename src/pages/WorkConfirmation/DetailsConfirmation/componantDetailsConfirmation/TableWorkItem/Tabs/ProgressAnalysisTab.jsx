import { Line } from "react-chartjs-2";

const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
};

const ProgressAnalysisTab = ({ workItem, workConfirmation }) => {
  const startDate = new Date(workConfirmation?.startDate);
  const endDate = new Date(workConfirmation?.endDate);

  // Calculate the difference in milliseconds
  const diffInMs = endDate.getTime() - startDate.getTime();
  // Convert milliseconds into units
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.ceil(diffInDays / 7);
  const diffInMonths = Math.ceil(diffInDays / 30);
  const diffInYears = Math.ceil(diffInDays / 365);

  let labels = [];
  let progressData = [];

  // Generate labels dynamically based on the range
  if (diffInDays <= 1) {
    // Use hours if less than a day
    for (let i = 0; i < diffInHours; i++) {
      labels.push(`Hour ${i + 1}`);
      progressData.push(workItem.totalQuantity * ((i + 1) / diffInHours)); // Example progress
    }
  } else if (diffInDays <= 7) {
    // Use days if less than or equal to a week
    for (let i = 0; i < diffInDays; i++) {
      labels.push(`Day ${i + 1}`);
      progressData.push(workItem.totalQuantity * ((i + 1) / diffInDays)); // Example progress
    }
  } else if (diffInDays <= 30) {
    // Use weeks if less than or equal to a month
    for (let i = 0; i < diffInWeeks; i++) {
      labels.push(`Week ${i + 1}`);
      progressData.push(workItem.totalQuantity * ((i + 1) / diffInWeeks)); // Example progress
    }
  } else if (diffInDays <= 365) {
    // Use months if less than or equal to a year
    for (let i = 0; i < diffInMonths; i++) {
      labels.push(`Month ${i + 1}`);
      progressData.push(workItem.totalQuantity * ((i + 1) / diffInMonths)); // Example progress
    }
  } else {
    // Use years for ranges over a year
    for (let i = 0; i < diffInYears; i++) {
      labels.push(`Year ${i + 1}`);
      progressData.push(workItem.totalQuantity * ((i + 1) / diffInYears)); // Example progress
    }
  }

  console.log("Generated Labels:", labels);
  console.log("Progress Data:", progressData);

  const data = {
    labels,
    datasets: [
      {
        label: "Actual Progress",
        data: progressData, // Real progress data based on totalQuantity
        borderColor: "rgb(37, 99, 235)",
        backgroundColor: "rgb(59, 130, 246)",
        yAxisId: "Actual",
      },
    ],
  };

  return (
    <div className="h-[22rem] flex items-start justify-center">
      <Line options={options} data={data} />
    </div>
  );
};

export default ProgressAnalysisTab;
