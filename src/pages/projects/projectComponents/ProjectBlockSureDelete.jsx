import { useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../axios/axios";
import PropTypes from "prop-types";

function ProjectBlockSureDelete({
  item,
  setShowOptions,
  refreshProjects,
  setSureDelete,
}) {
  const [loading, setLoading] = useState(false);

  const handleDeleteProject = async () => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/projects/${item._id}`);

      refreshProjects();
      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Error deleting project");
    } finally {
      setLoading(false);
      setSureDelete(false);
      setShowOptions(null);
    }
  };
  return (
    <div className=" fixed top-0 left-0  w-full flex justify-center bg-bgOverlay items-center h-full  p-5 z-50">
      <div className="bg-white rounded-lg shadow p-5  w-[300px]  text-textLabalForm flex flex-col items-center gap-5">
        <h1 className="font-bold text-[2rem]">Are You Sure !</h1>
        <div className="flex items-center justify-between w-full gap-5">
          <button className="border rounded-md py-2 px-5 font-semibold">
            Back
          </button>
          <button
            className="border rounded-md py-2 px-5 font-semibold text-white bg-red-500"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteProject();
            }}
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectBlockSureDelete;

ProjectBlockSureDelete.propTypes = {
  refreshProjects: PropTypes.func,
  setShowOptions: PropTypes.func,
  handleDeleteProject: PropTypes.func,
  setSureDelete: PropTypes.func,

  item: PropTypes.object,
};
