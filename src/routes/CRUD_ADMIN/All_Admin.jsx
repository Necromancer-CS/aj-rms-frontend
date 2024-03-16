import { Box } from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// functions
import { currentAdmin } from "../../functions/auth";

// Layout
import Notfound404 from "../../components/pages/Notfound404";
const All_Admin = ({ children }) => {
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
    <div className="app">
      <main className="content">
        <div className="content_body">
          <Box m="20px">{children}</Box>
        </div>
      </main>
    </div>
  ) : (
    <Notfound404 text={text} />
  );
};

export default All_Admin;
