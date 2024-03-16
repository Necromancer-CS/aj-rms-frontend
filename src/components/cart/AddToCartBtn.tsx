import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Stack, IconButton } from "@mui/material";

type Props = {
  onClick(): void;
};

const AddToCartBtn: React.FC<Props> = ({ onClick }) => {
  return (
    <Stack sx={{ cursor: "pointer" }} onClick={onClick}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <IconButton
          sx={{
            borderRadius: "4px",
            backgroundColor: "#E5E7EB",
            p: 0.5,
          }}
        >
          <AddIcon sx={{ height: 16, width: 16 }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default AddToCartBtn;
