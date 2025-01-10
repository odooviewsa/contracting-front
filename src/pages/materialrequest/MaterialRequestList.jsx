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
import { useTranslation } from "react-i18next";

const MaterialRequestList = () => {
  const { t } = useTranslation();
  const requestSequence = "MR-2024-001";
  const summaryData = t("MaterialRequestPage.cards", { returnObjects: true });
  const handlePrint = () => {
    window.print();
  };
  return (
    <main className="flex flex-col items-stretch gap-8">
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
      <div>{t("MaterialRequestPage.noFound")}</div>
    </main>
  );
};
export default MaterialRequestList;
