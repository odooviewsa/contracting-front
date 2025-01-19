import { useEffect, useRef, useState } from "react";
import Avatar from "../../componant/Avatar";
import projectManger from "../../assets/images/man.png";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axios";
import { useSelector } from "react-redux";
import Header from "../../componant/layout/Header";
import { useTranslation } from "react-i18next";
import TableAllContract from "../contracts/componantContract/TableAllContract";
import BlockSureDeleteWork from "../WorkConfirmation/firstWorkConfirmation/componantFirstWorkConfirmation/BlockSureDeleteWork";
import TableWorkConfirmation from "../WorkConfirmation/firstWorkConfirmation/componantFirstWorkConfirmation/TableWorkConfirmation";
import NotFoundWorkConfirmation from "../WorkConfirmation/firstWorkConfirmation/componantFirstWorkConfirmation/NotFoundWorkConfirmation";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../componant/Loading";
import ModalDetailsWork from "../WorkConfirmation/firstWorkConfirmation/componantFirstWorkConfirmation/ModalDetailsWork";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaCircle } from "react-icons/fa6";

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [idContract, setIdContract] = useState(0);
  const contractsPerPage = 10;
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [work] = useState(true);
  const [openDeleteWorkId, setOpenDeleteWorkId] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state?.user);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/projects/${id}`);
        setProject(response.data.project);
      } catch (error) {
        setError(
          error.response
            ? error.response.data.message
            : "Error fetching project"
        );
      }
    };

    fetchProjectDetails();
  }, [id]);

  const [pageWork, setPageWork] = useState(1);
  const [openModalDetailsWork, setOpenModalDetailsWork] = useState(false);
  const [idContractWork, setIdContractWork] = useState(null);
  const trRef = useRef();
  // close menu
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenModalDetails(false);
        setIdContract(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenModalDetails]);
  const fetchWorkConfirmations = async (pageWork) => {
    const response = await axiosInstance.get(
      `/api/workConfirmation/${project._id}/project?page=${pageWork}&limit=20`
    );
    return response.data;
  };
  const {
    data: workConfirmationData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["workConfirmations", pageWork],
    queryFn: () => fetchWorkConfirmations(pageWork),
    keepPreviousData: true,
  });
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data!</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  if (!project) {
    return <div>Loading...</div>;
  }
  // Contracts
  return (
    <div className="p-8 min-h-screen relative">
      {/* Breadcrumb */}
      <div className="text-sm mb-6">
        <Header first={"Projects"} second={" ProjectDetails "} />
      </div>

      {/* Project Information */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0 justify-between">
          {t("ProjectDetailsPage.projectInfo", { returnObjects: true }).map(
            (info, key) =>
              info.isDate ? (
                <div key={key}>
                  <h3 className="text-lg font-semibold text-primaryColor">
                    {info.text}
                  </h3>
                  <p className="text-gray-700">
                    {new Date(project.startDate).toLocaleDateString()}
                  </p>
                </div>
              ) : info.isStatus ? (
                <div key={key}>
                  <h3 className="text-lg font-semibold text-primaryColor">
                    {info.text}
                  </h3>
                  <p
                    className={`font-semibold ${
                      project.status === "Completed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {project.status}
                  </p>
                </div>
              ) : (
                <div key={key}>
                  <h3 className="text-lg font-semibold text-primaryColor">
                    {info.text}
                  </h3>
                  <p className="text-gray-700">{project.projectName}</p>
                </div>
              )
          )}
        </div>
      </div>

      {/* Team Members and Project Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Team Members */}
        <div className="rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-primaryColor text-lg font-semibold">
              {t("ProjectDetailsPage.teamMember.title")}
            </h3>
            <button className="text-blue-500 text-sm">
              {t("ProjectDetailsPage.teamMember.seeAll")}
            </button>
          </div>
          <ul>
            {/* Project Manager */}
            <li className="flex items-center mb-4">
              <div className="mr-2">
                <Avatar
                  width={40}
                  round
                  className="mr-8"
                  imgUrl={projectManger}
                  img={projectManger}
                />
              </div>
              <div className="flex flex-col">
                <p className="text-gray-900 font-semibold">
                  {project.projectManger}
                </p>
                <p className="text-gray-500 font-thin text-sm">
                  Project Manager
                </p>
              </div>
            </li>

            {project?.teamMember?.map((member, index) => (
              <li key={index} className="flex items-center mb-4">
                <div className="mr-2">
                  <Avatar
                    width={40}
                    round
                    className="mr-8"
                    imgUrl={projectManger}
                    img={projectManger}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-900 font-semibold">{member}</p>
                  <p className="text-gray-500 font-thin text-sm">
                    Project Member
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Project Overview */}
        <div className="col-span-2 bg-white shadow-md rounded-lg p-6 border border-primaryColor">
          <h3 className="text-lg font-semibold mb-4 text-primaryColor">
            {t("ProjectDetailsPage.projectOverview")}
          </h3>
          <p className="text-gray-700 mb-4">{project.description}</p>
          <h3 className="text-lg font-semibold mb-2 text-primaryColor">
            {t("ProjectDetailsPage.scopeOfWork")}
          </h3>
          <ul className="list-decimal list-inside text-gray-700">
            {project.scopeOfWork}
          </ul>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate(`/${user?.companyName}/projects`)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 "
        >
          {t("ProjectDetailsPage.backButton")}
        </button>
      </div>
      {/* Contracts */}
      <div className="py-8">
        <div className="flex flex-col-reverse  gap-2 md:flex-row justify-between md:items-center mb-4">
          <h2 className="text-2xl font-bold text-primaryColor">
            {t("ProjectDetailsPage.contracts.headTitle")}
          </h2>
        </div>
        <TableAllContract
          contracts={project.contracts}
          setPage={setPage}
          page={page}
          totalPages={project.contracts.length}
          openModalDetails={openModalDetails}
          setOpenModalDetails={setOpenModalDetails}
          setIdContract={setIdContract}
          idContract={idContract}
          contractsPerPage={contractsPerPage}
        />
      </div>
      {/* Work Confirmation */}
      <div className="py-8">
        <div className="flex flex-col-reverse  gap-2 md:flex-row justify-between md:items-center mb-4">
          <h2 className="text-2xl font-bold text-primaryColor">
            {t("ProjectDetailsPage.workConfirmation.headTitle")}
          </h2>
        </div>
        <div>
          {workConfirmationData.workConfirmation?.length === 0 ? (
            <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
              {t("ConfirmationPage.table.noFound")}
            </div>
          ) : (
            <div>
              <div className="scrollbar min-h-[80vh] overflow-auto shadow-md">
                <table>
                  <thead>
                    <tr className="bg-primaryColor text-white">
                      {t("ConfirmationPage.table.items", {
                        returnObjects: true,
                      }).map((item, key) => (
                        <th className="thContract" key={key}>
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {workConfirmationData.workConfirmation?.map((work, i) => (
                      <tr
                        className="cursor-pointer w-full"
                        key={i}
                        onClick={() =>
                          navigate(
                            `/${user?.companyName}/workconfirm/addConfirmation/Details/${work._id}/${work?.contractId?._id}`
                          )
                        }
                        ref={trRef}
                      >
                        <td className="text-blue-600 thContract">
                          {work.contractType}
                        </td>
                        <td className="text-blue-600 thContract">
                          {work?.contractId?.code}
                        </td>
                        <td className="text-blue-600 thContract">
                          {work?.numberWithSpecificContract}
                        </td>
                        <td className="text-blue-600 thContract">
                          {new Date(work.startDate).toLocaleDateString()}
                        </td>
                        <td className="text-blue-600 thContract">
                          {work?.projectName?.projectName}
                        </td>
                        <td className="text-blue-600 thContract">
                          {work?.partner?.partnerName}
                        </td>
                        <td className="text-blue-600 thContract">
                          {work?.totalAmount?.toLocaleString("en-US")}
                        </td>
                        <td className="text-blue-600 thContract">
                          {work?.dueAmount?.toLocaleString("en-US")}
                        </td>
                        <td className={` thContract`}>
                          <div
                            className={`flex items-center gap-2 bg-green-200 h-fit text-green-800 text-[0.8rem] w-fit py-[1px] px-2 rounded-md`}
                          >
                            <FaCircle />
                            <p>{work?.status}</p>
                          </div>
                        </td>
                        <td
                          className="text-blue-800 thContract"
                          ref={menuRef}
                          onClick={(e) => {
                            e.stopPropagation();
                            setIdContractWork(work._id);
                            setOpenModalDetailsWork((prev) => !prev);
                          }}
                        >
                          <div className="flex justify-center relative">
                            {openModalDetailsWork && work._id === idContractWork && (
                              <ModalDetailsWork
                                workConfirmationId={work._id}
                                setOpenModalDetails={setOpenModalDetailsWork}
                                refetchData={refetch}
                              />
                            )}
                            <div>
                              <HiOutlineDotsVertical />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-gray-600 mt-2">
                  {t("ConfirmationPage.table.paggination", {
                    currentPage: workConfirmationData.currentPage,
                    totalPages: workConfirmationData.totalPages,
                  })}
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
                    onClick={() => setPageWork((prev) => prev - 1)}
                    disabled={workConfirmationData.currentPage === 1}
                  >
                    {t("ConfirmationPage.buttons.previousButton")}
                  </button>
                  <button
                    type="button"
                    className="text-white border border-primaryColor px-3 pt-1 pb-2 rounded-md bg-primaryColor"
                    onClick={() => setPageWork((prev) => prev + 1)}
                    disabled={
                      workConfirmationData.currentPage ===
                      workConfirmationData.totalPages
                    }
                  >
                    {t("ConfirmationPage.buttons.nextButton")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
