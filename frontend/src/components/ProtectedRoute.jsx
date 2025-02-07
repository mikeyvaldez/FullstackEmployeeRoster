import { useUserContext } from "../context/userContext";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
    const { isLoggedIn } = useUserContext()

  return isLoggedIn ? <Outlet /> : <Navigate to="/registration" />;
}
