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

import { create } from "src/functions/desk";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DeskStatusItem } from "src/types/desk";
import { Stack } from "@mui/material";

const deskStatusItem: DeskStatusItem[] = [
  {
    title: "ว่าง",
    value: "ready",
  },
  {
    title: "ไม่ว่าง",
    value: "notReady",
  },
  {
    title: "ไม่พร้อมใช้งาน",
    value: "notAvailable",
  },
];

export default function CreateDesk() {
  //javascript
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  //บันทึกข้อมูล
  const handleChange = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    create(form)
      .then((res) => {
        console.log(res.data);
        toast.success("Add Success : " + res.data.deskNo);
        navigate("/admin/desk/list");
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
              <Typography variant="h4">เพิ่มโต๊ะ</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Paper>
      <Paper>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="deskNo"
                    label="หมายเลขโต๊ะ"
                    variant="outlined"
                    fullWidth
                    required
                    name="deskNo"
                    onChange={(event) => handleChange(event)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" required>
                      สถานะโต๊ะ
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="deskStatus"
                      label="สถานะโต๊ะ"
                      fullWidth
                      required
                      name="deskStatus"
                      onChange={(event) => handleChange(event)}
                    >
                      {deskStatusItem.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="chairCount"
                    label="จำนวนที่นั่ง"
                    variant="outlined"
                    fullWidth
                    required
                    name="chairCount"
                    onChange={(event) => handleChange(event)}
                  />
                </Grid>
                <Grid container item xs={12} spacing={2}>
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
                  <Grid item xs={12} sm={6}>
                    <Link to="/admin/desk/list">
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
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Paper>
      <Paper elevation={6}>
        <Card>
          <CardContent style={{ textAlign: "center" }}>
            <Typography variant="h6">
              COPYRIGHT © A&J BUFFET GRILL 2024.
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Stack>
  );
}
