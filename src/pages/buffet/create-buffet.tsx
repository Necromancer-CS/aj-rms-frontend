import { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import { create } from "src/functions/buffet";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Stack } from "@mui/material";

export default function CreateBuffet() {
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
        toast.success("Add Success : " + res.data.packageName);
        navigate("/admin/buffet/list");
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
                    id="packageName"
                    label="ชื่อแพ็กเกจ"
                    variant="outlined"
                    fullWidth
                    required
                    name="packageName"
                    onChange={(event) => handleChange(event)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="packagePrice"
                    label="ราคา"
                    variant="outlined"
                    fullWidth
                    required
                    name="packagePrice"
                    onChange={(event) => handleChange(event)}
                  />
                </Grid>
                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Link to="/admin/buffet/list">
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
