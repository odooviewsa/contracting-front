import { Outlet, useLocation } from "react-router-dom";
import Header from "../../../componant/layout/Header";
import { useSelector } from "react-redux";
import AddConfirmationSteps from "./AddConfirmationSteps";

function AddConfirmation() {
  const { pathname } = useLocation();
  const user = useSelector((state) => state?.user);

  return (
    <div className="p-5 flex flex-col gap-4">
      <Header
        first={"Confirmation"}
        second={
          pathname.includes(
            `/${user?.companyName}/workconfirm/addConfirmation`
          ) ||
          pathname.includes(
            `/${user?.companyName}/workconfirm/addConfirmation/Details`
          )
            ? "Add Confirmation"
            : pathname.includes("/contract/addContract/BOQ")
            ? "BOQ"
            : pathname.includes(
                `/${user?.companyName}/workconfirm/addConfirmation/deduction`
              )
            ? "deducation"
            : pathname.includes(
                `/${user?.companyName}/workconfirm/addConfirmation/addition`
              )
            ? "addition"
            : pathname.includes("/contract/addContract/summary")
            ? "summary"
            : ""
        }
      />
      <div>
        <AddConfirmationSteps />
      </div>
      <Outlet />
    </div>
  );
}

export default AddConfirmation;
