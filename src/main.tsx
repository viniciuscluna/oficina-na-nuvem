import React from "react";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//Pages
import Root from "./pages/root";
import Login from "./pages/login";
import Logged from "./pages/logged";
import Service from "./pages/service";
import Records from "./pages/records/records";

// SubPages
import SubService from "./pages/records/subService/subService";
import AddSubService from "./pages/records/subService/addSubService";
import Category from "./pages/records/category/category";
import AddCategory from "./pages/records/category/addCategory";
import EditSubService from "./pages/records/subService/editSubService";
import EditCategory from "./pages/records/category/editCategory";
import Reports from "./pages/reports/reports";
import Product from "./pages/records/product/product";
import Employee from "./pages/records/employee/employee";
import AddProduct from "./pages/records/product/addProduct";
import EditProduct from "./pages/records/product/editProduct";
import Print from "./components/service/print/print";

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
                element: <SubService />,
              },
              {
                path: "/logged/records/subService/add",
                element: <AddSubService />,
              },
              {
                path: "/logged/records/subService/edit/:id",
                element: <EditSubService />,
              },
              {
                path: "/logged/records/category",
                element: <Category />,
              },
              {
                path: "/logged/records/category/add",
                element: <AddCategory />,
              },
              {
                path: "/logged/records/category/edit/:id",
                element: <EditCategory />,
              },
              {
                path: "/logged/records/product",
                element: <Product />,
              },
              {
                path: "/logged/records/product/add",
                element: <AddProduct />,
              },
              {
                path: "/logged/records/product/edit/:id",
                element: <EditProduct />,
              },
              {
                path: "/logged/records/employee",
                element: <Employee />,
              },
            ],
          },
          {
            path: "/logged/reports",
            element: <Reports />,
          },
        ],
      },
      {
        path: "/print/:id",
        element: <Print />,
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
