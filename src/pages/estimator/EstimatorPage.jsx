import { useState } from "react";
import { Box, Snackbar, Alert, Fab } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import HeaderEstimator from "./componantEstimator/HeaderEstimator";
import ProjectDetailsEstimator from "./componantEstimator/ProjectDetailsEstimator";
import ExtraFactors from "./componantEstimator/ExtraFactors";
import CostSummary from "./componantEstimator/CostSummary";
import FourTabsEstimator from "./componantEstimator/FourTabsEstimator";

const EstimatorPage = () => {
  const [applyOn, setApplyOn] = useState("Whole BOQ");
  //   const [rows, setRows] = useState({
  //     Material: [],
  //     Labor: [],
  //     Equipment: [],
  //     "Other Costs": [],
  //   });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  //   const showSnackbar = (message, severity) => {
  //     setSnackbar({ open: true, message, severity });
  //   };
  //   const [templates, setTemplates] = useState([]);

  //   const saveTemplate = () => {
  //     setTemplates([
  //       ...templates,
  //       { name: `Template ${templates.length + 1}`, data: rows },
  //     ]);
  //     showSnackbar("Template saved successfully", "success");
  //   };

  const closeSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <HeaderEstimator />
      {/* Project Details */}
      <ProjectDetailsEstimator applyOn={applyOn} setApplyOn={setApplyOn} />
      {/* Extra Factors */}
      <ExtraFactors />
      {/* Cost Summary */}
      <CostSummary />
      {/* Category Tables */}
      {/* Category Tables in Tabs */}
      <FourTabsEstimator applyOn={applyOn} />
      {/* Template Actions */}
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        aria-label="template-actions"
        // onClick={saveTemplate}
      >
        <SaveIcon />
      </Fab>
      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EstimatorPage;
