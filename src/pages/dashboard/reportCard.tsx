import PropTypes from "prop-types";
import React, { useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";

// ==============================|| REPORT CARD ||============================== //

interface SalesMonthlyProps {
  primary: any;
  primaryTwo: any;
  secondary: any;
  iconPrimary: React.ElementType; // Explicitly specify the type
  color: any;
  footerData: any;
  iconFooter: any;
}

const ReportCard = ({
  primary,
  primaryTwo,
  secondary,
  iconPrimary,
  color,
  footerData,
  iconFooter,
}: SalesMonthlyProps) => {
  const theme = useTheme();
  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;
  const IconFooter = iconFooter;
  const footerIcon = iconFooter ? <IconFooter /> : null;


  if (primary) {
    setValuePrimary(primary);
  }

  return (
    <Paper elevation={12}>
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h3" sx={{ color: color }}>
                {new Intl.NumberFormat("th-TH", {
                  minimumFractionDigits: 2,
                }).format(primary)}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginTop: ".5rem" }}>
                {secondary}
              </Typography>
              <Typography variant="body1">
                ( ยอดขายรอบก่อน :{" "}
                {new Intl.NumberFormat("th-TH", {
                  minimumFractionDigits: 2,
                }).format(primaryTwo)}{" "}
                )
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h2" sx={{ color: color }}>
                {primaryIcon}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Box sx={{ background: color }}>
          <Grid
            container
            justifyContent="space-between"
            sx={{
              // textAlign: "center",
              padding: theme.spacing(1.2),
              pl: 2.5,
              pr: 2.5,
              color: theme.palette.common.white,
            }}
          >
            <Grid item>
              <Typography variant="body1">{footerData}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">{footerIcon}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Paper>
  );
};

export default ReportCard;
