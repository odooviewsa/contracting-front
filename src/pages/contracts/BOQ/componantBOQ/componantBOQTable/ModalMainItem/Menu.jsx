
import PropTypes from "prop-types";
import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { ContextBOQ } from "../../../../../../context/BOQContext";
export default function Menu({ mainItem }) {
  const { setOpenModalDeleteMainItemId } = useContext(ContextBOQ);
  return (
    <div className="absolute top-5 ltr:-left-16 rtl:left-16 flex flex-col bg-white w-28 z-20 rounded-lg border border-gray-300">
      <div
        className="flex gap-1 items-center p-2 text-[0.8rem] border-b border-gray-300 hover:bg-blue-300 hover:text-blue-700"
        onClick={() => setOpenModalDeleteMainItemId(mainItem._id)}
      >
        <MdDelete size={18} />
        <p>Delete</p>
      </div>
    </div>
  );
}
Menu.propTypes = {
  mainItem: PropTypes.object,
};
