import React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "src/routes";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "src/store/store";
import { Provider } from "react-redux";
import theme from "src/styles/theme.js";
import { AuthProvider } from "src/hooks/use-auth";

// notfy
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function App() {
  const element = useRoutes(routes);

  return (
    <AuthProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen />
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
            {element}
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </AuthProvider>
  );
}
