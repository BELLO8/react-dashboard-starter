// import { CheckCheck, Columns3Icon, Users } from "lucide-react";

import { Categorie } from "../components/Icons/Categorie";
import { Client } from "../components/Icons/Client";
import { Dashboard } from "../components/Icons/Dashboard";
import { Order } from "../components/Icons/Order";
import { Partenaires } from "../components/Icons/Partenaires";
import { User } from "../components/Icons/User";

export function AppMenu() {
  let navs = [
    {
      name: "Tableau de bord",
      link: "/",
      icon: <Dashboard />,
    },
    {
      name: "Utilisateurs",
      link: "/utilisateurs",
      icon: <User />,
    },
    {
      name: "Categorie de vehicule",
      link: "/categorie-vehicule",
      icon: <Categorie />,
    },
    {
      name: "Partenaire",
      link: "/partenaires",
      icon: <Partenaires />,
    },
    {
      name: "Commandes",
      link: "/commandes",
      icon: <Order />,
    },
    {
      name: "Clients",
      link: "/clients",
      icon: <Client />,
    },
  ];
  return navs;
}
