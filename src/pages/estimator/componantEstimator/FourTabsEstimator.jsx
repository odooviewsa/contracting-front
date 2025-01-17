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
import { useTranslation } from "react-i18next";

export default function FourTabsEstimator({ currentTab, setCurrentTab }) {
  // Language
  const { t } = useTranslation();
  const { id } = useParams();
  const [sureDeleteRow, setSureDeleteRow] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const applyOn = searchParams.get("applyOn");
  const [numberNewAddTab, setNumberNewAddTab] = useState([
    {
      category: t("EstimatorPage.fourTabs.categories", {
        returnObjects: true,
      })[0].value,
      number: 0,
    },
    {
      category: t("EstimatorPage.fourTabs.categories", {
        returnObjects: true,
      })[1].value,
      number: 0,
    },
    {
      category: t("EstimatorPage.fourTabs.categories", {
        returnObjects: true,
      })[2].value,
      number: 0,
    },
    {
      category: t("EstimatorPage.fourTabs.categories", {
        returnObjects: true,
      })[3].value,
      number: 0,
    },
  ]);

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
    console.log(newValue)
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
            {t("EstimatorPage.fourTabs.categories", {
              returnObjects: true,
            }).map((category, key) => (
              <Tab
                key={key}
                label={category.text}
                value={category.value}
                sx={{
                  color: category.color,
                }}
              />
            ))}
          </Tabs>
        </Box>

        {t("EstimatorPage.fourTabs.categories", { returnObjects: true }).map(
          (category, key) => (
            <Collapse
              key={key}
              in={currentTab === category.value}
              timeout="auto"
              unmountOnExit
            >
              <Box sx={{ marginTop: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ marginBottom: 2, color: category.color }}
                >
                  {`${category.text} `}
                  {t("EstimatorPage.fourTabs.text")}
                </Typography>
                <Box sx={{ overflowX: "auto" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          {t("EstimatorPage.fourTabs.table.item")}
                        </TableCell>
                        <TableCell>
                          {t("EstimatorPage.fourTabs.table.unitOfMeasure")}
                        </TableCell>
                        <TableCell>
                          {t("EstimatorPage.fourTabs.table.quantity")}
                        </TableCell>
                        <TableCell>
                          {t("EstimatorPage.fourTabs.table.cost")}
                        </TableCell>
                        {applyOn === "BOQ Lines" && (
                          <TableCell>
                            {t("EstimatorPage.fourTabs.table.boqItem")}
                          </TableCell>
                        )}
                        {/* Dynamically show BOQ column */}
                        {data?.data[0]?.showSales && (
                          <TableCell>
                            {t("EstimatorPage.fourTabs.table.profitMargin")}
                          </TableCell>
                        )}
                        {data?.data[0]?.includeTax && (
                          <TableCell>
                            {t("EstimatorPage.fourTabs.table.includeTax")}
                          </TableCell>
                        )}
                        <TableCell>
                          {t("EstimatorPage.fourTabs.table.totalCost")}
                        </TableCell>
                        <TableCell>
                          {t("EstimatorPage.fourTabs.table.actions")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.data?.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <TextField
                              value={
                                row?.materialName?.name || row?.materialName
                              }
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={row?.unitOfMeasure}
                              size="small"
                            />
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
                  className="rtl:flex-row-reverse ltr:flex-row"
                  startIcon={<AddCircleIcon />}
                  variant="outlined"
                  sx={{ marginTop: 2 }}
                  onClick={() =>
                    setNumberNewAddTab((prev) =>
                      prev.map((item) => {
                        console.log(item.category);
                        return item.category === currentTab
                          ? { ...item, number: item.number + 1 }
                          : item;
                      })
                    )
                  }
                >
                  {t("EstimatorPage.fourTabs.addButton", {
                    categoryText: category.text,
                  })}
                </Button>
              </Box>
            </Collapse>
          )
        )}
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
