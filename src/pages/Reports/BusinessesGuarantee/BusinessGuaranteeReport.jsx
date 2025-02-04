import moment from "moment";
import React from "react";
import {
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoDocumentAttachOutline,
  IoDocumentText,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoTimeOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { useParams } from "react-router-dom";
import Button from "../../../componant/elements/Button";
import Block from "../../../componant/elements/Block";
import Table from "../../../componant/layout/Table";

// Warranty data
const data = {
  projectInfo: {
    name: "Alsalam Commercial Tower",
    code: "PRJ-2024-001",
    warrantyPercentage: 5,
    warrantyPeriod: "12 months",
    startDate: "2024-01-15",
  },
  tableHead: [
    "Work Confirmation",
    "Date",
    "Work Confirmation Value",
    "Business Guarantee Value",
  ],
  extracts: [
    {
      id: 1,
      date: "2024-01-15",
      value: 850000,
      warranty: 42500,
      status: "active",
      releaseDate: "2025-01-15",
    },
    {
      id: 2,
      date: "2024-02-15",
      value: 920000,
      warranty: 46000,
      status: "active",
      releaseDate: "2025-02-15",
    },
    {
      id: 3,
      date: "2024-03-15",
      value: 780000,
      warranty: 39000,
      status: "active",
      releaseDate: "2025-03-15",
    },
    {
      id: 4,
      date: "2024-04-15",
      value: 850000,
      warranty: 42500,
      status: "active",
      releaseDate: "2025-04-15",
    },
  ],
  tableHeadWarranty: [
    "Claim Number",
    "Date",
    "Description",
    "Value",
    "Status",
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
      value: `170,000 EGP`,
      subText: `Percentage ${"5"}%`,
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
      value: `12 months`,
      subText: `From ${"2024-5-15"}`,
    },
  ],
};
const BusinessGuaranteeReport = () => {
  const { contractId } = useParams();
  console.log(contractId);

  const formatCurrency = (amount) => {
    return amount.toLocaleString() + " EGP";
  };

  // Calculate warranty totals
  const totalWarranty = data.extracts.reduce(
    (sum, ext) => sum + ext.warranty,
    0
  );
  const totalClaims = data.warrantyClaims.reduce(
    (sum, claim) => sum + claim.value,
    0
  );
  const availableWarranty = totalWarranty - totalClaims;
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <Block className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start gap-3">
          <h1 className="text-3xl font-bold text-primaryColor">
            Business Guarantee Report
          </h1>
          <div className="flex gap-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  {item.text}
                </p>
              </div>
            </Block>
          );
        })}
      </div>
      {/* Deductions Table */}
      <Table
        formatCurrency={formatCurrency}
        title="Business Guarantee Deductions Details"
        header={data.tableHead}
        body={data.extracts.map((item) => (
          <tr key={item.id} className="border-b *:py-6">
            <td>Work Confirmation {item.id}</td>
            <td>{moment(item.date).format("YYYY-MM-DD")}</td>
            <td>{formatCurrency(item.value)}</td>
            <td>{formatCurrency(item.warranty)}</td>
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
              {formatCurrency(totalWarranty)}
            </td>
            <td className="py-6 text-start font-medium">
              {formatCurrency(totalClaims)}
            </td>
          </tr>
        }
      />
      {/* Claims Table */}
      <Table
        title="Business Guarantee Claims"
        header={data.tableHeadWarranty}
        body={data.warrantyClaims.map((item) => (
          <tr key={item.id} className="border-b *:py-6">
            <td>Work Confirmation {item.id}</td>
            <td>{moment(item.date).format("YYYY-MM-DD")}</td>
            <td>{item.description}</td>
            <td>{formatCurrency(item.value)}</td>
            <td>
              <p
                className={`${
                  item.status === "pending" ? "bg-yellow-100" : "bg-green-100"
                } w-fit p-1 rounded capitalize text-primaryColor/80 text-sm font-medium`}>
                {item.status}
              </p>
            </td>
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
