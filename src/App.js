import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Login from "./pages/Login";
import ProtectedRoutes from "./ProtectedRoute";
import Feed from "../src/pages/Feed";
import Profile from "../src/pages/Profile";
import EditProfile from "../src/pages/EditProfile";
import { GlobalProvider } from "../src/context/GlobalProvider";
import CreatePost from "./pages/CreatePost";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={ROUTES.LOGIN} replace />,
    },
    {
      path: ROUTES.LOGIN,
      element: <Login />,
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: ROUTES.FEED,
          element: <Feed />,
        },
        {
          path: ROUTES.PROFILE,
          element: <Profile />,
        },
        {
          path: ROUTES.EDIT_PROFILE,
          element: <EditProfile />,
        },
        {
          path: ROUTES.CREATE_POST,
          element: <CreatePost />,
        },
      ],
    },
  ]);
  return (
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  );
};

export default App;
