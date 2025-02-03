import { useTranslation } from "react-i18next";

const PrintSummary = ({ summaryValues }) => {
  // Translations
  const { t } = useTranslation();
  return (
    <div className="rounded-md shadow-md border p-6 flex flex-col gap-4">
      <h3 className="lead">{t("PrintConfirmationDetails.summary.title")}</h3>
      <div className="grid grid-cols-2 gap-6">
        {t("PrintConfirmationDetails.summary.items", {
          returnObjects: true,
          ...summaryValues,
        }).map((item, key) => {
          if (item.length) {
            return (
              <div key={key} className="grid grid-cols-2 gap-4 rounded-lg">
                {item.map((ele, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: `${ele.bgColor}` }}
                    className="p-2 rounded-lg bg-slate-100"
                  >
                    <span className={`text-grayColor text-sm`}>
                      {ele.label}
                    </span>
                    <p
                      className="font-medium"
                      style={{ color: `${ele.textColor}` }}
                    >
                      {ele.text}
                    </p>
                  </div>
                ))}
              </div>
            );
          } else {
            return (
              <div
                key={key}
                style={{ backgroundColor: `${item.bgColor}` }}
                className="p-2 rounded-lg bg-slate-100"
              >
                <span className={`text-grayColor text-sm`}>{item.label}</span>
                <p
                  className="font-medium text-lg"
                  style={{ color: `${item.textColor}` }}
                >
                  {item.text}
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
export default PrintSummary;
