import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  IoAddOutline,
  IoLayersOutline,
  IoSearchOutline,
  IoStatsChartOutline,
  IoTimerOutline,
  IoWarningOutline,
} from "react-icons/io5";
import DetailsWidget from "../WorkConfirmation/DetailsConfirmation/componantDetailsConfirmation/TableWorkItem/DetailsWidget";
import Block from "../../componant/elements/Block";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axios/axios";
import moment from "moment/moment";
import Loading from "../../componant/Loading";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const QualityCheckPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 8;
  // Fetch the Quality Checks
  const { data, isLoading, error } = useQuery({
    queryKey: ["QualityChecks", currentPage],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/api/quality-check?page=${currentPage || 1}&limit=${itemsPerPage}`
        );
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });
  useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
      const filteredDataArr = data?.qualityChecks?.filter((item) => {
        return item.projectId.projectName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setFilteredData(filteredDataArr);
    } else {
      if (data && data.qualityChecks) {
        setFilteredData(data?.qualityChecks || []);
      }
    }
  }, [searchTerm, data]);

  const widgets = [
    {
      text: "Total Quality Checks",
      value: data?.totalQualityCheck || 0,
      icon: <IoLayersOutline size={24} />,
      iconColor: "text-blue-600",
    },
    {
      text: "Open Issues",
      value: data?.openIssues || 0,
      icon: <IoWarningOutline size={24} />,
      iconColor: "text-yellow-600",
    },
    {
      text: "In Progress",
      value: data?.inProgress || 0,
      icon: <IoTimerOutline size={24} />,
      iconColor: "text-purple-600",
    },
    {
      text: "Average ITP",
      value: `${data?.averageItp || 0}%`,
      icon: <IoStatsChartOutline size={24} />,
      iconColor: "text-green-600",
    },
  ];
  const table = [
    "QA Number",
    "Project",
    "Quality Engineer",
    "Category",
    "Status",
    "ITP %",
    "Date",
  ];
  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p className="text-center">{error}</p>
      </div>
    );
  }
  // Charts
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.raw}%`;
          },
        },
      },
    },
  };
  const labels = data?.qualityChecks
    ? data.qualityChecks.map((qc, i) => `QC-${qc._id.slice(0, 4)}`)
    : [];
  const datasets = [
    {
      label: "ITP %",
      data: data?.qualityChecks ? data?.qualityChecks.map((qc) => qc.itp) : [],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ];
  const dataChart = {
    labels,
    datasets,
  };
  return (
    <div className="flex flex-col gap-6">
      {/* Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {widgets.map((widget, i) => (
          <DetailsWidget key={i} className="!items-start" widget={widget} />
        ))}
      </div>
      {/* Status */}
      <Block>
        <div>
          <div>
            <h4 className="lead">ITP Progress by Project</h4>
          </div>
          {/* Chart */}
          {!isLoading ? (
            data?.qualityChecks?.length > 0 ? (
              <Bar options={options} data={dataChart} />
            ) : (
              <p>No data available</p>
            )
          ) : (
            <div className="flex items-center justify-center h-[20rem]">
              <Loading />
            </div>
          )}
        </div>
      </Block>
      {/* Table */}
      <Block>
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <h4 className="lead">Quality Checks List</h4>
            <div className="flex  gap-4">
              <form className="flex-1 flex flex-col md:flex-row gap-2 items-start md:items-center">
                <div>
                  <label
                    for="default-search"
                    className="mb-2 text-sm font-medium text-primaryColor sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <IoSearchOutline className="text-grayColor" />
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full p-2 ps-10 text-sm text-primaryColor border border-gray-300 rounded"
                      placeholder="Search by project"
                      required
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <select className="border border-gray-300 rounded p-2 bg-gray-50 text-grayColor text-sm">
                    <option value="">All Category</option>
                  </select>
                </div>
              </form>
              <div>
                <div className="flex justify-end">
                  <button className="text-blue-600 px-4 py-2 rounded-md flex items-center gap-1">
                    <IoAddOutline size={18} />
                    New Quality Check
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Table */}
          <div className="relative mt-4 pt-2 sm:rounded-lg">
            <div className="overflow-x-auto scrollbar">
              {!isLoading ? (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 bg-gray-50">
                    <tr>
                      {table.map((item, i) => (
                        <th key={i} scope="col" className="py-3">
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((quality, key) => (
                        <tr
                          key={key}
                          className="bg-white border-b border-gray-200 hover:bg-gray-50 *:py-4">
                          <td scope="row" title={`QA-${quality._id}`}>
                            QA-{quality._id.slice(0, 4)}
                          </td>
                          <td>{quality.projectId.projectName}</td>
                          <td>
                            {quality.qualityEngineer.firstName}{" "}
                            {quality.qualityEngineer.secondName}
                          </td>
                          <td>{quality.category}</td>
                          <td>
                            {
                              // In Progress
                              quality.status === "1" ? (
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">
                                  In Progress
                                </span>
                              ) : // Open by Quality Engineer
                              quality.status === "2" ? (
                                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">
                                  Open
                                </span>
                              ) : (
                                // Closed
                                quality.status === "3" && (
                                  <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">
                                    Closed
                                  </span>
                                )
                              )
                            }
                          </td>
                          <td>
                            <div className="flex flex-col gap-y-1">
                              <span className="text-xs text-grayColor">
                                {quality.itp}%
                              </span>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={`${
                                    // Red
                                    Number(quality.itp) < 30
                                      ? "bg-red-600"
                                      : // Yellow
                                      Number(quality.itp) < 80
                                      ? "bg-yellow-600"
                                      : // Green
                                        "bg-green-600"
                                  } h-1.5 rounded-full`}
                                  style={{ width: `${quality.itp}%` }}></div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {moment(quality.submittedDate).format("YYYY-MM-DD")}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <td colSpan={table.length} className="text-start py-10">
                        No Quality Checks found.
                      </td>
                    )}
                  </tbody>
                </table>
              ) : (
                <div className="flex items-center justify-center h-[20rem]">
                  <Loading />
                </div>
              )}
            </div>
            {!error && (
              <nav className="flex items-center justify-between pt-4">
                <span className="text-sm text-gray-500">
                  Showing <span className="font-semibold">{currentPage}</span>{" "}
                  of <span className="font-semibold">{data?.pages}</span>
                </span>
                <div className="flex space-x-2 text-sm">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed`}>
                    Previous
                  </button>
                  {Array.from({ length: data?.pages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 border rounded hover:bg-primaryColor hover:text-white  ${
                        currentPage === i + 1
                          ? "bg-primaryColor text-white"
                          : "bg-primaryColor/5"
                      }`}>
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, data?.pages))
                    }
                    disabled={currentPage === data?.pages}
                    className="px-3 py-1 border rounded disabled:opacity-50  disabled:cursor-not-allowed">
                    Next
                  </button>
                </div>
              </nav>
            )}
          </div>
        </div>
      </Block>
    </div>
  );
};

export default QualityCheckPage;
