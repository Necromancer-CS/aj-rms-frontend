import React from "react";
import { useQuery } from "@tanstack/react-query";
import { packageSelectionInMonth } from "src/functions/dashboard";
import { DeshboardItem } from "src/types/deshboard";
import { BarChart } from "@mui/x-charts/BarChart";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";

const BarChartPackageCard: React.FC = () => {
  // ดึงข้อมูล packageSelectionInMonth
  const { data: packageSelectionInMonthData } = useQuery<DeshboardItem[]>({
    queryKey: ["packageSelectionInMonth"],
    queryFn: () => packageSelectionInMonth().then((res) => res.data),
  });

  // ตรวจสอบว่าข้อมูลถูกโหลดและไม่มีข้อผิดพลาด
  if (!packageSelectionInMonthData) {
    return <div>Loading...</div>;
  }

  const chartData = packageSelectionInMonthData?.map((item) => ({
    group: item.packageName,
    value: item.selectionCount,
  }));

  return (
    <Paper elevation={24}>
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
            รายงานแสดงแพ็คเกจยอดนิยมในระยะ 1 เดือน
          </Typography>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: chartData.map((data) => data.group),
              },
            ]}
            series={[
              {
                data: chartData.map((data) => data.value),
              },
            ]}
            height={500}
          />
        </CardContent>
      </Card>
    </Paper>
  );
};

export default BarChartPackageCard;
