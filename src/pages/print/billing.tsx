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
import { getCustomerBookingById, getQrCodeById } from "src/functions/booking";
import "dayjs/locale/en"; // นำเข้า locale ตามที่ต้องการใช้งาน
import { CustomerBookingItem } from "src/types/booking";
import { readBilling } from "src/functions/billing";

interface Props {
  value: string;
}

export default function PrintBuilling() {
  const param = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    showTotalPrcie();
  }, []);

  const { data: customerByBill, isLoading } = useQuery({
    queryKey: ["customerBookingByBill", param.id],
    queryFn: () => getCustomerBookingById(param.id!).then((res) => res.data),
    enabled: !!param.id,
  });

  const { data: billingByBill } = useQuery({
    queryKey: ["BillingByBill", param.id],
    queryFn: () => readBilling(param.id!).then((res) => res.data),
    enabled: !!param.id,
  });

  let newDateTime = ""; // สร้างตัวแปร newDateTime เพื่อใช้เก็บค่าในกรณีที่ item มีค่า
  dayjs.locale("th");

  if (customerByBill?.createdAt) {
    const createdAt = dayjs(customerByBill.createdAt); // ใช้ dayjs เพื่อจัดการกับเวลา
    const extraTime = 90 * 60 * 1000;
    const newDate = createdAt.add(extraTime, "millisecond"); // เพิ่มเวลาเพิ่มเติมในรูปแบบของ milliseconds
    newDateTime = newDate.format("HH:mm"); // รูปแบบเวลาในรูปแบบชั่วโมงและนาที และใช้ภาษาไทย
  }

  const [adultPrice, setAdultPrcie] = useState(0);
  const [childrengPrice, setChildrengPrice] = useState(0);
  const [childPrcie, setChildPrcie] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [vat, setVat] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

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

        setAdultPrcie(adultPrcie);
        setChildrengPrice(childrengPrice);
        setChildPrcie(childPrcie);

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

  const [statusBill, setStatusBill] = useState<boolean>(false);

  const handlePrint = () => {
    if (statusBill === false) {
      window.print();
      setStatusBill(true);
    }
  };

  if (statusBill === true) {
    navigate(`/admin/desk/`);
  }

  if (isLoading) return <Skeleton height={80} />;

  return (
    <Container maxWidth="sm">
      <Stack justifyContent="center" sx={{ pt: 8 }} spacing={3}>
        <Stack direction="row" justifyContent="center" height={"100%"}>
          <img
            src={import.meta.env.VITE_IMAGE_URL + "/Image/13.jpg"}
            alt="LOGO"
            style={{
              height: "25%",
              width: "25%",
              borderRadius: "50%",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              border: "2px solid rgba(0, 0, 0, 0.1)",
            }}
          />
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
            }}
          >
            ร้าน A&J BUFFET GRILL
          </Typography>
        </Stack>
        {/* <Divider /> */}
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: 20 }}>
            หมายเลขโต๊ะ : {customerByBill?.deskNo}
          </Typography>
          <Typography sx={{ fontSize: 20 }}>
            แพ็คเกจ : {customerByBill?.packageName}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: 20 }}>
            เวลาเริ่ม : {dayjs(customerByBill?.createdAt).format("HH:mm")}
          </Typography>
          <Typography sx={{ fontSize: 20 }}>สิ้นสุด : {newDateTime}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: 20 }}>
            วันที่ : {dayjs(customerByBill?.createdAt).format("DD/MM/YYYY")}
          </Typography>
          <Typography sx={{ fontSize: 20 }}>
            ชื่อพนักงาน : {customerByBill?.userBilling}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Typography variant="h6">รายการแพ็คเกจบุฟเฟต์</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: 20 }}>
            ราคาแพ็คเกจ {customerByBill?.packageName} :{" "}
          </Typography>
          <Typography sx={{ fontSize: 20 }}>
            {billingByBill?.[0].packagePrice.toLocaleString("th-TH", {
              minimumFractionDigits: 2,
            })}
            บาท
          </Typography>
        </Stack>

        {customerByBill?.countAdult != 0 && (
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontSize: 20 }}>
              ผู้ใหญ่ ( {customerByBill?.countAdult} คน ) :
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontSize: 20 }}>
                {adultPrice.toLocaleString("th-TH", {
                  minimumFractionDigits: 2,
                })}
                บาท
              </Typography>
            </Stack>
          </Stack>
        )}

        {customerByBill?.countChildreng != 0 && (
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontSize: 20 }}>
              เด็กโต ( {customerByBill?.countChildreng} คน ) :
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontSize: 20 }}>
                {childrengPrice.toLocaleString("th-TH", {
                  minimumFractionDigits: 2,
                })}
                บาท
              </Typography>
            </Stack>
          </Stack>
        )}

        {customerByBill?.countChild != 0 && (
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontSize: 20 }}>
              เด็กเล็ก ( {customerByBill?.countChild} คน ) :
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontSize: 20 }}>
                {childPrcie.toLocaleString("th-TH", {
                  minimumFractionDigits: 2,
                })}
                บาท
              </Typography>
            </Stack>
          </Stack>
        )}

        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: 20 }}>ราคารวม : </Typography>
          <Typography sx={{ fontSize: 20 }}>
            {totalPrice.toLocaleString("th-TH", {
              minimumFractionDigits: 2,
            })}
            บาท
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: 20 }}>ภาษี 7% : </Typography>
          <Typography sx={{ fontSize: 20 }}>
            {vat.toLocaleString("th-TH", {
              minimumFractionDigits: 2,
            })}
            บาท
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: 20 }}>Service Charge (11%) : </Typography>
          <Typography sx={{ fontSize: 20 }}>
            {serviceCharge.toLocaleString("th-TH", {
              minimumFractionDigits: 2,
            })}
            บาท
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">ยอดสุทธิ : </Typography>
          <Typography variant="h5">
            {totalPayment.toLocaleString("th-TH", {
              minimumFractionDigits: 2,
            })}
            บาท
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: 20 }}>ยอดที่ชำระ : </Typography>
          <Typography sx={{ fontSize: 20 }}>
            {billingByBill?.[0].payment.toLocaleString("th-TH", {
              minimumFractionDigits: 2,
            })}
            บาท
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Typography sx={{ fontSize: 20 }}>เงินทอน : </Typography>
          <Stack spacing={2}>
            <Typography sx={{ fontSize: 20 }}>
              {billingByBill?.[0].change.toLocaleString("th-TH", {
                minimumFractionDigits: 2,
              })}
              บาท
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="center">
          <Stack sx={{ maxWidth: "320px", width: "100%" }} spacing={2}>
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
              พิมพ์ใบเสร็จ
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
