import classNames from "classnames";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { useServiceStore } from "../stores/servicosStore";
import { useMemo, useState } from "react";
import { EPrestacaoServicoStatus } from "../domain/ePrestacaoServicoStatus";
import { STORAGE_KEY } from "../constants/key";

const Sidebar = () => {
  const [, setLocalStorage] = useLocalStorage<string>(STORAGE_KEY, "");
  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const [recordsClicked, setRecordsClicked] = useState<boolean>(false);
  const location = useLocation();
  const recordsExpanded = useMemo(
    () => location.pathname.startsWith("/logged/records") || recordsClicked,
    [location.pathname, recordsClicked]
  );

  const servicos = useServiceStore((state) => state.servicos);

  const openedServices = useMemo(() => {
    const abertos = [
      EPrestacaoServicoStatus.aberto,
      EPrestacaoServicoStatus.analise,
      EPrestacaoServicoStatus.andamento,
      EPrestacaoServicoStatus.aprovado,
      EPrestacaoServicoStatus.teste,
    ];
    return servicos.filter((f) => abertos.includes(f.status));
  }, [servicos]);

  const onLeaving = () => {
    setLocalStorage('');
    navigate('/login');
  }

  return (
    <>
      <div>
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={() => setMenuOpened((value) => !value)}
        >
          <span className="sr-only">Abrir Menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      </div>
      <aside
        className={classNames(
          "fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0",
          menuOpened ? "transform-none" : "-translate-x-full"
        )}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                end
                to="/logged/dashboard"
                className={(props) =>
                  classNames(
                    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
                    props.isActive ? "bg-gray-100 dark:bg-gray-700" : ""
                  )
                }
              >
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6a7.5 7.5 0 1 0 8 8h-8V6Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.5 3H13v8h8v-.5A7.5 7.5 0 0 0 13.5 3Z"
                  />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                end
                to="/logged/services"
                className={(props) =>
                  classNames(
                    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
                    props.isActive ? "bg-gray-100 dark:bg-gray-700" : ""
                  )
                }
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Andamento</span>
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  {openedServices.length}
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                end
                to="/logged/reports"
                className={(props) =>
                  classNames(
                    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
                    props.isActive ? "bg-gray-100 dark:bg-gray-700" : ""
                  )
                }
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 21 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.539 17h12.476l4-9H5m-2.461 9a1 1 0 0 1-.914-1.406L5 8m-2.461 9H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H16a1 1 0 0 1 1 1v2H5"
                  />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Concluídos
                </span>
              </NavLink>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setRecordsClicked((clk) => !clk)}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Cadastros</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </a>
              <ul
                className={classNames(
                  "py-2 space-y-2",
                  recordsExpanded ? "" : "hidden"
                )}
              >
                <li>
                  <NavLink
                    to="records/category"
                    className={(props) =>
                      classNames(
                        "flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
                        props.isActive ? "bg-gray-100 dark:bg-gray-700" : ""
                      )
                    }
                  >
                    Categoria
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="records/customer"
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
                    to="records/employee"
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
                <li>
                  <NavLink
                    to="records/product"
                    className={(props) =>
                      classNames(
                        "flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
                        props.isActive ? "bg-gray-100 dark:bg-gray-700" : ""
                      )
                    }
                  >
                    Produto
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="records/subService"
                    className={(props) =>
                      classNames(
                        "flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
                        props.isActive ? "bg-gray-100 dark:bg-gray-700" : ""
                      )
                    }
                  >
                    Sub-Serviço
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="#"
                onClick={onLeaving}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Sair</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      {menuOpened ? (
        <div
          drawer-backdrop=""
          className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30"
          onClick={() => setMenuOpened((value) => !value)}
        ></div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Sidebar;
