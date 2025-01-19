
import { useTranslation } from "react-i18next";

const MaterialRequestList = () => {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col items-stretch gap-8">

      <div>{t("MaterialRequestPage.noFound")}</div>
    </main>
  );
};
export default MaterialRequestList;
