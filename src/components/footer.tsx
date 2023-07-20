import { useMemo } from "react";

const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-800 my-2">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {currentYear}{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Smart Oficina
          </a>
          . Alpha.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Sobre-nós
            </a>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Ajuda
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;