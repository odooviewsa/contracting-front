import { useState } from "react";
import AddDeductionModal from "./AddAdditionModal";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../../axios/axios";
import Loading from "../../../../componant/Loading";
import { useTranslation } from "react-i18next";

const EmptyTable = ({ texts }) => (
  <div className="text-center py-10 text-gray-500">
    <p className="text-xl">{texts[0]}</p>
    <p className="text-sm">{texts[1]}</p>
  </div>
);

const AdditionsTable = () => {
  // Language
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const getAdditions = async () => {
    const response = await axiosInstance.get(`/api/addition/${id}`);
    return response.data;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["getAdditions"],
    queryFn: getAdditions,
    keepPreviousData: true,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loading />
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  const Additions = data.data || [];

  const totalAdditions = Additions.reduce(
    (total, deduction) => total + deduction.amount,
    0
  );

  return (
    <div className="mx-auto mt-10">
      {Additions && Additions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {t("ContractsForms.addition.table.items", {
                  returnObjects: true,
                }).map((item, key) => (
                  <th key={key} className="border p-2 bg-gray-100">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Additions.map((addition, index) => (
                <tr key={addition._id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2 text-center">
                    {addition.additionName}
                  </td>
                  <td className="border p-2 text-center">{addition.type}</td>
                  <td className="border p-2 text-center">{addition.amount}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="3" className="border p-2 text-center font-bold">
                  {t("ContractsForms.addition.table.footer")}
                </td>
                <td className="border p-2 text-center">{totalAdditions}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <EmptyTable
          texts={t("ContractsForms.addition.table.noFound", {
            returnObjects: true,
          })}
        />
      )}

      <button
        onClick={() => setIsModalOpen(true)}
        className="text-blue-600 mt-4 underline"
      >
        {t("ContractsForms.addition.table.addButton")}
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

export default AdditionsTable;
