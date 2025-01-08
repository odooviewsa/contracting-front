import {
  Tooltip,
  Card,
  CardContent,
  Grid,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import RefreshIcon from "@mui/icons-material/Refresh";

const MaterialRequestList = () => {
  const requestSequence = "MR-2024-001";
  const summaryData = [
    { label: "Total Approved Line", value: 7155, color: "#4CAF50" },
    { label: "Number of Items", value: 2, color: "#FF9800" },
    { label: "Total Cost", value: 5685, color: "#2196F3" },
  ];
  const handlePrint = () => {
    window.print();
  };
  return (
    <main className="flex flex-col items-stretch gap-8">
      <div>
        <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
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
          animate={{ scale: 1.1 }}
          sx={{ mt: 2 }}
        >
          Material Request {requestSequence}
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
      <div>No Materials Yet</div>
    </main>
  );
};
export default MaterialRequestList;
