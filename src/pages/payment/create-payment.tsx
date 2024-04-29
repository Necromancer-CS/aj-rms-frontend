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

import { create } from "src/functions/payment";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PaymentStatusItem } from "src/types/payment";
import { Stack } from "@mui/material";

const paymentStatusItem: PaymentStatusItem[] = [
  {
    title: "พร้อมใช้งาน",
    value: "active",
  },
  {
    title: "ไม่พร้อมใช้งาน",
    value: "notActive",
  },
];

export default function CreatePayment() {
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
        toast.success("Add Success : " + res.data.paymentName);
        navigate("/admin/payment/list");
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
              <Typography variant="h4">เพิ่มช่องทางการชำระเงิน</Typography>
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
                    id="paymentName"
                    label="ช่องทางการชําระเงิน"
                    variant="outlined"
                    fullWidth
                    required
                    name="paymentName"
                    onChange={(event) => handleChange(event)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" required>
                      สถานะ
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="paymentStatus"
                      label="สถานะ"
                      fullWidth
                      required
                      name="paymentStatus"
                      onChange={(event) => handleChange(event)}
                    >
                      <MenuItem value="">
                        <em>กรุณาเลือกสถานะ</em>
                      </MenuItem>
                      {paymentStatusItem.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                    <Link to="/admin/payment/list">
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
