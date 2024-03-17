import PropTypes from "prop-types";
import React from "react";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { DeshboardItem } from "src/types/deshboard";
import { topMenu } from "src/functions/dashboard";

const TopFiveCard = () => {
  // ดึงข้อมูล topMenu
  const { data: topMenuData } = useQuery<DeshboardItem>({
    queryKey: ["topMenu"],
    queryFn: () => topMenu().then((res) => res.data),
  });

  return (
    <>
      <Grid item lg={6} xs={12}>
        <Paper elevation={24}>
          <Card>
            <CardHeader
              title={
                <Typography
                  variant="h4"
                  sx={{ color: "black" }}
                  className="card-header"
                >
                  5 อันดับเมนูที่มีการเลือกมากที่สุด
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                {topMenuData?.topMenuDetails.map((row: any) => (
                  <Grid item xs={12} key={row._id}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="subtitle1">{row.name}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" align="right">
                          {row.count}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress
                          variant="determinate"
                          aria-label="direct"
                          value={
                            (row.count / topMenuData?.totalOrderedMenus) * 100
                          }
                          color="primary"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </>
  );
};

export default TopFiveCard;
