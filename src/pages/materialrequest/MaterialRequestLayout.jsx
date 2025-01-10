import { Outlet, useLocation } from "react-router-dom";
import Button from "../../componant/Button";
import Header from "../../componant/layout/Header";
import { useTranslation } from "react-i18next";

const MaterialRequestLayout = () => {
  const { pathname, state } = useLocation();
  const {t} = useTranslation();
  return (
    <div>
      <div className="flex items-center justify-between">
        <Header first="Home" second="materials" />
        {!pathname.includes("create") ? (
          <Button href="create" state={{ path: pathname }}>
            {t("MaterialRequestPage.buttons.addButton")}
          </Button>
        ) : (
          <Button href={state.path}>{t("MaterialRequestPage.buttons.backButton")}</Button>
        )}
      </div>
      <div className="py-8">
        <Outlet />
      </div>
    </div>
  );
};
export default MaterialRequestLayout;
