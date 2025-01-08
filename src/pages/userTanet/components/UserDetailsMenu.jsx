import PropTypes from "prop-types";
import { axiosInstance } from "../../../axios/axios";

const UserDetailsMenu = ({ user, setOpenMenuRow, setOpenEditUserModel }) => {
  // Delete user
  const handleDeleteUser = async () => {
    setOpenMenuRow(false);
    try {
      axiosInstance.delete(`/api/auth/${user?._id}`);
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };
  return (
    <>
      <div className="absolute -top-[170%] -left-1/2 w-fit min-w-[8rem] border bg-white rounded-md overflow-hidden shadow-md z-10">
        <ul className="flex flex-col *:p-2 items-stretch">
          <li className="hover:bg-gray-100">
            <button
              className="w-full text-start"
              onClick={() => {
                setOpenMenuRow(false);
                setOpenEditUserModel(true);
              }}
            >
              Edit
            </button>
          </li>
          {user?.role !== "Admin" && (
            <li className="hover:bg-red-500 hover:text-white">
              <button onClick={handleDeleteUser} className="w-full text-start">
                Delete
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
UserDetailsMenu.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string,
    _id: PropTypes.string,
  }),
  setOpenMenuRow: PropTypes.func.isRequired,
  setOpenEditUserModel: PropTypes.func.isRequired,
};
export default UserDetailsMenu;
