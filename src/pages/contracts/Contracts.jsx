import { Link } from "react-router-dom";
import Header from "../../componant/layout/Header";
import { useState } from "react";
import TableAllContract from "./componantContract/TableAllContract";
import { axiosInstance } from "../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function Contracts() {
  // Language
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const user = useSelector((state) => state?.user);
  const [idContract, setIdContract] = useState(0);
  const contractsPerPage = 10;

  const getAllContract = async () => {
    const response = await axiosInstance.get(
      `/api/contracts/user?page=${page}&limit=${contractsPerPage}`
    );

    return response;
  };

  const fetchSearchedContracts = async (searchQuery) => {
    const url = `/api/contracts/search?project=${searchQuery}&partner=${searchQuery}&status=${searchQuery}&contractType=${searchQuery}`;
    const response = await axiosInstance.get(url);
    return response.data.contracts;
  };

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["getAllContract", page],
    queryFn: getAllContract,
    keepPreviousData: true,
  });

  const {
    data: searchedContractData,

    isLoading: searchLoading,
  } = useQuery({
    queryKey: ["searchedContracts", searchQuery],
    queryFn: () => fetchSearchedContracts(searchQuery),
    enabled: searchQuery.length > 0,
  });

  if (isError) return <div>Error loading contracts</div>;

  const contracts = data?.data?.contracts;
  const totalPages = data?.data?.totalPages;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value || "");
  };

  const displayProjects = searchQuery
    ? searchedContractData && searchedContractData.length > 0
      ? searchedContractData
      : []
    : contracts || [];

  return (
    <>
      <div className="p-2 pg:p-5 flex flex-col gap-5">
        <Header first="Home" second="Contract" />
        <div className="flex flex-col-reverse  gap-2 md:flex-row justify-between md:items-center">
          <div className="w-full md:w-fit">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder={t("ContractsPage.searchBar")}
              className="border rounded-md p-2 w-full"
            />
          </div>

          <Link
            to={`/${user?.companyName}/contracts/addContract`}
            className="p-2 bg-primaryColor rounded-md text-white text-[0.8rem] w-fit"
          >
            {t("ContractsPage.buttons.addButton")}
          </Link>
        </div>
        <>
          <TableAllContract
            contracts={displayProjects}
            setPage={setPage}
            page={page}
            totalPages={totalPages}
            openModalDetails={openModalDetails}
            setOpenModalDetails={setOpenModalDetails}
            setIdContract={setIdContract}
            idContract={idContract}
            contractsPerPage={contractsPerPage}
            refetch={refetch}
            isLoading={isLoading}
            searchLoading={searchLoading}
          />
        </>
      </div>
    </>
  );
}
