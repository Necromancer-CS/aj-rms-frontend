import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";
import { list } from "../../../functions/desk";

import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";

import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";
import { DeskItem } from "../../../types/desk";

export default function DeskOpenPage() {
  const navigate = useNavigate();
  const param = useParams();
  const qrLink = uuidv4();

  const [deskValue, setDeskValue] = useState<string>("");

  const {
    data: deskList,
    isLoading,
    isSuccess,
  } = useQuery<DeskItem[]>({
    queryKey: ["tableList"],
    queryFn: () => list().then((res) => res.data),
  });

  useEffect(() => {
    if (!isLoading && isSuccess) {
      if (param._id) {
        const findDesk = deskList.find(
          (item: DeskItem) => item._id === param._id
        );
        if (!findDesk || findDesk.deskStatus !== "ready")
          return navigate("/admin/desk");

        setDeskValue(param._id!);
      }
    }
  }, [isLoading, isSuccess, param]);

  if (isLoading && !isSuccess) return <Skeleton height={80} />;

  return (
    <>
      <Stack spacing={3} p={2}>
        <Stack
          sx={{
            p: 2,
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center " }}>
            เปิดโต๊ะ
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <TextField label="จำนวนลูกค้า" fullWidth />
          <TextField label="ชื่อลูกค้า" fullWidth />
        </Stack>
        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <InputLabel>แพ็กเกจบุฟเฟ่ต์</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="แพ็กเกจบุฟเฟ่ต์"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>หมายเลขโต๊ะ</InputLabel>
            <Select
              label="หมายเลขโต๊ะ"
              value={deskValue}
              onChange={(e) => setDeskValue(e.target.value)}
              disabled={!!param._id}
            >
              {deskList?.map((item) => (
                <MenuItem
                  key={item._id}
                  value={item._id}
                  disabled={item.deskStatus !== "ready"}
                >
                  {item.deskNo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Stack>
          <TextField label="Qr link" value={qrLink} disabled />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: "70%", mx: "auto!important" }}
        >
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
            onClick={() => navigate("/admin/desk")}
          >
            ย้อนกลับ
          </Button>
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              height: "56px",
              backgroundColor: "#00b900",
              ":hover": {
                backgroundColor: "#00b900",
                opacity: 0.8,
              },
            }}
          >
            เปิดโต๊ะ
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
