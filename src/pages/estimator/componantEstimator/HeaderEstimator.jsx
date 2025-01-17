import { Link, useLocation, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PrintIcon from "@mui/icons-material/Print";
import { useState } from "react";
import { axiosInstance } from "../../../axios/axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export default function HeaderEstimator({ currentTab }) {
  // Language
  const { t } = useTranslation();
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
          &larr; {t("EstimatorPage.header.backButton")}
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
          {t("EstimatorPage.header.headTitle")}
        </Typography>
        <Box className="space-x-2">
          {/* Bulk Upload */}
          <input
            type="file"
            accept=".json"
            id="file-upload"
            style={{ display: "none" }}
            onChange={(e) => {
              if (applyOn !== "Whole BOQ") {
                return toast.error(
                  t("EstimatorPage.header.bulkUpload.errorMessage")
                );
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
              }}
              onClick={uploadFileExcel}
              className="rtl:flex-row-reverse ltr:flex-row"
            >
              {t("EstimatorPage.header.bulkUpload.excelSheetButton")}
            </Button>
          )}
          <label htmlFor="file-upload">
            <Button
              variant="outlined"
              startIcon={<FileUploadIcon />}
              component="span"
              sx={{
                textTransform: "none",
              }}
              className="rtl:flex-row-reverse ltr:flex-row"
            >
              {t("EstimatorPage.header.bulkUpload.bulkButton")}
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
            className="rtl:flex-row-reverse ltr:flex-row"
          >
            {t("EstimatorPage.header.bulkUpload.printButton")}
          </Button>
        </Box>
      </div>
    </div>
  );
}
HeaderEstimator.propTypes = {
  currentTab: PropTypes.any,
};
