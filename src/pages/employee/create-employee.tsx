import { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { register } from "src/functions/admin";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Stack } from "@mui/material";
import { EmployeeRoleItem } from "src/types/admin";

export default function CreateUser() {
  //javascript
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const employeeRoleItem: EmployeeRoleItem[] = [
    {
      title: "employee",
      value: "employee",
    },
    {
      title: "chef",
      value: "chef",
    },
    {
      title: "admin",
      value: "admin",
    },
  ];

  //บันทึกข้อมูล
  const handleChange = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const dataRegister = new FormData(event.currentTarget);
    const FormRegister = {
      fullName: dataRegister.get("fullName"),
      role: dataRegister.get("role"),
      username: dataRegister.get("username"),
      password: dataRegister.get("password"),
    };
    register(FormRegister)
      .then((res) => {
        if (res.data === "Register Success!!") {
          toast.success(res.data);
          navigate("/admin/employee/list");
        } else if (res.data === "User Already Exists!!!") {
          toast.warning(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Stack spacing={3} p={2}>
      <Paper elevation={6}>
        <Card>
          <CardContent sx={{ backgroundColor: "#2c2c2c", color: "#ffff" }}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent={"center"}
            >
              <Typography variant="h4">เพิ่มข้อมูล</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Paper>
      <Paper>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="fullName"
                    label="ชื่อ - นามสกุล"
                    variant="outlined"
                    fullWidth
                    required
                    name="fullName"
                    onChange={(event) => handleChange(event)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      ตำแหน่ง
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="role"
                      label="ตำแหน่ง"
                      fullWidth
                      required
                      name="role"
                      onChange={(event) => handleChange(event)}
                    >
                      <MenuItem value="">
                        <em>กรุณาเลือกตำแหน่ง</em>
                      </MenuItem>
                      {employeeRoleItem.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    required
                    name="username"
                    onChange={(event) => handleChange(event)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    required
                    name="password"
                    onChange={(event) => handleChange(event)}
                  />
                </Grid>
                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Link to="/admin/employee/list">
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
                      >
                        ย้อนกลับ
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      sx={{
                        height: "56px",
                        backgroundColor: "#00b900",
                        ":hover": {
                          backgroundColor: "#00b900",
                          opacity: 0.8,
                        },
                      }}
                      type="submit"
                      variant="contained"
                      fullWidth
                    >
                      บันทึก
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Paper>
    </Stack>
  );
}
