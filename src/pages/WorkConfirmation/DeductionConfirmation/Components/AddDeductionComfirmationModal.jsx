import PropTypes from "prop-types";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { axiosInstance } from "../../../../axios/axios";
import Loading from "../../../../componant/Loading";
import { toast } from "react-toastify";

function AddDeductionComfirmationModal({ onClose, workConfirmationId }) {
  const [deductionName, setDeductionName] = useState("");
  const [type, setType] = useState("Amount");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!deductionName || !amount) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `/api/deductionWorkConfirmation/${workConfirmationId}`,
        {
          deductionName,
          type,
          amount: Number(amount),
        }
      );

      console.log("Deduction added:", response.data);
      onClose();
      toast.success("Item Added successfully!");
    } catch (error) {
      console.error(
        "Error adding deduction:",
        error.response?.data || error.message
      );
      setError("Failed to add deduction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 p-1 rounded-full bg-red-300 text-red-500"
          onClick={onClose}
        >
          <IoCloseOutline size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4">Add Deduction</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deduction Name
            </label>
            <input
              type="text"
              placeholder="Enter Deduction Name"
              value={deductionName}
              onChange={(e) => setDeductionName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            >
              <option value="Amount">Amount</option>
              <option value="Percentage %">Percentage %</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {type}
            </label>
            <input
              type="number"
              placeholder={`Enter Value of ${type}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-md font-semibold hover:bg-blue-700 flex justify-center items-center"
          >
            {loading ? <Loading /> : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}

AddDeductionComfirmationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  workConfirmationId: PropTypes.string.isRequired,
  setIsModalOpen: PropTypes.func,
};

export default AddDeductionComfirmationModal;
