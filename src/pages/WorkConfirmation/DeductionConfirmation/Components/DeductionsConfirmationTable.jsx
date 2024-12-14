import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../../axios/axios";
import Loading from "../../../../componant/Loading";
import AddDeductionComfirmationModal from "./AddDeductionComfirmationModal";
import DeductionSureDelete from "../../../contracts/deduction/componantDeduction/DeductionSureDelete";
import { toast } from "react-toastify";

const EmptyTable = () => (
  <div className="text-center py-10 text-gray-500">
    <p className="text-xl">No Deductions available.</p>
    <p className="text-sm">Add Deductions to see them listed here.</p>
  </div>
);

function DeductionsConfirmationTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id: workConfirmationId, contractId } = useParams();
  const [sureDeleteModel, setSureDeleteModel] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteDeduction = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/deductionWorkConfirmation/${id}`);

      refetch();
      toast.success("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting Item:", error);
      toast.error("Error deleting Item");
    } finally {
      setLoading(false);
      setSureDeleteModel(false);
    }
  };

  // Fetching data using React Query
  const fetchDeductions = async () => {
    const response = await axiosInstance.get(`/api/deduction/${contractId}`);
    return response.data.data; // Access the data array
  };

  const getDeductionsConfirmation = async () => {
    const response = await axiosInstance.get(
      `/api/deductionWorkConfirmation/${workConfirmationId}`
    );
    return response.data.data;
  };

  const { data: deductions = [] } = useQuery({
    queryKey: ["getDeductions", contractId],
    queryFn: fetchDeductions,
    keepPreviousData: true,
  });

  const {
    data: deductionsConfirmations = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getDeductionsConfirmation", workConfirmationId],
    queryFn: getDeductionsConfirmation,
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
        {deductions.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="">
                <th className="text-center border p-2 bg-gray-100">Code</th>
                <th className="text-center border p-2 bg-gray-100">
                  Name of Addition
                </th>
                <th className="text-center border p-2 bg-gray-100">Type</th>
                <th className=" text-center border p-2 bg-gray-100">Amount</th>
                <th className="border p-2 bg-gray-100"></th>
              </tr>
            </thead>
            <tbody>
              {deductions?.map((deduction, index) => (
                <tr key={deduction._id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2 text-center">
                    {deduction.deductionName}
                  </td>
                  <td className="border p-2 text-center">{deduction.type}</td>
                  <td className="border p-2 text-center">{deduction.amount}</td>
                  <td className="border p-2 text-center"></td>
                </tr>
              ))}
              {deductionsConfirmations?.map((deductionsConfirmation, index) => (
                <tr key={deductionsConfirmation._id}>
                  <td className="border p-2 text-center">
                    {index + deductions.length + 1}
                  </td>
                  <td className="border p-2 text-center">
                    {deductionsConfirmation.deductionName}
                  </td>
                  <td className="border p-2 text-center">
                    {deductionsConfirmation.type}
                  </td>
                  <td className="border p-2 text-center">
                    {deductionsConfirmation.amount}
                  </td>
                  <td className="border p-1 text-center">
                    <button
                      onClick={() => setSureDeleteModel(true)}
                      className="text-white border px-4 py-1 rounded-md bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </button>
                    {sureDeleteModel && (
                      <DeductionSureDelete
                        setSureDeleteModel={setSureDeleteModel}
                        handleDeleteDeduction={handleDeleteDeduction}
                        loading={loading}
                        deductionId={deductionsConfirmation._id}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="4" className="border p-2 text-center font-bold">
                  Total Deductions
                </td>
                <td colSpan="1" className="border p-2 text-center">
                  {deductions.reduce(
                    (total, deduction) => total + deduction.amount,
                    0
                  )}
                </td>
              </tr>
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="4" className="border p-2 text-center font-bold">
                  Total Confirmation Deductions
                </td>
                <td colSpan="1" className="border p-2 text-center">
                  {deductionsConfirmations.reduce(
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
        + Add Deduction
      </button>

      {isModalOpen && (
        <AddDeductionComfirmationModal
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

export default DeductionsConfirmationTable;
