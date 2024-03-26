import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
  keyframes,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmDialog from "src/components/dialog/confirm";
import { readBilling } from "src/functions/billing";
import { getCustomerBookingById, updateOrderBill } from "src/functions/booking";
import { getOrderByCustomerBookingId } from "src/functions/order";
import { customerBookingStatusText } from "src/helper/customer-booking";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";
import { number } from "yup";

export default function CustomerBookingPage() {
  const param = useParams();
  const navigate = useNavigate();
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [totalPrcie, setTotalPrcie] = useState(0);

  const {
    data: item,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["customerBooking", param.id],
    queryFn: () => getCustomerBookingById(param.id!).then((res) => res.data),
    enabled: !!param.id,
  });

  // ดึงข้อมูล billing
  const { data: billingRead } = useQuery({
    queryKey: ["billingRead", param.id],
    queryFn: () => readBilling(param.id!).then((res) => res.data),
    enabled: !!param.id,
  });

  //กดชำระเงิน
  const { mutateAsync: sendBill, isPending } = useMutation({
    mutationFn: () => updateOrderBill(param.id!),
    onSuccess() {
      refetch();
      setOpenConfirmDialog(false);
      showTotalPrcie();
      navigate(`/customer-booking/${item?.qrLink}`);
    },
  });

  useEffect(() => {
    showTotalPrcie();
    warnDateTime();
  }, []);

  const warnDateTime = async () => {
    let newDateTime = 0;
    dayjs.locale("th");

    // มี createdAt หรือมั่ยถ้ามีให้เพิ่มแล้วของ item?.createdAt เข้าไปแล้วจะได้ผลคือ newDateTime
    if (item?.createdAt) {
      const createdAt = dayjs(item.createdAt);
      const extraTime = 90 * 60 * 1000;
      const newDate = createdAt.add(extraTime, "millisecond");
      newDateTime = newDate.unix();
    }

    const countdownTime = newDateTime * 1000;
    const currentTime = Date.now();

    if (currentTime < countdownTime) {
      const timeToNotify = countdownTime - currentTime;
      setTimeout(() => {
        toast.warning("หมดเวลาทานอาหารของท่านแล้ว");
      }, timeToNotify);
    } else {
      console.log("Countdown time has already passed.");
    }
  };

  const showTotalPrcie = async () => {
    try {
      const billingResponse = await readBilling(param.id!);
      if (billingResponse.data.length > 0) {
        const billingItem = billingResponse.data[0];

        const priceChildreng = billingItem.packagePrice / 2;
        var adultPrcie = billingItem.countAdult * billingItem.packagePrice;
        var childrengPrice = billingItem.countChildreng * priceChildreng;
        var childPrcie = billingItem.countChild * 0;
        const totalPrcie = adultPrcie + childrengPrice + childPrcie;
        setTotalPrcie(totalPrcie);
      } else {
        console.error("No billing data found");
      }
    } catch (error) {
      console.error("Error while fetching order list:", error);
    }
  };

  const handleSendBill = async () => {
    try {
      const orderListResponse = await getOrderByCustomerBookingId(param.id!);
      const orderList = orderListResponse.data;

      const someNotServed = orderList.some(
        (item) => item.status === "notServed"
      );

      if (someNotServed === true) {
        setOpenConfirmDialog(false);
        toast.info("มี Order ที่ยังไม่ได้");
      } else {
        await sendBill();
      }
    } catch (error) {
      console.error("Error while fetching order list:", error);
    }
  };

  let newDateTime = ""; // สร้างตัวแปร newDateTime เพื่อใช้เก็บค่าในกรณีที่ item มีค่า
  dayjs.locale("th");

  if (item?.createdAt) {
    const createdAt = dayjs(item.createdAt); // ใช้ dayjs เพื่อจัดการกับเวลา
    const extraTime = 90 * 60 * 1000;
    const newDate = createdAt.add(extraTime, "millisecond"); // เพิ่มเวลาเพิ่มเติมในรูปแบบของ milliseconds
    newDateTime = newDate.format("HH:mm"); // รูปแบบเวลาในรูปแบบชั่วโมงและนาที และใช้ภาษาไทย
  }

  if (isLoading && !isSuccess) {
    return <Skeleton height={80} />;
  }

  if (item?.status === "completed") {
    return (
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "#000",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url('${
            import.meta.env.VITE_IMAGE_URL
          }/Image/134.jpg')`, // ลิ้งค์รูปภาพลวดลายที่ต้องการใช้
          backgroundSize: "cover",
        }}
      >
        <Stack
          sx={{
            maxWidth: "330px",
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.88)", // เปลี่ยน opacity เป็น 0.7 เพื่อทำให้เป็นสีขาวขุ่น
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)", // เพิ่มเงาด้านหลัง
          }}
          spacing={2}
        >
          <Stack direction="row" justifyContent="center" height={"100%"}>
            <CardMedia
              component="img"
              sx={{
                height: "50%", // กำหนดความสูงของรูปภาพ
                width: "50%", // กำหนดความกว้างของรูปภาพ
                borderRadius: "50%", // เพิ่มความโค้งมนของขอบเพื่อให้เป็นวงกลม
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)", // เพิ่มเงาด้านหลัง
                border: "2px solid rgba(0, 0, 0, 0.1)", // เพิ่มเส้นขอบ
              }}
              image={`url('${import.meta.env.VITE_IMAGE_URL}/Image/7.jpg')`} // ใช้เทมเพลตลิเตอร์สำหรับ URL ของรูปภาพ
              alt="LOGO"
            />
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="center">
            <Typography variant="h3">หมดเวลาแล้ว</Typography>
          </Stack>
        </Stack>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: "#000",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url('${
          import.meta.env.VITE_IMAGE_URL
        }/Image/134.jpg')`,
        backgroundSize: "cover",
      }}
    >
      <Stack
        sx={{
          maxWidth: "330px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.88)", // เปลี่ยน opacity เป็น 0.7 เพื่อทำให้เป็นสีขาวขุ่น
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)", // เพิ่มเงาด้านหลัง
        }}
        spacing={2}
      >
        <Stack direction="row" justifyContent="center" height={"100%"}>
          <CardMedia
            component="img"
            sx={{
              height: "50%", // กำหนดความสูงของรูปภาพ
              width: "50%", // กำหนดความกว้างของรูปภาพ
              borderRadius: "50%", // เพิ่มความโค้งมนของขอบเพื่อให้เป็นวงกลม
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)", // เพิ่มเงาด้านหลัง
              border: "2px solid rgba(0, 0, 0, 0.1)", // เพิ่มเส้นขอบ
            }}
            image={`url('${import.meta.env.VITE_IMAGE_URL}/Image/7.jpg')`} // ใช้เทมเพลตลิเตอร์สำหรับ URL ของรูปภาพ
            alt="LOGO"
          />
        </Stack>
        <br /> <br />
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography>{`หมายเลขโต๊ะ : ${item?.deskNo}`}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>แพ็คเกจ : {item?.packageName}</Typography>
          <Stack direction="row" spacing={1}>
            <Typography>ราคาแพ็คเกจ :</Typography>
            <Typography>
              {billingRead && billingRead[0] && billingRead[0].packagePrice}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Stack direction="row" spacing={1}>
            <Typography>ผู้ใหญ่</Typography>
            <Typography>
              {billingRead && billingRead[0] && billingRead[0].countAdult}
            </Typography>
            <Typography>ท่าน</Typography>
            <Typography>/</Typography>
            <Typography>เด็กโต</Typography>
            <Typography>
              {billingRead && billingRead[0] && billingRead[0].countChildreng}
            </Typography>
            <Typography>ท่าน</Typography>
            <Typography>/</Typography>
            <Typography>เด็กเล็ก</Typography>
            <Typography>
              {billingRead && billingRead[0] && billingRead[0].countChild}
            </Typography>
            <Typography>ท่าน</Typography>
          </Stack>
        </Stack>
        <Card
          sx={{
            border: "solid",
            borderRadius: 10,
            borderStyle: "outset",
            borderColor: "blue",
          }}
        >
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={1} alignItems="center"></Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>เวลาเริ่มต้น</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>เวลาสิ้นสุด</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center"></Stack>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={1} alignItems="center"></Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>
                  {dayjs(item?.createdAt).format("HH:mm")}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>{newDateTime}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center"></Stack>
            </Stack>
          </CardContent>
        </Card>
        <Stack direction="row" spacing={1}>
          {item?.status === "processing" && (
            <Stack direction="row" spacing={1}>
              <Typography>ยอดที่ต้องชำระ :</Typography>
              <Typography>{totalPrcie}</Typography>
              <Typography>บาท</Typography>
            </Stack>
          )}
        </Stack>
        <Stack direction="row" spacing={1}>
          {item?.status === "processing" && (
            <Stack direction="row" spacing={1}>
              <Typography>แจ้งสถานะ : </Typography>
              <Typography
                sx={{
                  color: "#FF8C00",
                }}
              >
                {customerBookingStatusText(item?.status ?? "preparing")}
              </Typography>
            </Stack>
          )}
        </Stack>
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
          disabled={item?.status === "processing"}
          onClick={() => navigate(`/customer-booking/${item?.qrLink}/menu`)}
        >
          สั่งอาหาร
        </Button>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              color: "#1b1b1b",
              height: "56px",
              border: "1px solid #1b1b1b",
              ":hover": {
                border: "1px solid #1b1b1b",
                opacity: 0.8,
              },
            }}
            onClick={() => navigate(`/customer-booking/${item?.qrLink}/order`)}
          >
            รายการที่สั่ง
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              color: "#1b1b1b",
              height: "56px",
              border: "1px solid #1b1b1b",
              ":hover": {
                border: "1px solid #1b1b1b",
                opacity: 0.8,
              },
            }}
            disabled={item?.status === "processing"}
            onClick={() => setOpenConfirmDialog(true)}
          >
            ชำระเงิน
          </Button>
        </Stack>
      </Stack>

      {/* Confirm Dialog */}
      <ConfirmDialog
        title="ยืนยันการชำระเงิน"
        open={openConfirmDialog}
        handleClose={() => setOpenConfirmDialog(false)}
        handleConfirm={handleSendBill}
        isLoading={isPending}
      />
    </Container>
  );
}
