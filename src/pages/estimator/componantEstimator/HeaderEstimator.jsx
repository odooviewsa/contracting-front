import { Link, useLocation, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PrintIcon from "@mui/icons-material/Print";
import { useState } from "react";
import { axiosInstance } from "../../../axios/axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useQueryClient } from "@tanstack/react-query";

export default function HeaderEstimator({ currentTab }) {
  const [excelSheet, setExcelSheet] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const applyOn = searchParams.get("applyOn");
  const queryClient = useQueryClient();
  async function uploadFileExcel() {
    const formData = new FormData();
    formData.append("category", currentTab);
    formData.append("applyOn", applyOn);
    formData.append("file", excelSheet);
    try {
      const response = await axiosInstance.post(
        `/api/materials/${id}`,
        formData
      );

      if (response.status === 201) {
        toast.success("add excel sheet successfully");
        setExcelSheet(null);
        queryClient.invalidateQueries([
          "fetchEstimationFourTabs",
          currentTab,
          id,
        ]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
  return (
    <div>
      <Box sx={{ marginBottom: 2 }}>
        <Link
          href="/"
          underline="hover"
          sx={{ fontSize: 18, color: "#1976d2" }}
        >
          &larr; Back to Main Menu
        </Link>
      </Box>
      <div className="flex justify-between md:items-center md:flex-row flex-col gap-3 mb-3">
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#333",
            fontSize: { xs: "1.5rem", sm: "2.125rem" },
          }}
        >
          BOQ Item Cost Estimator
        </Typography>
        <Box>
          {/* Bulk Upload */}
          <input
            type="file"
            accept=".json"
            id="file-upload"
            style={{ display: "none" }}
            onChange={(e) => {
              if (applyOn !== "Whole BOQ") {
                return toast.error("you must apply on Whole BOQ");
              } else {
                setExcelSheet(e.target.files[0]);
              }
            }}
          />
          {excelSheet && (
            <Button
              variant="outlined"
              component="span"
              sx={{
                textTransform: "none",
                marginRight: 2, // Add spacing if needed
              }}
              onClick={uploadFileExcel}
            >
              Add
            </Button>
          )}
          <label htmlFor="file-upload">
            <Button
              variant="outlined"
              startIcon={<FileUploadIcon />}
              component="span"
              sx={{
                textTransform: "none",
                marginRight: 2, // Add spacing if needed
              }}
            >
              Bulk Upload
            </Button>
          </label>

          <Button
            variant="contained"
            startIcon={<PrintIcon />}
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Print
          </Button>
        </Box>
      </div>
    </div>
  );
}
HeaderEstimator.propTypes = {
  currentTab: PropTypes.any,
};
