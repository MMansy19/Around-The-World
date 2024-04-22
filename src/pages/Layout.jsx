import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-100 font-inter dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <div className="container mx-auto px-5 md:px-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
