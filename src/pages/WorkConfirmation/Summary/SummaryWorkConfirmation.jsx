import { useQuery } from "@tanstack/react-query";

import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../axios/axios";
import CurrentWorkConfirmationDetails from "../DetailsConfirmation/componantDetailsConfirmation/CurrentWorkConfirmationDetails";
import ContractDetailsConfirmation from "../DetailsConfirmation/componantDetailsConfirmation/ContractDetailsConfirmation";
import TaxDetailsConfirmation from "../DetailsConfirmation/componantDetailsConfirmation/TaxDetailsConfirmation";
import { useSelector } from "react-redux";
function SummaryWorkConfirmation() {
  const navigate = useNavigate();

  const { workId, contractId } = useParams();
  function getSingleWorkConfirmation() {
    return axiosInstance.get(`/api/workConfirmation/${workId}`);
  }
  const { data: work } = useQuery({
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
      <div className="flex justify-end items-center">
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
            onClick={(event) => {
              event.preventDefault();
              navigate(-1);
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default SummaryWorkConfirmation;
