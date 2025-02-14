import { useState } from "react";
import {
  IoCloseOutline,
  IoEllipsisHorizontal,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import UserDetailsMenu from "./UserDetailsMenu";
import EditUsersTanet from "../EditUsersTanet";
import Loading from "../../../componant/Loading";
const UsersTable = ({ content, data, isLoading, error, refetch }) => {
  const [openMenuRow, setOpenMenuRow] = useState(null);
  const [openEditUserModel, setOpenEditUserModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const filteredUsers = data?.usersGroup?.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(query) ||
      user.secondName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phone.toLowerCase().includes(query) ||
      user.companyName.toLowerCase().includes(query) ||
      user.companyType.toLowerCase().includes(query)
    );
  });

  const paginatedUsers = filteredUsers?.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const totalPages = Math.ceil((filteredUsers?.length || 0) / usersPerPage);
  return (
    <div className="py-8 min-h-[50vh]">
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder={content.searchBar}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-4 py-2 rounded w-full"
        />
      </div>

      <div className="scrollbar overflow-x-outo overflow-y-hidden">
        {!isLoading ? (
          !error ? (
            paginatedUsers && paginatedUsers.length > 0 ? (
              <table className="border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-black">
                    {content.table.length > 0 &&
                      content?.table?.map((item, key) => (
                        <th className="px-4 py-2" key={key}>
                          {item}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.firstName}</td>
                      <td>{user.secondName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.companyName}</td>
                      <td>{user.companyType}</td>
                      <td>
                        <div className="relative">
                          <div
                            onClick={() =>
                              setOpenMenuRow((prev) =>
                                prev === user._id ? null : user._id
                              )
                            }
                            className="flex items-center justify-center cursor-pointer">
                            <IoEllipsisHorizontal size={24} />
                          </div>
                          {openMenuRow === user._id && (
                            <UserDetailsMenu
                              user={user}
                              setOpenMenuRow={setOpenMenuRow}
                              setOpenEditUserModel={(value) => {
                                setOpenEditUserModel(value);
                                setSelectedUser(user);
                              }}
                              refetch={refetch}
                            />
                          )}
                        </div>
                        {openEditUserModel && selectedUser && (
                          <div className="w-full py-8 md:h-screen absolute top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-5 rounded-md mt-[5rem] relative">
                              <div className="absolute top-2 right-2 cursor-pointer">
                                <IoCloseOutline
                                  size={25}
                                  onClick={() => {
                                    setOpenEditUserModel(false);
                                    setSelectedUser(null);
                                  }}
                                />
                              </div>
                              <EditUsersTanet
                                userData={selectedUser}
                                setSelectedUser={setSelectedUser}
                                className="!w-full !p-0 !mt-0"
                                refetch={refetch}
                              />
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No user found</p>
            )
          ) : (
            <p>{error.message}</p>
          )
        ) : (
          <div className="flex items-center justify-center h-[20rem]">
            <Loading />
          </div>
        )}
      </div>
      {/* Pagination */}
      {paginatedUsers && paginatedUsers.length > 0 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="disabled:opacity-50 disabled:cursor-not-allowed rtl:rotate-180">
            <IoChevronBackOutline size={20} />
          </button>
          <span className="px-4 py-2">{`${currentPage} / ${totalPages}`}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="disabled:opacity-50 disabled:cursor-not-allowed rtl:rotate-180">
            <IoChevronForwardOutline size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
