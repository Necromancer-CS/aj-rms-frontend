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
import { read, update } from "../../../../functions/menu";
import { toast } from "react-toastify";

const EditMenu = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    menuName: "",
    menuDetail: "",
    menuPrice: 0,
    menuType: "",
  });
  const [fileold, setFileOld] = useState();

  useEffect(() => {
    loadData(params.id);
  }, [params.id]);

  const loadData = async (id) => {
    read(id).then((res) => {
      setData(res.data);
      setFileOld(res.data.file);
    });
  };
  //บันทึกข้อมูล
  const handleChange = (event) => {
    if (event.target.name === "file") {
      setData({
        ...data,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formWithImageData = new FormData();
    for (const key in data) {
      formWithImageData.append(key, data[key]);
    }
    formWithImageData.append("fileole", fileold);
    update(params.id, formWithImageData)
      .then((res) => {
        console.log(res.data.menuName);
        toast.success("Edit Success : " + res.data.menuName);
        navigate("/admin/menu");
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
                  <Grid item xs={12}>
                    <TextField
                      id="menupicture"
                      label="ชื่อเมนู"
                      variant="outlined"
                      fullWidth
                      required
                      name="menuName"
                      value={data.menuName}
                      onChange={(event) => handleChange(event)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="menudetails"
                      label="รายละเอียดเมนู"
                      variant="outlined"
                      fullWidth
                      required
                      name="menuDetail"
                      value={data.menuDetail}
                      onChange={(event) => handleChange(event)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="price"
                      label="ราคา"
                      variant="outlined"
                      fullWidth
                      required
                      name="menuPrice"
                      value={data.menuPrice}
                      onChange={(event) => handleChange(event)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        ประเภท
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="menuType"
                        label="ประเภท"
                        fullWidth
                        name="menuType"
                        value={data.menuType}
                        onChange={(event) => handleChange(event)}
                      >
                        <MenuItem value={"กับข้าว"}>กับข้าว</MenuItem>
                        <MenuItem value={"ของหวาน"}>ของหวาน</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="file"
                      name="file"
                      onChange={(event) => handleChange(event)}
                    />
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

export default EditMenu;
