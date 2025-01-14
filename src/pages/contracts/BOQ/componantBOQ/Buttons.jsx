import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import Loading from "../../../../componant/Loading";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function Buttons({ id }) {
  // Language
  const {t} = useTranslation()
  const [inProp, setInProp] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);

  const handleNext = () => {
    setInProp(true);

    setTimeout(() => {
      navigate(`/${user?.companyName}/contracts/addContract/deduction/${id}`);
    }, 500);
  };

  return (
    <div className="flex gap-2 items-center justify-end">
      <button
        className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
        onClick={() => navigate(`/${user?.companyName}/contracts`)}
      >
        {t("ContractsForms.buttons.backButton")}
      </button>

      <button
        className="text-white bg-primaryColor border border-primaryColor px-3 pt-1 pb-2 rounded-md"
        onClick={handleNext}
      >
        {t("ContractsForms.buttons.nextButton.text")}
      </button>

      {inProp && (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <Loading />
        </div>
      )}
    </div>
  );
}

Buttons.propTypes = {
  id: PropTypes.string,
};
