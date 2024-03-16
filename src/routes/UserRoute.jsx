import { useSelector } from "react-redux";
import { Box } from "@mui/material";

// Layout
import HeaderBarUser from "../layout/HeaderBarUser";
import SideBarUser from "../layout/SideBarUser";
import Notfound404 from "../components/pages/Notfound404";

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log("UserRoute = ", user);
  // check
  return user && user.user.token ? (
    <div className="app">
      <SideBarUser />
      <main className="content">
        <HeaderBarUser />
        <div className="content_body">
          <Box m="20px">{children}</Box>
        </div>
      </main>
    </div>
  ) : (
    <Notfound404 text="No Login" />
  );
};

export default UserRoute;
