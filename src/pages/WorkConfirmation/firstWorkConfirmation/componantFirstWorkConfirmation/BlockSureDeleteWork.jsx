import PropTypes from "prop-types";
import { useState } from "react";
import { axiosInstance } from "../../../../axios/axios";
import { toast } from "react-toastify";

export default function BlockSureDeleteWork({
  setOpenDeleteWorkId,
  workConfirmationId,
  refetchData,
  setOpenModalDetails,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(`/api/workConfirmation/${workConfirmationId}`);
      setOpenModalDetails(false);
      refetchData();
      toast.success("Work confirmation deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting work confirmation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center bg-bgOverlay items-center h-full p-5 z-50">
      <div className="bg-white rounded-lg shadow p-5 w-[300px] text-textLabalForm flex flex-col items-center gap-5">
        <h1 className="font-bold text-[2rem]">Are You Sure!</h1>
        <div className="flex items-center justify-between w-full gap-5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenDeleteWorkId(false);
              setOpenModalDetails(false);
            }}
            className="border rounded-md py-2 px-5 font-semibold"
          >
            Back
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
              setOpenDeleteWorkId(false);
            }}
            className="border rounded-md py-2 px-5 font-semibold text-white bg-red-500"
          >
            {isLoading ? "Loading..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

BlockSureDeleteWork.propTypes = {
  setOpenDeleteWorkId: PropTypes.func,
  onConfirmDelete: PropTypes.func,
  isLoading: PropTypes.bool,
  workConfirmationId: PropTypes.any,
  refetchData: PropTypes.func,
  setOpenModalDetails: PropTypes.func,
};
