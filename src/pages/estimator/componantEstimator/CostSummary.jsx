import { Box, Collapse, Grid, Paper, Typography } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { axiosInstance } from "../../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
export default function CostSummary({ riskFactory }) {
  // Language
  const { t } = useTranslation();
  const [costSummaryExpanded, setCostSummaryExpanded] = useState(false);
  const { id } = useParams();

  const fetchFourCostSummery = async () => {
    const response = await axiosInstance.post(`/api/estimators/total/${id}`, {
      riskFactor: riskFactory,
    });
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ["fetchFourCostSummery", riskFactory],
    queryFn: fetchFourCostSummery,
    enabled: !!riskFactory,
  });

  return (
    <Paper elevation={3} sx={{ marginBottom: 4, borderRadius: 3 }}>
      {/* Header for collapsible section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 0,
          backgroundColor: "#1976d2",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() => setCostSummaryExpanded(!costSummaryExpanded)}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {t("EstimatorPage.costSummary.headTitle")}
        </Typography>
        {costSummaryExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Box>

      {/* Collapsible Content */}
      <Collapse in={costSummaryExpanded} timeout="auto" unmountOnExit>
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2} mb={4}>
            {t("EstimatorPage.costSummary.categories", {
              returnObjects: true,
            }).map((category, key) => (
              <Grid item xs={12} sm={6} md={3} key={key}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    borderRadius: 2,
                    backgroundColor: category.color,
                    color: "white",
                    textAlign: "center",
                    "&:hover": { backgroundColor: category.color },
                  }}
                >
                  <Typography variant="h6">{category.text}</Typography>
                  <Typography variant="h4">
                    $
                    {category === "Material"
                      ? data?.data?.totalMaterialCost?.toLocaleString("en-US")
                      : category === "Labor"
                      ? data?.data?.totalLaborCost?.toLocaleString("en-US")
                      : category === "Equipment"
                      ? data?.data?.totalEquipmentCost?.toLocaleString("en-US")
                      : category === "Other Costs"
                      ? data?.data?.totalOtherCost?.toLocaleString("en-US")
                      : ""}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h5" sx={{ textAlign: "right", marginBottom: 2 }}>
            {t("EstimatorPage.costSummary.overallTotal", {
              overallTotal: data?.data?.overallTotal?.toLocaleString("en-US"),
            })}
          </Typography>
        </Box>
      </Collapse>
    </Paper>
  );
}
CostSummary.propTypes = {
  riskFactory: PropTypes.any,
};
