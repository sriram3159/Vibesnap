import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LocalStorage from "./utils/storageUtils/LocalStorage";
import { ROUTES } from "./constants/routes";

const ProtectedRoutes = () => {
  const [authLogin, setAuthLogin] = useState(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = LocalStorage.isLoggedIn();
      setAuthLogin(loggedIn);
    };
    checkLoginStatus();
  }, []);

  if (authLogin === null) {
    return null;
  }

  return authLogin ? (
    <div className="p-4">
      <Outlet />
    </div>
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
};

export default ProtectedRoutes;
