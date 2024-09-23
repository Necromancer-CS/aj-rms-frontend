import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { colors, Grid, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ReportCard from "src/pages/dashboard/reportCard";
import LocalAtmTwoToneIcon from "@mui/icons-material/LocalAtmTwoTone";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

import { useQuery } from "@tanstack/react-query";
import {
  totalPriceForDay,
  totalPriceForWeek,
  totalPriceForMonth,
  totalPriceForYear,
} from "src/functions/dashboard";
import { DeshboardItem } from "src/types/deshboard";
import BarChartCard from "./barChartCard";
import BarChartPackageCard from "./BarChartPackageCard";
import { useState } from "react";

const MainDashboard = () => {
  const theme = useTheme();
  // ดึงข้อมูล totalPriceForDayData
  const { data: totalPriceForDayData } = useQuery<DeshboardItem>({
    queryKey: ["totalPriceForDay"],
    queryFn: () => totalPriceForDay().then((res) => res.data),
  });

  // ดึงข้อมูล totalPriceForWeekData
  const { data: totalPriceForWeekData } = useQuery<DeshboardItem>({
    queryKey: ["totalPriceForWeek"],
    queryFn: () => totalPriceForWeek().then((res) => res.data),
  });

  // ดึงข้อมูล totalPriceForMonthData
  const { data: totalPriceForMonthData } = useQuery<DeshboardItem>({
    queryKey: ["totalPriceForMonth"],
    queryFn: () => totalPriceForMonth().then((res) => res.data),
  });

  // ดึงข้อมูล totalPriceForYear
  const { data: totalPriceForYearData } = useQuery<DeshboardItem>({
    queryKey: ["totalPriceForYear"],
    queryFn: () => totalPriceForYear().then((res) => res.data),
  });

  const [valuePrimary, setValuePrimary] = useState<boolean>(true);

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
                  <Typography variant="h4">รายงานสรุปรายรับ</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Paper>
          <br />

          {valuePrimary != false && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item lg={3} sm={6} xs={12}>
                    <ReportCard
                      primary={totalPriceForDayData?.totalPriceForDay}
                      primaryTwo={totalPriceForDayData?.totalPriceForYesterday}
                      secondary="ยอดขายรายวัน"
                      color={"rgb(211, 47, 47)"}
                      iconPrimary={LocalAtmTwoToneIcon}
                      footerData={
                        totalPriceForDayData?.percentageChange > 0
                          ? `กำไร ${Math.abs(
                              totalPriceForDayData?.percentageChange
                            )}%`
                          : totalPriceForDayData?.percentageChange < 0
                          ? `ขาดทุน ${Math.abs(
                              totalPriceForDayData?.percentageChange
                            )}%`
                          : `เท่าเดิม ${Math.abs(
                              totalPriceForDayData?.percentageChange
                            )}%`
                      }
                      iconFooter={
                        totalPriceForDayData?.percentageChange > 0
                          ? TrendingUpIcon
                          : totalPriceForDayData?.percentageChange < 0
                          ? TrendingDownIcon
                          : TrendingFlatIcon
                      }
                    />
                  </Grid>

                  <Grid item lg={3} sm={6} xs={12}>
                    <ReportCard
                      primary={totalPriceForWeekData?.totalPriceThisWeek}
                      primaryTwo={totalPriceForWeekData?.totalPriceForWeek}
                      secondary="ยอดขายสัปดาห์"
                      color={"rgb(237, 108, 2)"}
                      iconPrimary={LocalAtmTwoToneIcon}
                      footerData={
                        totalPriceForWeekData?.percentageChange > 0
                          ? `กำไร ${Math.abs(
                              totalPriceForWeekData?.percentageChange
                            )}%`
                          : totalPriceForWeekData?.percentageChange < 0
                          ? `ขาดทุน ${Math.abs(
                              totalPriceForWeekData?.percentageChange
                            )}%`
                          : `เท่าเดิม ${Math.abs(
                              totalPriceForWeekData?.percentageChange
                            )}%`
                      }
                      iconFooter={
                        totalPriceForWeekData?.percentageChange > 0
                          ? TrendingUpIcon
                          : totalPriceForWeekData?.percentageChange < 0
                          ? TrendingDownIcon
                          : TrendingFlatIcon
                      }
                    />
                  </Grid>

                  <Grid item lg={3} sm={6} xs={12}>
                    <ReportCard
                      primary={totalPriceForMonthData?.totalPriceThisMonth}
                      primaryTwo={totalPriceForMonthData?.totalPriceLastMonth}
                      secondary="ยอดขายรายเดือน"
                      color={"rgb(46, 125, 50)"}
                      iconPrimary={LocalAtmTwoToneIcon}
                      footerData={
                        totalPriceForMonthData?.percentageChange > 0
                          ? `กำไร ${Math.abs(
                              totalPriceForMonthData?.percentageChange
                            )}%`
                          : totalPriceForMonthData?.percentageChange < 0
                          ? `ขาดทุน ${Math.abs(
                              totalPriceForMonthData?.percentageChange
                            )}%`
                          : `เท่าเดิม ${Math.abs(
                              totalPriceForMonthData?.percentageChange
                            )}%`
                      }
                      iconFooter={
                        totalPriceForMonthData?.percentageChange > 0
                          ? TrendingUpIcon
                          : totalPriceForMonthData?.percentageChange < 0
                          ? TrendingDownIcon
                          : TrendingFlatIcon
                      }
                    />
                  </Grid>

                  <Grid item lg={3} sm={6} xs={12}>
                    <ReportCard
                      primary={totalPriceForYearData?.totalPriceLastYear}
                      primaryTwo={totalPriceForYearData?.totalPriceThisYear}
                      secondary="ยอดขายรายปี"
                      color={"rgb(25, 118, 210)"}
                      iconPrimary={LocalAtmTwoToneIcon}
                      footerData={
                        totalPriceForYearData?.percentageChange > 0
                          ? `กำไร ${Math.abs(
                              totalPriceForYearData?.percentageChange
                            )}%`
                          : totalPriceForYearData?.percentageChange < 0
                          ? `ขาดทุน ${Math.abs(
                              totalPriceForYearData?.percentageChange
                            )}%`
                          : `เท่าเดิม ${Math.abs(
                              totalPriceForYearData?.percentageChange
                            )}%`
                      }
                      iconFooter={
                        totalPriceForYearData?.percentageChange > 0
                          ? TrendingUpIcon
                          : totalPriceForYearData?.percentageChange < 0
                          ? TrendingDownIcon
                          : TrendingFlatIcon
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid container spacing={3} sx={{ marginTop: "0.005px" }}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item lg={6} sm={6} xs={9}>
                  <BarChartCard />
                </Grid>
                <Grid item lg={6} sm={6} xs={9}>
                  <BarChartPackageCard />
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
