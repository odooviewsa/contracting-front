import { useNavigate } from "react-router-dom";
import ContractDetails from "./componantSummary/ContractDetails";

export default function Summary() {
  const navigate = useNavigate();
  return (
    <div>
      <ContractDetails />
      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
}
