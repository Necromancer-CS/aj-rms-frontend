import PropTypes from "prop-types";
import React from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";

// ==============================|| REPORT CARD ||============================== //

interface SalesMonthlyProps {
  primary: any;
  secondary: any;
  count: any;
  iconPrimary: React.ElementType; // Explicitly specify the type
  color: any;
}

const HighlightCard = ({
  primary,
  count,
  secondary,
  iconPrimary,
  color,
}: SalesMonthlyProps) => {
  const theme = useTheme();
  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

  return (
    <>
      <Paper elevation={24}>
        <Card>
          <Box sx={{ background: color }}>
            <Grid
              container
              justifyContent="space-between"
              sx={{
                textAlign: "center",
                padding: theme.spacing(0.5),
                pl: 2.5,
                pr: 2.5,
                color: theme.palette.common.white,
              }}
            ></Grid>
          </Box>
          <CardContent>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h3" sx={{ color: color }}>
                  {primary}
                </Typography>
                <Typography variant="h5">{count}</Typography>
                <Typography variant="subtitle1" sx={{ marginTop: ".5rem" }}>
                  {secondary}
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
                textAlign: "center",
                padding: theme.spacing(0.5),
                pl: 2.5,
                pr: 2.5,
                color: theme.palette.common.white,
              }}
            ></Grid>
          </Box>
        </Card>
      </Paper>
    </>
  );
};

export default HighlightCard;
