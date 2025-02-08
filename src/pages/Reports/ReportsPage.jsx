import ReportBusinessGuaranteeForm from "./components/ReportBusinessGuaranteeForm";
import ReportWorkConfirmationForm from "./components/ReportWorkConfirmationForm";

const ReportsPage = () => {
  return (
    <div className="px-4 md:px-8 gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {/* Form */}
      <ReportBusinessGuaranteeForm />
      <ReportWorkConfirmationForm />
    </div>
  );
};

export default ReportsPage;
