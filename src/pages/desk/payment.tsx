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
import { getCustomerBookingById } from "src/functions/booking";
import ConfirmDialog from "src/components/dialog/confirm";
import { PaymentItem } from "src/types/payment";
import { getPaymentList } from "src/functions/payment";
import { updateBilling } from "src/functions/billing";
import { BillingPayload } from "src/types/billing";
import * as yup from "yup";

const schema = yup
  .object({
    customerBookingId: yup.string().required(),
    countPerson: yup.number().required(),
    customerName: yup.string().required(),
    packageId: yup.string().required(),
    deskNo: yup.string().required(),
    totalPrice: yup.number().required(),
    paymentId: yup.string().required(),
    payment: yup.number().required(),
    change: yup.number().required(),
  })
  .required();

export default function DeskPaymentPage() {
  const navigate = useNavigate();
  const param = useParams();

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
  const { data: customerBookingItem } = useQuery({
    queryKey: ["customerBooking", param.id],
    queryFn: () => getCustomerBookingById(param.id!).then((res) => res.data),
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
      customerBookingId: "",
      countPerson: 0,
      customerName: "",
      packageId: "",
      deskNo: "",
      totalPrice: 0,
      paymentId: "",
      change: 0,
    },
  });

  // Post อัพเดทข้อมูล Bill
  const { mutateAsync: updateBill, isPending } = useMutation({
    mutationFn: (payload: BillingPayload) => updateBilling(param.id!, payload),
    onSuccess(data) {
      setOpenConfirmDialog(false);
      navigate(`/admin/desk`);
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

  //  นำข้อมูลที่ได้จาก Api ใส่ ใน Form
  useEffect(() => {
    if (customerBookingItem) {
      const priceBuffet = buffetList?.find(
        (item) => item._id === customerBookingItem.packageId
      )?.packagePrice;

      const totalPrice =
        Number(customerBookingItem.countPerson) * Number(priceBuffet);

      setValue("customerBookingId", customerBookingItem?._id);
      setValue("countPerson", customerBookingItem?.countPerson);
      setValue("customerName", customerBookingItem.customerName);
      setValue("packageId", customerBookingItem.packageId);
      setValue("deskNo", customerBookingItem.deskNo);
      setValue("totalPrice", totalPrice);
    }
  }, [customerBookingItem]);

  const payment = watch("payment");

  //  คำนวณเงินทอนจาก เงินที่จ่าย
  useEffect(() => {
    if (customerBookingItem && payment) {
      const priceBuffet = buffetList?.find(
        (item) => item._id === customerBookingItem.packageId
      )?.packagePrice;

      const totalPrice =
        Number(customerBookingItem.countPerson) * Number(priceBuffet);
      setValue("change", payment - totalPrice);
    }
  }, [payment, customerBookingItem]);

  const onSubmit = (data: FormValue) => {
    const packagePrice = buffetList?.find(
      (item) => item._id === data.packageId
    )?.packagePrice;

    const payload = {
      customerBookingId: data.customerBookingId,
      deskNo: data.deskNo,
      countPerson: data.countPerson,
      packagePrice: packagePrice!,
      totalPrice: data.totalPrice,
      chanelPayment: data.paymentId,
      change: data.change,
    };

    updateBill(payload);
  };

  if (isLoading && !isSuccess) return <Skeleton height={80} />;

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
                <Typography variant="h4">เปิดโต๊ะ</Typography>
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

                <Stack direction="row" spacing={2}>
                  {/* ชื่อลูกค้า */}
                  <Controller
                    control={control}
                    name="customerName"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={!!errors?.customerName?.message}
                        fullWidth
                        label="ชื่อลูกค้า"
                        margin="dense"
                        disabled
                      />
                    )}
                  />

                  {/* จำนวนลูกค้า */}
                  <Controller
                    control={control}
                    name="countPerson"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={!!errors?.countPerson?.message}
                        fullWidth
                        label="จำนวนลูกค้า"
                        margin="dense"
                        type="number"
                        disabled
                      />
                    )}
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  {/* แพ็กเกจบุฟเฟ่ต์ */}
                  <Controller
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.packageId?.message}
                        disabled
                      >
                        <InputLabel>แพ็กเกจบุฟเฟ่ต์</InputLabel>
                        <Select {...field} label="แพ็กเกจบุฟเฟ่ต์">
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
                        error={!!errors.paymentId?.message}
                      >
                        <InputLabel>วิธีการชำระเงิน</InputLabel>
                        <Select {...field} label="วิธีการชำระเงิน">
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
                    name="paymentId"
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
                    disabled={!isDirty || !isValid}
                    onClick={() => setOpenConfirmDialog(true)}
                  >
                    ชำระเงิน
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Paper>
      </Stack>

      {/* Confirm Dialog */}
      <ConfirmDialog
        title="คุณต้องการยืนยันการชำระเงินใช่ไหม"
        open={openConfirmDialog}
        handleClose={() => setOpenConfirmDialog(false)}
        handleConfirm={handleSubmit(onSubmit)}
        isLoading={isPending}
      />
    </>
  );
}
