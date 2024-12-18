import { useState } from "react";
import { Box, Snackbar, Fab } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import HeaderEstimator from "./componantEstimator/HeaderEstimator";
import ProjectDetailsEstimator from "./componantEstimator/ProjectDetailsEstimator";
import ExtraFactors from "./componantEstimator/ExtraFactors";
import CostSummary from "./componantEstimator/CostSummary";
import FourTabsEstimator from "./componantEstimator/FourTabsEstimator";

const EstimatorPage = () => {
  const [riskFactory, setRiskFactory] = useState(0);
  const [currentTab, setCurrentTab] = useState("Material");
  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <HeaderEstimator currentTab={currentTab} />
      {/* Project Details */}
      <ProjectDetailsEstimator />
      {/* Extra Factors */}
      <ExtraFactors
        riskFactory={riskFactory}
        setRiskFactory={setRiskFactory}
        currentTab={currentTab}
      />
      {/* Cost Summary */}
      <CostSummary riskFactory={riskFactory} />
      {/* Category Tables */}
      {/* Category Tables in Tabs */}
      <FourTabsEstimator
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
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
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      ></Snackbar>
    </Box>
  );
};

export default EstimatorPage;
