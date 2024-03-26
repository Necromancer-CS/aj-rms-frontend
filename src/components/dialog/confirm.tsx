import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface Props {
  title: string;
  open: boolean;
  isLoading?: boolean;
  handleConfirm: () => void;
  handleClose: () => void;
}

export default function ConfirmDialog({
  title,
  open,
  isLoading = false,
  handleConfirm,
  handleClose,
}: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
              onClick={handleConfirm}
              autoFocus
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
      </Dialog>
    </React.Fragment>
  );
}
