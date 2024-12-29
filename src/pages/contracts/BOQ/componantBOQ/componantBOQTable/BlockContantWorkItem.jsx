import PropTypes from "prop-types";
import { useContext } from "react";
import { ContextBOQ } from "../../../../../context/BOQContext";
export default function BlockContantWorkItem({ workItemDetails }) {
  const { currentValueColum } = useContext(ContextBOQ);
  const columns = [
    { header: "Unit Of Measure", value: `${workItemDetails?.unitOfMeasure}` },
    {
      header: "Assigned Quantity",
      value: `${workItemDetails?.assignedQuantity?.toLocaleString("en-US")}`,
    },
    {
      header: "Previous Quantity",
      value: `${workItemDetails?.previousQuantity?.toLocaleString("en-US")}`,
    },
    {
      header: "Remaining Quantity",
      value: `${workItemDetails?.remainingQuantity?.toLocaleString("en-US")}`,
    },
    {
      header: "Financial Category",
      value: `${workItemDetails?.financialCategory?.toLocaleString("en-US")}`,
    },
    {
      header: "Price",
      value: `${workItemDetails?.price?.toLocaleString("en-US")}`,
    },
    {
      header: "Total",
      value: `${workItemDetails?.total?.toLocaleString("en-US")}`,
    },
  ];
  return (
    <div
      className={`flex  gap-5 
        bg-bgWhite
      justify-center`}
    >
      <div className="scrollbar max-h-[50vh] overflow-auto w-[80%]">
        <table>
          <thead>
            <tr className="text-gray-600">
              {columns
                .filter((e) => currentValueColum[e.header])
                .map((col, index) => (
                  <th key={index} className="border-none">
                    {col.header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            <tr className="cursor-pointer text-primaryColor">
              {columns
                .filter((e) => currentValueColum[e.header])
                .map((col, index) => (
                  <td key={index} className="border-none">
                    {col.value}
                  </td>
                ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

BlockContantWorkItem.propTypes = {
  workItemDetails: PropTypes.object,
};
