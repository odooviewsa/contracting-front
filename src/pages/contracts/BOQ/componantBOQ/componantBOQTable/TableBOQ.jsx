
import PartAllItemTable from "./PartAllItemTable";
import PartFilterAndNewItemInTableBOQ from "./PartFilterAndNewItemInTableBOQ";
import PropTypes from "prop-types";
export default function TableBOQ({
  setOpenFormBOQ,
  data,
  setValueSearch,
  valueSearch,
}) {

  return (
    <div className="w-full rounded-md border border-gray-300 shadow-md">
      <PartFilterAndNewItemInTableBOQ
        setOpenFormBOQ={setOpenFormBOQ}
        setValueSearch={setValueSearch}
      />
      {data?.data?.data?.mainId?.length > 0 ? (
        <>
          <PartAllItemTable
            data={data}
            valueSearch={valueSearch}
          />
 
        </>
      ) : (
        <p className="flex justify-center p-5">Not item yet, Add First Item</p>
      )}
    </div>
  );
}
TableBOQ.propTypes = {
  setOpenFormBOQ: PropTypes.func,
  data: PropTypes.any,
  setPage: PropTypes.func,
  page: PropTypes.number,
  totalItems: PropTypes.number,
  setValueSearch: PropTypes.func,
  valueSearch: PropTypes.string,
};
