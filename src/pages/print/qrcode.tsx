import {
  Box,
  Button,
  Container,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerBookingById } from "src/functions/booking";
import "dayjs/locale/en"; // นำเข้า locale ตามที่ต้องการใช้งาน

interface Props {
  value: string;
}

export default function PrintQrCode() {
  const param = useParams();
  const navigate = useNavigate();
  const qrValue = `${import.meta.env.VITE_DOMAIN}/customer-booking/${param.id}`;

  const { data: item, isLoading } = useQuery({
    queryKey: ["customerBooking", param.id],
    queryFn: () => getCustomerBookingById(param.id!).then((res) => res.data),
    enabled: !!param.id,
  });

  let newDateTime = ""; // สร้างตัวแปร newDateTime เพื่อใช้เก็บค่าในกรณีที่ item มีค่า
  dayjs.locale("th");

  if (item?.createdAt) {
    const createdAt = dayjs(item.createdAt); // ใช้ dayjs เพื่อจัดการกับเวลา
    const extraTime = 90 * 60 * 1000;
    const newDate = createdAt.add(extraTime, "millisecond"); // เพิ่มเวลาเพิ่มเติมในรูปแบบของ milliseconds
    newDateTime = newDate.format("HH:mm"); // รูปแบบเวลาในรูปแบบชั่วโมงและนาที และใช้ภาษาไทย
  }

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) return <Skeleton height={80} />;

  return (
    <Container maxWidth="sm">
      <Stack justifyContent="center" sx={{ pt: 8 }} spacing={3}>
        <Typography
          sx={{
            textAlign: "center",
          }}
        >
          ร้าน A&J BUFFET GRILL
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography>
            วันที่ {dayjs(item?.createdAt).format("DD/MM/YYYY")}
          </Typography>
          <Typography>
            เวลาเริ่ม : {dayjs(item?.createdAt).format("HH:mm")}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>ชื่อพนักงานเปิดโต๊ะ : {item?.userOpenTable}</Typography>
          <Typography>สิ้นสุด : {newDateTime}</Typography>
        </Stack>
        <Divider />

        <Stack direction="row" justifyContent="space-between">
          <Typography>หมายเลขโต๊ะ {item?.deskNo}</Typography>
          <Typography>แพ็คเกจ : {item?.packageName}</Typography>
        </Stack>
        <Box>
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 256,
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={qrValue}
              viewBox={`0 0 256 256`}
            />
          </div>
        </Box>

        <Box>
          <Typography sx={{ textAlign: "center" }}>
            สแกน QR ด้วยโทรศัพท์มือถือเพื่อสั่งอาหาร
          </Typography>
        </Box>

        <Stack direction="row" justifyContent="center">
          <Stack sx={{ maxWidth: "320px", width: "100%" }} spacing={2}>
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
              onClick={handlePrint}
            >
              พิมพ์ QR CODE
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
              onClick={() => navigate(`/customer-booking/${item?.qrLink}`)}
            >
              ไปหน้าสั่งอาหาร
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
