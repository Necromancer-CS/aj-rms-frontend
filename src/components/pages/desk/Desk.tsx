import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { list } from "../../../functions/desk";
import LoadingCard from "../../card/LoadingCard";
import TableCard from "../../card/TableCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { DeskItem } from "../../../types/desk";

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
      toast.warning(res.deskNo + " " + res.deskStatus);
    } else if (res.deskStatus === "notAvailable") {
      toast.error(res.deskNo + " " + res.deskStatus);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <Paper>
          <Stack
            sx={{
              p: 2,
            }}
          >
            <Typography variant="h4">ข้อมูลโต๊ะ</Typography>
          </Stack>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {isLoading ? (
              <LoadingCard count={6} />
            ) : (
              data.map((item) => (
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
