import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../../componant/layout/Header";
import TableWorkConfirmation from "./componantFirstWorkConfirmation/TableWorkConfirmation";
import { useState } from "react";
import NotFoundWorkConfirmation from "./componantFirstWorkConfirmation/NotFoundWorkConfirmation";
import BlockSureDeleteWork from "./componantFirstWorkConfirmation/BlockSureDeleteWork";
import { ToastContainer } from "react-toastify";

function WorkConfirmation() {
  const user = useSelector((state) => state?.user);
  const [work] = useState(true);
  const [openDeleteWorkId, setOpenDeleteWorkId] = useState(null);
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col gap-4">
        <Header first={"Home"} second={"Work Confirmation"} />
        <div className="flex md:flex-row flex-col gap-3 md:justify-between md:items-center">
          <Link
            to={`/${user?.companyName}/workconfirm/addConfirmation`}
            className="p-2 bg-primaryColor rounded-md text-white text-[0.8rem] w-fit"
          >
            + Create Work Confirmation
          </Link>
          <input
            type="text"
            placeholder="Search work confirmation..."
            className="border border-gray-400 rounded-md py-1 px-2  w-60 outline-none"
          />
        </div>

        {work ? (
          <TableWorkConfirmation setOpenDeleteWorkId={setOpenDeleteWorkId} />
        ) : (
          <NotFoundWorkConfirmation />
        )}
        {openDeleteWorkId && (
          <BlockSureDeleteWork
            openDeleteWorkId={openDeleteWorkId}
            setOpenDeleteWorkId={setOpenDeleteWorkId}
          />
        )}
      </div>
    </>
  );
}

export default WorkConfirmation;
