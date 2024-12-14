import Header from "../../componant/layout/Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../componant/Loading";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import SureDeleteEstimation from "./componantEstimator/SureDeleteEstimation";
import { toast, ToastContainer } from "react-toastify";

export default function TableEstimator() {
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const [nameEstimation, setNameEstimation] = useState("");
  const [sureDelete, setSureDelete] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const fetchEstimation = async () => {
    const response = await axiosInstance.get(`/api/estimators`);
    return response.data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchEstimation"],
    queryFn: fetchEstimation,
    keepPreviousData: true,
  });
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }
  async function handleCreate() {
    if (!nameEstimation) return toast.error("name Estimation is required");
    try {
      setLoadingCreate(true);
      const response = await axiosInstance.post("/api/estimators", {
        name: nameEstimation,
      });
      if (response.status === 201) {
        toast.success("create estimation successfully");
        refetch();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoadingCreate(false);
    }
  }
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col gap-4">
        <Header first={"Home"} second={"Estimation"} />
        <div className="flex md:flex-row flex-col gap-3 md:items-center">
          <input
            type="text"
            placeholder="Create Estimation"
            className="border border-gray-400 rounded-md py-1 px-2  w-60 outline-none"
            onChange={(e) => setNameEstimation(e.target.value)}
          />
          <button
            type="button"
            className="text-white border border-primaryColor px-3 pt-1 pb-2 w-fit rounded-md bg-primaryColor"
            onClick={handleCreate}
          >
            {loadingCreate ? "Loading..." : "Create"}
          </button>
        </div>

        <div>
          {data?.data?.length === 0 ? (
            <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
              No Estimation Found
            </div>
          ) : (
            <div>
              <div className="scrollbar min-h-[60vh] overflow-auto shadow-md">
                <table>
                  <thead>
                    <tr className="bg-primaryColor text-white">
                      <th className="thContract">name</th>
                      <th className="thContract">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.map((work, i) => (
                      <tr
                        className="cursor-pointer w-full"
                        key={i}
                        onClick={() =>
                          navigate(
                            `/${user?.companyName}/estimation/${work._id}`
                          )
                        }
                      >
                        <td className="text-blue-600 thContract">
                          {work?.name}
                        </td>

                        <td
                          className="text-red-700 cursor-pointer  thContract flex justify-center items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSureDelete(work?._id);
                          }}
                        >
                          <MdDelete size={18} />
                          <p>Delete</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {sureDelete && (
            <SureDeleteEstimation
              sureDelete={sureDelete}
              setSureDelete={setSureDelete}
              refetch={refetch}
              type="table"
            />
          )}
        </div>
      </div>
    </>
  );
}
