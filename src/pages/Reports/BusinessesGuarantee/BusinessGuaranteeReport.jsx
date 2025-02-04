import moment from "moment";
import React, { useLayoutEffect, useState } from "react";
import {
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoTimeOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { useParams } from "react-router-dom";
import Button from "../../../componant/elements/Button";
import Block from "../../../componant/elements/Block";
import Table from "../../../componant/layout/Table";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../axios/axios";
import Loading from "../../../componant/Loading";

const BusinessGuaranteeReport = () => {
  const { contractId, companyName } = useParams();

  // States
  const [totalBusinessesGuarantees, setTotalBusinessesGuarantees] = useState(0);
  const [totalWorksValue, setTotalWorksValue] = useState(0);
  // Fetch contract information
  const {
    data: contract,
    isLoading,
    error,
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
  }, [workConfirmations]);
  console.log(workConfirmations);
  const formatCurrency = (amount) => {
    return amount.toLocaleString() + " EGP";
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
    ],
    warrantyClaims: [
      {
        id: "CL001",
        date: "2024-03-01",
        description: "Repairing concrete cracks",
        value: 15000,
        status: "pending",
        notes: "Pending inspection",
      },
      {
        id: "CL002",
        date: "2024-03-15",
        description: "Water leakage treatment",
        value: 8500,
        status: "completed",
        notes: "Repair completed and claim closed",
      },
    ],
    widgets: [
      {
        icon: IoWarningOutline,
        textColor: "#2b7fff",
        bgColor: "#dbeafe",
        valueColor: "#0084d1",
        text: "Total Business Guarantee",
        value: formatCurrency(totalBusinessesGuarantees),
        subText: `Percentage ${contract?.businessGuarantee}%`,
      },
      {
        icon: IoWarningOutline,
        textColor: "#e7000b",
        bgColor: "#ffe2e2",
        valueColor: "#c10007",
        text: "Claims Value",
        value: `23,500 EGP`,
        subText: `${"2"} claims`,
      },
      {
        icon: IoCheckmarkCircleOutline,
        textColor: "#00c950",
        bgColor: "#dbfce7",
        valueColor: "#008235",
        text: "Available Business Guarantee",
        value: `146,500 EGP`,
        subText: `Remaining ${"86.2"}%`,
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
  console.log(moment(contract?.endDate).format("YYYY-MM-DD"));
  return (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <Loading />
        )
      ) : (
        <p>{workError}</p>
      )}

      {/* Claims Table */}
      <Table
        title={
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p>Business Guarantee Claims</p>
            <Button>Add Claim</Button>
          </div>
        }
        header={data.tableHeadWarranty}
        body={data.warrantyClaims.map((item) => (
          <tr key={item.id} className="border-b *:py-6">
            <td>Work Confirmation {item.id}</td>
            <td>{moment(item.date).format("YYYY-MM-DD")}</td>
            <td>{item.description}</td>
            <td>{formatCurrency(item.value)}</td>
            <td>{item.notes}</td>
          </tr>
        ))}
        footer={
          <tr>
            <td
              colSpan={data.tableHeadWarranty.length - 1}
              className="py-6 text-start font-medium">
              Total
            </td>
            <td className="py-6 text-start font-medium">50,000 EGP</td>
          </tr>
        }
      />
    </div>
  );
};

export default BusinessGuaranteeReport;
