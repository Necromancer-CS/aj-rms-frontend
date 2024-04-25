import { useEffect, useState } from "react";
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

import { create } from "src/functions/menu-function";
import { getBuffetList } from "src/functions/buffet";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MenuStatusItem, MenuTypeItem } from "src/types/menu";
import { Stack } from "@mui/material";
import { BuffetItem } from "src/types/buffet";
import { useMutation, useQuery } from "@tanstack/react-query";
import ConfirmDialog from "src/components/dialog/confirm";

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
    title: "ผลไม้ / ผัก",
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
  {
    title: "ของทางเล่น",
    value: "snacks",
  },
];

export default function CreateMenu() {
  //javascript
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [menuId, setMenuId] = useState<string>("");
  const {
    data: dataBuffet,
    isLoading,
    refetch,
  } = useQuery<BuffetItem[]>({
    queryKey: ["buffetList"],
    queryFn: () => getBuffetList().then((res) => res.data),
  });

  //บันทึกข้อมูล
  const handleChange = (event: any) => {
    if (event.target.name === "file") {
      setForm({
        ...form,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formWithImageData = new FormData();
    for (const key in form) {
      formWithImageData.append(key, form[key]);
    }
    create(formWithImageData)
      .then((res) => {
        console.log(res.data);
        toast.success("เพิ่มเมนูเสร็จสิ้น : " + res.data.menuName);
        navigate("/admin/menu/list");
      })
      .catch((error) => console.log(error));
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
                    id="menuName"
                    label="ชื่อเมนู"
                    variant="outlined"
                    fullWidth
                    required
                    name="menuName"
                    onChange={(event) => handleChange(event)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="menuPrice"
                    label="ราคา"
                    variant="outlined"
                    type="number"
                    fullWidth
                    disabled
                    value={0}
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
                    required
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
                      name="packageBufferId"
                      onChange={(event) => handleChange(event)}
                    >
                      <MenuItem value="">
                        <em>กรุณาเลือกประเภทแพ็คเกจ</em>
                      </MenuItem>
                      {dataBuffet?.map((item: any) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.packageName} ( {item.packagePrice} ฿ )
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
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Paper>
      {/* <ConfirmDialog
        title="คุณต้องการยืนยันการเพิ่มใช่ไหม"
        open={openConfirmDialog}
        handleClose={() => setOpenConfirmDialog(false)}
        handleConfirm={() => handleSubmit()}
        isLoading={isPending}
      /> */}
    </Stack>
  );
}
