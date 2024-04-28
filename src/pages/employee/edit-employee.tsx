import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
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
import { EmployeeRoleItem } from "src/types/admin";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { read, update } from "src/functions/admin";
import { toast } from "react-toastify";
import { Stack } from "@mui/material";

const EditEmployee = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullName: "",
    role: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    loadData(params.id as string);
  }, [params.id]);

  const loadData = async (id: string) => {
    read(id).then((res) => {
      setData(res.data);
    });
  };

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

  const handleChange = (event: any) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    update(params.id, data)
      .then((res) => {
        toast.success("Edit Success : " + res.data.fullName);
        navigate("/admin/employee/list");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box sx={{ display: "flex", p: 10 }}>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Paper elevation={6}>
          <Card>
            <CardContent sx={{ backgroundColor: "#2c2c2c", color: "#ffff" }}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent={"center"}
              >
                <Typography variant="h4">แก้ไขข้อมูล</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Paper>
        <br />
        <Box sx={{ display: "flex" }}></Box>
        <Paper elevation={6}>
          <Card sx={{ height: "60%" }}>
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
                      value={data.fullName}
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
                        value={data.role}
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
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        height: "56px",
                        backgroundColor: "#00B900",
                        ":hover": {
                          backgroundColor: "#1b1b1b",
                          opacity: 0.8,
                        },
                      }}
                    >
                      บันทึก
                    </Button>
                  </Grid>
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
                </Grid>
              </form>
              <br />
            </CardContent>
          </Card>
        </Paper>
        <Box height={20} />
        <Paper elevation={6}>
          <Card>
            <CardContent style={{ textAlign: "center" }}>
              <Typography variant="h6">
                COPYRIGHT © A&J BUFFET GRILL 2024.
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Box>
    </Box>
  );
};

export default EditEmployee;
