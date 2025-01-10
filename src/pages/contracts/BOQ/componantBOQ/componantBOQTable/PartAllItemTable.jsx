import { BsThreeDotsVertical } from "react-icons/bs";
import PropTypes from "prop-types";
import BlockMainItem from "./BlockMainItem";
import BlockSearch from "./BlockSearch";
import { useTranslation } from "react-i18next";

export default function PartAllItemTable({
  data,
  valueSearch,
  numberSlice,
  numberSliceFirst,
}) {
  // Language
  const {t} = useTranslation()
  if (valueSearch) return <BlockSearch valueSearch={valueSearch} />;
  return (
    <div className="flex flex-col">
      <div className="p-3 flex items-center justify-between bg-bgWhite">
        <div className="flex items-center gap-4 text-colorTextValueItem ">
          <p className="text-[0.9rem]">{t("ContractsForms.BOQ.table.allItems.text")}</p>
        </div>
        <div className="cursor-pointer text-colorTextValueItem ">
          <BsThreeDotsVertical />
        </div>
      </div>
      {data?.data?.data?.mainId
        ?.slice(numberSliceFirst, numberSlice)
        .map((mainItem, i) => (
          <BlockMainItem key={i} indexMainItem={i} mainItem={mainItem} />
        ))}
    </div>
  );
}
PartAllItemTable.propTypes = {
  data: PropTypes.any,
  valueSearch: PropTypes.string,
  numberSlice: PropTypes.number,
  numberSliceFirst: PropTypes.number,
};
