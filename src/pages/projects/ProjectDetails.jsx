import { useEffect, useState } from "react";
import Avatar from "../../componant/Avatar";
import projectManger from "../../assets/images/man.png";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axios";
import { useSelector } from "react-redux";
import Header from "../../componant/layout/Header";

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state?.user);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/projects/${id}`);
        console.log(response.data.project);
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

  if (error) {
    return <div>{error}</div>;
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 min-h-screen relative">
      {/* Breadcrumb */}
      <div className="text-smmb-6">
        <Header first={"Projects"} second={" ProjectDetails "} />
      </div>

      {/* Project Information */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0 justify-between">
          <div>
            <h3 className="text-lg font-semibold text-primaryColor">
              Project Name
            </h3>
            <p className="text-gray-700">{project.projectName}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primaryColor">
              Client Name
            </h3>
            <p className="text-gray-700">{project.clientName}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primaryColor">
              Project Location
            </h3>
            <p className="text-gray-700">{project.projectLocation}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primaryColor">
              Start Date
            </h3>
            <p className="text-gray-700">
              {new Date(project.startDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primaryColor">
              End Date
            </h3>
            <p className="text-gray-700">
              {new Date(project.endDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primaryColor">Budget</h3>
            <p className="text-gray-700">${project.budget}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primaryColor">Status</h3>
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
        </div>
      </div>

      {/* Team Members and Project Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Team Members */}
        <div className="rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-primaryColor text-lg font-semibold">
              Team Member
            </h3>
            <button className="text-blue-500 text-sm">See All</button>
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
            Project Overview
          </h3>
          <p className="text-gray-700 mb-4">{project.description}</p>
          <h3 className="text-lg font-semibold mb-2 text-primaryColor">
            Scope of Work
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
          Back
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
