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

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { read, update } from "../../../../functions/table";
import { toast } from "react-toastify";

const EditTable = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    tableNo: "",
    tableStatus: "",
  });

  useEffect(() => {
    loadData(params.id);
  }, [params.id]);

  const loadData = async (id) => {
    read(id).then((res) => {
      setData(res.data);
    });
  };

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    update(params.id, data)
      .then((res) => {
        console.log(res.data);
        toast.success("Edit Success : " + res.data.tableNo);
        navigate("/admin/table");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box sx={{ display: "flex", p: 10 }}>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Paper elevation={6}>
          <Card>
            <CardContent sx={{ backgroundColor: "#F86F03", color: "#ffff" }}>
              <Typography variant="h4">แก้ไขข้อมูล</Typography>
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
                      id="menupicture"
                      label="หมายเลขโต๊ะ"
                      variant="outlined"
                      fullWidth
                      disabled
                      name="tableNo"
                      value={data.tableNo}
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
                        value={data.tableStatus}
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
                      color="warning"
                      fullWidth
                    >
                      EDIT
                    </Button>
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

export default EditTable;
