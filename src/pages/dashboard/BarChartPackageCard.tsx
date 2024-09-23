// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { packageSelectionInMonth } from "src/functions/dashboard";
// import { DeshboardItem } from "src/types/deshboard";
// import { BarChart } from "@mui/x-charts/BarChart";
// import Paper from "@mui/material/Paper";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import { Typography } from "@mui/material";

// const BarChartPackageCard: React.FC = () => {
//   // ดึงข้อมูล packageSelectionInMonth
//   const { data: packageSelectionInMonthData } = useQuery<DeshboardItem[]>({
//     queryKey: ["packageSelectionInMonth"],
//     queryFn: () => packageSelectionInMonth().then((res) => res.data),
//   });

//   console.log(packageSelectionInMonthData);

//   // ตรวจสอบว่าข้อมูลถูกโหลดและไม่มีข้อผิดพลาด
//   if (!packageSelectionInMonthData) {
//     return (
//       <Paper elevation={24}>
//         <Card>
//           <CardContent>
//             <Typography
//               variant="h4"
//               gutterBottom
//               sx={{
//                 justifyContent: "center",
//                 alignItems: "center",
//                 textAlign: "center",
//               }} // การจัดการตำแหน่งของข้อความ
//             >
//               รายงานแสดงแพ็คเกจยอดนิยมในระยะ 1 เดือน
//             </Typography>
//             <div>Loading</div>
//           </CardContent>
//         </Card>
//       </Paper>
//     );
//   }

//   const chartData = packageSelectionInMonthData?.map((item) => ({
//     group: item?.packageName,
//     value: item?.selectionCount,
//   }));

//   return (
//     <Paper elevation={24}>
//       <Card>
//         <CardContent>
//           <Typography
//             variant="h4"
//             gutterBottom
//             sx={{
//               justifyContent: "center",
//               alignItems: "center",
//               textAlign: "center",
//             }} // การจัดการตำแหน่งของข้อความ
//           >
//             รายงานแพ็คเกจยอดนิยมในระยะ 1 เดือน
//           </Typography>
//           <BarChart
//             xAxis={[
//               {
//                 scaleType: "band",
//                 data: chartData.map((data) => data.group),
//               },
//             ]}
//             series={[
//               {
//                 data: chartData.map((data) => data.value),
//               },
//             ]}
//             height={500}
//           />
//         </CardContent>
//       </Card>
//     </Paper>
//   );
// };

// export default BarChartPackageCard;

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
  // Fetch packageSelectionInMonth data
  const {
    data: packageSelectionInMonthData,
    isLoading,
    error,
  } = useQuery<DeshboardItem[]>({
    queryKey: ["packageSelectionInMonth"],
    queryFn: () => packageSelectionInMonth().then((res) => res.data),
  });

  // Check if data is loading or there was an error
  if (isLoading) {
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
              }}
            >
              รายงานแสดงแพ็คเกจยอดนิยมในระยะ 1 เดือน
            </Typography>
            <div>Loading...</div>
          </CardContent>
        </Card>
      </Paper>
    );
  }

  if (error) {
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
              }}
            >
              รายงานแสดงแพ็คเกจยอดนิยมในระยะ 1 เดือน
            </Typography>
            <div>Error loading data</div>
          </CardContent>
        </Card>
      </Paper>
    );
  }

  const chartData = packageSelectionInMonthData?.map((item) => ({
    group: item?.packageName,
    value: item?.selectionCount,
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
            }}
          >
            รายงานแพ็คเกจยอดนิยมในระยะ 1 เดือน
          </Typography>
          {chartData.length > 0 ? (
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

export default BarChartPackageCard;
