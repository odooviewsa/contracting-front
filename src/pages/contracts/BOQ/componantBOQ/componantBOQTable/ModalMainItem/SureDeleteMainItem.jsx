import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ContextBOQ } from "../../../../../../context/BOQContext";
import { axiosInstance } from "../../../../../../axios/axios";
import PropTypes from "prop-types";
function SureDeleteMainItem({ refetch }) {
  const [isLoading, setIsLoading] = useState(false);
  const { openModalDeleteMainItemId, setOpenModalDeleteMainItemId } =
    useContext(ContextBOQ);
  const handleDeleteWorkItem = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.delete(
        `/api/main/${openModalDeleteMainItemId}`
      );
      if (response.status === 200) {
        toast.success("Work Item deleted successfully");
        refetch();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting contract");
    } finally {
      setIsLoading(false);
      setOpenModalDeleteMainItemId(null);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full flex justify-center bg-bgOverlay items-center h-full p-5 z-50">
      <div className="bg-white rounded-lg shadow p-5 w-[300px] text-textLabalForm flex flex-col items-center gap-5">
        <h1 className="font-bold text-[2rem]">Are You Sure !</h1>
        <div className="flex items-center justify-between w-full gap-5">
          <button
            onClick={() => setOpenModalDeleteMainItemId(null)}
            className="border rounded-md py-2 px-5 font-semibold z-40"
          >
            Back
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteWorkItem();
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

export default SureDeleteMainItem;
SureDeleteMainItem.propTypes = {
  refetch: PropTypes.func,
};
