import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import TableViewIcon from "@mui/icons-material/TableView";

import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";

const SideBar = () => {
  const [isCollapsed, setisCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleToMainTable = () => {
    navigate("/user/maintable");
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
        backgroundColor="#072541"
        breakPoint="md"
        style={{ height: "100%" }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu iconShape="square">
              {/* LOGO */}
              <MenuItem
                onClick={() => setisCollapsed(!isCollapsed)}
                icon={
                  isCollapsed ? (
                    <MenuOutlinedIcon sx={{ color: "#ffffff" }} />
                  ) : undefined
                }
                style={{
                  margin: "10px 0 20px 0",
                  backgroundColor: "#0C4271",
                }}
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                  >
                    <Typography>RESTAURANT AJ</Typography>
                    <IconButton onClick={() => setisCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon sx={{ color: "#ffffff" }} />
                    </IconButton>
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
                      width="100px"
                      height="100px"
                      src={`/assets/1.png`}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>
                  <Box textAlign="center">
                    <Typography sx={{ m: "10px 0 0 0" }}>
                      RESTAURANT AJ
                    </Typography>
                    <Typography>USER</Typography>
                  </Box>
                </Box>
              )}
              <MenuItem
                icon={<TableViewIcon />}
                color="#ffffff"
                onClick={() => handleToMainTable()}
              >
                Table
              </MenuItem>
            </Menu>

            <div
              style={{
                padding: "0 24px",
                marginBottom: "8px",
                marginTop: "32px",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: isCollapsed ? 0 : 0.5,
                  letterSpacing: "0.5px",
                }}
              >
                Extra
              </Typography>
            </div>

            <Menu>
              <MenuItem icon={<LogoutIcon />} onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
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
};
export default SideBar;
