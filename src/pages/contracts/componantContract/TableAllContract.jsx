import { FaCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ModalDetails from "./ModalDetails";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
}) {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const start = (page - 1) * contractsPerPage + 1;
  const end = start + contracts.length - 1;

  return (
    <div>
      <div className="scrollbar min-h-[70vh] overflow-auto">
        <table>
          <thead>
            <tr className="bg-primaryColor text-white">
              <th className="thContract">Code</th>
              <th className="thContract">Contract</th>
              <th className="thContract">Partner</th>
              <th className="thContract">Contract Type</th>
              <th className="thContract">Status</th>
              <th className="thContract">Details</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract, i) => (
              <tr
                onClick={() =>
                  navigate(
                    `/${user?.companyName}/contracts/addContract/BOQ/${contract._id}`
                  )
                }
                key={contract._id}
                className="cursor-pointer"
              >
                <td className="text-blue-600 w-2 thContract">
                  {contract.code}
                </td>
                <td className="text-blue-600 thContract">
                  {contract.project?.projectName}
                </td>
                <td className="text-blue-600 thContract">
                  {contract.partner?.partnerName}
                </td>
                <td className="text-blue-600 thContract">
                  {contract?.contractType}
                </td>
                <td className="flex justify-center thContract">
                  <div
                    className={`flex items-center gap-2 ${
                      contract.status === "Estimation"
                        ? "bg-red-200 text-red-600"
                        : "bg-green-200 text-green-800"
                    } text-[0.8rem]  w-fit py-[1px] px-2 rounded-md`}
                  >
                    <FaCircle />
                    <p>{contract.status}</p>
                  </div>
                </td>
                <td>
                  <div className="flex justify-center relative">
                    {openModalDetails && i === idContract && (
                      <ModalDetails
                        contractId={contract._id}
                        setOpenModalDetails={setOpenModalDetails}
                        refetch={refetch}
                      />
                    )}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setIdContract(i);
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
          Page {page} - contracts {start} to {end}
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            type="button"
            className="text-white border border-primaryColor px-3 pt-1 pb-2 rounded-md bg-primaryColor"
            onClick={() =>
              setPage((prev) => (totalPages >= prev ? prev + 1 : prev))
            }
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
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
};
