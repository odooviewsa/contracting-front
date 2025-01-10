import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function OptionsBoqTemplate({
  setShowOptions,
  setSureDelete,
  handleSaveClick,
}) {
  // Language
  const { t } = useTranslation();
  //   const navigate = useNavigate();
  //   const user = useSelector((state) => state?.user);

  return (
    <div className="absolute top-5 left-2 flex flex-col bg-white w-24 z-20 rounded-lg border border-gray-300">
      <div
        className="flex gap-1 items-center p-2 text-[0.8rem] border-b border-gray-300 hover:bg-blue-300 hover:text-blue-700"
        onClick={(e) => {
          e.stopPropagation();
          setShowOptions(false);
          handleSaveClick();
        }}
      >
        <FaEdit size={18} />
        <p>{t("BoqTemplatePage.detailsModel.edit")}</p>
      </div>
      <div
        className="flex gap-1 items-center p-2 text-[0.8rem] border-b border-gray-300 text-red-700 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setShowOptions(false);
          //   handleDeleteProject(item._id);
          setSureDelete(true);
        }}
      >
        <MdDelete size={18} />
        <p>{t("BoqTemplatePage.detailsModel.delete")}</p>
      </div>
    </div>
  );
}

export default OptionsBoqTemplate;
OptionsBoqTemplate.propTypes = {
  setOpenEfitPartnerId: PropTypes.func,
  setShowOptions: PropTypes.func,
  handleDeleteProject: PropTypes.func,
  setSureDelete: PropTypes.func,

  item: PropTypes.object,
  handleSaveClick: PropTypes.func,
  setTemplateId: PropTypes.func,
};
