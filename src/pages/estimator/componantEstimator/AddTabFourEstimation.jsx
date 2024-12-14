import {
  Grid,
  IconButton,
  MenuItem,
  //   IconButton,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  //   Tooltip,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../axios/axios";
import { useParams } from "react-router-dom";
export default function AddTabFourEstimation({
  applyOn,
  currentTab,
  refetch,
  setNumberNewAddTab,
}) {
  const [valueFull, setValuFull] = useState({});
  function handlechange(e) {
    setValuFull((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  const { id } = useParams();
  async function handleAddRow() {
    const formDate = {
      ...valueFull,
      category: currentTab,
      applyOn: applyOn,
      contract: "674f9d510eec42308a494882",
      projectName: "674bcb8cf20ca248e0ebf0c3",
      estimatorId: id,
    };

    if (
      !valueFull?.materialName ||
      !valueFull?.unitOfMeasure ||
      !valueFull?.cost ||
      !valueFull?.quantity
    )
      return toast.error("you must fill All Date");

    try {
      const response = await axiosInstance.post(`/api/materials`, formDate);
      console.log(response);
      if (response?.status === 201) {
        setNumberNewAddTab((prev) =>
          prev.map((item) =>
            item.category === currentTab
              ? { ...item, number: item.number - 1 }
              : item
          )
        );
        toast.success("add Successfully");
        refetch();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
  return (
    <TableRow>
      <TableCell>
        <TextField size="small" onChange={handlechange} name="materialName" />
      </TableCell>
      <TableCell>
        <TextField size="small" onChange={handlechange} name="unitOfMeasure" />
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
          onChange={handlechange}
          name="cost"
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
              <MenuItem value="Whole BOQ" size="small">
                Whole BOQ
              </MenuItem>
              <MenuItem value="BOQ Lines" size="small">
                BOQ Lines
              </MenuItem>
            </TextField>
          </Grid>
        </TableCell>
      )}
      <TableCell>{valueFull?.quantity * valueFull?.cost || 0}</TableCell>
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
  applyOn: PropTypes.any,
  currentTab: PropTypes.string,
  refetch: PropTypes.func,
  setNumberNewAddTab: PropTypes.func,
};
