import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Collapse,
  MenuItem,
  Select,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveIcon from "@mui/icons-material/Save";
import PropTypes from "prop-types";
import { useState } from "react";
export default function ProjectDetailsEstimator({ applyOn, setApplyOn }) {
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [contractNumber] = useState("");

  const [projectName, setProjectName] = useState("");

  const [, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [templates, setTemplates] = useState([]);
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };
  const handleApplyOnChange = (value) => {
    setApplyOn(value);
  };
  const [rows, setRows] = useState({
    Material: [],
    Labor: [],
    Equipment: [],
    "Other Costs": [],
  });
  const saveTemplate = () => {
    setTemplates([
      ...templates,
      { name: `Template ${templates.length + 1}`, data: rows },
    ]);
    showSnackbar("Template saved successfully", "success");
  };

  const loadTemplate = (templateIndex) => {
    setRows(templates[templateIndex].data);
    showSnackbar("Template loaded successfully", "success");
  };
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
          Project Details
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
                label="Project Name"
                variant="outlined"
                fullWidth
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Apply On Dropdown */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Apply On"
                variant="outlined"
                fullWidth
                value={applyOn}
                onChange={(e) => handleApplyOnChange(e.target.value)} // Ensure this line exists
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select Apply On
                </MenuItem>
                <MenuItem value="Whole BOQ">Whole BOQ</MenuItem>
                <MenuItem value="BOQ Lines">BOQ Lines</MenuItem>
              </TextField>
            </Grid>

            {/* Contract Selection Field */}
            {applyOn && (
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contract Selection"
                  variant="outlined"
                  fullWidth
                  value={contractNumber}
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
            )}
          </Grid>

          {/* Save and Load Templates */}
          <Paper
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
                color: "#0d47a1", // Dark Blue Text
                marginBottom: 2,
              }}
            >
              Template Management
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={saveTemplate}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#0d47a1", // Dark Blue
                  "&:hover": {
                    backgroundColor: "#0b3c91", // Slightly lighter dark blue for hover
                  },
                }}
              >
                Save as Template
              </Button>
              <Select
                displayEmpty
                value=""
                onChange={(e) => loadTemplate(e.target.value)}
                sx={{
                  width: 300,
                  borderRadius: 2,
                }}
                size="small"
              >
                <MenuItem value="" disabled>
                  Load from Template
                </MenuItem>
                {templates.map((template, index) => (
                  <MenuItem key={index} value={index}>
                    {template.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Paper>
        </Box>
      </Collapse>
    </Paper>
  );
}

ProjectDetailsEstimator.propTypes = {
  applyOn: PropTypes.any,
  setApplyOn: PropTypes.func,

};
