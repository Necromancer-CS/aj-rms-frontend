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
        <Stack
          p={1}
          direction="row"
          spacing={2}
          justifyContent={"space-between"}
        >
          <Typography
            variant="h5"
            sx={{
              color: "white",
            }}
          >
            จำนวนที่นั่ง
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "white",
            }}
          >
            {data.chairCount}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "white",
            }}
          >
            ท่าน
          </Typography>
        </Stack>

        <Stack
          p={1}
          direction="row"
          spacing={2}
          justifyContent={"space-between"}
        >
          <Typography
            variant="h5"
            sx={{
              color: "white",
            }}
          >
            โต๊ะหมายเลข
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.deskNo}
          </Typography>
        </Stack>
        <Stack
          p={1}
          direction="row"
          spacing={2}
          justifyContent={"space-between"}
        >
          <Typography
            variant="h5"
            sx={{
              color: "white",
            }}
          >
            สถานะ
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
      </Stack>
    </Card>
  );
}
