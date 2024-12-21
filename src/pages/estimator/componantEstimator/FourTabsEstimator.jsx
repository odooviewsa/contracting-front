import {
  Box,
  Collapse,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Button,
  Tab,
  Table,
  Tabs,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { axiosInstance } from "../../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import AddTabFourEstimation from "./AddTabFourEstimation";
import { ToastContainer } from "react-toastify";
import SureDeleteEstimation from "./SureDeleteEstimation";
import { useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";

export default function FourTabsEstimator({ currentTab, setCurrentTab }) {
  const { id } = useParams();
  const [sureDeleteRow, setSureDeleteRow] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const applyOn = searchParams.get("applyOn");
  const [numberNewAddTab, setNumberNewAddTab] = useState([
    {
      category: "Material",
      number: 0,
    },
    {
      category: "Labor",
      number: 0,
    },
    {
      category: "Equipment",
      number: 0,
    },
    {
      category: "OtherCost",
      number: 0,
    },
  ]);
  const categories = ["Material", "Labor", "Equipment", "OtherCost"];

  const categoryColors = {
    Material: "#4caf50",
    Labor: "#ff9800",
    Equipment: "#2196f3",
    "Other Costs": "#9c27b0",
  };

  const fetchEstimationFourTabs = async () => {
    const response = await axiosInstance.get(
      `/api/materials/${currentTab}/${id}`
    );
    return response.data;
  };

  const { data, refetch } = useQuery({
    queryKey: ["fetchEstimationFourTabs", currentTab, id],
    queryFn: () => fetchEstimationFourTabs(currentTab),
    keepPreviousData: true,
  });

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <ToastContainer />
      <Paper elevation={3} sx={{ padding: 2, borderRadius: 3 }}>
        <Box sx={{ overflowX: "auto" }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Category Tabs"
          >
            {categories.map((category) => (
              <Tab
                key={category}
                label={category}
                value={category}
                sx={{
                  color: categoryColors[category],
                }}
              />
            ))}
          </Tabs>
        </Box>

        {categories.map((category) => (
          <Collapse
            key={category}
            in={currentTab === category}
            timeout="auto"
            unmountOnExit
          >
            <Box sx={{ marginTop: 2 }}>
              <Typography
                variant="h6"
                sx={{ marginBottom: 2, color: categoryColors[category] }}
              >
                {`${category} Costs`}
              </Typography>
              <Box sx={{ overflowX: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell>Unit Of Measure</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Cost</TableCell>
                      {applyOn === "BOQ Lines" && (
                        <TableCell>BOQ Item</TableCell>
                      )}{" "}
                      {/* Dynamically show BOQ column */}
                      {data?.data[0]?.showSales && (
                        <TableCell>profitMargin</TableCell>
                      )}
                      {data?.data[0]?.includeTax && (
                        <TableCell>includeTax</TableCell>
                      )}
                      <TableCell>Total Cost</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.data?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <TextField
                            value={row?.materialName?.name || row?.materialName}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField value={row?.unitOfMeasure} size="small" />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={row?.quantity}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            size="small"
                            value={row?.cost}
                          />
                        </TableCell>
                        {applyOn === "BOQ Lines" && (
                          <TableCell>
                            <TextField
                              type="text"
                              value={row?.boqLineItem?.workItemName || ""}
                              size="small"
                            />
                          </TableCell>
                        )}
                        {row?.showSales && (
                          <TableCell>{row?.profitValue}</TableCell>
                        )}
                        {row?.includeTax && (
                          <TableCell>{row?.taxDeductedValue}</TableCell>
                        )}
                        <TableCell>{row?.total.toFixed(2)}</TableCell>

                        <TableCell>
                          <Tooltip
                            title="Delete Row"
                            onClick={() => setSureDeleteRow(row?._id)}
                          >
                            <IconButton color="error">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                    {Array.from({
                      length:
                        numberNewAddTab?.find(
                          (item) => item?.category === currentTab
                        )?.number || 0,
                    }).map((_, index) => (
                      <AddTabFourEstimation
                        key={index}
                        currentTab={currentTab}
                        refetch={refetch}
                        setNumberNewAddTab={setNumberNewAddTab}
                        showTaxFromDatabase={data?.data[0]?.includeTax}
                        showProfitFromDatabase={data?.data[0]?.showSales}
                      />
                    ))}
                  </TableBody>
                </Table>
              </Box>
              <Button
                startIcon={<AddCircleIcon />}
                variant="outlined"
                sx={{ marginTop: 2 }}
                onClick={() =>
                  setNumberNewAddTab((prev) =>
                    prev.map((item) =>
                      item.category === currentTab
                        ? { ...item, number: item.number + 1 }
                        : item
                    )
                  )
                }
              >
                Add {category} Row
              </Button>
            </Box>
          </Collapse>
        ))}
      </Paper>
      {sureDeleteRow && (
        <SureDeleteEstimation
          sureDeleteRow={sureDeleteRow}
          setSureDeleteRow={setSureDeleteRow}
          refetch={refetch}
        />
      )}
    </>
  );
}

FourTabsEstimator.propTypes = {
  valueIncludTax: PropTypes.any,
  includeTax: PropTypes.any,
  profitMargin: PropTypes.any,
  showSalesPrice: PropTypes.any,
  currentTab: PropTypes.any,
  setCurrentTab: PropTypes.any,
};
