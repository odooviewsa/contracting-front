import PropTypes from "prop-types";
import { axiosInstance } from "../../axios/axios";
import { useState } from "react";

export default function BlockSureDelete({
  openDeletePartnerId,
  setOpenDeletePartnerId,
  refetch,
}) {
  const [loading, setLoading] = useState(false);
  async function handleDelete() {
    setLoading(true);
    await axiosInstance
      .delete(`/api/partners/${openDeletePartnerId}`)
      .then((result) => {
        if (result.status === 200) {
          setOpenDeletePartnerId(null);
          refetch();
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div className=" fixed top-0 left-0  w-full flex justify-center bg-bgOverlay items-center h-full  p-5 z-50">
      <div className="bg-white rounded-lg shadow p-5  w-[300px]  text-textLabalForm flex flex-col items-center gap-5">
        <h1 className="font-bold text-[2rem]">Are You Sure !</h1>
        <div className="flex items-center justify-between w-full gap-5">
          <button
            onClick={() => setOpenDeletePartnerId(null)}
            className="border rounded-md py-2 px-5 font-semibold"
          >
            Back
          </button>
          <button
            className="border rounded-md py-2 px-5 font-semibold text-white bg-red-500"
            onClick={handleDelete}
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
BlockSureDelete.propTypes = {
  openDeletePartnerId: PropTypes.number,
  setOpenDeletePartnerId: PropTypes.func,
  refetch: PropTypes.func,
};
