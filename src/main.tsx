import React from "react";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//Pages
import Root from "./pages/root";
import Login from "./pages/login";
import Logged from "./pages/logged";
import Service from "./pages/service";
import Records from "./pages/records";

// SubPages
import SubService from "./components/records/subService/subService";
import AddSubService from "./components/records/subService/addSubService";
import Category from "./components/records/category/category";
import AddCategory from "./components/records/category/addCategory";

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
            children: [
              {
                path: "/logged/records/subService",
                element: <SubService />
              },
              {
                path: "/logged/records/subService/add",
                element: <AddSubService />
              },
              {
                path: "/logged/records/category",
                element: <Category />
              },
              {
                path: "/logged/records/category/add",
                element: <AddCategory />
              }
            ]
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
