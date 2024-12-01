import PropTypes from "prop-types";
import { useContext } from "react";
import { ContextBOQ } from "../../../../../context/BOQContext";
export default function BlockContantWorkItem({ workItemDetails }) {
  const { currentValueColum } = useContext(ContextBOQ);
  const columns = [
    { header: "Unit Of Measure", value: `${workItemDetails?.unitOfMeasure}` },
    {
      header: "Assigned Quantity",
      value: `${workItemDetails?.assignedQuantity}`,
    },
    {
      header: "Previous Quantity",
      value: `${workItemDetails?.previousQuantity}`,
    },
    {
      header: "Remaining Quantity",
      value: `${workItemDetails?.remainingQuantity}`,
    },
    {
      header: "Financial Category",
      value: `${workItemDetails?.financialCategory}`,
    },
    { header: "Price", value: `${workItemDetails?.price}` },
    { header: "Total", value: `${workItemDetails?.total}` },
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
