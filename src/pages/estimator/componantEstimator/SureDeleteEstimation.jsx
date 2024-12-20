import PropTypes from "prop-types";
import { useState } from "react";
import { axiosInstance } from "../../../axios/axios";

export default function SureDeleteEstimation({
  sureDelete,
  setSureDelete,
  setSureDeleteRow,
  sureDeleteRow,
  refetch,
  type,
}) {
  const [loading, setLoading] = useState(false);
  async function handleDelete() {
    setLoading(true);
    await axiosInstance
      .delete(`/api/estimators/${sureDelete}`)
      .then((result) => {
        if (result.status === 200) {
          setSureDelete(null);
          refetch();
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }
  async function handleDeleteRow() {
    setLoading(true);
    await axiosInstance
      .delete(`/api/materials/${sureDeleteRow}`)
      .then((result) => {
        if (result.status === 200) {
          setSureDeleteRow(null);
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
            onClick={() => {
              type === "table" ? setSureDelete(null) : setSureDeleteRow(null);
            }}
            className="border rounded-md py-2 px-5 font-semibold"
          >
            Back
          </button>
          <button
            className="border rounded-md py-2 px-5 font-semibold text-white bg-red-500"
            onClick={type === "table" ? handleDelete : handleDeleteRow}
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
SureDeleteEstimation.propTypes = {
  sureDelete: PropTypes.any,
  setSureDelete: PropTypes.func,
  sureDeleteRow: PropTypes.any,
  setSureDeleteRow: PropTypes.func,
  refetch: PropTypes.func,
  type: PropTypes.string,
};
