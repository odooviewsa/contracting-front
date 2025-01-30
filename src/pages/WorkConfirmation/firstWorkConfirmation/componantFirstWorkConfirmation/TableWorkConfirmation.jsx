import { useEffect, useRef, useState } from "react";
import { FaCircle } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ModalDetailsWork from "./ModalDetailsWork";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../axios/axios";
import Loading from "../../../../componant/Loading";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function TableWorkConfirmation() {
  // Language
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [idContract, setIdContract] = useState(null);
  const trRef = useRef();
  const user = useSelector((state) => state?.user);
  // close menu
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenModalDetails(false);
        setIdContract(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenModalDetails]);
  const fetchWorkConfirmations = async (page) => {
    const response = await axiosInstance.get(
      `/api/workConfirmation?page=${page}&limit=20`
    );
    return response.data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["workConfirmations", page],
    queryFn: () => fetchWorkConfirmations(page),
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data!</div>;
  }
  
  return (
    <div>
      {data?.data?.length === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
          {t("ConfirmationPage.table.noFound")}
        </div>
      ) : (
        <div>
          <div className="scrollbar min-h-[80vh] overflow-auto shadow-md">
            <table>
              <thead>
                <tr className="bg-primaryColor text-white">
                  {t("ConfirmationPage.table.items", {
                    returnObjects: true,
                  }).map((item, key) => (
                    <th className="thContract" key={key}>
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((work, i) => (
                  <tr
                    className="cursor-pointer w-full"
                    key={i}
                    onClick={() =>
                      navigate(
                        `/${user?.companyName}/workconfirm/addConfirmation/Details/${work._id}/${work?.contractId?._id}`
                      )
                    }
                    ref={trRef}
                  >
                    <td className="text-blue-600 thContract">
                      {work.contractType}
                    </td>
                    <td className="text-blue-600 thContract">
                      {work?.contractId?.code}
                    </td>
                    <td className="text-blue-600 thContract">
                      {work?.numberWithSpecificContract}
                    </td>
                    <td className="text-blue-600 thContract">
                      {new Date(work.startDate).toLocaleDateString()}
                    </td>
                    <td className="text-blue-600 thContract">
                      {work?.projectName?.projectName}
                    </td>
                    <td className="text-blue-600 thContract">
                      {work?.partner?.partnerName}
                    </td>
                    <td className="text-blue-600 thContract">
                      {work?.totalAmount?.toLocaleString("en-US")}
                    </td>
                    <td className="text-blue-600 thContract">
                      {work?.dueAmount?.toLocaleString("en-US")}
                    </td>
                    <td className={` thContract`}>
                      <div
                        className={`flex items-center gap-2 bg-green-200 h-fit text-green-800 text-[0.8rem] w-fit py-[1px] px-2 rounded-md`}
                      >
                        <FaCircle />
                        <p>{work?.status}</p>
                      </div>
                    </td>
                    <td
                      className="text-blue-800 thContract"
                      ref={menuRef}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIdContract(work._id);
                        setOpenModalDetails((prev) => !prev);
                      }}
                    >
                      <div className="flex justify-center relative">
                        {openModalDetails && work._id === idContract && (
                          <ModalDetailsWork
                            workConfirmationId={work._id}
                            setOpenModalDetails={setOpenModalDetails}
                            refetchData={refetch}
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
              {t("ConfirmationPage.table.paggination", {
                currentPage: data.currentPage,
                totalPages: data.totalPages,
              })}
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
                onClick={() => setPage((prev) => prev - 1)}
                disabled={data.currentPage === 1}
              >
                {t("ConfirmationPage.buttons.previousButton")}
              </button>
              <button
                type="button"
                className="text-white border border-primaryColor px-3 pt-1 pb-2 rounded-md bg-primaryColor"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={data.currentPage === data.totalPages}
              >
                {t("ConfirmationPage.buttons.nextButton")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

TableWorkConfirmation.propTypes = {
  setOpenDeleteWorkId: PropTypes.func,
};
