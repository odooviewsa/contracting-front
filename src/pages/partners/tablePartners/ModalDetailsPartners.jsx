import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";

export default function ModalDetailsPartners({
  setOpenEfitPartnerId,
  item,
  setOpenModalDetails,
  setOpenDeletePartnerId,
}) {
  return (
    <div className="absolute top-5 left-2 flex flex-col bg-white w-24 z-20 rounded-lg border border-gray-300">
      <div
        className="flex gap-1 items-center p-2 text-[0.8rem] border-b border-gray-300 hover:bg-blue-300 hover:text-blue-700"
        onClick={() => {
          setOpenModalDetails(false);
          setOpenEfitPartnerId(item);
        }}
      >
        <FaEdit size={18} />
        <p>Edit</p>
      </div>
      <div
        className="flex gap-1 items-center p-2 text-[0.8rem] border-b border-gray-300 text-red-700 cursor-pointer"
        onClick={() => {
          setOpenModalDetails(false);
          setOpenDeletePartnerId(item._id);
        }}
      >
        <MdDelete size={18} />
        <p>Delete</p>
      </div>
    </div>
  );
}
ModalDetailsPartners.propTypes = {
  setOpenEfitPartnerId: PropTypes.func,
  setOpenModalDetails: PropTypes.func,
  item: PropTypes.object,
  setOpenDeletePartnerId: PropTypes.number,
};
