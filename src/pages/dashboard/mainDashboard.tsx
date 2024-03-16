import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Stack } from "@mui/material";

import SalesMonthly from "src/pages/dashboard/salesMonthly";
import TotalOpenDesk from "src/pages/dashboard/totalOpenDesk";

const MainDashboard = () => {
  return (
    <>
      <Box sx={{ display: "flex", p: 2 }}>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Paper elevation={6}>
            <Card>
              <CardContent
                sx={{
                  backgroundColor: "#2c2c2c",
                  color: "#fff",
                  textAlign: "left",
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <Typography variant="h4">จัดการข้อมูล</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Paper>
          <br />
          <Paper elevation={6}>
            <Card>
              <TotalOpenDesk />
              <SalesMonthly />
            </Card>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default MainDashboard;
