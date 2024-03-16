import React from "react";
import { RouteObject } from "react-router-dom";
import LoginPage from "src/pages/auth/login-old";
import AdminRoute from "src/routes/admin-route";
import DeskPage from "src/pages/desk/desk";
import DeskOpenPage from "src/pages/desk/desk-open";
import ProtectedRoute from "./protected-route";
import ManageUser from "src/components/pages/admin/User/ManageUser";
import DeskTableList from "src/pages/desk/desk-list";
import PrintQrCode from "src/pages/print/qrcode";
import CreateDesk from "src/pages/desk/create-desk";
import EditDesk from "src/pages/desk/edit-desk";
import MenuTableList from "src/pages/menu/menu-list";
import CreateMenu from "src/pages/menu/create-menu";
import EditMenu from "src/pages/menu/edit-menu";
import BuffetTableList from "src/pages/buffet/buffet-list";
import CreateBuffet from "src/pages/buffet/create-buffet";
import EditBuffet from "src/pages/buffet/edit-buffet";
import PaymentTableList from "src/pages/payment/payment-list";
import CreatePayment from "src/pages/payment/create-payment";
import EditPayment from "src/pages/payment/edit-payment";
import EmployeeTableList from "src/pages/employee/employee-list";
import CreateUser from "src/pages/employee/create-employee";
import EditEmployee from "src/pages/employee/edit-employee";
import OrderTableList from "src/pages/order/order-list";
import CustomerBookingPage from "src/pages/customer-booking";
import CustomerBookingMenuPage from "src/pages/customer-booking/menu";
import CustomerBookingCartPage from "src/pages/customer-booking/cart-page";
import CustomerBookingOrderPage from "src/pages/customer-booking/order";
import DeskPaymentPage from "src/pages/desk/payment";
import MainDashboard from "src/pages/dashboard/mainDashboard";

export const routes: RouteObject[] = [
  {
    path: "admin/desk",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <DeskPage />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/desk/open",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <DeskOpenPage />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/desk/open/:_id",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <DeskOpenPage />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/desk/payment/:id",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <DeskPaymentPage />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/employee",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <ManageUser />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/desk/list",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <DeskTableList />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/desk/create",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <CreateDesk />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/desk/edit/:id",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <EditDesk />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/menu/list",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <MenuTableList />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/menu/create",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <CreateMenu />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/menu/edit/:id",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <EditMenu />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/buffet/list",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <BuffetTableList />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/buffet/create",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <CreateBuffet />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/buffet/edit/:id",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <EditBuffet />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/payment/list",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <PaymentTableList />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/payment/create",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <CreatePayment />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/payment/edit/:id",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <EditPayment />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/employee/list",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <EmployeeTableList />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/employee/create",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <CreateUser />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/employee/edit/:id",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <EditEmployee />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/order",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <OrderTableList />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/dashboard",
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <MainDashboard />
        </AdminRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "customer-booking/:id",
    element: <CustomerBookingPage />,
  },
  {
    path: "customer-booking/:id/menu",
    element: <CustomerBookingMenuPage />,
  },
  {
    path: "customer-booking/:id/cart",
    element: <CustomerBookingCartPage />,
  },
  {
    path: "customer-booking/:id/order",
    element: <CustomerBookingOrderPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/print/qr-code/:id",
    element: <PrintQrCode />,
  },
];
