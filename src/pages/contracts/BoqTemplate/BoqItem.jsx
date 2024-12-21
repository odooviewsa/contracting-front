import { useEffect, useState } from "react";
import TableBOQ from "../../contracts/BOQ/componantBOQ/componantBOQTable/TableBOQ";
import { axiosInstance } from "../../../axios/axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import { ContextBOQ } from "../../../context/BOQContext";
import { ToastContainer } from "react-toastify";

function BoqItem() {
  const [valueSearch, setValueSearch] = useState("");
  const { id } = useParams();
  const [page, setPage] = useState(1);
  //   const { openModalUpdateWorkItemId, setAllIdMainItemAndSubItemAndWorkItem } =
  //     useContext(ContextBOQ);

  // Fetch function for main items
  function getAllMainItemForContractSpecific() {
    return axiosInstance.get(`/api/templates/${id}`);
  }

  // UseQuery for fetching data
  const { data, refetch } = useQuery({
    queryKey: ["getAllMainItemForContractSpecific", page, id],
    queryFn: getAllMainItemForContractSpecific,
    keepPreviousData: true,
  });
  console.log(data);
  useEffect(() => {
    // Side effect logic (if needed)
  }, [page, id]);

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col gap-3 w-full">
        <TableBOQ
          //   setOpenFormBOQ={setOpenFormBOQ}
          data={data}
          setPage={setPage}
          page={page}
          totalItems={data?.data?.totalMainItems}
          setValueSearch={setValueSearch}
          valueSearch={valueSearch}
        />
      </div>
    </>
  );
}

export default BoqItem;
