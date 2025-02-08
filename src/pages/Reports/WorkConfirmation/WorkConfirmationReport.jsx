import React from "react";
import { useLocation, useParams } from "react-router-dom";
import PrintPageDetails from "../../WorkConfirmation/DetailsConfirmation/componantDetailsConfirmation/TableWorkItem/printPageDetails";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../axios/axios";

const WorkConfirmationReport = () => {
  const { contractId, workConfirmationId } = useParams();
  const { state } = useLocation();
  const { data, isLoading, error } = useQuery({
    queryKey: ["getWorkConfirmation"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(
          `/api/workConfirmation/${workConfirmationId}`
        );
        return res.data.data;
      } catch (err) {
        console.error("Error fetching work confirmation:", err);
        throw new Error("No work confirmation found");
      }
    },
  });
  console.log(data);
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {!isLoading && data && (
        <PrintPageDetails
          data={data}
        />
      )}
    </div>
  );
};

export default WorkConfirmationReport;
