import { createHashRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { Home } from "../views/Home/Home";
import { Login } from "../views/auth/login/Login";
import { ListeCategorieVehicule } from "../views/categorie/ListeCategorieVehicule";
import { ChauffeurCommande } from "../views/chauffeur-commande/ChauffeurCommande";
import { Chauffeur } from "../views/chauffeur/Chauffeur";
import { ClientDetail } from "../views/client-detail/ClientDetail";
import { Client } from "../views/client/Client";
import { Commande } from "../views/commande/Commande";
import { ModificationIdentifiant } from "../views/modification-identifiant/ModificationIdentifiant";
import ErrorPage from "../views/notFound/ErrorPage";
import { Paramettre } from "../views/paramettre/Paramettre";
import PartenaireDetail from "../views/partenaire-detail/PartenaireDetail";
import { Partenaire } from "../views/partenaire/Partenaire";
import { PositionVehicule } from "../views/position-vehicule/PositionVehicule";
import { ListeUtilisateur } from "../views/utilisateur/ListeUtilisateur";
import { ListeVehicules } from "../views/vehicule/ListeVehicules";

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
        path: "/liste-chauffeurs",
        element: <Chauffeur />,
      },
      {
        path: "/detail-partenaire/:id",
        element: <PartenaireDetail />
      },
      {
        path: "/clients",
        element: <Client />,
      },
      {
        path: "/detail-client/:id",
        element: <ClientDetail />
      },
      {
        path: "/commandes",
        element: <Commande />,
      },
      {
        path: "/chauffeur-commande/:id",
        element: <ChauffeurCommande />,
      },
      {
        path: "/position-vehicules",
        element: <PositionVehicule />,
      },
      {
        path: "/modification-identifiant",
        element: <ModificationIdentifiant />,
      },
      {
        path: "/liste-vehicules",
        element: <ListeVehicules />
      },
      {
        path: "/paramettre",
        element: <Paramettre />
      }
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
]);
