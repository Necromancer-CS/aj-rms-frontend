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
  TextField,
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
import {
  getCustomerBookingById,
  updateOrderBill,
  getQrCodeById,
  updateCheckPayment,
} from "src/functions/booking";
import { getOrderByCustomerBookingId } from "src/functions/order";
import { customerBookingStatusText } from "src/helper/customer-booking";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";
import { number } from "yup";

export default function CustomerBookingPage() {
  const param = useParams();
  const navigate = useNavigate();
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [vat, setVat] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const [statusPayment, setStatusPayment] = useState<boolean>(false);

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
    if (item.createdAt) {
      const createdAt = dayjs(item.createdAt);
      const extraTime = 90 * 60 * 1000;
      const newDate = createdAt.add(extraTime, "millisecond");
      newDateTime = newDate.unix();
    }

    const countdownTime = newDateTime * 1000;
    const currentTime = Date.now();

    if (currentTime > countdownTime) {
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
        const totalPrice = adultPrcie + childrengPrice + childPrcie;
        const serviceCharge = (totalPrice * 11) / 100;
        const vat = (totalPrice * 7) / 100;
        const totalPriceAll = totalPrice + serviceCharge + vat;

        const roundedTotalPriceAll = Math.round(totalPrice * 100) / 100;
        const roundedServiceCharge = Math.round(serviceCharge * 100) / 100;
        const roundedVat = Math.round(vat * 100) / 100;
        const roundedTotalPaymentAll = Math.round(totalPriceAll * 100) / 100;

        setTotalPrice(roundedTotalPriceAll);
        setServiceCharge(roundedServiceCharge);
        setVat(roundedVat);
        setTotalPayment(roundedTotalPaymentAll);
      } else {
        console.error("No billing data found");
      }
    } catch (error) {
      console.error("Error while fetching order list:", error);
    }
  };

  const handleSendBill = async () => {
    try {
      setStatusPayment(false);
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

  let newDateTime = "";
  dayjs.locale("th");

  if (item?.createdAt) {
    const createdAt = dayjs(item.createdAt);
    const extraTime = 90 * 60 * 1000;
    const newDate = createdAt.add(extraTime, "millisecond");
    newDateTime = newDate.format("HH:mm");
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
          }/Image/14.jpg')`, // ลิ้งค์รูปภาพลวดลายที่ต้องการใช้
          backgroundSize: "cover",
        }}
      >
        <Stack
          sx={{
            maxWidth: "330px",
            width: "100%",
            backgroundColor: "rgba(21, 21, 21, 0.88)", // เปลี่ยน opacity เป็น 0.7 เพื่อทำให้เป็นสีขาวขุ่น
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)", // เพิ่มเงาด้านหลัง
          }}
          spacing={2}
        >
          <Stack direction="row" justifyContent="center" height={"100%"}>
            <img
              src={import.meta.env.VITE_IMAGE_URL + "/Image/13.jpg"}
              alt="LOGO"
              style={{
                height: "50%",
                width: "50%",
                borderRadius: "50%",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
                border: "2px solid rgba(0, 0, 0, 0.1)",
              }}
            />
          </Stack>

          <Divider />
          <Stack direction="row" justifyContent="center">
            <Typography variant="h5">ท่านชําระเงินเรียบร้อยแล้ว</Typography>
          </Stack>
        </Stack>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#212121",
        backgroundSize: "cover",
        borderTopLeftRadius: "25px",
        borderTopRightRadius: "25px",
      }}
    >
      <Stack
        sx={{
          maxWidth: "330px",
          width: "100%",
          backgroundColor: "rgba(19, 19, 19)", // เปลี่ยน opacity เป็น 0.7 เพื่อทำให้เป็นสีขาวขุ่น
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)", // เพิ่มเงาด้านหลัง
          color: "#ffffff",
          fontSize: "20px",
        }}
        spacing={2}
      >
        <Stack direction="row" justifyContent="center" height={"100%"}>
          <img
            src={import.meta.env.VITE_IMAGE_URL + "/Image/13.jpg"}
            alt="LOGO"
            style={{
              height: "50%",
              width: "50%",
              borderRadius: "50%",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              border: "2px solid rgba(0, 0, 0, 0.1)",
              borderStyle: "outset",
              borderColor: "#ffffff",
            }}
          />
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography>{`หมายเลขโต๊ะ : ${item?.deskNo}`}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle1">
            แพ็คเกจ : {item?.packageName}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle1">ราคาแพ็คเกจ :</Typography>
            <Typography variant="subtitle1">
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
            borderColor: "#ffffff",
            backgroundColor: "#ffffff",
            fontSize: "20px",
            color: "#212121",
          }}
        >
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={1} alignItems="center"></Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h5">เวลาเริ่มต้น</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h5">เวลาสิ้นสุด</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center"></Stack>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={1} alignItems="center"></Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h5">
                  {dayjs(item?.createdAt).format("HH:mm")}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h5">{newDateTime}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center"></Stack>
            </Stack>
          </CardContent>
        </Card>
        {statusPayment != false && (
          <Stack direction="row" spacing={1}>
            <Stack direction="row" spacing={1}>
              <Typography>ราคารวม :</Typography>
              <Typography>{totalPrice}</Typography>
              <Typography>บาท</Typography>
            </Stack>
          </Stack>
        )}
        {statusPayment != false && (
          <Stack direction="row" spacing={1}>
            <Stack direction="row" spacing={1}>
              <Typography>ค่าบริการ :</Typography>
              <Typography>{serviceCharge}</Typography>
              <Typography>บาท</Typography>
            </Stack>
          </Stack>
        )}
        {statusPayment != false && (
          <Stack direction="row" spacing={1}>
            <Stack direction="row" spacing={1}>
              <Typography>ภาษี :</Typography>
              <Typography>{vat}</Typography>
              <Typography>บาท</Typography>
            </Stack>
          </Stack>
        )}
        {statusPayment != false && (
          <Stack direction="row" spacing={1}>
            <Stack direction="row" spacing={1}>
              <Typography>ยอดที่ต้องชำระ :</Typography>
              <Typography>{totalPayment}</Typography>
              <Typography>บาท</Typography>
            </Stack>
          </Stack>
        )}
        {statusPayment != false && (
          <Stack direction="row" spacing={1}>
            <Stack direction="row" spacing={1}>
              <Typography>แจ้งสถานะ : </Typography>
              <Typography
                sx={{
                  color: "#00B900",
                }}
              >
                {customerBookingStatusText(item?.status ?? "preparing")}
              </Typography>
            </Stack>
          </Stack>
        )}
        {item?.status === "processing" && (
          <Stack direction="row" spacing={1}>
            <Stack direction="row" spacing={1}>
              <Typography>ค่าบริการ :</Typography>
              <Typography>{totalPrice}</Typography>
              <Typography>บาท</Typography>
            </Stack>
          </Stack>
        )}
        {item?.status === "processing" && (
          <Stack direction="row" spacing={1}>
            <Stack direction="row" spacing={1}>
              <Typography>ค่าบริการ :</Typography>
              <Typography>{serviceCharge}</Typography>
              <Typography>บาท</Typography>
            </Stack>
          </Stack>
        )}
        {item?.status === "processing" && (
          <Stack direction="row" spacing={1}>
            <Stack direction="row" spacing={1}>
              <Typography>ภาษี :</Typography>
              <Typography>{vat}</Typography>
              <Typography>บาท</Typography>
            </Stack>
          </Stack>
        )}
        {item?.status === "processing" && (
          <Stack direction="row" spacing={1}>
            <Stack direction="row" spacing={1}>
              <Typography>ยอดที่ต้องชำระ :</Typography>
              <Typography>{totalPayment}</Typography>
              <Typography>บาท</Typography>
            </Stack>
          </Stack>
        )}
        {item?.status === "processing" && item?.chanelPayment === "เงินสด" && (
          <Stack direction="row" spacing={1}>
            <Stack direction="row" spacing={1}>
              <Typography>แจ้งสถานะ : </Typography>
              <Typography
                sx={{
                  color: "#CC0000",
                }}
              >
                {customerBookingStatusText(item?.status ?? "preparing")}
              </Typography>
            </Stack>
          </Stack>
        )}
        {item?.status === "processing" && item?.chanelPayment != "เงินสด" && (
          <Stack direction="row" spacing={1}>
            <Stack direction="row" spacing={1}>
              <Typography>แจ้งสถานะ : </Typography>
              <Typography
                sx={{
                  color: "#CC0000",
                }}
              >
                กรุณาติดต่อพนักงานที่เคาน์เตอร์
              </Typography>
            </Stack>
          </Stack>
        )}
        <Button
          variant="contained"
          fullWidth
          sx={{
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            border: "1px solid rgba(21, 21, 21)",
            height: "56px",
            backgroundColor: "#b0120a",
            ":hover": {
              backgroundColor: "#1b1b1b",
              opacity: 0.8,
            },
            fontSize: "18px",
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
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(21, 21, 21)",
              height: "56px",
              backgroundColor: "#303030",
              ":hover": {
                backgroundColor: "#b0120a",
                opacity: 0.8,
                color: "#212121",
              },
              color: "#ffffff",
              fontSize: "18px",
            }}
            onClick={() => navigate(`/customer-booking/${item?.qrLink}/order`)}
          >
            รายการที่สั่ง
          </Button>
          {statusPayment != false && (
            <Button
              variant="outlined"
              fullWidth
              sx={{
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
                border: "1px solid rgba(21, 21, 21)",
                height: "56px",
                backgroundColor: "#303030",
                ":hover": {
                  backgroundColor: "#b0120a",
                  opacity: 0.8,
                  color: "#ffffff",
                },
                color: "#ffffff",
                fontSize: "18px",
              }}
              disabled={item?.status === "processing"}
              onClick={() => setStatusPayment(false)}
            >
              ดูยอดชำระ
            </Button>
          )}
          {statusPayment === false && (
            <Button
              variant="outlined"
              fullWidth
              sx={{
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
                border: "1px solid rgba(21, 21, 21)",
                height: "56px",
                backgroundColor: "#303030",
                ":hover": {
                  backgroundColor: "#b0120a",
                  opacity: 0.8,
                  color: "#ffffff",
                },
                color: "#ffffff",
                fontSize: "18px",
              }}
              disabled={item?.status === "processing"}
              onClick={() => setStatusPayment(true)}
            >
              ดูยอดชำระ
            </Button>
          )}
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(21, 21, 21)",
              height: "56px",
              backgroundColor: "#303030",
              ":hover": {
                backgroundColor: "#b0120a",
                opacity: 0.8,
                color: "#ffffff",
              },
              color: "#ffffff",
              fontSize: "18px",
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
        openDialog="CheckPayment"
        open={openConfirmDialog}
        handleClose={() => setOpenConfirmDialog(false)}
        handleConfirm={handleSendBill}
        isLoading={isPending}
      />
    </Container>
  );
}
