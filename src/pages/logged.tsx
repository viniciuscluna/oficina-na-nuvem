import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";

const Logged = () => (
  <main className="bg-gray-900 h-full flex">
    <Sidebar />
    <section className="px-4 w-full flex flex-col overflow-auto">
      <Outlet />
      <Footer />
    </section>
  </main>
);
export default Logged;
