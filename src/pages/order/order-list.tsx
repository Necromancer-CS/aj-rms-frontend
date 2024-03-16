import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LoadingCard from "src/components/card/LoadingCard";
import { toast } from "react-toastify";
import {
  listByStatusOrderMenu,
  updateStatusOrderMenu,
} from "src/functions/order";
import { useMutation, useQuery } from "@tanstack/react-query";
import { OrderItem } from "src/types/order";
import { Stack } from "@mui/material";
import { useState } from "react";
import ConfirmDialog from "src/components/dialog/confirm";

const OrderTableList = () => {
  //ใช้สำหรับ GET
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>("");
  const [dataStatus, setDataStatus] = useState({ status: "" });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => updateStatusOrderMenu(orderId, dataStatus),
    onSuccess(data) {
      setOpenConfirmDialog(false);
      toast.success("เสริฟเมนู " + data.data.menuName);
      refetch();
    },
  });

  const { data, isLoading, refetch } = useQuery<OrderItem[]>({
    queryKey: ["orderList"],
    queryFn: () => listByStatusOrderMenu().then((res) => res.data),
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
                  <Typography variant="h4">จัดการข้อมูล</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Paper>
          <br />
          <Box sx={{ display: "flex" }}></Box>
          <Paper elevation={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <TableContainer component={Paper}>
                  <Table
                    sx={{
                      minWidth: 650,
                    }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">ลำดับ</TableCell>
                        <TableCell align="center">ชื่อเมนู</TableCell>
                        <TableCell align="center">จำนวน</TableCell>
                        <TableCell align="center">หมายเลขโต๊ะ</TableCell>
                        <TableCell align="center">เครื่องมือ</TableCell>
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
                            <TableCell align="center">{row.menuName}</TableCell>
                            <TableCell align="center">{row.quantity}</TableCell>
                            <TableCell align="center">{row.deskNo}</TableCell>
                            <TableCell align="center">
                              <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                justifyContent={"center"}
                              >
                                <ButtonGroup>
                                  <Button
                                    sx={{
                                      backgroundColor: "#00b900",
                                      ":hover": {
                                        backgroundColor: "#1b1b1b",
                                        opacity: 0.8,
                                      },
                                      color: "#ffffff",
                                    }}
                                    variant="contained"
                                    onClick={() => {
                                      setOpenConfirmDialog(true);
                                      setOrderId(row._id);
                                      setDataStatus({ status: "served" });
                                    }}
                                  >
                                    ยืนยัน
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
                  COPYRIGHT © 2024.All RESTAURANT AJ.
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Box>
      </Box>
      {/* Confirm Dialog */}
      <ConfirmDialog
        title="คุณต้องการยืนยันการเสริฟใช่ไหม"
        open={openConfirmDialog}
        handleClose={() => setOpenConfirmDialog(false)}
        handleConfirm={() => mutateAsync()}
        isLoading={isPending}
      />
    </>
  );
};

export default OrderTableList;
