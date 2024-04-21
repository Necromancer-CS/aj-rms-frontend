import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";
import { list } from "src/functions/desk";

import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Paper,
  CardContent,
} from "@mui/material";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton, Card } from "@mui/material";
import { DeskItem } from "src/types/desk";
import { getBuffetList } from "src/functions/buffet";
import { BuffetItem } from "src/types/buffet";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getQrCodeById } from "src/functions/booking";
import ConfirmDialog from "src/components/dialog/confirm";
import { PaymentItem } from "src/types/payment";
import { getPaymentList } from "src/functions/payment";
import { updateBilling } from "src/functions/billing";
import { BillingPayload } from "src/types/billing";
import * as yup from "yup";
import { CustomerBookingItem } from "src/types/booking";
import dayjs from "dayjs";
import Item from "antd/es/list/Item";
import { useAuth } from "src/hooks/use-auth";

const schema = yup
  .object({
    customerBookingId: yup.string().required(),
    countAdult: yup.number().required(),
    countChildreng: yup.number().required(),
    countChild: yup.number().required(),
    packageId: yup.string().required(),
    userBilling: yup.string().required(),
    deskNo: yup.string().required(),
    chanelPayment: yup.string().required(),
    totalPrice: yup.number().required(),
    payment: yup.number().required(),
    change: yup.number().required(),
  })
  .required();

