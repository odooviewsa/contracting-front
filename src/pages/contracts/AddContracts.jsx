import { Outlet, useLocation } from "react-router-dom";
import AddContractSteps from "./componantContract/addContractSteps";
import Header from "../../componant/layout/Header";
import { useSelector } from "react-redux";

export default function AddContracts() {
  const { pathname } = useLocation();
  const user = useSelector((state) => state?.user);
  return (
    <div className="p-5 flex flex-col gap-5">
      <Header
        first={"Contract"}
        second={
          pathname === `/${user?.companyName}/contracts/addContract`
            ? "Add Contract"
            : pathname.includes(
                `/${user?.companyName}/contracts/addContract/BOQ`
              )
            ? "BOQ"
            : pathname.includes(
                `/${user?.companyName}/contracts/addContract/deduction`
              )
            ? "Deducation"
            : pathname.includes(
                `/${user?.companyName}/contracts/addContract/addition`
              )
            ? "Addition"
            : pathname.includes(
                `/${user?.companyName}/contracts/addContract/summary`
              )
            ? "Summary"
            : ""
        }
      />
      <div>
        <AddContractSteps />
      </div>
      <Outlet />
    </div>
  );
}
