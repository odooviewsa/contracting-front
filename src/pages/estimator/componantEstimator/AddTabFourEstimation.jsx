import {
  Grid,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CreatableSelect from "react-select/creatable";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../axios/axios";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
export default function AddTabFourEstimation({
  currentTab,
  refetch,
  setNumberNewAddTab,
  showProfitFromDatabase,
  showTaxFromDatabase,
}) {
  // Language
  const {t} = useTranslation()
  const [valueFull, setValuFull] = useState({});
  const [workItems, setWorkItems] = useState([]);
  const [unitOfMeasure, setUnitOfMeasure] = useState("");
  const [cost, setCost] = useState("");

  // location params
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const applyOn = searchParams.get("applyOn");
  const projectId = searchParams.get("projectId");
  const contractId = searchParams.get("contractId");
  // handlechange
  function handlechange(e) {
    setValuFull((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  useEffect(() => {
    if (currentTab === "Material" && valueFull["materialName"]) {
      setUnitOfMeasure(valueFull["materialName"]?.uom);
      setCost(valueFull["materialName"]?.price);
    } else {
      setUnitOfMeasure("");
      setCost("");
    }
  }, [currentTab, valueFull]);
  // useEffect
  useEffect(() => {
    async function getWorkItemsName() {
      const response = await axiosInstance.get(`/api/work/names/${contractId}`);
      setWorkItems(response?.data);
    }
    if (contractId) {
      getWorkItemsName();
    }
  }, [contractId]);

  const { id } = useParams();
  async function handleAddRow() {
    const formDate = {
      ...valueFull,
      unitOfMeasure: unitOfMeasure,
      cost: cost,
      materialName: valueFull["materialName"]?.name,
      category: currentTab,
      applyOn: applyOn,
      contract: contractId,
      projectName: projectId,
      estimatorId: id,
    };

    if (
      !valueFull?.materialName ||
      !unitOfMeasure ||
      !cost ||
      !valueFull?.quantity
    )
      return toast.error("you must fill All Date");
    if (!projectId) return toast.error("you must Enter Project Name");
    if (!valueFull?.boqLineItem && applyOn === "BOQ Lines")
      return toast.error("you must Enter Name Work Item");
    if (!contractId) return toast.error("you must Enter Contract Code");

    try {
      const response = await axiosInstance.post(`/api/materials`, formDate);
      if (response?.status === 201) {
        setNumberNewAddTab((prev) =>
          prev.map((item) =>
            item.category === currentTab
              ? { ...item, number: item.number - 1 }
              : item
          )
        );
        toast.success(t("EstimatorPage.addTab.successMessage"));
        refetch();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
  // get name product
  const fetchNameProduct = async () => {
    const response = await axiosInstance.get(`/api/products/names`);
    return response.data;
  };

  const { data: dataNameMaterial } = useQuery({
    queryKey: ["fetchNameProduct"],
    queryFn: fetchNameProduct,
  });
  // get previes name
  const getPreviesName = async () => {
    const response = await axiosInstance.get(
      `/api/materials/names/${currentTab}/${id}`
    );
    return response.data;
  };

  const { data: dataPreviesName } = useQuery({
    queryKey: ["getPreviesName", currentTab],
    queryFn: getPreviesName,
    enabled: currentTab !== "Material",
  });

  return (
    <TableRow>
      {currentTab === "Material" ? (
        <TableCell>
          <TextField
            select
            fullWidth
            size="small"
            onChange={handlechange}
            name="materialName"
            label={t("EstimatorPage.addTab.selectProduct")}
            variant="outlined"
          >
            <MenuItem value="" disabled>
              {t("EstimatorPage.addTab.selectName")}
            </MenuItem>
            {dataNameMaterial?.data?.map((option) => (
              <MenuItem key={option._id} value={option}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </TableCell>
      ) : (
        <TableCell sx={{ position: "absolute" }}>
          <CreatableSelect
            options={
              dataPreviesName?.data?.map((option) => ({
                label: option.materialName,
                value: option.materialName,
              })) || []
            }
            placeholder={t("EstimatorPage.addTab.enterName")}
            name="materialName"
            onChange={(selectedOption) =>
              handlechange({
                target: { name: "materialName", value: selectedOption?.value },
              })
            }
          />
        </TableCell>
      )}

      <TableCell>
        <TextField
          size="small"
          onChange={(e) => setUnitOfMeasure(e.target.value)}
          name="unitOfMeasure"
          value={unitOfMeasure}
        />
      </TableCell>

      <TableCell>
        <TextField
          type="number"
          size="small"
          onChange={handlechange}
          name="quantity"
        />
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          size="small"
          onChange={(e) => setCost(e.target.value)}
          name="cost"
          value={cost}
        />
      </TableCell>
      {applyOn === "BOQ Lines" && (
        <TableCell>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              variant="outlined"
              fullWidth
              onChange={handlechange}
              name="boqLineItem"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            >
              <MenuItem value="" disabled>
                Select BOQ Item
              </MenuItem>
              {workItems?.data?.map((e, i) => (
                <MenuItem key={i} value={e?._id} size="small">
                  {e?.workItemName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </TableCell>
      )}
      {showProfitFromDatabase && <TableCell></TableCell>}
      {showTaxFromDatabase && <TableCell></TableCell>}

      <TableCell>{valueFull?.quantity * cost || 0}</TableCell>
      <TableCell>
        <Tooltip title="Add Row" onClick={handleAddRow}>
          <IconButton color="error">
            <AddBoxIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
AddTabFourEstimation.propTypes = {
  currentTab: PropTypes.string,
  refetch: PropTypes.func,
  setNumberNewAddTab: PropTypes.func,
  showProfitFromDatabase: PropTypes.any,
  showTaxFromDatabase: PropTypes.any,
};
