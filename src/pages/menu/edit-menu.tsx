import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { MenuStatusItem, MenuTypeItem, TMenuItem } from "src/types/menu";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { read, update } from "src/functions/menu-function";
import { toast } from "react-toastify";
import { getBuffetList } from "src/functions/buffet";
import { useQuery } from "@tanstack/react-query";
import { BuffetItem } from "src/types/buffet";
import { Stack } from "@mui/material";
import { KeyOff } from "@mui/icons-material";

const EditMenu = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [fileold, setFileOld] = useState();
  const [data, setData] = useState({
    menuName: "",
    menuPrice: 0,
    menuStatus: "",
    menuType: "",
    file: "",
    packageBufferId: "",
  });

  useEffect(() => {
    loadData(params.id as string);
  }, [params.id]);

  const loadData = async (id: string) => {
    read(id).then((res) => {
      setData(res.data);
    });
  };

  const { data: menuRead } = useQuery<TMenuItem[]>({
    queryKey: ["menuRead"],
    queryFn: () => read(id).then((res) => res.data),
  });

  const { data: buffetList } = useQuery<BuffetItem[]>({
    queryKey: ["buffetList"],
    queryFn: () => getBuffetList().then((res) => res.data),
  });

  const menuStatusItem: MenuStatusItem[] = [
    {
      title: "พร้อม",
      value: "ready",
    },
    {
      title: "ไม่พร้อม",
      value: "notReady",
    },
  ];

  const menuTypeItem: MenuTypeItem[] = [
    {
      title: "เนื้อสัตว์",
      value: "meat",
    },
    {
      title: "อาหารทะเล",
      value: "seaFood",
    },
    {
      title: "ผลไม้",
      value: "fruit",
    },
    {
      title: "เครื่องดื่ม",
      value: "drink",
    },
    {
      title: "ของหวาน",
      value: "dessert",
    },
  ];

  const handleChange = (event: any) => {
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formWithImageData = new FormData();
    for (const key in data) {
      formWithImageData.append(key, data[key]);
    }
    formWithImageData.append("fileole", fileold!);
    update(params.id, formWithImageData)
      .then((res) => {
        console.log(res.data.menuName);
        toast.success("แก้ไขเสร็จสิ้น : " + res.data.menuName);
        navigate("/admin/menu/list");
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
                      id="menuName"
                      label="ชื่อเมนู"
                      variant="outlined"
                      fullWidth
                      required
                      value={data.menuName}
                      name="menuName"
                      onChange={(event) => handleChange(event)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="menuPrice"
                      label="ราคา"
                      variant="outlined"
                      fullWidth
                      required
                      disabled
                      value={data.menuPrice}
                      name="menuPrice"
                      onChange={(event) => handleChange(event)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        สถานะเมนู
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="menuStatus"
                        label="สถานะเมนู"
                        fullWidth
                        required
                        value={data.menuStatus}
                        name="menuStatus"
                        onChange={(event) => handleChange(event)}
                      >
                        <MenuItem value="">
                          <em>กรุณาเลือกสถานะเมนู</em>
                        </MenuItem>
                        {menuStatusItem.map((item) => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        ประเภทเมนู
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="menuType"
                        label="ประเภทเมนู"
                        fullWidth
                        required
                        value={data.menuType}
                        name="menuType"
                        onChange={(event) => handleChange(event)}
                      >
                        <MenuItem value="">
                          <em>กรุณาเลือกประเภท</em>
                        </MenuItem>
                        {menuTypeItem.map((item) => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="file"
                      name="file"
                      onChange={(event) => handleChange(event)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        ประเภทแพ็คเกจ
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="packageBufferId"
                        label="ประเภทแพ็คเกจ"
                        fullWidth
                        required
                        value={data.packageBufferId}
                        name="packageBufferId"
                        onChange={(event) => handleChange(event)}
                      >
                        <MenuItem value="">
                          <em>ประเภทแพ็คเกจ</em>
                        </MenuItem>
                        {buffetList?.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {`${item.packageName}  (${item.packagePrice} ฿)`}
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
                COPYRIGHT © A&J BUFFET GRILL 2024.
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Box>
    </Box>
  );
};

export default EditMenu;
