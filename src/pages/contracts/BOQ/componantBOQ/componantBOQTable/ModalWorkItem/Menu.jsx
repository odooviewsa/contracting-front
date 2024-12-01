import { CiEdit } from "react-icons/ci";
import PropTypes from "prop-types";
import { useContext } from "react";

import { ContextBOQ } from "../../../../../../context/BOQContext";
export default function Menu({ workItem }) {
  const { setOpenModalUpdateWorkItemId } = useContext(ContextBOQ);

  return (
    <div className="absolute top-5 -left-16 flex flex-col bg-white w-28 z-20 rounded-lg border border-gray-300">
      <div
        className="flex gap-1 items-center p-2 text-[0.8rem] border-b border-gray-300 hover:bg-blue-300 hover:text-blue-700"
        onClick={() => setOpenModalUpdateWorkItemId(workItem)}
      >
        <CiEdit size={18} />
        <p>Update</p>
      </div>
    </div>
  );
}
Menu.propTypes = {
  workItem: PropTypes.object,
};
