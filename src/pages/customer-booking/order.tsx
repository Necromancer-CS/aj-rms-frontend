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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import LoadingCard from "src/components/card/LoadingCard";
import { getCustomerBookingById } from "src/functions/booking";
import { useCartStore } from "src/store/cart";
import { getOrderByCustomerBookingId } from "src/functions/order";
import OrderCard from "./order-card";

export default function CustomerBookingOrderPage() {
  const param = useParams();
  const navigate = useNavigate();

  const carts = useCartStore((state) => state.carts);

  const { data: item, isLoading } = useQuery({
    queryKey: ["customerBooking", param.id],
    queryFn: () => getCustomerBookingById(param.id!).then((res) => res.data),
    enabled: !!param.id,
  });

  const { data: orderList } = useQuery({
    queryKey: ["orderList", param.id],
    queryFn: () =>
      getOrderByCustomerBookingId(param.id!).then((res) => res.data),
    enabled: !!param.id,
  });

  return (
    <Stack sx={{ position: "relative" }}>
      <Stack
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          p: 2,
          zIndex: 1,
        }}
      >
        <Paper elevation={8}>
          <Card>
            <CardContent
              sx={{
                backgroundColor: "#1b1b1b",
                color: "white",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                }}
                variant="h5"
              >
                รายละเอียดคำสั่งซื้อ
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Stack>

      <Container maxWidth="sm">
        <Stack
          sx={{
            maxWidth: "320px",
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
                orderList?.map((item) => (
                  <Grid item xs={12} key={item._id}>
                    <Stack
                      sx={{
                        height: "100%",
                      }}
                    >
                      <OrderCard data={item} />
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
          {!carts.length ? (
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
              onClick={() => navigate(`/customer-booking/${item?.qrLink}`)}
            >
              ย้อนกลับ
            </Button>
          ) : (
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
              startIcon={<ShoppingCartIcon />}
              onClick={() => navigate(`/customer-booking/${item?.qrLink}/cart`)}
            >
              ดูตระกร้ารายการสั่งซื้อ
            </Button>
          )}
        </Container>
      </Stack>
    </Stack>
  );
}
