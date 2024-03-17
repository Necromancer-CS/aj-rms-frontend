import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Grid, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ReportCard from "src/pages/dashboard/reportCard";
import SalesMonthly from "src/pages/dashboard/salesMonthly";
import LocalAtmTwoToneIcon from "@mui/icons-material/LocalAtmTwoTone";
import TableBarTwoToneIcon from "@mui/icons-material/TableBarTwoTone";
import FastfoodTwoToneIcon from "@mui/icons-material/FastfoodTwoTone";
import RiceBowlTwoToneIcon from "@mui/icons-material/RiceBowlTwoTone";

import { useQuery } from "@tanstack/react-query";
import {
  salesMonthly,
  topMenu,
  topPackage,
  totalOpenDesk,
  totalPrice,
} from "src/functions/dashboard";
import { DeshboardItem } from "src/types/deshboard";
import HighlightCard from "./highlightCard";
import TopFiveCard from "./topFiveCard";

const MainDashboard = () => {
  const theme = useTheme();

  // ดึงข้อมูล totalPrice
  const { data: totalPriceData } = useQuery<DeshboardItem>({
    queryKey: ["totalPrice"],
    queryFn: () => totalPrice().then((res) => res.data),
  });

  // ดึงข้อมูล totalOpenDesk
  const { data: totalOpenDeskData } = useQuery<DeshboardItem>({
    queryKey: ["totalOpenDesk"],
    queryFn: () => totalOpenDesk().then((res) => res.data),
  });

  // ดึงข้อมูล topPackage
  const { data: topPackageData } = useQuery<DeshboardItem>({
    queryKey: ["topPackage"],
    queryFn: () => topPackage().then((res) => res.data),
  });

  // ดึงข้อมูล topMenu
  const { data: topMenuData } = useQuery<DeshboardItem>({
    queryKey: ["topMenu"],
    queryFn: () => topMenu().then((res) => res.data),
  });

  // ดึงข้อมูล salesMonthly
  const { data: salesMonthlyData } = useQuery<DeshboardItem>({
    queryKey: ["salesMonthly"],
    queryFn: () => salesMonthly().then((res) => res.data),
  });

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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item lg={3} sm={6} xs={12}>
                  <ReportCard
                    primary={totalPriceData?.total}
                    secondary="รายได้รวมทั้งหมด"
                    color={theme.palette.warning.main}
                    iconPrimary={LocalAtmTwoToneIcon}
                  />
                </Grid>
                <Grid item lg={3} sm={6} xs={12}>
                  <ReportCard
                    primary={totalOpenDeskData?.totalOpenDesk}
                    secondary="จำนวนการเปิดโต๊ะทั้งหมด"
                    color={theme.palette.error.main}
                    iconPrimary={TableBarTwoToneIcon}
                  />
                </Grid>
                <Grid item lg={3} sm={6} xs={12}>
                  <ReportCard
                    primary={topMenuData?.totalOrderedMenus}
                    secondary="จำนวนเมนูที่ถูกสั่งทั้งหมด"
                    color={theme.palette.success.main}
                    iconPrimary={FastfoodTwoToneIcon}
                  />
                </Grid>
                <Grid item lg={3} sm={6} xs={12}>
                  <ReportCard
                    primary={topPackageData?.topPackage}
                    secondary="เมนูที่มีการเลือกมากที่สุด"
                    count={topPackageData?.count}
                    color={theme.palette.primary.main}
                    iconPrimary={RiceBowlTwoToneIcon}
                  />
                </Grid>
                <Grid item lg={12} sm={12} xs={9}>
                  <SalesMonthly />
                </Grid>
                <Grid item lg={12} sm={12} xs={12}>
                  <TopFiveCard />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default MainDashboard;
