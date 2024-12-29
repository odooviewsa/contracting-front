import { createContext, useState } from "react";
import PropTypes from "prop-types";
const ContextBOQ = createContext();
function ContextProviderBOQ({ children }) {
  const [openModalUpdateWorkItemId, setOpenModalUpdateWorkItemId] =
    useState(null);
  const [openModalDeleteWorkItemId, setOpenModalDeleteWorkItemId] =
    useState(null);
  const [openModalDeleteSubItemId, setOpenModalDeleteSubItemId] =
    useState(null);
  const [openModalDeleteMainItemId, setOpenModalDeleteMainItemId] =
    useState(null);
  const [
    allIdMainItemAndSubItemAndWorkItem,
    setAllIdMainItemAndSubItemAndWorkItem,
  ] = useState([]);
  const [
    allIdMainItemAndSubItemAndWorkItemTemplate,
    setAllIdMainItemAndSubItemAndWorkItemTemplate,
  ] = useState([]);
  const [idOnlyOpen, setIdOnlyOpen] = useState([]);
  const [currentValueColum, setCurrentValueColum] = useState({
    "Unit Of Measure": true,
    "Assigned Quantity": true,
    Price: true,
  });
  const [
    currentValueColumWorkConfirmation,
    setCurrentValueColumWorkConfirmation,
  ] = useState({
    "work item": true,
    "Current Work": true,
    "Current Work QTY": true,
    "Current Work %": true,
    "Contract Quantity": true,
    Calculate: true,
  });
  return (
    <ContextBOQ.Provider
      value={{
        currentValueColum,
        setCurrentValueColum,
        openModalUpdateWorkItemId,
        setOpenModalUpdateWorkItemId,
        openModalDeleteWorkItemId,
        setOpenModalDeleteWorkItemId,
        openModalDeleteSubItemId,
        setOpenModalDeleteSubItemId,
        openModalDeleteMainItemId,
        setOpenModalDeleteMainItemId,
        allIdMainItemAndSubItemAndWorkItem,
        setAllIdMainItemAndSubItemAndWorkItem,
        idOnlyOpen,
        setIdOnlyOpen,
        currentValueColumWorkConfirmation,
        setCurrentValueColumWorkConfirmation,
        allIdMainItemAndSubItemAndWorkItemTemplate,
        setAllIdMainItemAndSubItemAndWorkItemTemplate,
      }}
    >
      {children}
    </ContextBOQ.Provider>
  );
}
ContextProviderBOQ.propTypes = {
  children: PropTypes.node,
};
export { ContextProviderBOQ, ContextBOQ };