export default function DeskPaymentPage() {
  const navigate = useNavigate();
  const param = useParams();
  const { user } = useAuth();

  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  // Get Data
  const {
    data: deskList,
    isLoading,
    isSuccess,
  } = useQuery<DeskItem[]>({
    queryKey: ["tableList"],
    queryFn: () => list().then((res) => res.data),
  });

  // ดึงข้อมูล customerBooking by Id
  const { data: customerBookingItem } = useQuery<CustomerBookingItem>({
    queryKey: ["getQrCodeById", param.id],
    queryFn: () => getQrCodeById(param.id!).then((res) => res.data),
    enabled: !!param.id,
  });

  // ดึงข้อมูล Buffet
  const { data: buffetList } = useQuery<BuffetItem[]>({
    queryKey: ["buffetList"],
    queryFn: () => getBuffetList().then((res) => res.data),
  });

  // ดึงข้อมูล Payment
  const { data: paymentList } = useQuery<PaymentItem[]>({
    queryKey: ["paymentList"],
    queryFn: () => getPaymentList().then((res) => res.data),
  });

  type FormValue = yup.InferType<typeof schema>;

  const {
    control,
    formState: { errors, isDirty, isValid },
    setValue,
    watch,
    handleSubmit,
  } = useForm<FormValue>({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      userBilling: user?.fullName,
      customerBookingId: "",
      countAdult: 0,
      countChildreng: 0,
      countChild: 0,
      packageId: "",
      deskNo: "",
      chanelPayment: "",
      totalPrice: 0,
      payment: 0,
      change: 0,
    },
  });

  // Post อัพเดทข้อมูล Bill
  const { mutateAsync: updateBill, isPending } = useMutation({
    mutationFn: (payload: BillingPayload) => updateBilling(param.id!, payload),
    onSuccess(data) {
      console.log(data.data.customerBookingId);
      setOpenConfirmDialog(false);
      navigate(`/print/builling/` + data.data.customerBookingId);
    },
  });

  useEffect(() => {
    if (!isLoading && isSuccess) {
      if (param._id) {
        const findDesk = deskList.find(
          (item: DeskItem) => item._id === param._id
        );
        if (!findDesk || findDesk.deskStatus !== "ready")
          return navigate("/admin/desk");

        setValue("deskNo", findDesk.deskNo);
      }
    }
  }, [isLoading, isSuccess, param]);

  const [upPayment, setUpPayment] = useState(0);

  //  นำข้อมูลที่ได้จาก Api ใส่ ใน Form
  useEffect(() => {
    if (customerBookingItem) {
      const priceBuffet = buffetList?.find(
        (item) => item._id === customerBookingItem.packageId
      )?.packagePrice;

      var packagePriceChildreng = Number(priceBuffet) / 2; //ราคาแพ็กเกรดของเด็ก

      var totalAdult =
        Number(priceBuffet) * Number(customerBookingItem?.countAdult); //ราคารวมผู้ใหญ่
      var totalChildreng =
        packagePriceChildreng * Number(customerBookingItem?.countChildreng); //ราคารวมเด็กที่ต้องจ่ายเงิน
      var totalChild = customerBookingItem?.countChild * 0; //ราคารวมเด็กที่ไม่ต้องจ่ายเงิน
      var totalPrice = totalAdult + totalChildreng + totalChild; //ราคารวมที่ลูกค้าต้องชำระ
      var serviceCharge = (totalPrice * 11) / 100;
      var vat = (totalPrice * 7) / 100;
      var totalPriceAll = totalPrice + serviceCharge + vat;

      const roundedTotalPaymentAll = Math.round(totalPriceAll * 100) / 100;
      setUpPayment(roundedTotalPaymentAll);

      setValue("customerBookingId", customerBookingItem?._id);
      setValue("countAdult", customerBookingItem?.countAdult);
      setValue("countChildreng", customerBookingItem?.countChildreng);
      setValue("countChild", customerBookingItem?.countChild);
      setValue("packageId", customerBookingItem.packageId);
      setValue("deskNo", customerBookingItem.deskNo);
      setValue("chanelPayment", customerBookingItem.chanelPayment);
      setValue("totalPrice", roundedTotalPaymentAll);
      setValue("userBilling", user?.fullName);
    }
  }, [customerBookingItem]);

  var payment = watch("payment");
  var allTotalPrice = watch("totalPrice");

  var roundedPayment = Math.round(payment * 100) / 100;
  var roundedAllTotalPrice = Math.round(allTotalPrice * 100) / 100;

  const changePayment = roundedPayment - roundedAllTotalPrice;

  const changePaymentTotal = changePayment.toFixed(2);

  const [checkImage, setCheckImage] = useState("");

  //  คำนวณเงินทอนจาก เงินที่จ่าย
  useEffect(() => {
    if (customerBookingItem && changePaymentTotal) {
      if (customerBookingItem.file != "") {
        setValue("payment", upPayment);
        setValue("change", changePayment);
        setCheckImage(customerBookingItem.file);
      }
      setValue("change", changePayment);
    }
  }, [payment, customerBookingItem]);

  const onSubmit = (data: FormValue) => {
    const packagePrice = buffetList?.find(
      (item) => item._id === data.packageId
    )?.packagePrice;

    const payload = {
      userBilling: data.userBilling,
      customerBookingId: data.customerBookingId,
      deskNo: data.deskNo,
      countAdult: data.countAdult,
      countChildreng: data.countChildreng,
      countChild: data.countChild,
      packagePrice: packagePrice!,
      totalPrice: data.totalPrice,
      chanelPayment: data.chanelPayment,
      payment: data.payment,
      change: data.change,
      isPaid: true,
    };
    updateBill(payload);
  };

  if (isLoading && !isSuccess) return <Skeleton height={80} />;

  let newDateTime = ""; // สร้างตัวแปร newDateTime เพื่อใช้เก็บค่าในกรณีที่ item มีค่า
  dayjs.locale("th");

  if (customerBookingItem?.createdAt) {
    const createdAt = dayjs(customerBookingItem.createdAt); // ใช้ dayjs เพื่อจัดการกับเวลา
    const extraTime = 90 * 60 * 1000;
    const newDate = createdAt.add(extraTime, "millisecond"); // เพิ่มเวลาเพิ่มเติมในรูปแบบของ milliseconds
    newDateTime = newDate.format("HH:mm"); // รูปแบบเวลาในรูปแบบชั่วโมงและนาที และใช้ภาษาไทย
  }

  return (
    <>
      <Stack spacing={3} p={2}>
        <Paper elevation={6}>
          <Card>
            <CardContent
              sx={{
                backgroundColor: "#2c2c2c",
                color: "#fff",
                textAlign: "left",
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent={"center"}
              >
                <Typography variant="h4">ชำระเงิน</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Paper>
        <Paper>
          <Card>
            <CardContent>
              <Stack spacing={3} p={2}>
                <Stack direction="row" spacing={2}>
                  {/* customerBookingId */}
                  <Controller
                    control={control}
                    name="customerBookingId"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="รหัส Booking"
                        disabled
                      />
                    )}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  {/* หมายเลขโต๊ะ */}
                  <Controller
                    control={control}
                    name="deskNo"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="หมายเลขโต๊ะ"
                        disabled
                      />
                    )}
                  />

                  {/* หมายเลขโต๊ะ */}
                  <Controller
                    control={control}
                    name="userBilling"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="พนังงานคิดเงิน"
                        disabled
                      />
                    )}
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  {/* วันและเวลา */}
                  <TextField
                    error={!!errors?.countAdult?.message}
                    fullWidth
                    value={dayjs(customerBookingItem?.createdAt).format(
                      "DD/MM/YYYY"
                    )}
                    label="วันที่"
                    margin="dense"
                    disabled
                  />

                  <TextField
                    error={!!errors?.countAdult?.message}
                    fullWidth
                    value={dayjs(customerBookingItem?.createdAt).format(
                      "HH:mm"
                    )}
                    label="เวลาเริ่ม"
                    margin="dense"
                    disabled
                  />

                  <TextField
                    error={!!errors?.countAdult?.message}
                    fullWidth
                    value={newDateTime}
                    label="เวลาสิ้นสุด"
                    margin="dense"
                    disabled
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  {/* จำนวนลูกค้า */}
                  <Controller
                    control={control}
                    name="countAdult"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={!!errors?.countAdult?.message}
                        fullWidth
                        label="จำนวนผู้ใหญ่"
                        margin="dense"
                        type="number"
                        disabled
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="countChildreng"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={!!errors?.countChildreng?.message}
                        fullWidth
                        label="จำนวนเด็กโต"
                        margin="dense"
                        type="number"
                        disabled
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="countChild"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={!!errors?.countChild?.message}
                        fullWidth
                        label="จำนวนเด็กเล็ก"
                        margin="dense"
                        type="number"
                        disabled
                      />
                    )}
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  {/* แพ็คเกจ */}
                  <Controller
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.packageId?.message}
                        disabled
                      >
                        <InputLabel>แพ็คเกจ</InputLabel>
                        <Select {...field} label="แพ็คเกจ">
                          {buffetList?.map((item) => (
                            <MenuItem key={item._id} value={item._id}>
                              {`${item.packageName}  (${item.packagePrice} ฿)`}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                    name="packageId"
                    control={control}
                  />

                  {/* ยอดชำระ */}
                  <Controller
                    control={control}
                    name="totalPrice"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="ยอดชำระ"
                        disabled
                      />
                    )}
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  {/* วิธีการชำระเงิน */}
                  <Controller
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.chanelPayment?.message}
                      >
                        <InputLabel>วิธีการชำระเงิน</InputLabel>
                        <Select {...field} label="วิธีการชำระเงิน" disabled>
                          <MenuItem value="">
                            <em>กรุณาเลือกวิธีการชำระเงิน</em>
                          </MenuItem>
                          {paymentList?.map((item) => (
                            <MenuItem
                              key={item._id}
                              value={item._id}
                              disabled={item.paymentStatus === "notActive"}
                            >
                              {`${item.paymentName}`}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                    name="chanelPayment"
                    control={control}
                  />

                  <Controller
                    control={control}
                    name="payment"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="เงินที่ชำระ"
                        type="number"
                        error={!!errors.payment?.message}
                      />
                    )}
                  />
                </Stack>

                <Controller
                  control={control}
                  name="change"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="เงินทอน"
                      type="number"
                      disabled
                    />
                  )}
                />

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ width: "70%", mx: "auto!important" }}
                >
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
                    disabled={!isDirty || !isValid}
                    onClick={() => {
                      setOpenConfirmDialog(true);
                    }}
                  >
                    ยืนยันการชำระเงิน
                  </Button>
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
                </Stack>
                {checkImage != "" && (
                  <Stack
                    direction="row"
                    spacing={2}
                    flex={1}
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <img
                      src={customerBookingItem?.file}
                      alt="product-img"
                      style={{
                        width: "80%",
                        height: "100%",
                      }}
                    />
                  </Stack>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Paper>
      </Stack>

      {/* Confirm Dialog */}
      <ConfirmDialog
        title="คุณต้องการยืนยันการชำระเงินใช่ไหม"
        openDialog=""
        open={openConfirmDialog}
        handleClose={() => setOpenConfirmDialog(false)}
        handleConfirm={handleSubmit(onSubmit)}
        isLoading={isPending}
      />
    </>
  );
}
