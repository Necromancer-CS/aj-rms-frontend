import { useSelector } from "react-redux";
import { Box } from "@mui/material";

// Layout
import SideBarUserMenu from "../../layout/SideBarUserMenu";
import Notfound404 from "../../components/pages/Notfound404";

const MainRoute = ({ children }) => {
  // check

  const { user } = useSelector((state) => ({ ...state }));
  console.log("UserRoute = ", user);

  return user && user.user.token ? (
    <div className="app">
      <SideBarUserMenu />
      <main className="content">
        <div className="content_body">
          <Box m="20px">{children}</Box>
        </div>
      </main>
    </div>
  ) : (
    <Notfound404 text="No Login" />
  );
};

export default MainRoute;
