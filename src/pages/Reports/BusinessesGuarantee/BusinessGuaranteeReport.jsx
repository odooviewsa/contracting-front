import moment from "moment";
import React, { useLayoutEffect, useState } from "react";
import {
  IoAlertCircleOutline,
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoTimeOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { useParams } from "react-router-dom";
import Button from "../../../componant/elements/Button";
import Block from "../../../componant/elements/Block";
import Table from "../../../componant/layout/Table";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance, url } from "../../../axios/axios";
import Loading from "../../../componant/Loading";
import ClaimForm from "../components/ClaimForm";
import { toast, ToastContainer } from "react-toastify";
const BusinessGuaranteeReport = () => {
  const { contractId, companyName } = useParams();

  // States
  const [openClaimForm, setOpenClaimForm] = useState(false);
  const [totalBusinessesGuarantees, setTotalBusinessesGuarantees] = useState(0);
  const [totalWorksValue, setTotalWorksValue] = useState(0);
  const [totalClaimsValue, setTotalClaimsValue] = useState(0);
  const [deleteLoading, setDeleteLoading] = useState(false);
  // Fetch contract information
  const {
    data: contract,
    isLoading,
    error,
    refetch: refetchContract,
  } = useQuery({
    queryKey: ["getContractById", contractId],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/api/contracts/${contractId}`);
        return res.data.data;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  });
  // Fetch work confirmations information
  const {
    data: workConfirmations,
    isLoading: workIsLoading,
    error: workError,
  } = useQuery({
    queryKey: ["getWorkConfirmationByContractId", contractId],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(
          `/api/workConfirmation/${contractId}/contract`
        );
        return res.data;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  });
  // Calculate total businesses guarantees & works values
  useLayoutEffect(() => {
    if (workConfirmations?.length > 0) {
      const totalBusinessesGuarantees = workConfirmations.reduce(
        (sum, wc) =>
          sum + (wc.contractId.businessGuarantee / 100) * wc.totalAmount,
        0
      );
      const totalWorksValue = workConfirmations.reduce(
        (sum, wc) => sum + wc.totalAmount,
        0
      );
      setTotalBusinessesGuarantees(totalBusinessesGuarantees);
      setTotalWorksValue(totalWorksValue);
    }
    if (contract?.claims.length > 0) {
      const totalClaimsValue = contract.claims.reduce(
        (sum, claim) => sum + Number(claim.value),
        0
      );
      setTotalClaimsValue(totalClaimsValue);
    }
  }, [workConfirmations, contract]);
  // Formatted amount currency
  const formatCurrency = (amount) => {
    return amount.toLocaleString() + " EGP";
  };
  // Handle delete claim
  const deleteClaim = async (id) => {
    try {
      setDeleteLoading(true);
      const res = await axiosInstance.delete(
        `${url}/api/contracts/${contractId}/${id}`
      );
      if (res.status === 200) {
        setDeleteLoading(false);
        toast.success("Claim deleted successfully");
        refetchContract();
      }
    } catch (error) {
      toast.error("Error deleting claim");
    }
  };
  // static data
  const data = {
    projectInfo: {
      name: companyName,
      startDate: moment().format("YYYY-MM-DD"),
    },
    tableHead: [
      "Work Confirmation",
      "Date",
      "Work Confirmation Value",
      "Business Guarantee Value",
    ],
    tableHeadWarranty: [
      "Claim Number",
      "Date",
      "Description",
      "Value",
      "Notes",
      "Options",
    ],
    widgets: [
      {
        icon: IoAlertCircleOutline,
        textColor: "#2b7fff",
        bgColor: "#dbeafe",
        valueColor: "#0084d1",
        text: "Total Business Guarantee",
        value: formatCurrency(totalBusinessesGuarantees),
        subText: `Percentage ${contract?.businessGuarantee}%`,
      },
      {
        icon: IoAlertCircleOutline,
        textColor: "#e7000b",
        bgColor: "#ffe2e2",
        valueColor: "#c10007",
        text: "Claims Value",
        value: formatCurrency(totalClaimsValue),
        subText: `${contract?.claims.length} claims`,
      },
      {
        icon: IoCheckmarkCircleOutline,
        textColor: "#00c950",
        bgColor: "#dbfce7",
        valueColor: "#008235",
        text: "Available Business Guarantee",
        value: formatCurrency(totalBusinessesGuarantees - totalClaimsValue),
        subText: `Remaining ${(
          ((totalBusinessesGuarantees - totalClaimsValue) /
            totalBusinessesGuarantees) *
          100
        ).toFixed(1)}%`,
      },
      {
        icon: IoTimeOutline,
        textColor: "#e12afb",
        bgColor: "#f3e8ff",
        valueColor: "#9810fa",
        text: "Business Guarantee Duration",
        value: (() => {
          const startDate = moment(contract?.startDate);
          const endDate = moment(contract?.endDate);
          const monthsDifference = endDate.diff(startDate, "months");
          const daysDifference = endDate.diff(startDate, "days");

          return monthsDifference < 1
            ? `${daysDifference} days`
            : `${monthsDifference} months`;
        })(),
        subText: `From ${moment(contract?.startDate).format("YYYY-MM-DD")}`,
      },
    ],
  };
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col gap-6 p-4 md:px-0">
        {/* Header */}
        <Block className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-6">
          <div className="flex flex-col items-start gap-3">
            <h1 className="lead">Business Guarantee Report</h1>
            <div className="flex flex-col md:flex-row gap-4">
              <p className="flex gap-2 text-grayColor">
                <IoDocumentTextOutline size={24} />
                {data.projectInfo.name}
              </p>
              <p className="flex gap-2 text-grayColor">
                <IoCalendarOutline size={24} />
                {moment().format("YYYY-MM-DD")}
              </p>
            </div>
          </div>
          <div>
            <Button className="flex gap-2 items-center !px-4">
              <IoDownloadOutline size={24} />
              Export Report
            </Button>
          </div>
        </Block>
        {/* Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {data.widgets.map((item, i) => {
            const Icon = item.icon;
            return (
              <Block
                key={i}
                style={{ background: item.bgColor }}
                className="flex gap-4 items-start">
                <div>
                  <Icon
                    size={28}
                    className=""
                    style={{ color: item.textColor }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-grayColor">{item.text}</p>
                  <p
                    className="font-bold text-xl"
                    style={{ color: item.valueColor }}>
                    {item.value}
                  </p>
                  <p className="text-sm" style={{ color: item.textColor }}>
                    {item.subText}
                  </p>
                </div>
              </Block>
            );
          })}
        </div>
        {/* Deductions Table */}
        {!workError ? (
          !workIsLoading ? (
            workConfirmations.length > 0 && (
              <Table
                title="Business Guarantee Deductions Details"
                header={data.tableHead}
                body={workConfirmations.map((item) => (
                  <tr key={item.id} className="border-b *:py-6">
                    <td>Work Confirmation {item.id}</td>
                    <td>{moment(item.date).format("YYYY-MM-DD")}</td>
                    <td>{formatCurrency(item.totalAmount)}</td>
                    <td>
                      {formatCurrency(
                        item.totalAmount *
                          (item.contractId.businessGuarantee / 100)
                      )}
                    </td>
                  </tr>
                ))}
                footer={
                  <tr>
                    <td
                      colSpan={data.tableHead.length - 2}
                      className="py-6 text-start font-medium">
                      Total
                    </td>
                    <td className="py-6 text-start font-medium">
                      {formatCurrency(totalWorksValue)}
                    </td>
                    <td className="py-6 text-start font-medium">
                      {formatCurrency(totalBusinessesGuarantees)}
                    </td>
                  </tr>
                }
              />
            )
          ) : (
            <div className="h-[20rem] flex items-center justify-center">
              <Loading />
            </div>
          )
        ) : (
          <p>{workError}</p>
        )}

        {/* Claims Table */}
        {!error ? (
          !isLoading ? (
            contract?.claims.length > 0 ? (
              <Table
                title={
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <p>Business Guarantee Claims</p>
                    <Button onClick={() => setOpenClaimForm(true)}>
                      Add Claim
                    </Button>
                  </div>
                }
                header={data.tableHeadWarranty}
                body={contract?.claims.map((item, i) => (
                  <tr key={i} className="border-b *:py-6">
                    <td>Claim-{i + 1}</td>
                    <td>{moment(item.date).format("YYYY-MM-DD")}</td>
                    <td>{item.description ? item.description : "-"}</td>
                    <td>{formatCurrency(item.value)}</td>
                    <td>{item.notes ? item.notes : "-"}</td>
                    <td>
                      <Button
                        onClick={() => deleteClaim(item._id)}
                        className="bg-red-500 w-fit !px-1"
                        disabled={deleteLoading ? true : false}>
                        <IoTrashOutline size={18} />
                      </Button>
                    </td>
                  </tr>
                ))}
                footer={
                  <tr>
                    <td
                      colSpan={data.tableHeadWarranty.length - 1}
                      className="py-6 text-start font-medium">
                      Total
                    </td>
                    <td className="py-6 text-start font-medium">
                      {formatCurrency(totalClaimsValue)}
                    </td>
                  </tr>
                }
              />
            ) : (
              <p className="text-center text-grayColor text-sm">
                No Claims found.{" "}
                <span
                  onClick={() => setOpenClaimForm(true)}
                  className="text-blue-600 cursor-pointer">
                  Add a claim
                </span>
              </p>
            )
          ) : (
            <div className="h-[20rem] flex items-center justify-center">
              <Loading />
            </div>
          )
        ) : (
          <p>{error}</p>
        )}
        {/* Claim Form */}
        {openClaimForm && (
          <ClaimForm
            refetch={refetchContract}
            contractId={contractId}
            setOpenClaimForm={setOpenClaimForm}
          />
        )}
      </div>
    </>
  );
};

export default BusinessGuaranteeReport;
