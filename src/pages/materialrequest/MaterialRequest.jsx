import React, { useState } from "react";
import {
  Container,
  Grid,
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
  Card,
  CardContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PendingIcon from "@mui/icons-material/HourglassTop";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProductsList from "../elements/ProductsList/ProductsList";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import { axiosInstance } from "../../axios/axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useTranslation } from "react-i18next";
import PrintIcon from "@mui/icons-material/Print";
import RefreshIcon from "@mui/icons-material/Refresh";

const MaterialRequest = () => {
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

  const [projectsData, setProjectsData] = useState(null);

  const [items, setItems] = useState([]);
  // Language
  const { t } = useTranslation();
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
    {
      field: "product",
      headerName: t("MaterialRequestForm.table.items.product"),
      width: 150,
      editable: true,
    },
    {
      field: "boqLine",
      headerName: t("MaterialRequestForm.table.items.boqLine"),
      width: 130,
      editable: true,
    },
    {
      field: "uom",
      headerName: t("MaterialRequestForm.table.items.uom"),
      width: 90,
      editable: true,
    },
    {
      field: "boqQty",
      headerName: t("MaterialRequestForm.table.items.boqQty"),
      width: 100,
      editable: true,
    },
    {
      field: "qtyAvailable",
      headerName: t("MaterialRequestForm.table.items.qtyAvailable"),
      width: 130,
      editable: true,
    },
    {
      field: "qtyApproved",
      headerName: t("MaterialRequestForm.table.items.qtyApproved"),
      width: 130,
      editable: true,
    },
    {
      field: "qtyRequests",
      headerName: t("MaterialRequestForm.table.items.qtyRequests"),
      width: 130,
      editable: true,
    },
    {
      field: "qtyDelivered",
      headerName: t("MaterialRequestForm.table.items.qtyDelivered"),
      width: 130,
      editable: true,
    },
    {
      field: "unitCost",
      headerName: t("MaterialRequestForm.table.items.unitCost"),
      width: 110,
      editable: true,
    },
    {
      field: "totalCost",
      headerName: t("MaterialRequestForm.table.items.totalCost"),
      width: 110,
      editable: true,
    },
    {
      field: "actions",
      headerName: t("MaterialRequestForm.table.items.actions"),
      width: 250,
      renderCell: (params) => (
        <>
          <Tooltip title={t("edit")}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("delete")}>
            <IconButton color="secondary">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("approveLine")}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleApproveLine(params.row.id)}
              sx={{ ml: 1 }}
            >
              {t("approveLine")}
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

  const handleSaveAsDraft = () => {
    setOpenSnackbar({
      open: true,
      message: "Request saved as draft",
      severity: "info",
    });
  };

  //  Fetch User Projects
  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const res = await axiosInstance.get("/api/projects");
        if (!res) {
          console.log("Somthing went wrong!");
        }
        setProjectsData(
          res.data.projects.map((project) => ({
            label: project.projectName,
            value: project._id,
          }))
        );
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUserProjects();
  }, []);
  const animatedComponents = makeAnimated();
  const requestSequence = "MR-2024-001";
  const summaryData = t("MaterialRequestPage.cards", { returnObjects: true });
  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <CssBaseline />
      <Container>
        <div>
          <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
            <Tooltip title={t("MaterialRequestPage.tooltips.refresh")}>
              <IconButton color="primary">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("MaterialRequestPage.tooltips.print")}>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePrint}
                startIcon={<PrintIcon />}
              >
                {t("MaterialRequestPage.buttons.printButton")}
              </Button>
            </Tooltip>
          </Grid>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            animate={{ scale: 1.1 }}
            sx={{ mt: 2 }}
          >
            {t("MaterialRequestPage.title")} {requestSequence}
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {summaryData.map((data, index) => (
              <Grid item xs={4} key={index}>
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
              </Grid>
            ))}
          </Grid>
        </div>
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
            {t("MaterialRequestForm.buttons.saveButton")}
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
            {t("MaterialRequestForm.buttons.helpButton")}
          </Button>
        </Grid>

        {/* Input Fields Section */}
        <Grid container spacing={2} sx={{ mt: 3 }}>
          {[
            {
              label: t("MaterialRequestForm.fields.project"),
              value: project,
              onChange: (e) => setProject(e.target.value),
              type: "select",
            },
            {
              label: t("MaterialRequestForm.fields.workItem"),
              value: workItem,
              onChange: (e) => setWorkItem(e.target.value),
            },
            {
              label: t("MaterialRequestForm.fields.orderDate"),
              value: orderDate,
              onChange: (e) => setOrderDate(e.target.value),
              type: "date",
            },
            {
              label: t("MaterialRequestForm.fields.deliveryDate"),
              value: deliveryDate,
              onChange: (e) => setDeliveryDate(e.target.value),
              type: "date",
            },
            {
              label: t("MaterialRequestForm.fields.status"),
              value: status,
              onChange: (e) => setStatus(e.target.value),
            },
            {
              label: t("MaterialRequestForm.fields.reason"),
              value: reason,
              onChange: (e) => setReason(e.target.value),
            },
            {
              label: t("MaterialRequestForm.fields.linkWithBOQ"),
              value: linkWithBOQ,
              onChange: () => setLinkWithBOQ(!linkWithBOQ),
              type: "switch",
            },
            {
              label: t("MaterialRequestForm.fields.emergency"),
              value: emergency,
              onChange: () => setEmergency(!emergency),
              type: "switch",
            },
          ].map((field, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              {field.type ? (
                field.type === "switch" ? (
                  <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      {field.label}
                    </Typography>
                    <Switch checked={field.value} onChange={field.onChange} />
                  </Box>
                ) : (
                  field.type === "select" && (
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        {field.label}
                      </label>
                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={projectsData}
                        // onChange={(e) => setSelectedTeamMembers(e)}
                        className="border-primaryColor"
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused
                              ? "#06385c"
                              : "#06385c",
                            padding: "2px",
                            "&:hover": {
                              borderColor: "#06385c",
                            },
                          }),
                        }}
                      />
                    </div>
                  )
                )
              ) : (
                <>
                  <div className="">
                    <label className="block text-gray-700 font-semibold mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      name={field.name}
                      className={`w-full px-4 py-2 border rounded-md border-primaryColor focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black`}
                      onFocus={(e) => {
                        if (field.type === "date") {
                          e.target.max = new Date(3000, 0, 1)
                            .toISOString()
                            .split("T")[0];
                        }
                      }}
                    />
                  </div>
                </>
              )}
            </Grid>
          ))}
        </Grid>
        <Grid container alignItems="center" sx={{ mt: 3 }}>
          <TextField
            label={t("MaterialRequestForm.searchBar")}
            fullWidth
            variant="outlined"
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon color="action" />,
            }}
          />
        </Grid>
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          {t("MaterialRequestForm.table.title")}
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
            {t("MaterialRequestForm.buttons.addLineButton")}
          </Button>
          <Button variant="contained" color="success" sx={{ borderRadius: 2 }}>
            {t("MaterialRequestForm.buttons.bulkButton")}
          </Button>
        </Grid>
        <Typography variant="h6" gutterBottom>
          {t("MaterialRequestForm.upload.text")}
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
            {t("MaterialRequestForm.upload.model")}
          </Typography>
        </Box>
        <div>
          <Button>{t("MaterialRequestForm.upload.button")}</Button>
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
                width: "80%",
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {t("ProductsList.title")}
              </Typography>
              <ProductsList onSelect={handleSelectItem} />
            </Box>
          </Modal>
        </div>
      </Container>
    </>
  );
};

export default MaterialRequest;
