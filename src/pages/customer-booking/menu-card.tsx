import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import AddToCart from "src/components/cart/AddToCart";
import { TMenuItem } from "src/types/menu";

interface Props {
  data: TMenuItem;
}

const MOCK_IMG_URL =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function MenuCard({ data }: Props) {
  return (
    <Card sx={{ height: "100%", p: 2 }}>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Stack direction="row" spacing={2} flex={1}>
          <img
            // src={MOCK_IMG_URL}
            src={`${import.meta.env.VITE_IMAGE_URL}/uploads/` + data.file}
            alt="product-img"
            style={{
              width: "64px",
              height: "64px",
            }}
          />
          <Typography sx={{ fontSize: 14 }}>{data.menuName}</Typography>
        </Stack>
        <Stack justifyContent="flex-end">
          <AddToCart item={data} />
        </Stack>
      </Stack>
    </Card>
  );
}
