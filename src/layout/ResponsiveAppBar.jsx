import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";

import { useNavigate } from "react-router-dom";

export default function ResponsiveAppBar() {
  const navigate = useNavigate();
  const handleToLogin = () => {
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "#072541",
        height: "150px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Noto sans thai",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              justifyContent: "laft",
            }}
          >
            <Box sx={{ padding: 1 }}>
              <img
                alt="profile-user"
                width="120px"
                height="120px"
                src={`/assets/4.png`}
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  marginTop: "10px",
                }}
              />
            </Box>
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Noto sans thai",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              justifyContent: "right",
            }}
          >
            <Box sx={{ padding: 1 }}>
              <Button
                variant="text"
                sx={{
                  margin: 1,
                  mr: 2,
                  fontFamily: "Noto sans thai",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  fontSize: "30px",
                }}
                onClick={() => handleToLogin()}
              >
                <LoginIcon sx={{ margin: 1, fontSize: "30px" }} />
                LOGIN
              </Button>
            </Box>
          </Typography>
          {/* /LOGO Minimize */}

          {/* Menu Left Full */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                fontFamily: "cursive",
                fontWeight: 700,
                marginTop: 5,
                letterSpacing: ".1rem",
                color: "inherit",
                fontSize: "40px",
              }}
            >
              RESTAURANT AJ
            </Typography>
          </Box>
          {/* /Menu Left Full */}

          {/* Menu Right Full */}
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <Box sx={{ flexGrow: 0, display: "flex" }}>
              <Button
                variant="text"
                sx={{
                  margin: 1,
                  mr: 1,
                  fontFamily: "Noto sans thai",
                  fontWeight: 700,
                  marginTop: 5,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  fontSize: "25px",
                }}
                onClick={() => handleToLogin()}
              >
                <LoginIcon sx={{ margin: 1 }} />
                LOGIN
              </Button>
            </Box>
          </Box>
          {/* /Menu Right Full */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
