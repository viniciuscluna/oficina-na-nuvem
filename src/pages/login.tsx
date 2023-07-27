import { useForm } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";
import { STORAGE_KEY } from "../constants/key";
import { useNavigate } from "react-router-dom";

type FormData = {
  chave: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();
  const [, setApiKey] = useLocalStorage<string>(STORAGE_KEY, "");

  const onSubmit = (data: FormData) => {
    setApiKey(data.chave);
    navigate("/logged/services");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Smart Oficina
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Entre com sua chave única
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="chave"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Chave
                </label>
                <input
                  type="password"
                  {...register("chave")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Chave privada"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Entre
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
