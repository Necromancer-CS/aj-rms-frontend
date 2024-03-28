import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { read, update } from "src/functions/buffet";
import { toast } from "react-toastify";
import { Stack } from "@mui/material";

const EditBuffet = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    packageName: "",
    packagePrice: 0,
  });

  useEffect(() => {
    loadData(params.id as string);
  }, [params.id]);

  const loadData = async (id: string) => {
    read(id).then((res) => {
      setData(res.data);
    });
  };

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
        console.log(res.data);
        toast.success("แก้ไขเสร็จสิ้น : " + res.data.packageName);
        navigate("/admin/buffet/list");
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
                      id="packageName"
                      label="ชื่อแพ็คเกจ"
                      variant="outlined"
                      fullWidth
                      name="packageName"
                      value={data.packageName}
                      onChange={(event) => handleChange(event)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="packagePrice"
                      label="ราคา"
                      variant="outlined"
                      fullWidth
                      name="packagePrice"
                      value={data.packagePrice}
                      onChange={(event) => handleChange(event)}
                    />
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
                      บันทึกข้อมูลที่แก้ไข
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Link to="/admin/menu/list">
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
                COPYRIGHT © 2024.All RESTAURANT AJ.
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Box>
    </Box>
  );
};

export default EditBuffet;
