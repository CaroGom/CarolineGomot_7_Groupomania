import { Outlet } from "react-router-dom";
import Home from "../pages/Home";
const Auth = () => {
  let token = localStorage.getItem('token');
  return token === null ? <Home /> : <Outlet />;
};

export default Auth;