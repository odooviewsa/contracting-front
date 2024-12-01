// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DeductionsConfirmationTable from "./Components/DeductionsConfirmationTable";
import { useSelector } from "react-redux";
function DeductionConfirmation() {
  const { id, contractId } = useParams();
  const user = useSelector((state) => state?.user);

  const navigate = useNavigate();
  return (
    <div>
      <DeductionsConfirmationTable />
      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button
          type="submit"
          className="text-white bg-primaryColor border border-primaryColor px-3 pt-1 pb-2 rounded-md"
          onClick={(event) => {
            event.preventDefault();
            navigate(
              `/${user?.companyName}/workconfirm/addConfirmation/addition/${id}/${contractId}`
            );
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DeductionConfirmation;
