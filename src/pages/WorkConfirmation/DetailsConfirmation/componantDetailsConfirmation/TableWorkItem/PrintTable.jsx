const PrintTable = ({ columns, data }) => {
  return (
    <div className="w-[calc(100vw-132px)] overflow-x-scroll scrollbar">
      <table className="w-full">
        <thead className="bg-slate-100 border">
          <tr>
            {columns.map((column, key) => (
              <th key={key} className="w-fit">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.workItems?.map((item, key) => (
            <tr key={key}>
              {/* Work Item Name */}
              <td className="line-clamp-2">{item.workItemId.workItemName}</td>
              {/* Unit Of Measure */}
              <td>{item.workItemId.workDetails.unitOfMeasure}</td>
              {/* Contract QTY */}
              <td>
                {item?.workItemId?.workDetails?.assignedQuantity?.toLocaleString(
                  "en-US"
                )}
              </td>
              {/* Previous Quantity */}
              <td>{item.previousQuantity.toLocaleString("en-US")}</td>
              {/* Current Extract */}
              <td>{item.currentQuantity.toLocaleString("en-US")}</td>
              {/* Current Extract */}
              <td>{item.totalQuantity.toLocaleString("en-US")}</td>
              {/* Completions % */}
              <td>
                <div className="flex items-center gap-2">
                  <div className="w-[50%] bg-slate-200 rounded-full h-2.5">
                    <div
                      className="bg-yellow-400 h-2.5 rounded-full"
                      style={{
                        width: `${
                          item?.workItemId?.workDetails?.completion || 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-grayColor">{item?.workItemId?.workDetails?.completion || 100}%</p>
                </div>
              </td>
              {/* Remaining QTY */}
              <td>
                {(
                  item.totalQuantity -
                  item?.workItemId?.workDetails?.assignedQuantity
                ).toLocaleString("en-US")}
              </td>
              {/* Cost */}
              <td>
                {item.workItemId.workDetails.price.toLocaleString("en-US")}
              </td>
              {/* Previous Amount */}
              <td>
                {(
                  item.workItemId.workDetails.price * item.previousQuantity
                ).toLocaleString("en-US")}
              </td>
              {/* Current Amount */}
              <td>
                {(
                  item.workItemId.workDetails.price * item.currentQuantity
                ).toLocaleString("en-US")}
              </td>
              {/*  */}
              <td>
                {(
                  item.workItemId.workDetails.price * item.currentQuantity +
                  item.workItemId.workDetails.price * item.previousQuantity
                ).toLocaleString("en-US")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PrintTable;
