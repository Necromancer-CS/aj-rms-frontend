import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

// notfy
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout
import { Container, CssBaseline, Stack } from "@mui/material";

// pages
import Login from "./components/pages/auth/Login";
import Notfound404 from "./components/pages/Notfound404";
import HomePage from "./components/pages/auth/HomePage/mainHomePage";

// function
import { currentUser } from "./functions/auth";

// Store
import { login } from "./store/userSlice";

// routes
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
import All_Admin from "./routes/CRUD_ADMIN/All_Admin";
import MainRoute from "./routes/User/MainRoute";

// admin
import Register from "./components/pages/auth/Register";
import Dashboard from "./components/pages/admin/Dashboard/Dashboard";
// Menu
import FormMenu from "./components/pages/admin/Menu/FormMenu";
import AddMenu from "./components/pages/admin/Menu/AddMenu";
import EditMenu from "./components/pages/admin/Menu/EditMenu";
// Table
import FormTable from "./components/pages/admin/Table/FormTable";
import AddTable from "./components/pages/admin/Table/AddTable";
import EditTable from "./components/pages/admin/Table/EditTable";
// User
import ManageUser from "./components/pages/admin/User/ManageUser";

// user
import MainTable from "./components/pages/user/Main/MainTable";
import MainMenu from "./components/pages/user/Main/MainMenu";

//Desk page
import DeskPage from "./components/pages/desk/Desk";
import DeskOpenPage from "./components/pages/desk/DeskOpen";

function App() {
  // javascript
  const dispatch = useDispatch();
  const idToken = localStorage.getItem("token");
  currentUser(idToken)
    .then((res) => {
      dispatch(
        login({
          name: res.data.name,
          email: res.data.email,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          role: res.data.role,
          token: idToken,
        })
      );
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <BrowserRouter>
      <Stack
        direction="row"
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <CssBaseline />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          {/* Publish */}
          <Route
            path="/*"
            element={
              <Notfound404 text="The page you’re looking for doesn’t exist." />
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          {/* User */}
          <Route
            path="/user/maintable"
            element={
              <UserRoute>
                <MainTable />
              </UserRoute>
            }
          />
          <Route
            path="/user/mainmenu/:id"
            element={
              <MainRoute>
                <MainMenu />
              </MainRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin/register"
            element={
              <All_Admin>
                <Register />
              </All_Admin>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/menu"
            element={
              <AdminRoute>
                <FormMenu />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/addmenu"
            element={
              <All_Admin>
                <AddMenu />
              </All_Admin>
            }
          />
          <Route
            path="/admin/editmenu/:id"
            element={
              <All_Admin>
                <EditMenu />
              </All_Admin>
            }
          />
          <Route
            path="/admin/table"
            element={
              <AdminRoute>
                <FormTable />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/addtable"
            element={
              <All_Admin>
                <AddTable />
              </All_Admin>
            }
          />
          <Route
            path="/admin/edittable/:id"
            element={
              <All_Admin>
                <EditTable />
              </All_Admin>
            }
          />
          <Route
            path="/admin/manage"
            element={
              <AdminRoute>
                <ManageUser />
              </AdminRoute>
            }
          />

          {/* New Route */}
          <Route
            path="/admin/desk"
            element={
              <AdminRoute>
                <DeskPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/desk/open"
            element={
              <AdminRoute>
                <DeskOpenPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/desk/open/:_id"
            element={
              <AdminRoute>
                <DeskOpenPage />
              </AdminRoute>
            }
          />
        </Routes>
      </Stack>
    </BrowserRouter>
  );
}

export default App;
