import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { read } from "../../../../functions/table";
import { list } from "../../../../functions/menu";
import LoadingCard from "../../../card/LoadingCard";
import MenuCard from "../../../card/MenuCard";
import { useQuery } from "@tanstack/react-query";
import CartCounterButton from "../../../cart/CartCounterButton";

const MainMenu = () => {
  const params = useParams();
  const [noTable, setNoTable] = useState("");
  const [order, setOrder] = useState([]);

  //ใช้สำหรับ GET
  const { data, isLoading } = useQuery({
    queryKey: ["menuList"],
    queryFn: () => list().then((res) => res.data),
  });

  useEffect(() => {
    loadDataTable(params.id);
  }, [params.id]);

  const loadDataTable = async (id) => {
    read(id)
      .then((res) => {
        // code
        setNoTable(res.data);
      })
      .cahen((error) => {
        // error
        console.log(error);
      });
  };

  const handleToCart = (res) => {
    setOrder((oldOrder) => [...oldOrder, res]);
    console.log(order);
  };

  return (
    <Stack>
      <Box sx={{ display: "flex", p: 2 }}>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Paper elevation={6}>
            <Card>
              <CardContent
                sx={{
                  backgroundColor: "#61677A",
                  color: "#fff",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="h4"
                      sx={{ textAlign: "left", display: "flex" }}
                    >
                      เมนูอาหาร
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h4" sx={{ textAlign: "right" }}>
                      {noTable.tableNo}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Paper>
          <br />
          <Paper elevation={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    {isLoading ? (
                      <LoadingCard count={6} />
                    ) : (
                      data.map((item) => (
                        <Grid item xs={3} key={item._id}>
                          <Stack
                            sx={{
                              height: "100%",
                            }}
                          >
                            <MenuCard
                              data={item}
                              onClick={() =>
                                handleToCart({
                                  item: item,
                                  noTable: noTable.tableNo,
                                })
                              }
                            />
                          </Stack>
                        </Grid>
                      ))
                    )}
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Paper>
          <Box height={20} />
          <Paper elevation={6}>
            <Card>
              <CardContent style={{ textAlign: "center" }}>
                <Typography variant="h6">
                  COPYRIGHT © 2024.All RESTAURANT AJ.
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Box>
      </Box>
      <Stack sx={{ position: "sticky", bottom: 0 }}>
        <CartCounterButton />
      </Stack>
    </Stack>
  );
};

export default MainMenu;
