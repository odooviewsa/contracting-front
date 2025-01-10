import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function ModalDetailsPartners({
  setOpenEfitPartnerId,
  item,

  setOpenDeletePartnerId,
  menuRef,
}) {
  const { t } = useTranslation();
  return (
    <div
      ref={menuRef}
      className="absolute top-5 left-2 flex flex-col bg-white w-24 z-20 rounded-lg border border-gray-300"
    >
      <div
        className="flex gap-1 items-center p-2 text-[0.8rem] border-b border-gray-300 hover:bg-blue-300 hover:text-blue-700"
        onClick={() => {
          setOpenEfitPartnerId(item);
        }}
      >
        <FaEdit size={18} />
        <p>{t("PartnersPage.detailsButton.editButton")}</p>
      </div>
      <div
        className="flex gap-1 items-center p-2 text-[0.8rem] border-b border-gray-300 text-red-700 cursor-pointer"
        onClick={() => {
          setOpenDeletePartnerId(item._id);
        }}
      >
        <MdDelete size={18} />
        <p>{t("PartnersPage.detailsButton.deleteButton")}</p>
      </div>
    </div>
  );
}
ModalDetailsPartners.propTypes = {
  setOpenEfitPartnerId: PropTypes.func,
  setOpenModalDetails: PropTypes.func,
  item: PropTypes.object,
  setOpenDeletePartnerId: PropTypes.number,
  menuRef: PropTypes.any,
};
