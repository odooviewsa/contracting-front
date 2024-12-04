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
import SureDeleteContract from "./SureDeleteContract";
import { useState } from "react";
export default function ModalDetails({
  contractId,
  setOpenModalDetails,
  refetch,
}) {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  return (
    <div className="absolute top-5 -left-12 flex flex-col bg-white w-44 z-50 rounded-lg border border-gray-300">
      <div className="flex gap-1 items-center hover:bg-blue-300 p-2 text-[0.8rem] border-b border-gray-300 hover:text-blue-700">
        <MdOutlineAppRegistration size={18} />
        <p>Open Estimator</p>
      </div>
      <div
        className="flex gap-1 items-center p-2 text-[0.8rem] border-b border-gray-300 hover:bg-blue-300 hover:text-blue-700"
        onClick={(e) => {
          navigate(`/${user?.companyName}/contracts/${contractId}/edit`);
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
          setOpenDeletePopup(true);
        }}
      >
        <MdDelete size={18} />
        <p>Delete</p>
        {openDeletePopup && (
          <SureDeleteContract
            setOpenDeleteContract={setOpenDeletePopup}
            setOpenModalDetails={setOpenModalDetails}
            refetchData={refetch}
            contractId={contractId}
          />
        )}
      </div>
    </div>
  );
}

ModalDetails.propTypes = {
  setOpenModalDetails: PropTypes.func.isRequired,
  contractId: PropTypes.string,
  refetch: PropTypes.func.isRequired,
};
