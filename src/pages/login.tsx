import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

import { STORAGE_KEY } from "../constants/key";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/autenticacaoService";

type FormData = {
  loginChoice: string;
  password: string;
  email?: string;
  login?: string;
};

const Login = () => {
  const { register, handleSubmit, unregister, watch } = useForm<FormData>({
    defaultValues: {
      loginChoice: "email",
    },
  });

  const loginChoice = watch("loginChoice");

  useEffect(() => {
    if (loginChoice === "email") {
      register("email");
      unregister("login");
    } else {
      register("login");
      unregister("email");
    }
  }, [loginChoice, register, unregister]);

  const navigate = useNavigate();
  const [bearerToken, setBearer] = useLocalStorage<string>(STORAGE_KEY, "");

  const { mutateAsync, isPending, data, isSuccess, isError } = useMutation({
    mutationFn: login,
  });

  useEffect(() => {
    if (bearerToken !== "") navigate("/logged/services");
  }, [bearerToken, navigate]);

  useEffect(() => {
    if (isSuccess) {
      setBearer(data.accessToken);
    }
  }, [data, isSuccess, setBearer]);

  const onSubmit = async (data: FormData) => {
    await mutateAsync({
      password: data.password,
      email: data.email || "",
      userName: data.login || "",
    });
    //Refresh page
    navigate(0);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {isError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Erro ao fazer login</span> Verifique
            suas credenciais e tente novamente 😉.
          </div>
        ) : (
          <></>
        )}
        {isPending ? (
          <div
            className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <span className="font-medium">Carregando!</span> Aguarde....
          </div>
        ) : (
          <></>
        )}
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Smart Oficina
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Entre com seu email/login e senha
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex items-center">
                <input
                  id="default-radio-2"
                  type="radio"
                  {...register("loginChoice")}
                  value="email"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-radio-2"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Email
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="default-radio-1"
                  type="radio"
                  {...register("loginChoice")}
                  value="username"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-radio-1"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Login
                </label>
              </div>

              {loginChoice === "email" ? (
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Email"
                  />
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="login"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Usuário
                  </label>
                  <input
                    type="text"
                    {...register("login", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Usuário"
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Senha
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Senha"
                />
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
