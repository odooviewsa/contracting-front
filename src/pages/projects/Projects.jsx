import { useState } from "react";
import AddProjectButton from "../projects/projectComponents/AddProject";
import ProjectTable from "../projects/projectComponents/ProjectTable";
import SummarySection from "../projects/projectComponents/SummaryCardProject";
import ProjectStatusChart from "../projects/projectComponents/ProjectStatusChart";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaRedo } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../axios/axios";
// import Loading from '../../componant/Loading';
import { ToastContainer } from "react-toastify";
import ProjectBlockSureDelete from "./projectComponents/ProjectBlockSureDelete";
import { useTranslation } from "react-i18next";
const fetchProjects = async (page) => {
  const url = `/api/projects/all?page=${page}&limit=5`;
  const response = await axiosInstance.get(url);
  return response.data;
};

const fetchSearchedProjects = async (searchQuery) => {
  const url = `/api/projects/search?projectName=${searchQuery}&projectManager=${searchQuery}&status=${searchQuery}`;
  const response = await axiosInstance.get(url);
  return response.data.data;
};

const fetchProjectStatusSummary = async () => {
  const response = await axiosInstance.get("/api/projects/status");
  return response.data;
};

export default function Projects() {
  const [overviewShow, setOverviewShow] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();
  const [sureDelete, setSureDelete] = useState(null);
  // Language
  const { t } = useTranslation();

  const {
    data: projectData,
    isLoading: isProjectLoading,
    error: projectError,
  } = useQuery({
    queryKey: ["projects", page],
    queryFn: () => fetchProjects(page),
    keepPreviousData: true,
  });

  const {
    data: searchedProjectData,
    // isLoading: isSearchLoading,
    error: searchError,
  } = useQuery({
    queryKey: ["searchedProjects", searchQuery],
    queryFn: () => fetchSearchedProjects(searchQuery),
    enabled: searchQuery.length > 0,
  });

  const {
    data: statusData,
    isLoading: isStatusLoading,
    error: statusError,
  } = useQuery({
    queryKey: ["projectStatus"],
    queryFn: fetchProjectStatusSummary,
  });

  if (projectError || statusError || searchError)
    return <p>Error loading data</p>;

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < projectData.totalPages) setPage(page + 1);
  };

  const startProject = (page - 1) * 5 + 1;
  const endProject = Math.min(page * 5, projectData?.totalProjects);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleResetSearch = () => {
    setSearchQuery("");
  };

  const displayProjects = searchQuery
    ? searchedProjectData
    : projectData?.projects;

  const refreshProjects = () => {
    queryClient.invalidateQueries(["projects", page]);
  };
  return (
    <div className="p-8">
      <ToastContainer />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">{t("ProjectsPage.title")}</h1>
        <TiArrowSortedDown
          size={25}
          cursor="pointer"
          className={`transform transition-transform duration-300 ${
            overviewShow ? "" : "rotate-90"
          }`}
          onClick={() => setOverviewShow((prev) => !prev)}
        />
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 items-start ${
          overviewShow ? "block" : "hidden"
        }`}
      >
        <div className="sm:col-span-2 lg:col-span-3">
          <SummarySection
            content={t("ProjectsPage.charts", { returnObjects: true })}
            totalProjects={statusData?.totalProjectsForUser}
            totalRevenue={statusData?.totalContractValueSum}
            totalCost={statusData?.totalContractValueSum}
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <ProjectStatusChart
            labels={t("ProjectsPage.statusChartLabels", {
              returnObjects: true,
            })}
            statusData={statusData?.countStatus}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder={t("ProjectsPage.searchBarPlaceholder")}
            value={searchQuery}
            onChange={handleSearch}
            className="border px-3 py-2 rounded-md w-full sm:w-60"
          />
          <div className="flex items-center">
            <FaRedo
              className="text-primaryColor"
              size={25}
              cursor={"pointer"}
              onClick={handleResetSearch}
            />
          </div>
        </div>
        <AddProjectButton>{t("ProjectsPage.addButton")}</AddProjectButton>
      </div>

      <ProjectTable
        content={t("ProjectsPage.table", {returnObjects: true})}
        projects={displayProjects}
        refreshProjects={refreshProjects}
        isStatusLoading={isStatusLoading}
        isProjectLoading={isProjectLoading}
        setSureDelete={setSureDelete}
      />
      {sureDelete && (
        <ProjectBlockSureDelete
          refreshProjects={refreshProjects}
          setSureDelete={setSureDelete}
          sureDelete={sureDelete}
        />
      )}
      <div className="flex justify-between items-center gap-4 mt-4 flex-col sm:flex-row">
        <span className="text-grayColor">
          {t("ProjectsPage.pagination.text").replace("{displaying}", `${startProject} - ${endProject}`).replace("{projects}", `${displayProjects?.totalProjects}`)}
        </span>
        <div className="flex gap-4">
          <button
            type="button"
            className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
            onClick={handlePrevious}
            disabled={page === 1}
          >
            {t("ProjectsPage.pagination.previousButton")}
          </button>
          <span className="flex items-center">
            {t("ProjectsPage.pagination.page").replace("{page}", page).replace("{projects}", `${displayProjects?.totalPages}`)}
          </span>
          <button
            type="button"
            className="text-white border border-primaryColor px-3 pt-1 pb-2 rounded-md bg-primaryColor"
            onClick={handleNext}
            disabled={page === displayProjects?.totalPages}
          >
            {t("ProjectsPage.pagination.nextButton")}
          </button>
        </div>
      </div>
    </div>
  );
}
