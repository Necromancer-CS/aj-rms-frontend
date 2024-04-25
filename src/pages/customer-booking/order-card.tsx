import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { OrderItem } from "src/types/order";
import { Divider } from "@mui/material";
import { orderStatusText, orderStatusColor } from "src/helper/order";

interface OrderCardProps {
  data: OrderItem;
}

export default function OrderCard({ data }: OrderCardProps) {
  return (
    // <Card sx={{ height: "100%", p: 2, border: "1px solid #1b1b1b" }}>
    <Stack
      spacing={2}
      sx={{
        height: "100%",
        p: 2,
        border: "1px solid #1b1b1b",
        borderRadius: 5,
        backgroundColor: "#212121",
        color: "#ffffff",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography flex={1} textAlign="start">
          เลขที่สั่ง
        </Typography>
        <Typography flex={1} textAlign="end">
          {data._id}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography flex={1} textAlign="start">
          หมายเลขโต๊ะ
        </Typography>
        <Typography flex={1} textAlign="end">
          {data.deskNo}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Typography flex={1} textAlign="start">
          สถานะ
        </Typography>
        <Typography
          flex={1}
          textAlign="end"
          sx={{
            color: orderStatusColor(data.status),
          }}
        >
          {orderStatusText(data.status)}
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between">
        <Typography flex={1} textAlign="start" sx={{ fontSize: 12 }}>
          {data.menuName}
        </Typography>
        <Typography flex={1} textAlign="end">
          x{data.quantity}
        </Typography>
      </Stack>
    </Stack>
    // </Card>
  );
}
