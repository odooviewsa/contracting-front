import { IoSearch } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
export default function PartFilterAndNewItemInTableBOQ({
  setOpenFormBOQ,
  setValueSearch,
}) {
  // Language
  const {t} = useTranslation()
  return (
    <div className="p-3 flex md:flex-row flex-col md:items-center gap-2 justify-between border-b ">
      <div className="flex items-center gap-2">
        <div className="border border-gray-300 rounded-md p-1 flex items-center gap-1 text-primaryColor">
          <FaFilter />
          <p>{t("ContractsForms.BOQ.table.filter.filterButton")}</p>
        </div>
        <div className="relative text-primaryColor">
          <input
            type="text"
            placeholder={t("ContractsForms.BOQ.table.filter.searchBar")}
            className="rounded-lg p-1 pl-7 placeholder:text-[0.8rem] placeholder:text-primaryColor text-[0.9rem] bg-[#F5FAFE] w-full outline-none"
            onChange={(e) => setValueSearch(e.target.value)}
          />
          <div className="absolute top-[8px] left-2">
            <IoSearch size={15} />
          </div>
        </div>
      </div>
      <button
        className="p-2 bg-primaryColor rounded-md text-white text-[0.8rem] w-fit"
        onClick={() => setOpenFormBOQ(true)}
      >
        {t("ContractsForms.BOQ.table.filter.addButton")}
      </button>
    </div>
  );
}
PartFilterAndNewItemInTableBOQ.propTypes = {
  setOpenFormBOQ: PropTypes.func,
  setValueSearch: PropTypes.func,
};
