import {
  Box,
  Button,
  Collapse,
  Grid,
  Paper,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import { axiosInstance } from "../../../axios/axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
export default function ExtraFactors({
  riskFactory,
  setRiskFactory,
  currentTab,
}) {
  const [factorsExpanded, setFactorsExpanded] = useState(false);
  const [showSalesPrice, setShowSalesPrice] = useState(false);
  const [profitMargin, setProfitMargin] = useState(0);
  const [includeTax, setIncludeTax] = useState(false);
  const [valueIncludTax, setValueIncludeTax] = useState(0);
  const queryClient = useQueryClient();
  const { id } = useParams();
  useEffect(() => {
    async function getRiskFactory() {
      await axiosInstance
        .get(`/api/estimators/risk-factor/${id}`)
        .then((result) => {
          setRiskFactory(result?.data?.riskFactor?.riskFactor);
        })
        .catch((error) => toast.error(error?.response?.data?.message));
    }
    getRiskFactory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // calculateIncldeTaxAndProfit
  async function calculateIncldeTaxAndProfit() {
    try {
      const response = await axiosInstance.post(
        `/api/materials/calculate/${id}`,
        {
          showSales: showSalesPrice,
          includeTax: includeTax,
          taxValue: valueIncludTax,
          profitMargin: profitMargin,
          category: currentTab,
        }
      );

      queryClient.setQueryData(
        ["fetchEstimationFourTabs", currentTab, id],
        (oldData) => {
          if (!oldData) return;
          const newData = oldData?.data?.map((material) => {
            const updatedMaterial = response.data.data.find(
              (newItem) => newItem.id === material._id
            );

            if (updatedMaterial) {
              return {
                ...material,
                includeTax: updatedMaterial.includeTax,
                showSales: updatedMaterial.showSales,
                profitValue: updatedMaterial.profitValue,
                taxDeductedValue: updatedMaterial.taxDeductedValue,
              };
            }

            return material;
          });

          return { ...oldData, data: newData };
        }
      );
      toast.success("add successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
  // get faur
  useEffect(() => {
    async function getFour() {
      await axiosInstance
        .get(`/api/estimators/${currentTab}/${id}`)
        .then((result) => {
          setIncludeTax(result?.data?.data?.includeTax);
          setValueIncludeTax(result?.data?.data?.taxValue);
          setShowSalesPrice(result?.data?.data?.showSales);
          setProfitMargin(result?.data?.data?.profitMargin);
        })
        .catch((error) => toast.error(error?.response?.data?.message));
    }
    getFour();
  }, [id, currentTab]);

  return (
    <Paper elevation={3} sx={{ marginBottom: 4 }}>
      <ToastContainer />
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
          <div className="flex gap-5">
            <Grid item xs={12} sm={6} md={3}>
              <Tooltip title="Percentage to account for risk in cost calculations">
                <TextField
                  label="Risk Factor (%)"
                  variant="outlined"
                  fullWidth
                  value={riskFactory}
                  onChange={(e) =>
                    setRiskFactory(parseFloat(e.target.value) || 0)
                  }
                  size="small"
                />
              </Tooltip>
            </Grid>
            <div className="flex flex-wrap gap-5 items-center">
              <Typography>Include Tax</Typography>
              <Switch
                checked={includeTax}
                onChange={(e) => setIncludeTax(e.target.checked)}
              />

              {includeTax && (
                <TextField
                  label="Includ Tax"
                  variant="outlined"
                  value={valueIncludTax}
                  onChange={(e) =>
                    setValueIncludeTax(parseFloat(e.target.value) || 0)
                  }
                  size="small"
                />
              )}

              <Typography>Show Sales Price</Typography>
              <Switch
                checked={showSalesPrice}
                onChange={(e) => setShowSalesPrice(e.target.checked)}
              />

              {showSalesPrice && (
                <TextField
                  label="Profit Margin (%)"
                  variant="outlined"
                  value={profitMargin}
                  onChange={(e) =>
                    setProfitMargin(parseFloat(e.target.value) || 0)
                  }
                  size="small"
                />
              )}
              <Button variant="outlined" onClick={calculateIncldeTaxAndProfit}>
                Add Tax, Profit
              </Button>
            </div>
          </div>
        </Box>
      </Collapse>
    </Paper>
  );
}
ExtraFactors.propTypes = {
  setRiskFactory: PropTypes.func,
  riskFactory: PropTypes.any,
  setValueIncludeTax: PropTypes.any,
  valueIncludTax: PropTypes.any,
  setIncludeTax: PropTypes.any,
  includeTax: PropTypes.any,
  setProfitMargin: PropTypes.any,
  profitMargin: PropTypes.any,
  setShowSalesPrice: PropTypes.any,
  showSalesPrice: PropTypes.any,
  currentTab: PropTypes.any,
};
