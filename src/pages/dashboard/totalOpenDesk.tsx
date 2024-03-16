import {
  Box,
  Card,
  Paper,
  CardContent,
  Stack,
  Typography,
  Grid,
} from "@mui/material";

const TotalOpenDesk = () => {
  return (
    <>
      <Box sx={{ display: "flex", p: 2 }}>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Paper elevation={6}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}></Grid>
              </Grid>

              <CardContent>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent={"center"}
                ></Stack>
              </CardContent>
            </Card>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default TotalOpenDesk;
