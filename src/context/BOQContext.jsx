import { createContext, useState } from "react";
import PropTypes from "prop-types";
const ContextBOQ = createContext();
function ContextProviderBOQ({ children }) {
  const [openModalUpdateWorkItemId, setOpenModalUpdateWorkItemId] =
    useState(null);
  const [
    allIdMainItemAndSubItemAndWorkItem,
    setAllIdMainItemAndSubItemAndWorkItem,
  ] = useState([]);
  const [idOnlyOpen, setIdOnlyOpen] = useState([]);
  const [currentValueColum, setCurrentValueColum] = useState({
    "Unit Of Measure": true,
  });
  const [
    currentValueColumWorkConfirmation,
    setCurrentValueColumWorkConfirmation,
  ] = useState({
    "work item": true,
    "Unit Of Measure": true,
    "	Contract Quantity": true,
  });
  return (
    <ContextBOQ.Provider
      value={{
        currentValueColum,
        setCurrentValueColum,
        openModalUpdateWorkItemId,
        setOpenModalUpdateWorkItemId,
        allIdMainItemAndSubItemAndWorkItem,
        setAllIdMainItemAndSubItemAndWorkItem,
        idOnlyOpen,
        setIdOnlyOpen,
        currentValueColumWorkConfirmation,
        setCurrentValueColumWorkConfirmation,
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
