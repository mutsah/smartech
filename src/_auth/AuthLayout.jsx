import { Outlet } from "react-router-dom";
import bgImage from "../assets/auth-bg.jpg";

const AuthLayout = () => {
  return (
    <div>
      <div className="flex flex-row h-screen">
        <section className="w-full md:w-2/5 flex items-center">
          <Outlet></Outlet>
        </section>
        <div className="h-screen  md:w-3/5 p-4 ">
          <img
            src={bgImage}
            alt="logo"
            className="hidden md:block h-full object-cover bg-no-repeat rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
