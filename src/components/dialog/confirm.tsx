import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { PaymentItem } from "src/types/payment";
import { getPaymentList } from "src/functions/payment";
import { updateCheckPayment } from "src/functions/booking";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface Props {
  title: string;
  openDialog: string;
  open: boolean;
  isLoading?: boolean;
  handleConfirm: () => void;
  handleClose: () => void;
}

export default function ConfirmDialog({
  title,
  openDialog,
  open,
  isLoading = false,
  handleConfirm,
  handleClose,
}: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const params = useParams();
  const [paymentId, setPaymentId] = React.useState("");
  const [fileold, setFileOld] = React.useState();
  const [data, setData] = React.useState({
    chanelPayment: "",
    file: "",
  });

  // ดึงข้อมูล Payment
  const { data: paymentListCheck } = useQuery<PaymentItem[]>({
    queryKey: ["paymentListCheck"],
    queryFn: () => getPaymentList().then((res) => res.data),
  });

  const handleChange = (event: any) => {
    setPaymentId(event.target.value);
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

  const id = params.id;
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formWithImageData = new FormData();
    for (const key in data) {
      formWithImageData.append(key, data[key]);
    }
    formWithImageData.append("fileole", fileold!);
    updateCheckPayment(id, formWithImageData)
      .then((res) => {
        handleConfirm();
      })
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            pt: 2,
            pb: 3,
            px: 2,
          },
        }}
      >
        <Stack
          sx={{ width: "100%" }}
          justifyContent="flex-end"
          flexDirection="row"
        >
          <IconButton onClick={handleClose} disabled={isLoading}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Stack
          sx={{ width: "100%" }}
          justifyContent="center"
          flexDirection="row"
        >
          <InfoOutlinedIcon sx={{ width: 64, height: 64, color: "#ff8c00" }} />
        </Stack>

        <DialogTitle>{title}</DialogTitle>

        {openDialog === "CheckPayment" && (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Stack sx={{ width: "100%" }} justifyContent="center" spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  วิธีการชำระเงิน
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="chanelPayment"
                  label="วิธีการชำระเงิน"
                  fullWidth
                  required
                  name="chanelPayment"
                  onChange={(event) => handleChange(event)}
                >
                  <MenuItem value="">
                    <em>กรุณาเลือกวิธีการชำระเงิน</em>
                  </MenuItem>
                  {paymentListCheck?.map((item) => (
                    <MenuItem key={item._id} value={item.paymentName}>
                      {item.paymentName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {paymentId != "เงินสด" && paymentId != "" && (
                <TextField
                  fullWidth
                  type="file"
                  name="file"
                  onChange={(event) => handleChange(event)}
                />
              )}
            </Stack>

            <DialogActions>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  width: "100%",
                }}
              >
                <LoadingButton
                  loading={isLoading}
                  autoFocus
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    height: "48px",
                    backgroundColor: "#00b900",
                    ":hover": {
                      backgroundColor: "#00b900",
                      opacity: 0.8,
                    },
                  }}
                >
                  ตกลง
                </LoadingButton>
                <Button
                  disabled={isLoading}
                  autoFocus
                  onClick={handleClose}
                  variant="contained"
                  fullWidth
                  sx={{
                    height: "48px",
                    backgroundColor: "#1b1b1b",
                    ":hover": {
                      backgroundColor: "#1b1b1b",
                      opacity: 0.8,
                    },
                  }}
                >
                  ปิด
                </Button>
              </Stack>
            </DialogActions>
          </form>
        )}

        {openDialog != "CheckPayment" && (
          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                width: "100%",
              }}
            >
              <LoadingButton
                loading={isLoading}
                autoFocus
                onClick={handleConfirm}
                variant="contained"
                fullWidth
                sx={{
                  height: "48px",
                  backgroundColor: "#00b900",
                  ":hover": {
                    backgroundColor: "#00b900",
                    opacity: 0.8,
                  },
                }}
              >
                ตกลง
              </LoadingButton>
              <Button
                disabled={isLoading}
                autoFocus
                onClick={handleClose}
                variant="contained"
                fullWidth
                sx={{
                  height: "48px",
                  backgroundColor: "#1b1b1b",
                  ":hover": {
                    backgroundColor: "#1b1b1b",
                    opacity: 0.8,
                  },
                }}
              >
                ปิด
              </Button>
            </Stack>
          </DialogActions>
        )}
      </Dialog>
    </React.Fragment>
  );
}
