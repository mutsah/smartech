import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import { useEffect } from "react";

export const UserLayout = () => {
  // const navigate = useNavigate();

  // const user = localStorage.getItem("user");

  // useEffect(() => {
  //   const user = localStorage.getItem("user");

  //   // If no user or user is an empty string
  //   if (!user || user === "") {
  //     navigate("/sign-in");
  //   }
  // }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar></NavBar>
      <Outlet className="flex-1"></Outlet>
      <Footer></Footer>
    </div>
  );
};
