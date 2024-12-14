import { Box, Collapse, Grid, Paper, Typography } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
export default function CostSummary() {
  const [costSummaryExpanded, setCostSummaryExpanded] = useState(false);
  const categories = ["Material", "Labor", "Equipment", "Other Costs"];
  const [includeTax] = useState(false);
  const [riskFactor] = useState(0);
  const categoryColors = {
    Material: "#4caf50",
    Labor: "#ff9800",
    Equipment: "#2196f3",
    "Other Costs": "#9c27b0",
  };
  const [rows] = useState({
    Material: [],
    Labor: [],
    Equipment: [],
    "Other Costs": [],
  });
  const calculateTotal = (category) => {
    const baseTotal = rows[category].reduce(
      (sum, row) => sum + row.quantity * row.cost + (includeTax ? row.tax : 0),
      0
    );
    return (baseTotal * (1 + riskFactor / 100)).toFixed(2);
  };

  const calculateOverallTotal = () => {
    return categories
      .reduce(
        (total, category) => total + parseFloat(calculateTotal(category)),
        0
      )
      .toFixed(2);
  };
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
                    ${calculateTotal(category)}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h5" sx={{ textAlign: "right", marginBottom: 2 }}>
            Overall Total: ${calculateOverallTotal()}
          </Typography>
        </Box>
      </Collapse>
    </Paper>
  );
}
