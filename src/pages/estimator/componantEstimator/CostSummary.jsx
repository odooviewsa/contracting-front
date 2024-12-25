import { Box, Collapse, Grid, Paper, Typography } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { axiosInstance } from "../../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
export default function CostSummary({ riskFactory }) {
  const [costSummaryExpanded, setCostSummaryExpanded] = useState(false);
  const categories = ["Material", "Labor", "Equipment", "Other Costs"];

  const { id } = useParams();
  const categoryColors = {
    Material: "#4caf50",
    Labor: "#ff9800",
    Equipment: "#2196f3",
    "Other Costs": "#9c27b0",
  };

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
          Cost Summary
        </Typography>
        {costSummaryExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Box>

      {/* Collapsible Content */}
      <Collapse in={costSummaryExpanded} timeout="auto" unmountOnExit>
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2} mb={4}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={3} key={category}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    borderRadius: 2,
                    backgroundColor: categoryColors[category],
                    color: "white",
                    textAlign: "center",
                    "&:hover": { backgroundColor: categoryColors[category] },
                  }}
                >
                  <Typography variant="h6">Total {category} Cost</Typography>
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
            Overall Total: ${data?.data?.overallTotal?.toLocaleString("en-US")}
          </Typography>
        </Box>
      </Collapse>
    </Paper>
  );
}
CostSummary.propTypes = {
  riskFactory: PropTypes.any,
};
