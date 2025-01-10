import { useState } from "react";
import AddDeductionModal from "./AddDeductionModal";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../../axios/axios";
import Loading from "../../../../componant/Loading";
import { useTranslation } from "react-i18next";
// import DeductionSureDelete from "./DeductionSureDelete";
// import { toast } from "react-toastify";

const EmptyTable = ({ texts }) => (
  <div className="text-center py-10 text-gray-500">
    <p className="text-xl">{texts[0]}</p>
    <p className="text-sm">{texts[1]}</p>
  </div>
);

const DeductionsTable = () => {
  // Language
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  // const [sureDeleteModel, setSureDeleteModel] = useState(false);
  // const [loading, setLoading] = useState(false);

  const getDeductions = async () => {
    const response = await axiosInstance.get(`/api/deduction/${id}`);
    return response.data;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["getDeductions"],
    queryFn: getDeductions,
    keepPreviousData: true,
  });

  // const handleDeleteDeduction = async (id) => {
  //   setLoading(true);
  //   try {
  //     await axiosInstance.delete(`/api/projects/${id}`);

  //     refetch();
  //     toast.success("Project deleted successfully!");
  //   } catch (error) {
  //     console.error("Error deleting project:", error);
  //     toast.error("Error deleting project");
  //   } finally {
  //     setLoading(false);
  //     setSureDeleteModel(false);
  //   }
  // };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loading />
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  const deductions = data.data || [];
  const totalDeductions = deductions.reduce(
    (total, deduction) => total + deduction.amount,
    0
  );

  return (
    <div className="mx-auto mt-10">
      {deductions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {t("ContractsForms.deduction.table.items", {
                  returnObjects: true,
                }).map((item, key) => (
                  <th className="border p-2 bg-gray-100" key={key}>
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {deductions.map((deduction, index) => (
                <tr key={deduction._id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2 text-center">
                    {deduction.deductionName}
                  </td>
                  <td className="border p-2 text-center">{deduction.type}</td>
                  <td className="border p-2 text-center">{deduction.amount}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="3" className="border p-2 text-center font-bold">
                  {t("ContractsForms.deduction.table.footer")}
                </td>
                <td colSpan="2" className="border p-2 text-center">
                  {totalDeductions}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <EmptyTable
          texts={t("ContractsForms.deduction.table.noFound", {
            returnObjects: true,
          })}
        />
      )}

      <button
        onClick={() => setIsModalOpen(true)}
        className="text-blue-600 mt-4 underline"
      >
        {t("ContractsForms.deduction.table.addButton")}
      </button>

      {isModalOpen && (
        <AddDeductionModal
          contractId={id}
          onClose={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default DeductionsTable;
