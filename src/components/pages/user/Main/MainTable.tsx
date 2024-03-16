import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CardActionArea from "@mui/material/CardActionArea";
import { list, updateStatus } from "../../../../functions/desk";
import LoadingCard from "../../../card/LoadingCard";
import TableCard, { DeskItem } from "../../../card/TableCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function MainTable() {
  const navigate = useNavigate();

  //ใช้สำหรับ GET
  const { data, isLoading } = useQuery({
    queryKey: ["tableList"],
    queryFn: () => list().then((res) => res.data),
  });

  const handleToMainMenu = (res: DeskItem) => {
    if (res.deskStatus === "ready") {
      updateStatus(res._id)
        .then((res) => {
          toast.success("พร้อมสั่งอาหาร");
          navigate("/user/mainmenu/" + res.data._id);
        })
        .catch((error) => console.log(error));
    } else if (res.deskStatus === "notReady") {
      toast.warning(res.deskNo + " " + res.deskStatus);
    } else if (res.deskStatus === "ไม่พร้อมใช้งาน") {
      toast.error(res.deskNo + " " + res.deskStatus);
    }
  };

  return (
    <>
      <Stack>
        <Stack flexDirection="row">
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Paper elevation={6}>
              <Card>
                <Stack
                  sx={{
                    backgroundColor: "#61677A",
                    color: "#fff",
                    textAlign: "left",
                    p: 2,
                  }}
                >
                  <Typography variant="h4">ข้อมูลโต๊ะ</Typography>
                </Stack>
              </Card>
            </Paper>
            <br />
            <Paper elevation={6}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      {isLoading ? (
                        <LoadingCard count={6} />
                      ) : (
                        data.map((item) => (
                          <Grid item xs={3} key={item._id}>
                            <CardActionArea
                              onClick={() => handleToMainMenu(item)}
                            >
                              <TableCard data={item} />
                            </CardActionArea>
                          </Grid>
                        ))
                      )}
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Paper>
            <Box height={20} />
            <Paper elevation={6}>
              <Card>
                <CardContent style={{ textAlign: "center" }}>
                  <Typography variant="h6">
                    COPYRIGHT © 2024.All RESTAURANT AJ.
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
