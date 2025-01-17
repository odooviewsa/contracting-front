import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Collapse,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function ProjectDetailsEstimator() {
  // Language
  const { t } = useTranslation();
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const applyOn = searchParams.get("applyOn");
  const projectName = searchParams.get("projectName");
  const codeContract = searchParams.get("codeContract");
  return (
    <Paper
      elevation={4}
      sx={{
        marginBottom: 4,
        borderRadius: 0,
        overflow: "hidden",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 0.1,
          backgroundColor: "#2C3E50",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={() => setDetailsExpanded(!detailsExpanded)}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {t("EstimatorPage.projectDetails.headTitle")}
        </Typography>
        {detailsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Box>

      {/* Collapsible Content */}
      <Collapse in={detailsExpanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            padding: 3,
            backgroundColor: "#f4f6f9",
          }}
        >
          <Grid container spacing={2}>
            {/* Project Name Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                label={t("EstimatorPage.projectDetails.fields.projectName")}
                variant="outlined"
                fullWidth
                size="small"
                value={projectName || ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              ></TextField>
            </Grid>

            {/* Apply On Dropdown */}
            <Grid item xs={12} sm={6}>
              <TextField
                label={t("EstimatorPage.projectDetails.fields.applyOn")}
                variant="outlined"
                fullWidth
                value={applyOn || ""}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              ></TextField>
            </Grid>

            {/* Contract Selection Field */}

            <Grid item xs={12} sm={6}>
              <TextField
                label={t(
                  "EstimatorPage.projectDetails.fields.contractSelection"
                )}
                variant="outlined"
                fullWidth
                value={codeContract || ""}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              ></TextField>
            </Grid>
          </Grid>

          {/* Save and Load Templates */}
          {/* <Paper
            elevation={2}
            sx={{
              marginTop: 4,
              padding: 2,
              borderRadius: 3,
              backgroundColor: "#fff",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#0d47a1",
                marginBottom: 2,
              }}
            >
              Template Management
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#0d47a1",
                  "&:hover": {
                    backgroundColor: "#0b3c91",
                  },
                }}
              >
                Save as Template
              </Button>
              <Select
                displayEmpty
                value=""
                sx={{
                  width: 300,
                  borderRadius: 2,
                }}
                size="small"
              >
                <MenuItem value="" disabled>
                  Load from Template
                </MenuItem>
              </Select>
            </Box>
          </Paper> */}
        </Box>
      </Collapse>
    </Paper>
  );
}
