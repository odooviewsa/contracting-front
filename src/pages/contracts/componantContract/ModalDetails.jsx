import {
  MdOutlineAppRegistration,
  MdDelete,
  MdOutlineAttachment,
} from "react-icons/md";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { FaEdit, FaUserFriends } from "react-icons/fa";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ModalDetails({ contract, setOpenDeletePopup }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);

  return (
    <div className="absolute top-5 -left-12 flex flex-col bg-white w-44 z-50 rounded-lg border border-gray-300">
      <div
        className="flex gap-1 items-center hover:bg-blue-300 p-2 text-[0.8rem] border-b border-gray-300 hover:text-blue-700"
        onClick={() => navigate(`/${user?.companyName}/estimation`)}
      >
        <MdOutlineAppRegistration size={18} />
        <p>Open Estimator</p>
      </div>
      <div
        className="flex gap-1 items-center p-2 text-[0.8rem] border-b border-gray-300 hover:bg-blue-300 hover:text-blue-700"
        onClick={(e) => {
          navigate(`/${user?.companyName}/contracts/${contract._id}/edit`, {
            state: contract,
          });
          e.stopPropagation();
        }}
      >
        <FaEdit size={18} />
        <p>Edit</p>
      </div>
      <div className="flex gap-1 items-center p-2 text-[0.8rem] border-b border-gray-300 hover:bg-blue-300 hover:text-blue-700">
        <FaUserFriends size={18} />
        <p>Assign to Subcontractor</p>
      </div>
      <div className="flex gap-1 items-center p-2 text-[0.8rem] border-b border-gray-300 hover:bg-blue-300 hover:text-blue-700">
        <FaFileCircleQuestion size={18} />
        <p>Create Quotation</p>
      </div>
      <div className="flex gap-1 items-center p-2 text-[0.8rem] border-b border-gray-300 hover:bg-blue-300 hover:text-blue-700">
        <MdOutlineAttachment size={18} />
        <p>Attach Document</p>
      </div>
      <div
        className="flex gap-1 items-center p-2 text-[0.8rem] border-b border-gray-300 text-red-700 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setOpenDeletePopup(contract._id);
        }}
      >
        <MdDelete size={18} />
        <p>Delete</p>
      </div>
    </div>
  );
}

ModalDetails.propTypes = {
  setOpenDeletePopup: PropTypes.func.isRequired,
  contract: PropTypes.any,
  refetch: PropTypes.func.isRequired,
};
