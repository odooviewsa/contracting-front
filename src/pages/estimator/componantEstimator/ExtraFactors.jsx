import {
  Box,
  Collapse,
  Grid,
  Paper,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function ExtraFactors() {
  const [showSalesPrice, setShowSalesPrice] = useState(false);
  const [factorsExpanded, setFactorsExpanded] = useState(false);
  const [riskFactor, setRiskFactor] = useState(0);
  const [profitMargin, setProfitMargin] = useState(0);
  const [includeTax, setIncludeTax] = useState(false);
  return (
    <Paper elevation={3} sx={{ marginBottom: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 0.1,
          backgroundColor: "#f5f5f5",
          cursor: "pointer",
        }}
        onClick={() => setFactorsExpanded(!factorsExpanded)}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
          Extra Factors
        </Typography>
        {factorsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Box>
      <Collapse in={factorsExpanded} timeout="auto" unmountOnExit>
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Tooltip title="Percentage to account for risk in cost calculations">
                <TextField
                  label="Risk Factor (%)"
                  variant="outlined"
                  fullWidth
                  value={riskFactor}
                  onChange={(e) =>
                    setRiskFactor(parseFloat(e.target.value) || 0)
                  }
                  size="small"
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Profit Margin (%)"
                variant="outlined"
                fullWidth
                value={profitMargin}
                onChange={(e) =>
                  setProfitMargin(parseFloat(e.target.value) || 0)
                }
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography>Include Tax</Typography>
              <Switch
                checked={includeTax}
                onChange={(e) => setIncludeTax(e.target.checked)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography>Show Sales Price</Typography>
              <Switch
                checked={showSalesPrice}
                onChange={(e) => setShowSalesPrice(e.target.checked)}
              />
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Paper>
  );
}
