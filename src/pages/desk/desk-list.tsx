import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LoadingCard from "src/components/card/LoadingCard";

import { toast } from "react-toastify";
import { list, remove } from "src/functions/desk";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DeskItem } from "src/types/desk";
import { deskStatusText } from "src/helper/desk";
import { Stack, TextField } from "@mui/material";
import ConfirmDialog from "src/components/dialog/confirm";
import { useMemo, useState } from "react";

const DeskTableList = () => {
  //ใช้สำหรับ GET
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [deskId, setDeskId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isLoading, refetch } = useQuery<DeskItem[]>({
    queryKey: ["deskList"],
    queryFn: () => list().then((res) => res.data),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => remove(deskId),
    onSuccess(data) {
      setOpenConfirmDialog(false);
      toast.success("Delete Success : " + data.data.deskNo);
      refetch();
    },
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((desk) =>
      desk.deskNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

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
                  <Typography variant="h4">จัดการโต๊ะ</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Paper>
          <br />
          <Box sx={{ display: "flex" }}></Box>
          <Paper elevation={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box>
                  <Stack direction="row" justifyContent="space-between">
                    <TextField
                      id="outlined-basic"
                      label="ค้นหาหมายเลขโต๊ะ"
                      variant="outlined"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Link to={"/admin/menu/create"}>
                      <Button
                        sx={{
                          backgroundColor: "#00B900",
                          ":hover": {
                            backgroundColor: "#1b1b1b",
                            opacity: 0.8,
                          },
                        }}
                        variant="contained"
                        size="large"
                      >
                        <AddCircleOutlineIcon sx={{ margin: 1 }} />
                        เพิ่มโต๊ะ
                      </Button>
                    </Link>
                  </Stack>
                </Box>
                <br />
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">ลำดับ</TableCell>
                        <TableCell align="center">หมายเลขโต๊ะ</TableCell>
                        <TableCell align="center">สถานะ</TableCell>
                        <TableCell align="center">จำนวนที่นั่ง</TableCell>
                        <TableCell align="center">จัดการ</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading ? (
                        <LoadingCard count={6} />
                      ) : (
                        filteredData?.map((row, index) => (
                          <TableRow
                            key={row._id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell align="center">{row.deskNo}</TableCell>
                            <TableCell align="center">
                              {deskStatusText(row.deskStatus)}
                            </TableCell>
                            <TableCell align="center">
                              {row.chairCount}
                            </TableCell>
                            <TableCell align="center">
                              <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                justifyContent={"center"}
                              >
                                <ButtonGroup>
                                  <Link to={"/admin/desk/edit/" + row._id}>
                                    <Button
                                      sx={{
                                        backgroundColor: "#fdb300",
                                        ":hover": {
                                          backgroundColor: "#1b1b1b",
                                          opacity: 0.8,
                                        },
                                        color: "#ffffff",
                                      }}
                                      variant="contained"
                                    >
                                      แก้ไข
                                    </Button>
                                  </Link>
                                </ButtonGroup>
                                <ButtonGroup>
                                  <Button
                                    color="error"
                                    variant="contained"
                                    onClick={() => {
                                      setOpenConfirmDialog(true);
                                      setDeskId(row._id);
                                    }}
                                  >
                                    ลบ
                                  </Button>
                                </ButtonGroup>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Paper>
          <Box height={20} />
          <Paper elevation={6}>
            <Card>
              <CardContent style={{ textAlign: "center" }}>
                <Typography variant="h6">
                  COPYRIGHT © A&J BUFFET GRILL 2024.
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Box>
      </Box>
      {/* Confirm Dialog */}
      <ConfirmDialog
        title="คุณต้องการยืนยันการลบใช่ไหม"
        openDialog=""
        open={openConfirmDialog}
        handleClose={() => setOpenConfirmDialog(false)}
        handleConfirm={() => mutateAsync()}
        isLoading={isPending}
      />
    </>
  );
};

export default DeskTableList;
