import { useRef, useState } from "react";
import { FaCircle } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ModalDetailsWork from "./ModalDetailsWork";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../axios/axios";
import Loading from "../../../../componant/Loading";
import { useNavigate } from "react-router-dom";

export default function TableWorkConfirmation() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [idContract, setIdContract] = useState(null);
  const trRef = useRef();
  const user = useSelector((state) => state?.user);
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
          No Work Confirmation Found
        </div>
      ) : (
        <div>
          <div className="scrollbar min-h-[60vh] overflow-auto shadow-md">
            <table>
              <thead>
                <tr className="bg-primaryColor text-white">
                  <th className="thContract">Type</th>
                  <th className="thContract">Contract</th>
                  <th className="thContract">arrange for contract</th>
                  <th className="thContract">Date</th>
                  <th className="thContract">Project</th>
                  <th className="thContract">Partner</th>
                  <th className="thContract">Total Amount</th>
                  <th className="thContract">Duo Amount</th>
                  <th className="thContract">Status</th>
                  <th className="thContract">Details</th>
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
                    <td className="text-blue-800 thContract">
                      <div className="flex justify-center relative">
                        {openModalDetails && work._id === idContract && (
                          <ModalDetailsWork
                            workConfirmationId={work._id}
                            setOpenModalDetails={setOpenModalDetails}
                            refetchData={refetch}
                          />
                        )}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setIdContract(work._id);
                            setOpenModalDetails((prev) => !prev);
                          }}
                        >
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
              Page {data.currentPage} of {data.totalPages}
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
                onClick={() => setPage((prev) => prev - 1)}
                disabled={data.currentPage === 1}
              >
                Previous
              </button>
              <button
                type="button"
                className="text-white border border-primaryColor px-3 pt-1 pb-2 rounded-md bg-primaryColor"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={data.currentPage === data.totalPages}
              >
                Next
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
