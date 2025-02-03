import { useQuery } from "@tanstack/react-query";
import ContractDetailsConfirmation from "./componantDetailsConfirmation/ContractDetailsConfirmation";
import CurrentWorkConfirmationDetails from "./componantDetailsConfirmation/CurrentWorkConfirmationDetails";
import TableWorkItem from "./componantDetailsConfirmation/TableWorkItem/TableWorkItem";
import TaxDetailsConfirmation from "./componantDetailsConfirmation/TaxDetailsConfirmation";
import { axiosInstance } from "../../../axios/axios";
import PartHeaderTableWork from "./componantDetailsConfirmation/TableWorkItem/PartHeaderTableWork";
import { useEffect, useState } from "react";
import PrintPageDetails from "./componantDetailsConfirmation/TableWorkItem/printPageDetails";
import { useParams } from "react-router-dom";

function DetailsConfirmation() {
  const { workId, contractId } = useParams();
  const [searchWorkConfirmation, setSearchWorkConfirmation] = useState("");
  const [valueSearch, setValueSearch] = useState([]);
  const [printButton, setPrintButton] = useState(false);
  // details Work confirmation
  function getSingleWorkConfirmation() {
    return axiosInstance.get(`/api/workConfirmation/${workId}`);
  }
  const {
    data: work,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["getSingleWorkConfirmation", workId],
    queryFn: getSingleWorkConfirmation,
  });
  // details Contract
  function getSingleContractForWorkConfirmation() {
    return axiosInstance.get(`/api/workConfirmation/${workId}`);
  }
  const { data: detailsContract } = useQuery({
    queryKey: ["getSingleContractForWorkConfirmation", contractId],
    queryFn: getSingleContractForWorkConfirmation,
  });
  // search on Work Confirmation
  useEffect(() => {
    async function getValueSearchWorkConfirmation() {
      const response = await axiosInstance.get(
        `/api/workConfirmation/search/${workId}?workItemName=${searchWorkConfirmation}`
      );
      setValueSearch(response);
    }
    if (searchWorkConfirmation) {
      getValueSearchWorkConfirmation();
    }
  }, [searchWorkConfirmation, workId]);
  const dispalyDate = searchWorkConfirmation ? valueSearch : work;
  return (
    <div className="flex flex-col gap-3">
      <CurrentWorkConfirmationDetails data={work?.data?.data} />
      <ContractDetailsConfirmation
        data={detailsContract?.data?.data}
        totalAmount={work?.data?.data?.totalAmount}
      />
      <TaxDetailsConfirmation />
      <div className="print:hidden mt-10 flex flex-col gap-3">
        <PartHeaderTableWork
          setSearchWorkConfirmation={setSearchWorkConfirmation}
          dispalyDate={dispalyDate}
          setPrintButton={setPrintButton}
        />
        <TableWorkItem
          dispalyDate={dispalyDate}
          isNegativeActive={work?.data?.data?.negativeActive}
          refetch={refetch}
          isLoading={isLoading}
        />
      </div>
      {work?.data?.data && (
        <PrintPageDetails
          printButton={printButton}
          setPrintButton={setPrintButton}
          data={work?.data?.data}
        />
      )}
    </div>
  );
}

export default DetailsConfirmation;
