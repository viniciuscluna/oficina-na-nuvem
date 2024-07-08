import classNames from "classnames";
import { Link, NavLink, RouterProvider, useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { useMemo, useState } from "react";
import { STORAGE_KEY } from "../constants/key";
import { createBrowserRouter } from "react-router-dom";
import { routes } from "../utils/routes";

const Profile = () => {

  const [, setLocalStorage] = useLocalStorage<string>(STORAGE_KEY, "");
  const [userName,] = useLocalStorage<string>("UserName", "");
  const [roles,] = useLocalStorage<string[]>("Roles", []);
  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const [recordsClicked, setRecordsClicked] = useState<boolean>(false);
  const location = useLocation();
  const recordsExpanded = useMemo(
    () => location.pathname.startsWith("/logged/records") || recordsClicked,
    [location.pathname, recordsClicked]
  );

  const isAdmin = useMemo(() => roles.find(f => f === "Administrador") ? true : false, [roles]);


  const onLeaving = () => {
    setLocalStorage('');
    navigate('/login');
  }

    return(
        <>

        <div className="bg-[#111827]">
        <aside
          className={classNames(
            "fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0",
            menuOpened ? "transform-none" : "-translate-x-full"
          )}
          aria-label="Profile"
         >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <h1 className="h-full px-3 py-4 text-gray-200"> {userName}
                </h1>
              </li>
              
              <li>
                  <li>
                    <NavLink
                      to="/logged/records/customer"
                      className={(props) =>
                        classNames(
                          "flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
                          props.isActive ? "bg-gray-100 dark:bg-gray-700" : ""
                        )
                      }
                    >
                      Cliente
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/logged/records/employee"
                      className={(props) =>
                        classNames(
                          "flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
                          props.isActive ? "bg-gray-100 dark:bg-gray-700" : ""
                        )
                      }
                    >
                      Funcionário
                    </NavLink>
                  </li>
                  {isAdmin ?
                    <li>
                      <NavLink
                        to="/logged/records/serviceProvider"
                        className={(props) =>
                          classNames(
                            "flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-[#1a3a31] dark:text-white dark:hover:bg-[#1a3a31]",
                            props.isActive ? "hover:bg-[#1a3a31] dark:bg-[#1a3a31]" : ""
                          )
                        }
                      >
                        Prestador
                      </NavLink>
                    </li>
                    : <></>}
                  <li>
                    <NavLink
                      to="/logged/records/serviceProvider"
                      className={(props) =>
                        classNames(
                          "flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
                          props.isActive ? "bg-gray-100 dark:bg-gray-700" : ""
                        )
                      }
                    >
                      Prestador
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/logged/dashboard"
                      className={(props) =>
                        classNames(
                          "flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
                          props.isActive ? "bg-gray-100 dark:bg-gray-700" : ""
                        )
                      }
                    >
                      Voltar
                    </NavLink>
                  </li>
     
              </li>
            </ul>
          </div>
         </aside>

        </div>
      </>
     
    );
};

export default Profile;