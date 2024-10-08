import React from "react";
import { useQuery } from "@tanstack/react-query";
import { totalPriceForMonthSegments } from "src/functions/dashboard";
import { DeshboardItem } from "src/types/deshboard";
import { BarChart } from "@mui/x-charts/BarChart";
import { Card, CardContent, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";

const BarChartCard: React.FC = () => {
  const {
    data: totalPriceForMonthSegmentsData,
    isLoading,
    error,
  } = useQuery<DeshboardItem[]>({
    queryKey: ["totalPriceForMonthSegments"],
    queryFn: () => totalPriceForMonthSegments().then((res) => res.data),
  });

  if (isLoading) {
    return (
      <Paper elevation={12}>
        <Card>
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              รายงานยอดขายรายสัปดาห์
            </Typography>
            <div>Loading...</div>
          </CardContent>
        </Card>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={12}>
        <Card>
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              รายงานยอดขายรายสัปดาห์
            </Typography>
            <div>Error loading data</div>
          </CardContent>
        </Card>
      </Paper>
    );
  }

  const chartData = totalPriceForMonthSegmentsData?.map((item) => ({
    group: `${dayjs(item.weekStartDate).format("DD/MM/YYYY")} - ${dayjs(
      item.weekEndDate
    ).format("DD/MM/YYYY")}`,
    value: item.totalPriceInWeek,
  }));

  return (
    <Paper elevation={12}>
      <Card>
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            รายงานยอดขายรายสัปดาห์
          </Typography>
          {chartData.length > 0 ? (
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: chartData.map((data) => data.group),
                },
              ]}
              series={[{ data: chartData.map((data) => data.value) }]}
              height={500}
            />
          ) : (
            <Typography
              variant="h6"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              No data available for the selected period
            </Typography>
          )}
        </CardContent>
      </Card>
    </Paper>
  );
};

export default BarChartCard;
