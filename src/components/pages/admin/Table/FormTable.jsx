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
import LoadingCard from "../../../card/LoadingCard";

import { Carousel } from "react-responsive-carousel";
import { toast } from "react-toastify";
import { list, remove } from "../../../../functions/table";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const FormTable = () => {
  //ใช้สำหรับ GET
  const { data, isLoading } = useQuery({
    queryKey: ["adminTableList"],
    queryFn: () => list().then((res) => res.data),
  });

  const handleRemove = async (id) => {
    remove(id)
      .then((res) => {
        toast.success("Delete Success : " + res.data.tableNo);
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
                  <Link to={"/admin/addtable"}>
                    <Button color="success" variant="contained" size="large">
                      <AddCircleOutlineIcon sx={{ margin: 1 }} />
                      ADD TABLE
                    </Button>
                  </Link>
                </Box>
                <br />
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell align="center">หมายเลขโต๊ะ</TableCell>
                        <TableCell align="center">สถานะโต๊ะ</TableCell>
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
                            key={row.TableNo}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell align="center">{row.tableNo}</TableCell>
                            <TableCell align="center">
                              {row.tableStatus}
                            </TableCell>
                            <TableCell align="center">
                              <ButtonGroup>
                                <Link to={"/admin/edittable/" + row._id}>
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

export default FormTable;
