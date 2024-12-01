import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ModalDetailsPartners from "./ModalDetailsPartners";
import Avatar from "../../../componant/Avatar";
import PropTypes from "prop-types";
import { useState } from "react";
import { url } from "../../../axios/axios";
export default function TablePartners({
  setOpenEfitPartnerId,
  setOpenDeletePartnerId,
  data,
}) {
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [idPartner, setIdPartner] = useState(null);
  if (data?.length === 0)
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <h1 className="text-gray-600 font-bold text-[2rem] ">
          Not Partners Yet
        </h1>
      </div>
    );
  return (
    <div className="scrollbar min-h-[70vh] overflow-auto">
      <table className="border-separate border-spacing-y-3">
        <thead>
          <tr className="text-black">
            <th className="p-3">Name</th>
            <th>Type</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Tax Number</th>
            <th>Commercial Number</th>
            <th>Details </th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item, index) => (
            <tr className="cursor-pointer rounded-md shadowPartner" key={index}>
              <td className="flex items-center gap-3 p-3">
                <Avatar
                  width={35}
                  img={item?.image}
                  imgUrl={`${url}/partnerImages/${item?.image}`}
                  name={item?.partnerName}
                />
                <p>{item?.partnerName}</p>
              </td>
              <td>{item?.type}</td>
              <td>{item?.email}</td>
              <td>{item?.phone}</td>
              <td>{item?.address}</td>
              <td>{item?.taxNumber}</td>
              <td>{item?.commercialNumber}</td>
              <td>
                <div className="relative">
                  {openModalDetails && index === idPartner && (
                    <ModalDetailsPartners
                      setOpenEfitPartnerId={setOpenEfitPartnerId}
                      item={item}
                      setOpenModalDetails={setOpenModalDetails}
                      setOpenDeletePartnerId={setOpenDeletePartnerId}
                    />
                  )}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setIdPartner(index);
                      setOpenModalDetails((prev) => !prev);
                    }}
                  >
                    <HiOutlineDotsHorizontal />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
TablePartners.propTypes = {
  setOpenEfitPartnerId: PropTypes.func,
  setOpenDeletePartnerId: PropTypes.func,
  data: PropTypes.array,
};
