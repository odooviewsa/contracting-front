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
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import SureDeleteEstimation from "./SureDeleteEstimation";
export default function FourTabsEstimator({ applyOn }) {
  const [currentTab, setCurrentTab] = useState("Material");
  const [sureDeleteRow, setSureDeleteRow] = useState(null);
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
    const response = await axiosInstance.get(`/api/materials/${currentTab}`);
    return response.data;
  };

  const { data, refetch } = useQuery({
    queryKey: ["fetchEstimationFourTabs", currentTab],
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
              style={{ color: categoryColors[category] }}
            />
          ))}
        </Tabs>

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
                    <TableCell>Total Cost</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <TextField value={row?.materialName} size="small" />
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
                            type="number"
                            value={row?.boqLineItem?.workItemName}
                            size="small"
                          />
                        </TableCell>
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
                      applyOn={applyOn}
                      currentTab={currentTab}
                      refetch={refetch}
                      setNumberNewAddTab={setNumberNewAddTab}
                    />
                  ))}
                </TableBody>
              </Table>
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
  applyOn: PropTypes.any,
};
