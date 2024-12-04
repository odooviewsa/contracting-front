import { useQuery } from "@tanstack/react-query";
import ContractDetailsConfirmation from "./componantDetailsConfirmation/ContractDetailsConfirmation";
import CurrentWorkConfirmationDetails from "./componantDetailsConfirmation/CurrentWorkConfirmationDetails";
// import PartHeaderTableWork from "./componantDetailsConfirmation/TableWorkItem/PartHeaderTableWork";
import TableWorkItem from "./componantDetailsConfirmation/TableWorkItem/TableWorkItem";
import TaxDetailsConfirmation from "./componantDetailsConfirmation/TaxDetailsConfirmation";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../axios/axios";

function DetailsConfirmation() {
  const { workId, contractId } = useParams();
  function getSingleWorkConfirmation() {
    return axiosInstance.get(`/api/workConfirmation/${workId}`);
  }
  const { data: work , refetch} = useQuery({
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
  return (
    <div className="flex flex-col gap-3">
      <CurrentWorkConfirmationDetails data={work?.data?.data} />
      <ContractDetailsConfirmation data={detailsContract?.data?.data} />
      <TaxDetailsConfirmation />
      <div className="mt-10 flex flex-col gap-3">
        {/* <PartHeaderTableWork /> */}
        <TableWorkItem work={work} refetch={refetch} />
      </div>
    </div>
  );
}

export default DetailsConfirmation;
