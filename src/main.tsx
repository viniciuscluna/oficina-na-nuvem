import React from "react";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Root from "./pages/root";
import Login from "./pages/login";
import Logged from "./pages/logged";
import Service from "./pages/service";
import Records from "./pages/records";

import "./index.css";

//Configure routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logged",
        element: <Logged />,
        children: [
          {
            path: "/logged/services",
            element: <Service />,
          },
          {
            path: "/logged/records",
            element: <Records />,
          },
        ],
      },
    ],
  },
]);

// Create a client for react query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
