import { PropTypes } from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import AddToCart from "../cart/AddToCart";

export default function MenuCard({ data }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardMedia
        component="img"
        image={`${import.meta.env.VITE_IMAGE_URL}/uploads/` + data.file}
        alt="product-img"
        height="250px"
      />
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h5">{data.menuName}</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: "40px" }}
          >
            {data.menuDetail}
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5" color="red">
              {data.menuPrice + " บาท"}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <AddToCart item={data} />
    </Card>
  );
}

MenuCard.propTypes = {
  data: PropTypes.object,
};
