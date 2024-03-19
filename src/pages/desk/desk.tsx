import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { list } from "src/functions/desk";
import LoadingCard from "src/components/card/LoadingCard";
import TableCard from "src/components/card/TableCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { DeskItem } from "src/types/desk";
import { deskStatusText } from "src/helper/desk";
import { CardContent } from "@mui/material";

export default function DeskPage() {
  const navigate = useNavigate();

  //ใช้สำหรับ GET
  const { data, isLoading } = useQuery({
    queryKey: ["tableList"],
    queryFn: () => list().then((res) => res.data),
  });

  const handleToMainMenu = (res: DeskItem) => {
    if (res.deskStatus === "ready") {
      navigate(`/admin/desk/open/${res._id}`);
    } else if (res.deskStatus === "notReady") {
      navigate(`/print/qr-code/${res.customerBookingId}`);
    } else if (res.deskStatus === "processing") {
      navigate(`/admin/desk/payment/${res.customerBookingId}`);
    } else if (res.deskStatus === "notAvailable") {
      toast.error(res.deskNo + " " + deskStatusText(res.deskStatus));
    }
  };

  return (
    <>
      <Stack spacing={3} p={2}>
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
                <Typography variant="h4">สถานะโต๊ะ</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <CardContent
            sx={{
              backgroundColor: "#ffffff",
              color: "b",
              textAlign: "left",
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent={"center"}
            >
              <Card>
                <CardContent
                  sx={{
                    backgroundColor: "#00B900",
                    width: "10px",
                    height: "2px",
                  }}
                ></CardContent>
              </Card>
              <Typography variant="h5">ว่าง |</Typography>
              <Card>
                <CardContent
                  sx={{
                    backgroundColor: "#CC0000",
                    width: "10px",
                    height: "2px",
                  }}
                ></CardContent>
              </Card>
              <Typography variant="h5">ไม่ว่าง |</Typography>
              <Card>
                <CardContent
                  sx={{
                    backgroundColor: "#FFCC00",
                    width: "10px",
                    height: "2px",
                  }}
                ></CardContent>
              </Card>
              <Typography variant="h5">รอชำระเงิน</Typography>
            </Stack>
          </CardContent>

          <br />
          <Grid container spacing={2}>
            {isLoading ? (
              <LoadingCard count={6} />
            ) : (
              data.map((item: DeskItem) => (
                <Grid item xs={3} key={item._id}>
                  <Card
                    onClick={() => handleToMainMenu(item)}
                    variant="elevation"
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCard data={item} />
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Paper>
      </Stack>
    </>
  );
}
