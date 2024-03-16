import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { DeskItem } from "../../types/desk";
import { deskColor, deskStatusText } from "../../helper/desk";

export interface TableCardProps {
  data: DeskItem;
}

export default function TableCard({ data }: TableCardProps) {
  return (
    <Card
      sx={{
        maxWidth: 400,
        backgroundColor: deskColor(data.deskStatus),
      }}
    >
      <Stack p={2} spacing={1}>
        <Typography
          variant="h5"
          sx={{
            color: "white",
          }}
        >
          {data.deskNo}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "white",
          }}
        >
          {deskStatusText(data.deskStatus)}
        </Typography>
      </Stack>
    </Card>
  );
}
