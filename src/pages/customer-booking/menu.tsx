import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingCard from "src/components/card/LoadingCard";
import { getCustomerBookingById } from "src/functions/booking";
import { list, listMenuByCustomerId } from "src/functions/menu-function";
import { TMenuItem } from "src/types/menu";
import MenuCard from "./menu-card";
import { useCartStore } from "src/store/cart";
import { menuTypeTextV2 } from "../../helper/menu";
import { MenuTypeV2 } from "../../types/menu";

function FilterButtons({
  menuTypes,
  setMenuType,
}: {
  menuTypes: MenuTypeV2[]; // Adjust the type of menuTypes
  setMenuType: (type: MenuTypeV2) => void;
}) {
  return (
    <Stack direction="row" spacing={2}>
      {menuTypes.map((type) => (
        <Button
          key={type}
          sx={{
            ":hover": {
              backgroundColor: "#202020",
              opacity: 0.8,
              borderRadius: "10px",
            },
            color: "#ffffff",
            borderRadius: "10px",
          }}
          variant="text"
          onClick={() => setMenuType(type)}
        >
          {menuTypeTextV2(type)}
        </Button>
      ))}
    </Stack>
  );
}

export default function CustomerBookingMenuPage() {
  const param = useParams();
  const navigate = useNavigate();

  const carts = useCartStore((state) => state.carts);

  const { data: item, isLoading } = useQuery({
    queryKey: ["customerBooking", param.id],
    queryFn: () => getCustomerBookingById(param.id!).then((res) => res.data),
    enabled: !!param.id,
  });

  const { data: menuList } = useQuery<TMenuItem[]>({
    queryKey: ["menuList", param.id],
    queryFn: () => listMenuByCustomerId(param.id!).then((res) => res.data),
    enabled: !!param.id,
  });

  const [menuType, setMenuType] = useState("all");

  const menuTypesV3: MenuTypeV2[] = [
    "all",
    "meat",
    "dessert",
    "seaFood",
    "fruit",
    "drink",
    "snacks",
  ] as MenuTypeV2[];

  return (
    <Stack
      sx={{
        backgroundColor: "rgba(20, 20, 20)", // เปลี่ยนค่า alpha เพื่อความโปร่งใส
        minHeight: "100vh",
        borderTopLeftRadius: "50px",
        borderTopRightRadius: "50px",
      }}
    >
      <Stack sx={{ position: "relative" }}>
        <Stack
          sx={{
            top: 0,
            margin: 2,
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              color: "#ffffff",
            }}
            variant="h4"
          >
            เมนูอาหาร
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{
            top: 0,
            marginLeft: 1,
            marginRight: 1,
            zIndex: 1,
            position: "sticky",
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <Container
            maxWidth="sm"
            sx={{
              padding: 1,
              backgroundColor: "#b0120a",
              borderRadius: "15px",
            }}
          >
            <Stack
              sx={{
                // Your existing styles...
                overflowX: "auto", // Enable horizontal scrolling
                whiteSpace: "nowrap", // Prevent items from wrapping
                msOverflowStyle: "none", // Hide scrollbar (IE)
                scrollbarWidth: "none", // Hide scrollbar (Firefox)
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar (Chrome, Safari)
                },
              }}
              spacing={2}
            >
              <FilterButtons
                menuTypes={menuTypesV3}
                setMenuType={setMenuType}
              />
            </Stack>
          </Container>
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
            {menuType === "all" && (
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  {isLoading ? (
                    <LoadingCard count={6} />
                  ) : (
                    menuList && // add this null check
                    menuList.map((item) => (
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
            )}
            {menuType != "all" && (
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  {isLoading ? (
                    <LoadingCard count={6} />
                  ) : (
                    menuList && // add this null check
                    menuList
                      .filter((item) => item.menuType === menuType)
                      .map((item) => (
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
            )}
          </Stack>
        </Container>

        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{
            position: "sticky",
            bottom: 0,
            padding: 2,
          }}
        >
          <Container maxWidth="sm">
            {!carts.length ? (
              <Button
                variant="contained"
                fullWidth
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
                  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
                  border: "1px solid rgba(21, 21, 21)",
                  height: "56px",
                  backgroundColor: "#b0120a",
                  ":hover": {
                    backgroundColor: "#ffffff",
                    opacity: 0.8,
                    color: "#212121",
                  },
                  fontSize: "18px",
                }}
                startIcon={<ShoppingCartIcon />}
                onClick={() =>
                  navigate(`/customer-booking/${item?.qrLink}/cart`)
                }
              >
                ดูตะกร้ารายการสั่งซื้อ
              </Button>
            )}
          </Container>
        </Stack>
      </Stack>
    </Stack>
  );
}
