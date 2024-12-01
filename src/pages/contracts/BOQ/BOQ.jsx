import { useContext, useEffect, useState } from "react";
import Buttons from "./componantBOQ/Buttons";
import TableBOQ from "./componantBOQ/componantBOQTable/TableBOQ";
import ImportExcelAndGetTemplete from "./componantBOQ/ImportExcelAndGetTemplete";
import PartFilterColumAndExpand from "./componantBOQ/PartFilterColumAndExpand";
import FormBOQNew from "./componantBOQ/componantBOQFormNew/FormBOQNew";
import { axiosInstance } from "../../../axios/axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ModalUpdateWorkItem from "./componantBOQ/componantBOQTable/ModalWorkItem/ModalUpdateWorkItem";
import { ContextBOQ } from "../../../context/BOQContext";
import { ToastContainer } from "react-toastify";

export default function BOQ() {
  const [openFormBOQ, setOpenFormBOQ] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { openModalUpdateWorkItemId, setAllIdMainItemAndSubItemAndWorkItem } =
    useContext(ContextBOQ);
  // getAllMainItemForContractSpecific
  function getAllMainItemForContractSpecific() {
    return axiosInstance.get(`/api/contracts/${id}`);
  }
  const { data, refetch } = useQuery({
    queryKey: ["getAllMainItemForContractSpecific", page, id],
    queryFn: getAllMainItemForContractSpecific,
    keepPreviousData: true,
  });

  // get All Ids
  useEffect(() => {
    if (data) {
      const mainItemId = data.data.data.mainId.map((e) => e._id);
      const subItemId = data.data.data.mainId.flatMap((e) =>
        e.subItems?.map((sub) => sub._id)
      );
      const workItemId = data.data.data.mainId.flatMap((e) =>
        e.subItems.flatMap((sub) => sub.workItems?.map((work) => work._id))
      );

      setAllIdMainItemAndSubItemAndWorkItem([
        ...mainItemId,
        ...subItemId,
        ...workItemId,
      ]);
    }
  }, [data, setAllIdMainItemAndSubItemAndWorkItem]);

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col gap-3 w-full">
        <ImportExcelAndGetTemplete refetch={refetch} />
        <PartFilterColumAndExpand
          includeTax={data?.data?.data?.taxRate}
          DownPayment={data?.data?.data?.downPaymentRate}
        />

        <TableBOQ
          setOpenFormBOQ={setOpenFormBOQ}
          data={data}
          setPage={setPage}
          page={page}
          totalItems={data?.data?.totalMainItems}
          setValueSearch={setValueSearch}
          valueSearch={valueSearch}
        />

        <Buttons id={id} />
        {openFormBOQ && (
          <FormBOQNew setOpenFormBOQ={setOpenFormBOQ} refetch={refetch} />
        )}
        {openModalUpdateWorkItemId && <ModalUpdateWorkItem refetch={refetch} />}
      </div>
    </>
  );
}
