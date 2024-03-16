import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Stack, Typography } from "@mui/material";

type ButtonEvent = (
  e: React.MouseEvent<HTMLButtonElement | MouseEvent>
) => void;

type CounterProps = {
  value: number;
  onDecrement: ButtonEvent;
  onIncrement: ButtonEvent;
  disabled?: boolean;
};

const Counter: React.FC<CounterProps> = ({
  value,
  onDecrement,
  onIncrement,
  disabled,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ backgroundColor: "#009f7f", borderRadius: "8px" }}
    >
      <IconButton onClick={onDecrement} sx={{ color: "white", p: 0.5 }}>
        <RemoveIcon sx={{ height: 16, width: 16 }} />
      </IconButton>
      <Typography sx={{ color: "white", fontSize: 14 }}>{value}</Typography>
      <IconButton
        onClick={onIncrement}
        disabled={disabled}
        sx={{ color: "white", p: 0.5 }}
      >
        <AddIcon sx={{ height: 16, width: 16 }} />
      </IconButton>
    </Stack>
  );
};

export default Counter;
