import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmDialog from "src/components/dialog/confirm";
import { readBilling } from "src/functions/billing";
import { getCustomerBookingById, updateOrderBill } from "src/functions/booking";
import { customerBookingStatusText } from "src/helper/customer-booking";

export default function CustomerBookingPage() {
  const param = useParams();
  const navigate = useNavigate();

  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

  const {
    data: item,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["customerBooking", param.id],
    queryFn: () => getCustomerBookingById(param.id!).then((res) => res.data),
    enabled: !!param.id,
  });

  // ดึงข้อมูล billing
  const { data: billingRead } = useQuery({
    queryKey: ["billingRead", param.id],
    queryFn: () => readBilling(param.id!).then((res) => res.data),
    enabled: !!param.id,
  });

  //กดชำระเงิน
  const { mutateAsync: sendBill, isPending } = useMutation({
    mutationFn: () => updateOrderBill(param.id!),
    onSuccess() {
      refetch();
      setOpenConfirmDialog(false);
      navigate(`/customer-booking/${item?.qrLink}`);
    },
  });

  const handleSendBill = () => {
    sendBill();
  };

  if (isLoading && !isSuccess) {
    return <Skeleton height={80} />;
  }

  if (item?.status === "completed") {
    return <Typography>หมดเวลาแล้ว</Typography>;
  }

  return (
    <Container maxWidth="xl">
      <Stack
        sx={{
          maxWidth: "320px",
          width: "100%",
          height: "100%",
          mx: "auto",
          pt: 10,
          position: "relative",
        }}
        spacing={2}
      >
        <Stack direction="row" justifyContent="center">
          <Avatar
            src="../../../public/assets/7.png"
            alt="Logo"
            sx={{
              height: "100%",
              width: "100%",
              border: "solid",
            }}
          />
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography>{`หมายเลขโต๊ะ : ${item?.deskNo}`}</Typography>
          <Typography>{`คุณ : ${item?.customerName}`}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>แพ็คเกจ : {item?.packageName}</Typography>
          <Stack direction="row" spacing={1}>
            <Typography>ราคาแพ็คเกจ :</Typography>
            <Typography>
              {billingRead && billingRead[0] && billingRead[0].packagePrice}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={1}>
            <Typography>จำนวน :</Typography>
            <Typography>
              {billingRead && billingRead[0] && billingRead[0].countPerson}
            </Typography>
            <Typography>ท่าน</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1}>
          {item?.status === "processing" && (
            <Stack direction="row" spacing={1}>
              <Typography>ยอดที่ต้องชำระ :</Typography>
              <Typography>
                {billingRead && billingRead[0] && billingRead[0].totalPrice}
              </Typography>
              <Typography>บาท</Typography>
            </Stack>
          )}
        </Stack>
        <Stack direction="row" spacing={1}>
          {item?.status === "processing" && (
            <Stack direction="row" spacing={1}>
              <Typography>แจ้งสถานะ : </Typography>
              <Typography
                sx={{
                  color: "#FF8C00",
                }}
              >
                {customerBookingStatusText(item?.status ?? "preparing")}
              </Typography>
            </Stack>
          )}
        </Stack>
        <Button
          variant="contained"
          fullWidth
          sx={{
            height: "56px",
            backgroundColor: "#1b1b1b",
            ":hover": {
              backgroundColor: "#1b1b1b",
              opacity: 0.8,
            },
          }}
          disabled={item?.status === "processing"}
          onClick={() => navigate(`/customer-booking/${item?.qrLink}/menu`)}
        >
          สั่งอาหาร
        </Button>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              color: "#1b1b1b",
              height: "56px",
              border: "1px solid #1b1b1b",
              ":hover": {
                border: "1px solid #1b1b1b",
                opacity: 0.8,
              },
            }}
            onClick={() => navigate(`/customer-booking/${item?.qrLink}/order`)}
          >
            รายการที่สั่ง
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              color: "#1b1b1b",
              height: "56px",
              border: "1px solid #1b1b1b",
              ":hover": {
                border: "1px solid #1b1b1b",
                opacity: 0.8,
              },
            }}
            disabled={item?.status === "processing"}
            onClick={() => setOpenConfirmDialog(true)}
          >
            ชำระเงิน
          </Button>
        </Stack>
      </Stack>

      {/* Confirm Dialog */}
      <ConfirmDialog
        title="ยืนยันการชำระเงิน"
        open={openConfirmDialog}
        handleClose={() => setOpenConfirmDialog(false)}
        handleConfirm={handleSendBill}
        isLoading={isPending}
      />
    </Container>
  );
}
