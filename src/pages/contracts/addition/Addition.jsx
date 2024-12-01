import { useNavigate, useParams } from "react-router-dom";
import AdditionsTable from "./componantAddition/AdditionsTable";
import { useSelector } from "react-redux";

export default function Addition() {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const param = useParams();
  console.log(param);
  return (
    <div>
      <AdditionsTable />
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
          onClick={() =>
            navigate(
              `/${user?.companyName}/contracts/addContract/summary/${param.id}`
            )
          }
          className="text-white bg-primaryColor border border-primaryColor px-3 pt-1 pb-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}
