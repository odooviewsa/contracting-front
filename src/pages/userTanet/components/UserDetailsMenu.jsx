import PropTypes from "prop-types";
import { axiosInstance } from "../../../axios/axios";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const UserDetailsMenu = ({
  user,
  setOpenMenuRow,
  refetch,
  setOpenEditUserModel,
}) => {
  const { t } = useTranslation();
  // Delete user
  const handleDeleteUser = async () => {
    setOpenMenuRow(false);
    try {
      const res = await axiosInstance.delete(`/api/auth/${user?._id}`);
      console.log(res);

      if (res.status === 200) {
        toast.success("User deleted successfully");
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
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
              }}>
              {t("UserTanetPage.modelDetails.editButton")}
            </button>
          </li>
          {user?.role !== "Admin" && (
            <li className="hover:bg-red-500 hover:text-white">
              <button onClick={handleDeleteUser} className="w-full text-start">
                {t("UserTanetPage.modelDetails.deleteButton")}
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
