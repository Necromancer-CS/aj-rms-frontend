import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
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
      <Stack
        sx={{
          backgroundColor: "rgba(20, 20, 20)", // เปลี่ยนค่า alpha เพื่อความโปร่งใส
          minHeight: "100vh",
          borderTopLeftRadius: "50px",
          borderTopRightRadius: "50px",
        }}
      >
        <Stack
          sx={{
            top: 0,
            zIndex: 1,
            padding: 2,
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              color: "#ffffff",
            }}
            variant="h4"
          >
            ตะกร้า
          </Typography>
        </Stack>

        <Container maxWidth="sm" sx={{ paddingBottom: 3 }}>
          <Stack
            sx={{
              maxWidth: "400px",
              width: "100%",
              height: "100%",
              mx: "auto",
              mb: 2,
              position: "relative",
            }}
            spacing={2}
          >
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
                  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
                  border: "1px solid rgba(21, 21, 21)",
                  height: "56px",
                  backgroundColor: "#b0120a",
                  ":hover": {
                    backgroundColor: "#1b1b1b",
                    opacity: 0.8,
                  },
                  fontSize: "18px",
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
                  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
                  border: "3px solid #b0120a",
                  height: "56px",
                  backgroundColor: "#1b1b1b",
                  color: "#fffffff",
                  ":hover": {
                    backgroundColor: "#1b1b1b",
                    opacity: 0.8,
                    color: "#ffffff",
                  },
                  fontSize: "18px",
                }}
                onClick={() =>
                  navigate(`/customer-booking/${item?.qrLink}/menu`)
                }
              >
                ย้อนกลับ
              </Button>
            </Stack>
          </Container>
        </Stack>

        {/* Confirm Dialog */}
        <ConfirmDialog
          title="คุณต้องการยืนยันการสั่งอาหาร"
          openDialog=""
          open={openConfirmDialog}
          handleClose={() => setOpenConfirmDialog(false)}
          handleConfirm={() => handleSubmit()}
          isLoading={isPending}
        />
      </Stack>
    </>
  );
}
