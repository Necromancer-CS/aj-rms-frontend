import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import LoadingCard from "src/components/card/LoadingCard";
import { getCustomerBookingById } from "src/functions/booking";
import { TMenuItem } from "src/types/menu";
import MenuCard from "./menu-card";
import { useCartStore } from "src/store/cart";
import { useState } from "react";
import ConfirmDialog from "src/components/dialog/confirm";
import { createCustomerMenu } from "src/functions/order";
import { PayloadCreateCustomerMenu } from "src/types/order";

export default function CustomerBookingCartPage() {
  const param = useParams();
  const navigate = useNavigate();

  const carts = useCartStore((state) => state.carts);
  const clearCart = useCartStore((state) => state.clearCart);

  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

  const { data: item, isLoading } = useQuery({
    queryKey: ["customerBooking", param.id],
    queryFn: () => getCustomerBookingById(param.id!).then((res) => res.data),
    enabled: !!param.id,
  });

  // Post Data
  const { mutateAsync: addCustomerMenu, isPending } = useMutation({
    mutationFn: (payload: PayloadCreateCustomerMenu[]) =>
      createCustomerMenu(payload),
    onSuccess() {
      clearCart();
      setOpenConfirmDialog(false);
      navigate(`/customer-booking/${item?.qrLink}`);
    },
  });

  const handleSubmit = () => {
    const payload = carts.map((v: any) => ({
      menuId: v._id,
      price: v.menuPrice,
      quantity: v.quantity,
      deskNo: item?.deskNo,
      customerBookingId: item?._id,
    }));

    addCustomerMenu(payload);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Stack
          sx={{
            maxWidth: "320px",
            width: "100%",
            height: "100%",
            mx: "auto",
            pt: 5,
            mb: 2,
            position: "relative",
          }}
          spacing={2}
        >
          <Stack>
            <Typography sx={{ textAlign: "center" }} variant="h5">
              ตะกร้า
            </Typography>
          </Stack>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {isLoading ? (
                <LoadingCard count={6} />
              ) : (
                carts?.map((item: TMenuItem) => (
                  <Grid item xs={12} key={item._id}>
                    <Stack
                      sx={{
                        height: "100%",
                      }}
                    >
                      <MenuCard data={item} />
                    </Stack>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Stack>
      </Container>

      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{
          backgroundColor: "white",
          position: "sticky",
          bottom: 0,
          p: 2,
        }}
      >
        <Container maxWidth="sm">
          <Stack spacing={2}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                height: "56px",
                backgroundColor: "#00b900",
                ":hover": {
                  backgroundColor: "#00b900",
                  opacity: 0.8,
                },
              }}
              disabled={carts.length === 0}
              onClick={() => setOpenConfirmDialog(true)}
            >
              ยืนยันรายการสั่งอาหาร
            </Button>
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
              onClick={() => navigate(`/customer-booking/${item?.qrLink}/menu`)}
            >
              ย้อนกลับ
            </Button>
          </Stack>
        </Container>
      </Stack>

      {/* Confirm Dialog */}
      <ConfirmDialog
        title="คุณต้องการยืนยันการสั่งอาหาร"
        open={openConfirmDialog}
        handleClose={() => setOpenConfirmDialog(false)}
        handleConfirm={() => handleSubmit()}
        isLoading={isPending}
      />
    </>
  );
}
