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
import Select from "@mui/material/Select";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { MenuItem } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { list, changeRole } from "../../../../functions/user";
import { Link } from "react-router-dom";

const ManageUser = () => {
  const [dataUser, setDataUser] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    // code
    loadData(user.user.token);
  }, [user.user.token]);

  const loadData = async (authtoken) => {
    await list(authtoken)
      .then((res) => {
        setDataUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const role = ["admin", "user"];

  const handleChangeRole = async (id, event) => {
    const value = {
      id: id,
      role: event.target.value,
    };
    await changeRole(user.user.token, value)
      .then(() => {
        loadData(user.user.token);
      })
      .catch((error) => {
        console.log(error);
      });
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
                  <Link to={"/admin/register"}>
                    <Button color="success" variant="contained" size="large">
                      <AddCircleOutlineIcon sx={{ margin: 1 }} />
                      ADD USER
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
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">Role</TableCell>
                        <TableCell align="center">Updated At</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataUser.map((row, index) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{row.email}</TableCell>
                          <TableCell align="center">{row.firstname}</TableCell>
                          <TableCell align="center">{row.lastname}</TableCell>
                          <TableCell align="center">
                            <Select
                              style={{ width: "100px" }}
                              defaultValue={row.role}
                              onChange={(event) =>
                                handleChangeRole(row._id, event)
                              }
                            >
                              {role.map((item, index) => (
                                <MenuItem value={item} key={index}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell align="center">{row.updatedAt}</TableCell>
                        </TableRow>
                      ))}
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

export default ManageUser;
