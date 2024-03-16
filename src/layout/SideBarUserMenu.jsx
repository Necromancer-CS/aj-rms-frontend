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

const SideBarUserMenu = () => {
  const [isCollapsed, setisCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        color: "#ffffff",
      }}
    >
      <main>
        <div style={{ marginBottom: "16px" }}>
          {broken && (
            <IconButton onClick={() => setToggled(!toggled)}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
        </div>
      </main>
    </div>
  );
};
export default SideBarUserMenu;
