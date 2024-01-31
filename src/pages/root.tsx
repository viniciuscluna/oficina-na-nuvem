import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { STORAGE_KEY } from "../constants/key";

const Root = () => {
  const apiKey = localStorage.getItem(STORAGE_KEY);
  const navigate = useNavigate();
  const location = useLocation();
  

  useEffect(() => {
    if (location.pathname === "/") navigate("/login");
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (apiKey === '""' || apiKey === null) navigate('/login');
  }, [apiKey, navigate]);

  return <Outlet />;
};

export default Root;
