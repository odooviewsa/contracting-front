import Header from "../../componant/layout/Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../componant/Loading";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import SureDeleteEstimation from "./componantEstimator/SureDeleteEstimation";
import { ToastContainer } from "react-toastify";
import CreateEstimator from "./componantEstimator/CreateEstimator";
import { useTranslation } from "react-i18next";

export default function TableEstimator() {
  // Language
  const { t } = useTranslation();
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const [openCreate, setOpenCreate] = useState(false);
  const [sureDelete, setSureDelete] = useState(false);
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

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col gap-4">
        <Header first={"Home"} second={"Estimation"} />
        <div className="flex md:flex-row flex-col gap-3 md:items-center justify-between">
          <input
            type="text"
            placeholder={t("EstimationPage.searchBar")}
            className="border border-gray-400 rounded-md py-1 px-2  w-60 outline-none"
          />
          <button
            type="button"
            className="text-white border border-primaryColor px-3 pt-1 pb-2 w-fit rounded-md bg-primaryColor"
            onClick={() => setOpenCreate(true)}
          >
            {t("EstimationPage.buttons.createButton")}
          </button>
        </div>

        <div>
          {data?.data?.length === 0 ? (
            <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
              {t("EstimationPage.noFound")}
            </div>
          ) : (
            <div>
              <div className="scrollbar min-h-[80vh] overflow-auto shadow-md">
                <table>
                  <thead>
                    <tr className="bg-primaryColor text-white">
                        {t("EstimationPage.table", {returnObjects: true}).map((item,key) => (
                          <th key={key}>{item}</th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.map((work, i) => (
                      <tr
                        className="cursor-pointer w-full"
                        key={i}
                        onClick={() =>
                          navigate(
                            `/${user?.companyName}/estimation/${work._id}?applyOn=${work?.applyOn}&projectId=${work?.projectName?._id}&projectName=${work?.projectName?.projectName}&contractId=${work?.contract?._id}&codeContract=${work?.contract?.code}`
                          )
                        }
                      >
                        <td className="text-blue-600 thContract">
                          {work?.name}
                        </td>
                        <td className="text-blue-600 thContract">
                          {work?.projectName?.projectName}
                        </td>
                        <td className="text-blue-600 thContract">
                          {work?.contract?.code}
                        </td>
                        <td className="text-blue-600 thContract">
                          {work?.applyOn}
                        </td>
                        <td
                          className="text-red-700 cursor-pointer  thContract flex justify-center items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSureDelete(work?._id);
                          }}
                        >
                          <MdDelete size={18} />
                          <p>{t("EstimationPage.buttons.deleteButton")}</p>
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
          {openCreate && (
            <CreateEstimator setOpenCreate={setOpenCreate} refetch={refetch} />
          )}
        </div>
      </div>
    </>
  );
}
