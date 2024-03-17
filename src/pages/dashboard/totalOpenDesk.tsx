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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Paper>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={6}>
                        LOGO
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        หัวข้อ
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        $3.456K
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          </Grid>

          <CardContent>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent={"center"}
            ></Stack>
          </CardContent>
        </Box>
      </Box>
    </>
  );
};

export default TotalOpenDesk;
