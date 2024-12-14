import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PrintIcon from "@mui/icons-material/Print";
// import { useState } from "react";

export default function HeaderEstimator() {
  // const [snackbar, setSnackbar] = useState({
  //   open: false,
  //   message: "",
  //   severity: "success",
  // });

//   const [rows, setRows] = useState({
//     Material: [],
//     Labor: [],
//     Equipment: [],
//     "Other Costs": [],
//   });
  const handlePrint = () => {
    window.print();
  };
  // const showSnackbar = (message, severity) => {
  //   setSnackbar({ open: true, message, severity });
  // };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         try {
//           const uploadedData = JSON.parse(reader.result);
//           setRows(uploadedData);
//           showSnackbar("Bulk upload successful", "success");
//         } catch {
//           showSnackbar("Invalid file format", "error");
//         }
//       };
//       reader.readAsText(file);
//     }
//   };
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
          BOQ Item Cost Estimator
        </Typography>
        <Box>
          {/* Bulk Upload */}
          <input
            type="file"
            accept=".json"
            id="file-upload"
            style={{ display: "none" }}
            // onChange={handleFileUpload}
          />
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
            onClick={handlePrint}
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
      </Box>
    </div>
  );
}
