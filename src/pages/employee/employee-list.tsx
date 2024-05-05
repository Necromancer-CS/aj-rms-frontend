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
import { list, remove } from "src/functions/admin";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EmployeeItem } from "src/types/admin";
import { Stack } from "@mui/material";
import { useState } from "react";
import ConfirmDialog from "src/components/dialog/confirm";

const EmployeeTableList = () => {
  //ใช้สำหรับ GET
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [employeeId, setEmployeeId] = useState<string>("");

  const { data, isLoading, refetch } = useQuery<EmployeeItem[]>({
    queryKey: ["employeeList"],
    queryFn: () => list().then((res) => res.data),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => remove(employeeId),
    onSuccess(data) {
      setOpenConfirmDialog(false);
      toast.success("ลบเสร็จสิ้น : " + data.data.username);
      refetch();
    },
  });

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
                  <Typography variant="h4">จัดการข้อมูลพนักงาน</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Paper>
          <br />
          <Box sx={{ display: "flex" }}></Box>
          <Paper elevation={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ textAlign: "right" }}>
                  <Link to={"/admin/employee/create"}>
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
                      เพิ่มข้อมูลพนักงาน
                    </Button>
                  </Link>
                </Box>
                <br />
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">ลำดับ</TableCell>
                        <TableCell align="center">ชื่อ - นามสกุล</TableCell>
                        <TableCell align="center">ตำแหน่ง</TableCell>
                        <TableCell align="center">ชื่อผู้ใช้งาน</TableCell>
                        <TableCell align="center">จัดการ</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading ? (
                        <LoadingCard count={6} />
                      ) : (
                        data?.map((row, index) => (
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
                            <TableCell align="center">{row.fullName}</TableCell>
                            <TableCell align="center">{row.role}</TableCell>
                            <TableCell align="center">{row.username}</TableCell>
                            <TableCell align="center">
                              <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                justifyContent={"center"}
                              >
                                <ButtonGroup>
                                  <Link to={"/admin/employee/edit/" + row._id}>
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
                                    sx={{
                                      backgroundColor: "#bc0024",
                                      ":hover": {
                                        backgroundColor: "#1b1b1b",
                                        opacity: 0.8,
                                      },
                                      color: "#f2f6fa",
                                    }}
                                    variant="contained"
                                    onClick={() => {
                                      setOpenConfirmDialog(true);
                                      setEmployeeId(row._id);
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

export default EmployeeTableList;
