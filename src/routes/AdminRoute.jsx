import { Box, Stack } from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// functions
import { currentAdmin } from "../functions/auth";

// Layout
import HeaderBarAdmin from "../layout/HeaderBarAdmin";
// TODO : Remove
// import SideBarAdmin from "../layout/SideBarAdmin";
import Notfound404 from "../components/pages/Notfound404";
import AdminSideMenu from "../layout/AdminSideMenu";

const AdminRoute = ({ children }) => {
  // check
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.user.token) {
      currentAdmin(user.user.token)
        .then(() => {
          setOk(true);
        })
        .catch((error) => {
          console.log(error);
          setOk(false);
        });
    }
  }, [user]);

  const text = "No Permissios!!!";

  return ok ? (
    <Stack direction="row" sx={{ width: "100%" }}>
      <AdminSideMenu />
      <Stack sx={{ width: "100%" }}>
        <HeaderBarAdmin />
        <Box>{children}</Box>
      </Stack>
    </Stack>
  ) : (
    <Notfound404 text={text} />
  );
};

export default AdminRoute;
