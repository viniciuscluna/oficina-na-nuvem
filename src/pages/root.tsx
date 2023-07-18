import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

const Root = () => {
  const [apiKey] = useLocalStorage("apiKey", "");
  const navigate = useNavigate();

  useEffect(() => {
    if(apiKey === "") navigate("/login");
    else navigate("/logged/services");
  }, [apiKey, navigate]);

  return <Outlet />;
};

export default Root;