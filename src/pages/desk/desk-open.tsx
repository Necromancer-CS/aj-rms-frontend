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

import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton, Card } from "@mui/material";
import { DeskItem } from "src/types/desk";
import { getBuffetList } from "src/functions/buffet";
import { BuffetItem } from "src/types/buffet";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomerBookingPayload } from "src/types/booking";
import { createCustomerBooking } from "src/functions/booking";
import ConfirmDialog from "src/components/dialog/confirm";

const schema = yup
  .object({
    countAdult: yup.number().positive().integer().required(),
    countChildreng: yup.number().positive().integer().required(),
    countChild: yup.number().positive().integer().required(),
    packageId: yup.string().required(),
    deskNo: yup.string().required(),
  })
  .required();

export default function DeskOpenPage() {
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

  const { data: buffetList } = useQuery<BuffetItem[]>({
    queryKey: ["buffetList"],
    queryFn: () => getBuffetList().then((res) => res.data),
  });

  type FormValue = yup.InferType<typeof schema>;

  const {
    control,
    formState: { errors, isDirty, isValid },
    setValue,
    getValues,
    handleSubmit,
  } = useForm<FormValue>({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      countAdult: 1,
      countChildreng: 1,
      countChild: 1,
      packageId: "",
      deskNo: "",
    },
  });

  // Post Data
  const { mutateAsync: addCustomerBooking, isPending } = useMutation({
    mutationFn: (payload: CustomerBookingPayload) =>
      createCustomerBooking(payload),
    onSuccess(data) {
      setOpenConfirmDialog(false);
      navigate(`/print/qr-code/${data.data._id}`);
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

  const onSubmit = (data: FormValue) => {
    addCustomerBooking(data);
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
                  {/* หมายเลขโต๊ะ */}
                  <Controller
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.deskNo?.message}
                        disabled={!!param._id}
                      >
                        <InputLabel>หมายเลขโต๊ะ</InputLabel>
                        <Select {...field} label="หมายเลขโต๊ะ">
                          <MenuItem value="">
                            <em>กรุณาเลือกหมายเลขโต๊ะ</em>
                          </MenuItem>
                          {deskList?.map((item) => (
                            <MenuItem
                              key={item._id}
                              value={item.deskNo}
                              disabled={item.deskStatus !== "ready"}
                            >
                              {item.deskNo}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                    name="deskNo"
                    control={control}
                  />
                  {/* ชื่อลูกค้า */}
                  {/* <Controller
                    control={control}
                    name="customerName"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={!!errors?.customerName?.message}
                        fullWidth
                        label="ชื่อลูกค้า"
                        margin="dense"
                      />
                    )}
                  /> */}
                  {/* แพ็กเกจบุฟเฟ่ต์ */}
                  <Controller
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.packageId?.message}
                      >
                        <InputLabel>แพ็คเกจบุฟเฟ่ต์</InputLabel>
                        <Select {...field} label="แพ็คเกจบุฟเฟ่ต์">
                          <MenuItem value="">
                            <em>กรุณาเลือกแพ็คเกจบุฟเฟ่ต์</em>
                          </MenuItem>
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
                </Stack>

                <Stack direction="row" spacing={2}>
                  {/* แพ็กเกจบุฟเฟ่ต์ */}
                  {/* <Controller
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.packageId?.message}
                      >
                        <InputLabel>แพ็คเกจบุฟเฟ่ต์</InputLabel>
                        <Select {...field} label="แพ็คเกจบุฟเฟ่ต์">
                          <MenuItem value="">
                            <em>กรุณาเลือกแพ็คเกจบุฟเฟ่ต์</em>
                          </MenuItem>
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
                  /> */}
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
                        label="จำนวนผู้เด็กโต"
                        margin="dense"
                        type="number"
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
                        label="จำนวนผู้เด็กเล็ก"
                        margin="dense"
                        type="number"
                      />
                    )}
                  />
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
                    disabled={!isDirty || !isValid}
                    onClick={() => setOpenConfirmDialog(true)}
                  >
                    เปิดโต๊ะ
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Paper>
      </Stack>

      {/* Confirm Dialog */}
      <ConfirmDialog
        title="คุณต้องการยืนยันการเปิดโต๊ะใช่ไหม"
        open={openConfirmDialog}
        handleClose={() => setOpenConfirmDialog(false)}
        handleConfirm={handleSubmit(onSubmit)}
        isLoading={isPending}
      />
    </>
  );
}
