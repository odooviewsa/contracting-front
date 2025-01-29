import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../../../componant/elements/Button";
const Reports = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col items-stretch justify-start gap-4">
        <div className="rounded-lg bg-slate-100 border shadow-md p-6 flex flex-col gap-6">
          <div className="flex items-start justify-between gap-y-6">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold text-primaryColor">
                {t("ContractsForms.summaryReports.title")}
              </h1>
              <div className="flex items-center gap-4">
                {t("ContractsForms.summaryReports.subTitles", {
                  returnObjects: true,
                  date: "2021-10-10",
                }).map((subTitle, key) => {
                  const Icon = subTitle.icon;
                  return (
                    <p
                      key={key}
                      className="flex items-center gap-2 text-grayColor lead"
                    >
                      <Icon size={24} /> {subTitle.text}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {t("ContractsForms.summaryReports.buttons", {
                returnObjects: true,
              }).map((button, key) => {
                const Icon = button.icon;
                return (
                  <Button
                    key={key}
                    type="button"
                    className={`text-white flex gap-1 items-center`}
                    styleHtml={{
                      backgroundColor: `${button.bgColor}`,
                    }}
                    onClick={() => navigate(button.path)}
                  >
                    <Icon size={22} />
                    {button.text}
                  </Button>
                );
              })}
            </div>
          </div>
          <div>
            {t("ContractsForms.summaryReports.details", {
              returnObjects: true,
              contractNo: "CNT-2024-001",
              contractValue: "5000000EGP",
              contractDuration: "12 months",
            }).map((detail, key) => (
              <p key={key} className="text-grayColor text-lg">
                {detail.text}
              </p>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-slate-100 border shadow-md">
          <table>
            <tr className="*:py-6 odd:bg-slate-200">
              <th>Description</th>
              <th>Work Confirmation #1</th>
              <th>Work Confirmation #2</th>
              <th>Work Confirmation #3</th>
              <th>Work Confirmation #4</th>
              <th>Total</th>
            </tr>
            <tr className="odd:bg-slate-200 even:bg-slate-50 *:py-6">
              <td>
                <strong>Works Value</strong>
              </td>
              <td>850,000 EGP</td>
              <td>920,000 EGP</td>
              <td>780,000 EGP</td>
              <td>850,000 EGP</td>
              <td>3,400,000 EGP</td>
            </tr>
            <tr className="odd:bg-slate-200 even:bg-slate-50 *:py-6">
              <td>
                <strong>VAT (14%)</strong>
              </td>
              <td>119,000 EGP</td>
              <td>128,800 EGP</td>
              <td>109,200 EGP</td>
              <td>119,000 EGP</td>
              <td>476,000 EGP</td>
            </tr>
            <tr className="odd:bg-slate-200 even:bg-slate-50 *:py-6">
              <td>
                <strong>Business Guarantee (5%)</strong>
              </td>
              <td>(42,500 EGP)</td>
              <td>(46,000 EGP)</td>
              <td>(39,000 EGP)</td>
              <td>(42,500 EGP)</td>
              <td>(170,000 EGP)</td>
            </tr>
            <tr className="odd:bg-slate-200 even:bg-slate-50 *:py-6">
              <td>
                <strong>Deductions</strong>
              </td>
              <td>(5,000 EGP)</td>
              <td>(7,000 EGP)</td>
              <td>(4,000 EGP)</td>
              <td>(6,000 EGP)</td>
              <td>(22,000 EGP)</td>
            </tr>
            <tr className="odd:bg-slate-200 even:bg-slate-50 *:py-6">
              <td>
                <strong>Additions</strong>
              </td>
              <td>10,000 EGP</td>
              <td>15,000 EGP</td>
              <td>8,000 EGP</td>
              <td>12,000 EGP</td>
              <td>45,000 EGP</td>
            </tr>
            <tr className="odd:bg-slate-200 even:bg-slate-50 *:py-6">
              <td>
                <strong>Net</strong>
              </td>
              <td>931,500 EGP</td>
              <td>1,010,800 EGP</td>
              <td>854,200 EGP</td>
              <td>932,500 EGP</td>
              <td>3,729,000 EGP</td>
            </tr>
            <tr className="odd:bg-slate-200 even:bg-slate-50 *:py-6">
              <td>
                <strong>Previous Payments</strong>
              </td>
              <td>-</td>
              <td>(931,500 EGP)</td>
              <td>(1,942,300 EGP)</td>
              <td>(2,796,500 EGP)</td>
              <td>-</td>
            </tr>
            <tr className="odd:bg-slate-200 even:bg-slate-50 *:py-6">
              <td>
                <strong>Amount Due</strong>
              </td>
              <td>931,500 EGP</td>
              <td>79,300 EGP</td>
              <td>-1,088,100 EGP</td>
              <td>-1,864,000 EGP</td>
              <td>932,500 EGP</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          className="text-grayColor border border-grayColor px-3 pt-1 pb-2 rounded-md"
          onClick={() => navigate(-1)}
        >
          {t("ContractsForms.summary.backButton")}
        </button>
      </div>
    </div>
  );
};
export default Reports;
