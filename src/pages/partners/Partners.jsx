import { useState } from "react";
import Header from "../../componant/layout/Header";
import TablePartners from "./tablePartners/TablePartners";
import AddPartner from "./AddPartner";
import EditPartners from "./EditPartners";
import BlockSureDelete from "./BlockSureDelete";
import { axiosInstance } from "../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function Partners() {
  const [openAddPartner, setOpenPartner] = useState(false);
  const [openEditPartnerId, setOpenEfitPartnerId] = useState(null);
  const [openDeletePartnerId, setOpenDeletePartnerId] = useState(null);
  const { t } = useTranslation();
  function getAllPartnerForUser() {
    return axiosInstance.get(`/api/partners/all`);
  }
  const { data, refetch } = useQuery({
    queryKey: ["getAllPartnerForUser"],
    queryFn: getAllPartnerForUser,
  });
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <Header first={"Home"} second={"Partners List"} />
          <button
            className="py-2 px-5 bg-primaryColor rounded-md text-white text-[0.8rem] w-fit"
            onClick={() => setOpenPartner(true)}
          >
            {t("PartnersPage.addButton")}
          </button>
        </div>
        <TablePartners
          setOpenEfitPartnerId={setOpenEfitPartnerId}
          setOpenDeletePartnerId={setOpenDeletePartnerId}
          data={data?.data?.partners}
        />
        {/* <div className="flex items-center justify-end w-full gap-5">
        <button
          className="border rounded-md py-[5px] px-5 font-semibold"
          disabled={page === 1}
          onClick={() => setPage((e) => e - 1)}
        >
          Back
        </button>
        <button
          className="py-2 px-5 bg-primaryColor rounded-md text-white text-[0.8rem] w-fit"
          onClick={() => setPage((e) => e + 1)}
        >
          Next
        </button>
      </div> */}
        {openAddPartner && (
          <AddPartner setOpenPartner={setOpenPartner} refetch={refetch} />
        )}
        {openEditPartnerId && (
          <EditPartners
            openEditPartnerId={openEditPartnerId}
            setOpenEfitPartnerId={setOpenEfitPartnerId}
            refetch={refetch}
          />
        )}
        {openDeletePartnerId && (
          <BlockSureDelete
            openDeletePartnerId={openDeletePartnerId}
            setOpenDeletePartnerId={setOpenDeletePartnerId}
            refetch={refetch}
          />
        )}
      </div>
    </>
  );
}
