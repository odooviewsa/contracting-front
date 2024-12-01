import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";
import BlockSureDeleteWork from "./BlockSureDeleteWork";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ModalDetailsWork({
  workConfirmationId,
  setOpenModalDetails,
  refetchData,
}) {
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);

  return (
    <div className="absolute top-5 -left-5 flex flex-col bg-white w-44 z-20 rounded-lg border border-gray-300">
      <button
        className="flex gap-1 items-center p-2 text-[0.8rem] border-b border-gray-300 hover:bg-blue-300 hover:text-blue-700"
        onClick={(e) => {
          e.stopPropagation();
          navigate(
            `/${user?.companyName}/workconfirm/addConfirmation/${workConfirmationId}/edit`
          );
        }}
      >
        <FaEdit size={18} />
        <p>Edit</p>
      </button>

      <button
        className="flex gap-1 items-center p-2 text-[0.8rem] border-b border-gray-300 text-red-700 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setOpenDeletePopup(true);
        }}
      >
        <MdDelete size={18} />
        <p>Delete</p>
      </button>

      {openDeletePopup && (
        <BlockSureDeleteWork
          setOpenDeleteWorkId={setOpenDeletePopup}
          setOpenModalDetails={setOpenModalDetails}
          refetchData={refetchData}
          workConfirmationId={workConfirmationId}
        />
      )}
    </div>
  );
}

ModalDetailsWork.propTypes = {
  workConfirmationId: PropTypes.string.isRequired,
  setOpenModalDetails: PropTypes.func.isRequired,
  refetchData: PropTypes.func.isRequired,
};
