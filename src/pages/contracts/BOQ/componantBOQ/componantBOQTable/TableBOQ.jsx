
import { useTranslation } from "react-i18next";
import PartAllItemTable from "./PartAllItemTable";
import PartFilterAndNewItemInTableBOQ from "./PartFilterAndNewItemInTableBOQ";
import PropTypes from "prop-types";
export default function TableBOQ({
  setOpenFormBOQ,
  data,
  setValueSearch,
  valueSearch,
}) {
  // Language
  const {t} = useTranslation()
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
        <p className="flex justify-center p-5">{t("ContractsForms.BOQ.table.noFound")}</p>
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
