import {
  Grid,
  Paper,
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import LocalAtmTwoToneIcon from "@mui/icons-material/LocalAtmTwoTone";
import { useQuery } from "@tanstack/react-query";
import {
  totalOpenDesk,
  topMenu,
  topPackage,
  totalPrice,
  salesMonthly,
} from "src/functions/dashboard";
import { DeshboardItem } from "src/types/deshboard";

const TotalOpenDesk = () => {
  // ดึงข้อมูล totalOpenDesk
  const { data: totalOpenDeskData } = useQuery<DeshboardItem>({
    queryKey: ["totalOpenDesk"],
    queryFn: () => totalOpenDesk().then((res) => res.data),
  });

  // ดึงข้อมูล topMenu
  const { data: topMenuData } = useQuery<DeshboardItem>({
    queryKey: ["topMenu"],
    queryFn: () => topMenu().then((res) => res.data),
  });

  console.log(topMenuData);

  return (
    <>
      <Box sx={{ display: "flex", p: 2 }}>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <Paper
                sx={{
                  position: "relative",
                  backgroundColor: "black",
                  opacity: 0.9,
                  borderRadius: "10px", // เพิ่มมุมโค้ง
                }}
              >
                <Card>
                  <CardContent>
                    <Grid>
                      <Grid></Grid>
                      
                    </Grid>
                    <LocalAtmTwoToneIcon
                      sx={{ width: "100%", height: "100%", color: "red" }}
                    />
                    <Typography variant="h6" align="right" color="black">
                      จำนวนการเปิดโต๊ะทั้งหมด
                    </Typography>
                    <Typography variant="h4" align="right" color="black">
                      {totalOpenDeskData && totalOpenDeskData.totalOpenDesk}
                    </Typography>
                  </CardContent>
                </Card>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    height: 4,
                    backgroundColor: "#00b900",
                    borderRadius: "0 0 10px 10px", // เพิ่มมุมโค้งด้านล่าง
                  }}
                />
              </Paper>{" "}
            </Grid>
          </Grid>
          <CardContent>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent={"center"}
            ></Stack>
          </CardContent>
        </Box>
      </Box>
    </>
  );
};

export default TotalOpenDesk;
