import React, { useState, useMemo } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  Tooltip,
  Avatar,
  Switch,
  Snackbar,
  Alert,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import PrintIcon from "@mui/icons-material/Print";
import RefreshIcon from "@mui/icons-material/Refresh";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PendingIcon from "@mui/icons-material/HourglassTop";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProductsList from "../ProductsList/ProductsList";
import Modal from "@mui/material/Modal";

const MaterialRequest = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  const [project, setProject] = useState("");
  const [workItem, setWorkItem] = useState("");
  const [linkWithBOQ, setLinkWithBOQ] = useState(false);
  const [emergency, setEmergency] = useState(false);
  const [orderDate, setOrderDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  // const [orderBy, setOrderBy] = useState('');
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const summaryData = [
    { label: "Total Approved Line", value: 7155, color: "#4CAF50" },
    { label: "Number of Items", value: 2, color: "#FF9800" },
    { label: "Total Cost", value: 5685, color: "#2196F3" },
  ];

  const requestSequence = "MR-2024-001";

  const [items, setItems] = useState([]);
  const handleSelectItem = (item) => {
    handleAddNewItem(item);
    handleClose(true);
  };
  const handleAddNewItem = (item) => {
    const newItem = {
      id: item._id,
      product: item.name,
      boqLine: item.name,
      uom: item.uom,
      boqQty: "-",
      qtyAvailable: 0,
      qtyApproved: 0,
      qtyDelivered: 0,
      qtyRequests: item.quantity,
      unitCost: item.price,
      totalCost: item.price,
    };
    setItems([...items, newItem]);
  };

  const handleApproveLine = (id) => {
    setOpenSnackbar({
      open: true,
      message: `Line with ID ${id} approved`,
      severity: "success",
    });
  };

  const [searchTerm, setSearchTerm] = useState("");

  const itemColumns = [
    { field: "product", headerName: "Product", width: 150, editable: true },
    { field: "boqLine", headerName: "BOQ Line", width: 130, editable: true },
    { field: "uom", headerName: "UOM", width: 90, editable: true },
    { field: "boqQty", headerName: "BOQ Qty", width: 100, editable: true },
    {
      field: "qtyAvailable",
      headerName: "QTY Available",
      width: 130,
      editable: true,
    },
    {
      field: "qtyApproved",
      headerName: "QTY Approved",
      width: 130,
      editable: true,
    },
    {
      field: "qtyRequests",
      headerName: "QTY Requests",
      width: 130,
      editable: true,
    },
    {
      field: "qtyDelivered",
      headerName: "QTY Delivered",
      width: 130,
      editable: true,
    },
    { field: "unitCost", headerName: "Unit Cost", width: 110, editable: true },
    {
      field: "totalCost",
      headerName: "Total Cost",
      width: 110,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="secondary">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Approve Line">
            <Button
              variant="contained"
              color="success"
              onClick={() => handleApproveLine(params.row.id)}
              sx={{ ml: 1 }}
            >
              Approve Line
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];

  const filteredItems = items.filter((item) =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const approvalStages = [
    {
      label: "Submitted",
      icon: <PendingIcon />,
      buttonText: "Submit to Manager",
      tooltip:
        "This stage involves initial submission to the manager for review.",
    },
    {
      label: "Pending First Approval",
      icon: <HourglassEmptyIcon />,
      buttonText: "Approve",
      tooltip: "First-level approval from the manager is required.",
    },
    {
      label: "Second Approval",
      icon: <HourglassEmptyIcon />,
      buttonText: "Final Approval",
      tooltip: "Final review and approval from upper management.",
    },
    {
      label: "Approved",
      icon: <CheckCircleIcon />,
      buttonText: "Complete",
      tooltip: "Request has been fully approved and is now complete.",
    },
  ];

  const [currentStage, setCurrentStage] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleStageButtonClick = () => {
    if (currentStage < approvalStages.length - 1) {
      setCurrentStage(currentStage + 1);
      setOpenSnackbar({
        open: true,
        message: `Stage "${approvalStages[currentStage].label}" approved`,
        severity: "info",
      });
    } else {
      setOpenSnackbar({
        open: true,
        message: "Workflow Complete",
        severity: "success",
      });
    }
  };

  // const MaterialRequest = () => {
  //   return (
  //     <div>
  //       <h1>Material Request</h1>
  //       <p>This is the Material Request page.</p>
  //     </div>
  //   );
  // };

  const handleSaveAsDraft = () => {
    setOpenSnackbar({
      open: true,
      message: "Request saved as draft",
      severity: "info",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Snackbar
          open={openSnackbar.open}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar({ ...openSnackbar, open: false })}
        >
          <Alert
            onClose={() => setOpenSnackbar({ ...openSnackbar, open: false })}
            severity={openSnackbar.severity}
          >
            {openSnackbar.message}
          </Alert>
        </Snackbar>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ my: 4 }}
        >
          {approvalStages.map((stage, index) => (
            <Grid
              item
              xs
              key={index}
              sx={{ textAlign: "center", position: "relative" }}
            >
              <Tooltip title={stage.tooltip} arrow>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: currentStage >= index ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Avatar
                    sx={{
                      bgcolor:
                        currentStage >= index ? "primary.main" : "grey.300",
                      color: currentStage >= index ? "white" : "grey.600",
                      width: 40,
                      height: 40,
                      mb: 1,
                    }}
                  >
                    {stage.icon}
                  </Avatar>
                  <Typography
                    variant="body2"
                    color={currentStage >= index ? "primary" : "textSecondary"}
                  >
                    {stage.label}
                  </Typography>
                </motion.div>
              </Tooltip>
              {index < approvalStages.length - 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "20px",
                    left: "50%",
                    width: "100%",
                    height: "5px",
                    bgcolor: currentStage > index ? "primary.main" : "grey.300",
                    zIndex: -1,
                  }}
                />
              )}
            </Grid>
          ))}
        </Grid>
        <Grid container justifyContent="center" sx={{ mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStageButtonClick}
            disabled={currentStage >= approvalStages.length - 1}
          >
            {approvalStages[currentStage].buttonText}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSaveAsDraft}
            sx={{ ml: 2 }}
          >
            Save as Draft
          </Button>
          <Button
            variant="outlined"
            color="info"
            startIcon={<HelpOutlineIcon />}
            sx={{ ml: 2 }}
            onClick={() =>
              setOpenSnackbar({
                open: true,
                message:
                  "This is a tutorial to guide you through the workflow.",
                severity: "info",
              })
            }
          >
            Help
          </Button>
        </Grid>
        <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
          <Tooltip title="Toggle Dark Mode">
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </Tooltip>
          <Tooltip title="Refresh Data">
            <IconButton color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print Request">
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrint}
              startIcon={<PrintIcon />}
            >
              Print
            </Button>
          </Tooltip>
        </Grid>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          component={motion.div}
          animate={{ scale: 1.1 }}
          sx={{ mt: 2 }}
        >
          Material Request {requestSequence}
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {summaryData.map((data, index) => (
            <Grid item xs={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card
                  sx={{
                    backgroundColor: data.color,
                    color: "white",
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {data.label}
                    </Typography>
                    <Typography variant="h4">{data.value}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        {/* Input Fields Section */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {[
            // General project information
            {
              label: "Project",
              value: project,
              onChange: (e) => setProject(e.target.value),
            },
            {
              label: "Work Item",
              value: workItem,
              onChange: (e) => setWorkItem(e.target.value),
            },

            // Dates
            {
              label: "Order Date",
              value: orderDate,
              onChange: (e) => setOrderDate(e.target.value),
              type: "date",
            },
            {
              label: "Delivery Date",
              value: deliveryDate,
              onChange: (e) => setDeliveryDate(e.target.value),
              type: "date",
            },

            // Status & Reason
            {
              label: "Status",
              value: status,
              onChange: (e) => setStatus(e.target.value),
            },
            {
              label: "Reason",
              value: reason,
              onChange: (e) => setReason(e.target.value),
            },

            // Toggle switches
            {
              label: "Link with BOQ",
              value: linkWithBOQ,
              onChange: () => setLinkWithBOQ(!linkWithBOQ),
              type: "switch",
            },
            {
              label: "Emergency",
              value: emergency,
              onChange: () => setEmergency(!emergency),
              type: "switch",
            },
          ].map((field, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              {field.type === "switch" ? (
                <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    {field.label}
                  </Typography>
                  <Switch checked={field.value} onChange={field.onChange} />
                </Box>
              ) : (
                <TextField
                  label={field.label}
                  type={field.type || "text"}
                  value={field.value}
                  onChange={field.onChange}
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              )}
            </Grid>
          ))}
        </Grid>
        <Grid container alignItems="center" sx={{ mt: 3 }}>
          <TextField
            label="Search Items"
            fullWidth
            variant="outlined"
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon color="action" />,
            }}
          />
        </Grid>
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Items
        </Typography>
        <motion.div whileHover={{ scale: 1.02 }}>
          <DataGrid
            rows={filteredItems}
            columns={itemColumns}
            autoHeight
            pageSize={5}
            checkboxSelection
            sx={{
              "& .MuiDataGrid-root": {
                borderRadius: 2,
                boxShadow: 3,
                bgcolor: "background.paper",
              },
            }}
          />
        </motion.div>
        <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOpen}
            sx={{ borderRadius: 2 }}
          >
            Add New Line
          </Button>
          <Button variant="contained" color="success" sx={{ borderRadius: 2 }}>
            Bulk Approve
          </Button>
        </Grid>
        <Typography variant="h6" gutterBottom>
          Upload Document
        </Typography>
        <Box
          mt={2}
          p={2}
          sx={{
            border: "2px dashed #2196F3",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <AttachFileIcon sx={{ fontSize: "2rem", color: "#2196F3" }} />
          <Typography variant="body1" color="textSecondary">
            Drag & Drop File Here
          </Typography>
        </Box>
        <div>
          <Button>Open modal</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "content-fit",
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                List of products
              </Typography>
              <ProductsList
                onSelect={handleSelectItem}
              />
            </Box>
          </Modal>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default MaterialRequest;
