import { FaCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ModalDetails from "./ModalDetails";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFoundContract from "./NotFoundContract";
import Loading from "../../../componant/Loading";
import SureDeleteContract from "./SureDeleteContract";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function TableAllContract({
  contracts,
  setPage,
  page,
  totalPages,
  openModalDetails,
  setOpenModalDetails,
  setIdContract,
  idContract,
  contractsPerPage,
  refetch,
  searchLoading,
  isLoading,
}) {
  // Language
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openDeletePopup, setOpenDeletePopup] = useState(null);
  const user = useSelector((state) => state?.user);
  const start = (page - 1) * contractsPerPage + 1;
  const end = start + contracts.length - 1;
  // close menu
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenModalDetails(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenModalDetails]);
  if (!isLoading && !searchLoading && contracts?.length === 0) {
    return <NotFoundContract />;
  }

  if (isLoading || searchLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="">
      <div className="scrollbar shadow-md min-h-[80vh]  overflow-x-auto ">
        <table className="min-w-full bg-white rounded-lg ">
          <thead>
            <tr className="bg-primaryColor text-white">
              {t("ContractsPage.table", { returnObjects: true }).map(
                (item, key) => (
                  <th className="thContract" key={key}>
                    {item}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {contracts?.map((contract, i) => (
              <tr
                onClick={() =>
                  navigate(
                    `/${user?.companyName}/contracts/addContract/BOQ/${contract._id}`
                  )
                }
                key={contract._id}
                className="text-center border-b cursor-pointer relative"
              >
                <td className="text-blue-600 w-2 thContract p-4">
                  {contract.code}
                </td>
                <td className="text-blue-600 thContract p-4">
                  {contract.project?.projectName}
                </td>
                <td className="text-blue-600 thContract p-4">
                  {contract.partner?.partnerName}
                </td>
                <td className="text-blue-600 thContract p-4">
                  {contract?.contractType}
                </td>
                <td className=" thContract p-4 text-center">
                  <div
                    className={`flex items-center  gap-2 ${
                      contract.status === "Estimation"
                        ? "bg-red-200 text-red-600"
                        : "bg-green-200 text-green-800"
                    } text-[0.8rem]  w-fit py-[1px] px-2 rounded-md`}
                  >
                    <FaCircle />
                    <p>{contract.status}</p>
                  </div>
                </td>
                <td
                  className=" thContract p-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIdContract(i);
                    setOpenModalDetails((prev) => !prev);
                  }}
                >
                  <div className="flex justify-center relative" ref={menuRef}>
                    {openModalDetails && i === idContract && (
                      <ModalDetails
                        contract={contract}
                        setOpenModalDetails={setOpenModalDetails}
                        refetch={refetch}
                        setOpenDeletePopup={setOpenDeletePopup}
                      />
                    )}
                    <div>
                      <HiOutlineDotsVertical />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-gray-600 mt-2">
          {t("ContractsPage.pagination.text", {
            page,
            currentPage: start,
            totalPages: end,
          })}
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            {t("ContractsPage.pagination.previousButton")}
          </button>
          <button
            type="button"
            className="text-white border border-primaryColor px-3 pt-1 pb-2 rounded-md bg-primaryColor"
            onClick={() =>
              setPage((prev) => (totalPages >= prev ? prev + 1 : prev))
            }
            disabled={page === totalPages}
          >
            {t("ContractsPage.pagination.nextButton")}
          </button>
        </div>
      </div>
      {openDeletePopup && (
        <SureDeleteContract
          setOpenDeletePopup={setOpenDeletePopup}
          openDeletePopup={openDeletePopup}
          refetch={refetch}
        />
      )}
    </div>
  );
}

TableAllContract.propTypes = {
  contracts: PropTypes.array,
  setPage: PropTypes.func,
  page: PropTypes.number,
  onDeleteContract: PropTypes.func,
  openModalDetails: PropTypes.bool,
  setOpenModalDetails: PropTypes.func,
  setIdContract: PropTypes.func,
  idContract: PropTypes.number,
  currentPage: PropTypes.number,
  contractsPerPage: PropTypes.number,
  totalPages: PropTypes.number,
  refetch: PropTypes.func,
  isLoading: PropTypes.any,
  searchLoading: PropTypes.any,
};
