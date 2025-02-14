import Header from "../../componant/layout/Header";
import Button from "../../componant/Button";
import UsersTable from "./components/UsersTable";
import AddUsersTanet from "./AddUsersTanet";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../axios/axios";
import { ToastContainer } from "react-toastify";

const UserTanetPage = () => {
  const user = useSelector((state) => state?.user);
  const [openForm, setOpenForm] = useState(false);
  const { t } = useTranslation();
  // Fetch Users
  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["fetchUsers", user._id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/api/auth/${user._id}`);
        return response.data.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });
  return (
    <>
      <ToastContainer />
      <div>
        <div className="flex justify-between items-center">
          <Header first={"Home"} second={"Users List"} />
          <Button onClick={() => setOpenForm(true)}>
            {t("UserTanetPage.AddButton")}
          </Button>
        </div>
        {/* Users Table */}
        <UsersTable
          content={{
            searchBar: t("UserTanetPage.SearchBar"),
            table: t("UserTanetPage.Table", { returnObjects: true }),
          }}
          data={users}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />
        {/* Add User Tanet Form */}
        {openForm && (
          <div className="w-full py-8 md:h-screen absolute top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-md mt-[5rem] relative">
              <div className="absolute top-4 ltr:right-4 rtl:left-4 cursor-pointer">
                <IoCloseOutline size={25} onClick={() => setOpenForm(false)} />
              </div>
              <AddUsersTanet
                content={t("UserTanetPage.AddUser", { returnObjects: true })}
                className="!w-full !p-0 !mt-0"
                setOpenForm={setOpenForm}
                refetch={refetch}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default UserTanetPage;
