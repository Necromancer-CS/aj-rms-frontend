import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Sidebar } from "react-pro-sidebar";
import { Box, IconButton, ListItemIcon, Typography } from "@mui/material";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";

// Employee icon
import TableRestaurantTwoToneIcon from "@mui/icons-material/TableRestaurantTwoTone";
import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone";
import PointOfSaleTwoToneIcon from "@mui/icons-material/PointOfSaleTwoTone";
//Chef icon
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
// Admin icon
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import RestaurantMenuTwoToneIcon from "@mui/icons-material/RestaurantMenuTwoTone";
import FastfoodTwoToneIcon from "@mui/icons-material/FastfoodTwoTone";
import PriceChangeTwoToneIcon from "@mui/icons-material/PriceChangeTwoTone";
import ManageAccountsTwoToneIcon from "@mui/icons-material/ManageAccountsTwoTone";
import { RoleAccessType } from "src/types/user";
import { useAuth } from "src/hooks/use-auth";
import { RouterLink } from "src/components/router-link";

interface MenuList {
  role: RoleAccessType;
  title: string;
  href: string;
  icon?: React.ReactNode;
}

const mockMenu: MenuList[] = [
  {
    role: "employee",
    title: "เปิดโต๊ะ",
    href: "/admin/desk/open",
    icon: <TableRestaurantTwoToneIcon />,
  },
  {
    role: "employee",
    title: "ดูสถานะโต๊ะ",
    href: "/admin/desk",
    icon: <TableChartTwoToneIcon />,
  },
  {
    role: "chef",
    title: "รายการอาหาร",
    href: "/admin/order",
    icon: <MenuBookTwoToneIcon />,
  },
  {
    role: "admin",
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <DashboardTwoToneIcon />,
  },
  {
    role: "admin",
    title: "จัดการเมนู",
    href: "/admin/menu/list",
    icon: <RestaurantMenuTwoToneIcon />,
  },
  {
    role: "admin",
    title: "จัดการโต๊ะ",
    href: "/admin/desk/list",
    icon: <TableChartTwoToneIcon />,
  },
  {
    role: "admin",
    title: "จัดการแพ็คเกจ",
    href: "/admin/buffet/list",
    icon: <FastfoodTwoToneIcon />,
  },
  {
    role: "admin",
    title: "จัดการวิธีการชำระเงิน",
    href: "/admin/payment/list",
    icon: <PriceChangeTwoToneIcon />,
  },
  {
    role: "admin",
    title: "จัดการพนักงาน",
    href: "/admin/employee/list",
    icon: <ManageAccountsTwoToneIcon />,
  },
];

export default function AdminSideMenu() {
  const { signOut, user } = useAuth();
  const [isCollapsed, setisCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  console.log(user?.role);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        color: "#ffffff",
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        backgroundColor="#121212"
        breakPoint="md"
        style={{ maxHeight: "100%" }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <MenuList>
              {/* LOGO */}
              <MenuItem
                onClick={() => setisCollapsed(!isCollapsed)}
                style={{
                  margin: "10px 0 20px 0",
                  backgroundColor: "#2c2c2c",
                  color: "#ffffff",
                }}
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                  >
                    <Typography> A&J BUFFET GRILL</Typography>
                    <IconButton onClick={() => setisCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon sx={{ color: "#ffffff" }} />
                    </IconButton>
                  </Box>
                )}
                {isCollapsed && (
                  <Box display="flex" alignItems="center" ml="15px">
                    <MenuOutlinedIcon sx={{ color: "#ffffff" }} />
                  </Box>
                )}
              </MenuItem>
              {!isCollapsed && (
                <Box mb="25px">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      alt="profile-user"
                      width="64px"
                      height="64px"
                      src={`/assets/7.png`}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>

                  <Typography sx={{ pt: 1, textAlign: "center" }}>
                    A&J BUFFET GRILL
                  </Typography>
                  <Typography sx={{ pt: 1, textAlign: "center" }}>
                    {user?.role}
                  </Typography>
                </Box>
              )}

              {isCollapsed && (
                <Box alignItems="center" ml="15px">
                  {mockMenu
                    .filter((v) => v.role === user?.role)
                    .map((item) => (
                      <RouterLink key={item.title} href={item.href}>
                        <MenuItem
                          sx={{
                            color: "white",
                            alignItems: "center",
                            py: 2,
                            svg: {
                              color: "white",
                            },
                          }}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                        </MenuItem>
                      </RouterLink>
                    ))}
                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      py: 2,
                      svg: {
                        color: "white",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                  </MenuItem>
                </Box>
              )}

              {!isCollapsed && (
                <Box alignItems="center" ml="15px">
                  {mockMenu
                    .filter((v) => v.role === user?.role)
                    .map((item) => (
                      <RouterLink key={item.title} href={item.href}>
                        <MenuItem
                          sx={{
                            color: "white",
                            alignItems: "center",
                            py: 2,
                            svg: {
                              color: "white",
                            },
                          }}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <Typography variant="inherit">
                            {item.title}
                          </Typography>
                        </MenuItem>
                      </RouterLink>
                    ))}
                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      py: 2,
                      svg: {
                        color: "white",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">Logout</Typography>
                  </MenuItem>
                </Box>
              )}
            </MenuList>
          </div>
        </div>
      </Sidebar>
      <main>
        <div style={{ padding: "16px 2px ", color: "#44596e" }}>
          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <IconButton onClick={() => setToggled(!toggled)}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
