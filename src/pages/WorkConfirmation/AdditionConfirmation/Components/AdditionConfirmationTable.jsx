import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../../axios/axios";
import Loading from "../../../../componant/Loading";
import AddAdditionComfirmationModal from "./AddAdditionComfirmationModal";
import { toast } from "react-toastify";
import DeductionSureDelete from "../../../contracts/deduction/componantDeduction/DeductionSureDelete";

const EmptyTable = () => (
  <div className="text-center py-10 text-gray-500">
    <p className="text-xl">No additions available.</p>
    <p className="text-sm">Add additions to see them listed here.</p>
  </div>
);

function AdditionConfirmationTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id: workConfirmationId, contractId } = useParams();
  const [sureDeleteModel, setSureDeleteModel] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteAdditton = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/additionWorkConfirmation/${id}`);

      refetch();
      toast.success("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting Item:", error);
    } finally {
      setLoading(false);
      setSureDeleteModel(false);
    }
  };

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
  if (additions.length === 0 && additionsConfirmations.length === 0) {
    return <EmptyTable />;
  }
  return (
    <div className="mx-auto mt-10">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-100 text-center">Code</th>
              <th className="border p-2 bg-gray-100 text-center">
                Name of Addition
              </th>
              <th className="border p-2 bg-gray-100 text-center ">Type</th>
              <th className="border p-2 bg-gray-100 text-center">Amount</th>
              <th className="border p-2 bg-gray-100 text-center"></th>
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
                <td className="border p-2 text-center"></td>
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
                <td className="border p-2 text-center">
                  <button
                    onClick={() => setSureDeleteModel(true)}
                    className="text-white border px-4 py-1 rounded-md bg-red-500 hover:bg-red-600"
                  >
                    Delete
                  </button>
                  {sureDeleteModel && (
                    <DeductionSureDelete
                      setSureDeleteModel={setSureDeleteModel}
                      handleDeleteDeduction={handleDeleteAdditton}
                      loading={loading}
                      deductionId={additionsConfirmation._id}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-semibold">
              <td colSpan="4" className="border p-2 text-center font-bold">
                Total Additions
              </td>
              <td colSpan="1" className="border p-2 text-center">
                {additions.reduce(
                  (total, addition) => total + addition.amount,
                  0
                )}
              </td>
            </tr>
            <tr className="bg-gray-50 font-semibold">
              <td colSpan="4" className="border p-2 text-center font-bold">
                Total Confirmations Additions
              </td>
              <td colSpan="1" className="border p-2 text-center">
                {additionsConfirmations.reduce(
                  (total, deductionsConfirmation) =>
                    total + deductionsConfirmation.amount,
                  0
                )}
              </td>
            </tr>
          </tfoot>
        </table>
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
          loading={loading}
        />
      )}
    </div>
  );
}

export default AdditionConfirmationTable;
