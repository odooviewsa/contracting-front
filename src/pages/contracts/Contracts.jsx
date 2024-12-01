import { Link } from "react-router-dom";
import Header from "../../componant/layout/Header";
import { useState } from "react";
import NotFoundContract from "./componantContract/NotFoundContract";
import TableAllContract from "./componantContract/TableAllContract";
import { axiosInstance } from "../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function Contracts() {
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

  const { data, isError, refetch } = useQuery({
    queryKey: ["getAllContract", page],
    queryFn: getAllContract,
    keepPreviousData: true,
  });

  const {
    data: searchedContractData,
    // isLoading: isSearchLoading,
    // error: searchError,
  } = useQuery({
    queryKey: ["searchedContracts", searchQuery],
    queryFn: () => fetchSearchedContracts(searchQuery),
    enabled: searchQuery.length > 0,
  });
  console.log(data);

  if (isError) return <div>Error loading contracts</div>;

  const contracts = data?.data?.contracts || [];
  const totalPages = data?.data?.totalPages;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value || "");
  };

  const handleResetSearch = () => {
    setSearchQuery("");
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
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link
            to={`/${user?.companyName}/contracts/addContract`}
            className="p-2 bg-primaryColor rounded-md text-white text-[0.8rem] w-fit"
          >
            + Add Contract
          </Link>

          {/* Search Input */}
          <div className="flex justify-between items-center mt-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search contracts..."
              className="border rounded-md p-2 sm:w-full"
            />
            {searchQuery && (
              <button
                onClick={handleResetSearch}
                className="ml-2 p-2 text-sm text-gray-500 hover:text-gray-700"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {contracts.length > 0 ? (
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
            />
          </>
        ) : (
          <NotFoundContract />
        )}
      </div>
    </>
  );
}
