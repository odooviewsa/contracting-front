import { useTranslation } from "react-i18next";

const PrintDetails = ({ detailsValues }) => {
  // Translations
  const { t } = useTranslation();
  return (
    <div className="">
      <div className="rounded-md shadow-md border grid grid-cols-2 gap-8 p-6">
        {t("PrintConfirmationDetails.details", {
          returnObjects: true,
          ...detailsValues,
        }).map((item, key) => (
          <div key={key} className="flex flex-col gap-4">
            {item.map((ele, i) => (
              <div key={i}>
                <span className="text-grayColor text-sm">{ele.label}</span>
                <p
                  className="font-medium"
                  style={{ color: `${ele.color}` }}
                >
                  {ele.text}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default PrintDetails;
