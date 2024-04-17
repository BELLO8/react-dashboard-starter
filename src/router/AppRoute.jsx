import { createHashRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { Home } from "../views/Home/Home";
import { Login } from "../views/auth/login/Login";
import ErrorPage from "../views/notFound/ErrorPage";

export const AppRoute = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
]);
