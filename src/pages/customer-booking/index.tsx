import { Avatar, Button, Container, Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmDialog from "src/components/dialog/confirm";
import { getCustomerBookingById, updateOrderBill } from "src/functions/booking";

export default function CustomerBookingPage() {
  const param = useParams();
  const navigate = useNavigate();

  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

  const {
    data: item,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["customerBooking", param.id],
    queryFn: () => getCustomerBookingById(param.id!).then((res) => res.data),
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

  return (
    <Container maxWidth="sm">
      <Stack
        sx={{
          maxWidth: "320px",
          width: "100%",
          mx: "auto",
          pt: 10,
          position: "relative",
        }}
        spacing={2}
      >
        <Stack direction="row" justifyContent="center">
          <Avatar></Avatar>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography>{`หมายเลขโต๊ะ : ${item?.deskNo}`}</Typography>
          <Typography>{`คุณ : ${item?.customerName}`}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>แพ็กเกจ : {item?.packageName}</Typography>
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
            รายการที่สี่ง
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
