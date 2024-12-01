import { BsThreeDotsVertical } from "react-icons/bs";
import { axiosInstance } from "../../../../../axios/axios";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import BlockMainItem from "./BlockMainItem";

export default function BlockSearch({ valueSearch }) {
  function searchMainItem() {
    return axiosInstance.get(
      `/api/main/search?itemName=${valueSearch}&subItemName=${valueSearch}&workItemName=${valueSearch}`
    );
  }
  const { data } = useQuery({
    queryKey: ["searchMainItem", valueSearch],
    queryFn: searchMainItem,
  });
  return (
    <div className="flex flex-col">
      <div className="p-3 flex items-center justify-between bg-bgWhite">
        <div className="flex items-center gap-4 text-colorTextValueItem ">
          <div className="w-5 h-5 border-[0.1rem] border-colorTextValueItem rounded-md"></div>
          <p className="text-[0.9rem]">ITEM</p>
        </div>
        <div className="cursor-pointer text-colorTextValueItem ">
          <BsThreeDotsVertical />
        </div>
      </div>
      {data?.data?.data?.map((mainItem, i) => (
        <BlockMainItem key={i} mainItem={mainItem} />
      ))}
    </div>
  );
}
BlockSearch.propTypes = {
  valueSearch: PropTypes.string,
};
