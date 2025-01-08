import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OptionsProject({content, item, setShowOptions, setSureDelete }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);

  return (
    <div className="absolute top-5 left-2 flex flex-col bg-white w-24 z-20 rounded-lg border border-gray-300">
      <div
        className="flex gap-1 items-center p-2 text-[0.8rem] border-b border-gray-300 hover:bg-blue-300 hover:text-blue-700"
        onClick={(e) => {
          e.stopPropagation();
          setShowOptions(false);
          navigate(`/${user?.companyName}/projects/updateproject/${item._id}`);
        }}
      >
        <FaEdit size={18} />
        <p>{content.edit}</p>
      </div>
      <div
        className="flex gap-1 items-center p-2 text-[0.8rem] border-b border-gray-300 text-red-700 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setShowOptions(false);
          setSureDelete(item._id);
        }}
      >
        <MdDelete size={18} />
        <p>{content.delete}</p>
      </div>
    </div>
  );
}

export default OptionsProject;
OptionsProject.propTypes = {
  setOpenEfitPartnerId: PropTypes.func,
  setShowOptions: PropTypes.func,
  handleDeleteProject: PropTypes.func,
  setSureDelete: PropTypes.func,

  item: PropTypes.object,
};
