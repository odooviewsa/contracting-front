import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { ContextBOQ } from "../../../../../context/BOQContext";
import { useTranslation } from "react-i18next";
import CollapsedMenu from "../../../../../componant/elements/CollapsedMenu";
import TableWorkContent from "../../../../../componant/layout/Contracts/TableWorkContent";
export default function BlockContantWorkItem({ workItemDetails, materials }) {
  // Language
  const { t } = useTranslation();
  const [totalCosts, setTotalCosts] = useState({
    Material: 0,
    Labor: 0,
    Equipment: 0,
    OtherCosts: 0,
  });
  const { currentValueColum } = useContext(ContextBOQ);
  const columns = [
    {
      header: t(
        "ContractsForms.BOQ.table.allItems.contentWorkItems.unitOfMeasure"
      ),
      value: `${workItemDetails?.unitOfMeasure}`,
    },
    {
      header: t(
        "ContractsForms.BOQ.table.allItems.contentWorkItems.assignedQuantity"
      ),
      value: `${workItemDetails?.assignedQuantity?.toLocaleString("en-US")}`,
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
  // Consolidate logic to calculate total costs by category
  useEffect(() => {
    if (materials?.length > 0) {
      const newTotals = materials.reduce(
        (acc, item) => {
          if (acc[item.category] !== undefined) {
            acc[item.category] += item.total;
          }
          return acc;
        },
        {
          Material: 0,
          Labor: 0,
          Equipment: 0,
          OtherCosts: 0,
        }
      );
      setTotalCosts(newTotals);
    }
  }, [materials]);
  return (
    <div
      className={`flex  gap-5 
        bg-bgWhite
      justify-center relative z-10`}
    >
      <div className=" w-[80%]">
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
        <div className="py-4 flex flex-col gap-8">
          {materials.filter((item) => item.category === "Material").length >
            0 && (
            <CollapsedMenu label="Materials" totalCost={totalCosts.Material}>
              <TableWorkContent
                labels={[
                  "Item Name",
                  "Unit Of Measure",
                  "Quantity",
                  "Cost",
                  "Total Cost",
                ]}
                data={materials}
              />
            </CollapsedMenu>
          )}
          {materials.filter((item) => item.category === "Labor").length >
            0 && (
            <CollapsedMenu label="Labors" totalCost={totalCosts.Labor}>
              <TableWorkContent
                labels={[
                  "Item Name",
                  "Unit Of Measure",
                  "Quantity",
                  "Cost",
                  "Total Cost",
                ]}
                category="Labor"
                data={materials}
              />
            </CollapsedMenu>
          )}
          {materials.filter((item) => item.category === "Equipment").length >
            0 && (
            <CollapsedMenu label="Equipments" totalCost={totalCosts.Equipment}>
              <TableWorkContent
                labels={[
                  "Item Name",
                  "Unit Of Measure",
                  "Quantity",
                  "Cost",
                  "Total Cost",
                ]}
                category="Equipment"
                data={materials}
              />
            </CollapsedMenu>
          )}
          {materials.filter((item) => item.category === "OtherCosts").length >
            0 && (
            <CollapsedMenu
              label="Other Costs"
              totalCost={totalCosts.OtherCosts}
            >
              <TableWorkContent
                labels={[
                  "Item Name",
                  "Unit Of Measure",
                  "Quantity",
                  "Cost",
                  "Total Cost",
                ]}
                category="OtherCosts"
                data={materials}
              />
            </CollapsedMenu>
          )}
        </div>
      </div>
    </div>
  );
}

BlockContantWorkItem.propTypes = {
  workItemDetails: PropTypes.object,
};
