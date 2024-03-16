import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";
import { toast } from "react-toastify";
import { list, remove } from "../../../../functions/menu";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingCard from "../../../card/LoadingCard";

const FormMenu = () => {
  //ใช้สำหรับ GET
  const { data, isLoading } = useQuery({
    queryKey: ["adminMenuList"],
    queryFn: () => list().then((res) => res.data),
  });

  //javascript
  const handleRemove = async (id) => {
    remove(id)
      .then((res) => {
        console.log(res.data.menuName);
        toast.success("Delete Success : " + res.data.menuName);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Carousel
      showIndicators={false}
      showThumbs={false}
      showStatus={false}
      showArrows={false}
    >
      <Box sx={{ display: "flex", p: 2 }}>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Paper elevation={6}>
            <Card>
              <CardContent
                sx={{
                  backgroundColor: "#61677A",
                  color: "#fff",
                  textAlign: "left",
                }}
              >
                <Typography variant="h4">จัดการข้อมูล</Typography>
              </CardContent>
            </Card>
          </Paper>
          <br />
          <Box sx={{ display: "flex" }}></Box>
          <Paper elevation={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ textAlign: "right" }}>
                  <Link to={"/admin/addmenu"}>
                    <Button color="success" variant="contained" size="large">
                      <AddCircleOutlineIcon sx={{ margin: 1 }} />
                      ADD MENU
                    </Button>
                  </Link>
                </Box>
                <br />
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Detail</TableCell>
                        <TableCell align="center">price</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Image</TableCell>
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading ? (
                        <LoadingCard count={6} />
                      ) : (
                        data.map((row, index) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell align="center">{row.menuName}</TableCell>
                            <TableCell align="center">
                              {row.menuDetail}
                            </TableCell>
                            <TableCell align="center">
                              {row.menuPrice}
                            </TableCell>
                            <TableCell align="center">{row.menuType}</TableCell>
                            <TableCell align="center">{row.file}</TableCell>
                            <TableCell align="center">
                              <ButtonGroup>
                                <Link to={"/admin/editmenu/" + row._id}>
                                  <Button color="warning" variant="contained">
                                    Edit
                                  </Button>
                                </Link>
                              </ButtonGroup>
                            </TableCell>
                            <TableCell align="center">
                              <ButtonGroup>
                                <Button
                                  color="error"
                                  variant="contained"
                                  onClick={() => handleRemove(row._id)}
                                >
                                  DELETE
                                </Button>
                              </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
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
    </Carousel>
  );
};

export default FormMenu;
