import { useEffect, useRef, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Loading from "../../../componant/Loading";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import OptionsProject from "./OptionsProject";

const ProjectTable = ({ projects, isProjectLoading, setSureDelete }) => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(null);

  const [openMenu, setOpenMenu] = useState(false);
  const user = useSelector((state) => state?.user);
  // handleShowOptions
  function handleShowOptions(index) {
    setOpenMenu((e) => !e);
    setShowOptions((prev) => (index === prev ? null : index));
  }

  // close menu
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
        setShowOptions(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenMenu]);
  if (!projects || projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-60">
        <p className="text-primaryColor font-bold text-2xl">
          No Projects Found
        </p>
      </div>
    );
  }

  if (isProjectLoading) {
    return (
      <div className="flex items-center justify-center h-60">
        <Loading />
      </div>
    );
  }
  return (
    <div className="scrollbar min-h-[80vh] overflow-x-auto shadow-md">
      <table className="min-w-full bg-white rounded-lg">
        <thead>
          <tr className="bg-primaryColor text-white">
            <th className="p-4">Code</th>
            <th className="p-4">Project Name</th>
            <th className="p-4">Project Manager</th>
            <th className="p-4">Status</th>
            <th className="p-4">Details</th>
          </tr>
        </thead>
        <tbody>
          {isProjectLoading ? (
            <Loading />
          ) : (
            projects?.map((project, index) => (
              <tr
                key={index}
                className="text-center border-b cursor-pointer"
                onClick={() =>
                  navigate(
                    `/${user?.companyName}/projects/projectdetails/${project._id}`
                  )
                }
              >
                <td className="p-4">{project._id.slice(4, 8) || "#Unknown"}</td>
                <td className="p-4">{project.projectName}</td>
                <td className="p-4">{project.projectManger}</td>
                <td className="flex justify-center p-4">
                  <div
                    className={`flex items-center gap-2 ${
                      project.status === "in Progress"
                        ? "bg-red-200 text-red-600"
                        : project.status === "Planning"
                        ? "bg-yellow-200 text-yellow-600"
                        : "bg-green-200 text-green-800"
                    } text-[0.8rem] w-fit py-[1px] px-2 rounded-md`}
                  >
                    <FaCircle />
                    <p>{project.status}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="relative">
                    <div ref={menuRef}>
                      {openMenu && index === showOptions && (
                        <OptionsProject
                          item={project}
                          setShowOptions={setShowOptions}
                          setSureDelete={setSureDelete}
                        />
                      )}
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowOptions(index);
                      }}
                    >
                      <HiOutlineDotsHorizontal />
                    </div>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

ProjectTable.propTypes = {
  projects: PropTypes.any,
  isStatusLoading: PropTypes.bool,
  isProjectLoading: PropTypes.bool,
  setSureDelete: PropTypes.any,
};

export default ProjectTable;
