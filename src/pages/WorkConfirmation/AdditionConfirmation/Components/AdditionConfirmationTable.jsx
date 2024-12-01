import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../../axios/axios";
import Loading from "../../../../componant/Loading";
import AddAdditionComfirmationModal from "./AddAdditionComfirmationModal";

const EmptyTable = () => (
  <div className="text-center py-10 text-gray-500">
    <p className="text-xl">No additions available.</p>
    <p className="text-sm">Add additions to see them listed here.</p>
  </div>
);

function AdditionConfirmationTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id: workConfirmationId, contractId } = useParams();

  // Fetching data using React Query
  const fetchAdditions = async () => {
    const response = await axiosInstance.get(`/api/addition/${contractId}`);
    return response.data.data; // Access the data array
  };

  const getAdditionsConfirmation = async () => {
    const response = await axiosInstance.get(
      `/api/additionWorkConfirmation/${workConfirmationId}`
    );
    return response.data.data;
  };

  const { data: additions = [] } = useQuery({
    queryKey: ["getAdditions", contractId],
    queryFn: fetchAdditions,
    keepPreviousData: true,
  });

  const {
    data: additionsConfirmations = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getAdditionsConfirmation", workConfirmationId],
    queryFn: getAdditionsConfirmation,
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10">
      <div className="overflow-x-auto">
        {additions.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 bg-gray-100">Code</th>
                <th className="border p-2 bg-gray-100">Name of Addition</th>
                <th className="border p-2 bg-gray-100">Type</th>
                <th className="border p-2 bg-gray-100">Amount</th>
              </tr>
            </thead>
            <tbody>
              {additions.map((addition, index) => (
                <tr key={addition._id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2 text-center">
                    {addition.additionName}
                  </td>
                  <td className="border p-2 text-center">{addition.type}</td>
                  <td className="border p-2 text-center">{addition.amount}</td>
                </tr>
              ))}

              {additionsConfirmations.map((additionsConfirmation, index) => (
                <tr key={additionsConfirmation._id}>
                  <td className="border p-2 text-center">
                    {index + additions.length + 1}
                  </td>
                  <td className="border p-2 text-center">
                    {additionsConfirmation.additionName}
                  </td>
                  <td className="border p-2 text-center">
                    {additionsConfirmation.type}
                  </td>
                  <td className="border p-2 text-center">
                    {additionsConfirmation.amount}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="3" className="border p-2 text-center font-bold">
                  Total Additions
                </td>
                <td className="border p-2 text-center">
                  {additions.reduce(
                    (total, addition) => total + addition.amount,
                    0
                  )}
                </td>
              </tr>
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="3" className="border p-2 text-center font-bold">
                  Total Confirmations Additions
                </td>
                <td className="border p-2 text-center">
                  {additionsConfirmations.reduce(
                    (total, deductionsConfirmation) =>
                      total + deductionsConfirmation.amount,
                    0
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <EmptyTable />
        )}
      </div>

      <button
        className="text-blue-600 mt-4 underline"
        onClick={() => setIsModalOpen(true)}
      >
        + Add Addition
      </button>

      {isModalOpen && (
        <AddAdditionComfirmationModal
          workConfirmationId={workConfirmationId}
          onClose={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />
      )}
    </div>
  );
}

export default AdditionConfirmationTable;
