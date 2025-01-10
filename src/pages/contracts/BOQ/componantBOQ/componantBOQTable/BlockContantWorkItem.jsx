import PropTypes from "prop-types";
import { useContext } from "react";
import { ContextBOQ } from "../../../../../context/BOQContext";
import { useTranslation } from "react-i18next";
export default function BlockContantWorkItem({ workItemDetails }) {
  // Language
  const {t} = useTranslation()
  const { currentValueColum } = useContext(ContextBOQ);
  const columns = [
    { header: t("ContractsForms.BOQ.table.allItems.contentWorkItems.unitOfMeasure"), value: `${workItemDetails?.unitOfMeasure}` },
    {
      header: t("ContractsForms.BOQ.table.allItems.contentWorkItems.assignedQuantity"),
      value: `${workItemDetails?.assignedQuantity?.toLocaleString("en-US")}`,
    },
    {
      header: t("ContractsForms.BOQ.table.allItems.contentWorkItems.previousQuantity"),
      value: `${workItemDetails?.previousQuantity?.toLocaleString("en-US")}`,
    },
    {
      header:t("ContractsForms.BOQ.table.allItems.contentWorkItems.remainingQuantity"),
      value: `${workItemDetails?.remainingQuantity?.toLocaleString("en-US")}`,
    },
    {
      header: t("ContractsForms.BOQ.table.allItems.contentWorkItems.financialCategory"),
      value: `${workItemDetails?.financialCategory?.toLocaleString("en-US")}`,
    },
    {
      header: t("ContractsForms.BOQ.table.allItems.contentWorkItems.price"),
      value: `${workItemDetails?.price?.toLocaleString("en-US")}`,
    },
    {
      header: t("ContractsForms.BOQ.table.allItems.contentWorkItems.total"),
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
