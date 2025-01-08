import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const ProjectStatusChart = ({labels, statusData }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: statusData?.map(status => status.count),
        backgroundColor: ['#4CAF50', '#FFEB3B', '#FF5722'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          boxWidth: 12,
          font: {
            weight: 'bold',
            size: 14,
          },
          padding: 15,
        },
      },
      tooltip: {
        enabled: true,
      },
      // Plugin to add text in the center
      centerText: {
        display: true,
        text: 'Project Status',
      },
    },
  };

  return (
    <div className="max-w-[300px] mx-auto">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ProjectStatusChart;
