import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from "../../../../../../axios/axios";
import { useEffect, useState } from "react";

const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
};

const ProgressAnalysisTab = ({ workItem, workConfirmation, text }) => {
  const [totalQuantityOfWorkItem,setTotalQuantityOfWorkItem] = useState([])
  const contractId = workConfirmation ? String(workConfirmation.contractId._id) : null;
  // Get all work confirmations with contract id
  const {data: contractWorkConfirmations, error: errorContractWorkConfirmations,isLoading} = useQuery({
    queryKey: ["getAllWorkConfirmationsByContractId", contractId],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/api/workConfirmation/${contractId}/contract`)
        return res.data;
      } catch (err) {
        throw new Error(err.message);
      }
    }
  })
  useEffect(() => {
    if (!errorContractWorkConfirmations && contractWorkConfirmations) {
      let workItemsArray = []
      contractWorkConfirmations.forEach(workConfirmation => {
        workItemsArray.push(workConfirmation?.workItems.filter((item) => item.workItemId._id === workItem.workItemId._id)[0])
      })
      let totalQuantityOfWorkItemArray = workItemsArray.map((workItem) => workItem.totalQuantity)
      setTotalQuantityOfWorkItem(totalQuantityOfWorkItemArray)
    }
  }, [contractWorkConfirmations])
  const startDate = new Date(workConfirmation?.contractId.startDate);
  const endDate = new Date(workConfirmation?.contractId.endDate);
  const diffInMs = endDate.getTime() - startDate.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.ceil(diffInDays / 7);
  const diffInMonths = Math.ceil(diffInDays / 30);
  const diffInYears = Math.ceil(diffInDays / 365);
  const { i18n } = useTranslation();
  let labels = [];
  let progressData = [];

  if (diffInDays <= 1) {
    for (let i = 0; i < diffInHours; i++) {
      labels.push(`${i18n.dir() === "rtl" ? "الساعة": "Hour"} ${i + 1}`);
      progressData.push(workItem.totalQuantity * ((i + 1) / diffInHours));
    }
  } else if (diffInDays <= 7) {
    for (let i = 0; i < diffInDays; i++) {
      labels.push(`${i18n.dir() === "rtl" ? "اليوم" : "Day"} ${i + 1}`);
      progressData.push(workItem.totalQuantity * ((i + 1) / diffInDays));
    }
  } else if (diffInDays <= 30) {
    for (let i = 0; i < diffInWeeks; i++) {
      labels.push(`Week ${i + 1}`);
      progressData.push(workItem.totalQuantity * ((i + 1) / diffInWeeks));
    }
  } else if (diffInDays <= 365) {
    const currentMonth = startDate.getMonth();
    const currentYear = startDate.getFullYear();

    for (let i = 0; i < diffInMonths; i++) {
      const monthIndex = (currentMonth + i) % 12;
      const year = currentYear + Math.floor((currentMonth + i) / 12);
      const monthName = new Date(year, monthIndex).toLocaleString(
        i18n.dir() === "rtl" ? "ar-EG" : "en-US",
        {
          month: "long",
        }
      );
      labels.push(`${monthName} ${year}`);
      progressData.push(workItem.totalQuantity * ((i + 1) / diffInMonths));
    }
  } else {
    for (let i = 0; i < diffInYears; i++) {
      labels.push(`${i18n.dir() === "rtl" ? "السنة" :"Year"} ${i + 1}`);
      progressData.push(workItem.totalQuantity * ((i + 1) / diffInYears));
    }
  }

  const data = {
    labels,
    datasets: [
      {
        label: text,
        data: totalQuantityOfWorkItem,
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
