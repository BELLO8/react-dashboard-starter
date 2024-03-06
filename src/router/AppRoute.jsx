import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { Home } from "../views/Home/Home";
import { Login } from "../views/auth/login/Login";
import { ListeCategorieVehicule } from "../views/categorie/ListeCategorieVehicule";
import ClientDetail from "../views/client-detail/ClientDetail";
import { Client } from "../views/client/Client";
import { Commande } from "../views/commande/Commande";
import ErrorPage from "../views/notFound/ErrorPage";
import { Partenaire } from "../views/partenaire/Partenaire";
import { ListeUtilisateur } from "../views/utilisateur/ListeUtilisateur";

export const AppRoute = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/utilisateurs",
        element: <ListeUtilisateur />,
      },
      {
        path: "/categorie-vehicule",
        element: <ListeCategorieVehicule />,
      },
      {
        path: "/partenaires",
        element: <Partenaire />,
      },
      {
        path: "/clients",
        element: <Client />,
      },
      {
        path: "/detail-client",
        element: <ClientDetail />
      },
      {
        path: "/commandes",
        element: <Commande />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
]);
