import { useState } from "react";
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

import { create } from "../../../../functions/table";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddTable = () => {
  //javascript
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  //บันทึกข้อมูล
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    create(form)
      .then((res) => {
        console.log(res.data);
        toast.success("Add Success : " + res.data.tableNo);
        navigate("/admin/table");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, margin: 10, padding: 1 }}>
        <Paper elevation={6}>
          <Card>
            <CardContent sx={{ backgroundColor: "#1A5D1A", color: "#fff" }}>
              <Typography variant="h4">APP TABLE</Typography>
            </CardContent>
          </Card>
        </Paper>
        <br />
        <Paper elevation={6}>
          <Card sx={{ height: "65%" }}>
            <CardContent>
              <Box height={20} />
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="menupicture"
                      label="หมายเลขโต๊ะ"
                      variant="outlined"
                      fullWidth
                      required
                      name="tableNo"
                      onChange={(event) => handleChange(event)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        สถานะโต๊ะ
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="tableStatus"
                        label="สถานะโต๊ะ"
                        fullWidth
                        required
                        name="tableStatus"
                        onChange={(event) => handleChange(event)}
                      >
                        <MenuItem value={"ว่าง"}>ว่าง</MenuItem>
                        <MenuItem value={"ไม่ว่าง"}>ไม่ว่าง</MenuItem>
                        <MenuItem value={"ไม่พร้อมใช้งาน"}>
                          ไม่พร้อมใช้งาน
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      fullWidth
                    >
                      ADD PRODUCT
                    </Button>
                    <Box height={10} />
                    <Link to={"/admin/table"}>
                      <Button variant="contained" color="primary" fullWidth>
                        HOME
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

export default AddTable;
