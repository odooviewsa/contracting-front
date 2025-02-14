const TableWorkContent = ({
  data,
  className = "",
  labels,
  category = "Material",
}) => {
  return (
    <div className="w-full overflow-x-auto scrollbar">
      <table className={`ltr:ml-6 rtl:mr-6 bg-white rounded-md ${className}`}>
        <tr>
          {labels?.map((label, key) => (
            <th key={key}>{label}</th>
          ))}
        </tr>
        {data
          ?.filter((e) => e.category === category)
          .map((item, key) => (
            <tr key={key}>
              <td>{item.materialName}</td>
              <td>{item.unitOfMeasure}</td>
              <td>{item.quantity}</td>
              <td>{item.cost}</td>
              <td>{item.total}</td>
            </tr>
          ))}
      </table>
    </div>
  );
};
export default TableWorkContent;
