import React from "react";
import { useQuery } from "@tanstack/react-query";
import { totalPriceForMonthSegments } from "src/functions/dashboard";
import { DeshboardItem } from "src/types/deshboard";
import { BarChart } from "@mui/x-charts/BarChart";
import { Card, CardContent, colors, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";

const BarChartCard: React.FC = () => {
  // ดึงข้อมูล totalPriceForMonthSegments
  const { data: totalPriceForMonthSegmentsData } = useQuery<DeshboardItem>({
    queryKey: ["totalPriceForMonthSegments"],
    queryFn: () => totalPriceForMonthSegments().then((res) => res.data),
  });

  // ตรวจสอบว่าข้อมูลถูกโหลดและไม่มีข้อผิดพลาดก่อนที่จะใช้
  if (!totalPriceForMonthSegmentsData) {
    return <div>Loading...</div>;
  }

  // แปลงข้อมูล totalPriceForMonthSegments เป็นรูปแบบที่เหมาะสมสำหรับ BarChart
  // แปลงข้อมูล totalPriceForMonthSegments เป็นรูปแบบที่เหมาะสมสำหรับ BarChart
  const chartData = totalPriceForMonthSegmentsData?.map((item) => ({
    group: `${dayjs(item.weekStartDate).format("DD/MM/YYYY")} - ${dayjs(
      item.weekEndDate
    ).format("DD/MM/YYYY")}`, // ใช้ช่วงเวลาเป็นกลุ่ม
    value: item.totalPriceInWeek, // ใช้ totalPriceInWeek เป็นค่าของแต่ละกลุ่ม
  }));

  console.log(chartData);
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
            }} // การจัดการตำแหน่งของข้อความ
          >
            กราฟแสดงยอดขายและสตาร์
          </Typography>
          <BarChart
            xAxis={[
              { scaleType: "band", data: chartData.map((data) => data.group) },
            ]}
            series={[{ data: chartData?.map((data) => data.value) }]}
            height={500}
          />
        </CardContent>
      </Card>
    </Paper>
  );
};

export default BarChartCard;
