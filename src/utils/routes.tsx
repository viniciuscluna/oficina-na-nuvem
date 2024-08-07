import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/root";
import Login from "../pages/login";
import Logged from "../pages/logged";
import Service from "../pages/service";
import Records from "../pages/records/records";
import SubService from "../pages/records/subService/subService";
import AddSubService from "../pages/records/subService/addSubService";
import EditSubService from "../pages/records/subService/editSubService";
import Category from "../pages/records/category/category";
import AddCategory from "../pages/records/category/addCategory";
import EditCategory from "../pages/records/category/editCategory";
import Product from "../pages/records/product/product";
import AddProduct from "../pages/records/product/addProduct";
import EditProduct from "../pages/records/product/editProduct";
import Employee from "../pages/records/employee/employee";
import AddEmployee from "../pages/records/employee/addEmployee";
import EditEmployee from "../pages/records/employee/editEmployee";
import Reports from "../pages/reports/reports";
import Print from "../pages/print";
import Customer from "../pages/records/customer/customer";
import AddCustomer from "../pages/records/customer/addCustomer";
import EditCustomer from "../pages/records/customer/editCustomer";
import Dashboard from "../pages/dashboard";
import Office from "../pages/records/office/office";
import AddOffice from "../pages/records/office/addOffice";
import EditOffice from "../pages/records/office/editOffice";
import ServiceProvider from "../pages/records/serviceProvider/serviceProvider";
import AddServiceProvider from "../pages/records/serviceProvider/addServiceProvider";
import EditServiceProvider from "../pages/records/serviceProvider/editServiceProvider";

export const routes =  createBrowserRouter([
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
              path: "/logged/dashboard",
              element: <Dashboard />,
            },
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
                  path: "/logged/records/product/ProdutoInfo/:nome/:marca/:modelo",
                  element: <EditProduct />,
                },
                {
                  path: "/logged/records/employee",
                  element: <Employee />,
                },
                {
                  path: "/logged/records/employee/add",
                  element: <AddEmployee />,
                },
                {
                  path: "/logged/records/employee/edit/:id",
                  element: <EditEmployee />,
                },
                {
                  path: "/logged/records/customer",
                  element: <Customer />,
                },
                
                {
                  path: "/logged/records/customer/add",
                  element: <AddCustomer />,
                },
                {
                  path: "/logged/records/customer/edit/:id",
                  element: <EditCustomer />,
                },
                {
                  path: "/logged/records/office",
                  element: <Office />,
                },
                {
                  path: "/logged/records/office/add",
                  element: <AddOffice />,
                },
                {
                  path: "/logged/records/office/edit/:id",
                  element: <EditOffice />,
                },               
                {
                  path: "/logged/records/serviceProvider",
                  element: <ServiceProvider />,
                },
                {
                  path: "/logged/records/serviceProvider/add",
                  element: <AddServiceProvider />,
                },
                {
                  path: "/logged/records/serviceProvider/edit/:id",
                  element: <EditServiceProvider />,
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