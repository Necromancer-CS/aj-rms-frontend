import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@mui/material/styles";
import { store } from "./store/store";
import { Provider } from "react-redux";
import theme from "./styles/theme.js";

// import "bootstrap/dist/css/bootstrap.min.css";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen />
          <App />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
