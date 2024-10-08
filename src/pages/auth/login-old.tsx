import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

// function
import { login } from "src/functions/auth";
import { login as loginRedux } from "src/store/userSlice";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useAuth } from "src/hooks/use-auth";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"COPYRIGHT © "}
      <Link color="inherit" href="https://aj-rms-frontend.vercel.app/">
        A&J BUFFET GRILL
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signIn } = useAuth();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const dataLogin = new FormData(event.currentTarget);
    const formLogin = {
      username: dataLogin.get("username"),
      password: dataLogin.get("password"),
    };
    login(formLogin)
      .then((res) => {
        signIn(res.data.setData);
        toast.success(
          "User : " + res.data.payload.setData.fullName + " เข้าสู่ระบบ"
        );
        dispatch(
          loginRedux({
            fullName: res.data.payload.setData.fullName,
            role: res.data.payload.setData.role,
            username: res.data.payload.setData.username,
            token: res.data.token,
          })
        );
        localStorage.setItem("token", res.data.token);
        roleRedirects(res.data.payload.setData.role);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const roleRedirects = (role: any) => {
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "employee") {
      navigate("/admin/desk");
    } else if (role === "chef") {
      navigate("/admin/order");
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url('${
            import.meta.env.VITE_IMAGE_URL
          }/Image/13.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username Address"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
