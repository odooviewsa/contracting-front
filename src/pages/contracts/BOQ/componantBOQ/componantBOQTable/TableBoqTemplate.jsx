import { useContext } from "react";
import TableBOQ from "./TableBOQ";
import { ContextBOQ } from "../../../../../context/BOQContext";
import { axiosInstance } from "../../../../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
function TableBoqTemplate({ idTemplate, setCheckFetchData, setOpenFormBOQ }) {
  const { setAllIdMainItemAndSubItemAndWorkItemTemplate } =
    useContext(ContextBOQ);
  function getSingleTemplate() {
    return axiosInstance.get(`/api/templates/${idTemplate}`);
  }

  const { dataTemplate } = useQuery({
    queryKey: ["getSingleTemplate", idTemplate],
    queryFn: getSingleTemplate,
    keepPreviousData: true,
  });

  if (dataTemplate) {
    const mainItemId = dataTemplate.data.data.mainId.map((e) => e._id);
    const subItemId = dataTemplate.data.data.mainId.flatMap((e) =>
      e.subItems?.map((sub) => sub._id)
    );
    const workItemId = dataTemplate.data.data.mainId.flatMap((e) =>
      e.subItems.flatMap((sub) => sub.workItems?.map((work) => work._id))
    );

    setAllIdMainItemAndSubItemAndWorkItemTemplate([
      ...mainItemId,
      ...subItemId,
      ...workItemId,
    ]);
    if (dataTemplate.data.data.mainId.length > 0) {
      setCheckFetchData(false);
    }
  }

  return (
    <div>
      <TableBOQ
        setOpenFormBOQ={setOpenFormBOQ}
        data={dataTemplate}
        totalItems={dataTemplate?.data?.totalMainItems}
      />
    </div>
  );
}

export default TableBoqTemplate;

TableBoqTemplate.propTypes = {

  setOpenFormBOQ: PropTypes.any,
  setCheckFetchData: PropTypes.any,
  idTemplate: PropTypes.any,
};
