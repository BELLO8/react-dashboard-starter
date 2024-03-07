import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo/logo.png";
import HomeIcon from './../../assets/icons/home.svg'
import UtilisateurIcon from './../../assets/icons/user.svg'
import CategorieIcon from './../../assets/icons/categorie.svg'
import PartenaireIcon from './../../assets/icons/client.svg'
import ClientIcon from './../../assets/icons/client1.svg'
import CommandeIcon from './../../assets/icons/commande.svg'
import LogoutIcon from './../../assets/icons/logout.svg'
import AvatarIcon from './../../assets/icons/avatar.svg'
import LockIcon from './../../assets/icons/lock.svg'

export const SideBarMenu = () => {
    const navs = [
        {
            name: "Tableau de bord",
            link: "/",
            icon: HomeIcon
        },
        {
            name: "Commandes",
            link: "/commandes",
            icon: CommandeIcon
        },
        {
            name: "Partenaire",
            link: "/partenaires",
            icon: PartenaireIcon
        },
        {
            name: "Clients",
            link: "/clients",
            icon: ClientIcon
        },
        {
            name: "Categorie de vehicule",
            link: "/categorie-vehicule",
            icon: CategorieIcon
        },
        {
            name: "Utilisateurs",
            link: "/utilisateurs",
            icon: UtilisateurIcon
        },
    ];

    return (
        <div className="sticky top-0 left-0 bg-[#01192e] w-[280px] drop-shadow h-screen relative px-4 pt-10">
            <div className="flex gap-x-3">
                <img
                    className="rounded-md"
                    src={logo}
                    height={35}
                    width={35}
                    alt=""
                />
                <p className="my-auto text-white font-bold text-lg">Treiize Taxi</p>
            </div>

            <div className="sidebar-menu flex flex-col mt-10">
                {navs.map((item, index) => (
                    <div key={index} className="nav-links w-full">
                        <NavLink to={item.link}>
                            <button className="my-1 px-3 flex items-center gap-x-2 w-full h-11 rounded-lg hover:bg-[#273b4d] text-gray-400 text-base font-medium">
                                <img src={item.icon} alt="" className="w-6 h-6" />
                                {item.name}
                            </button>
                        </NavLink>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-8 w-60 h-fit rounded-xl bg-white/50 p-3">
                <div className="tooltip absolute right-3" data-tip="Modifier identifiant">
                    <button className="bg-gray-200 w-9 h-9 rounded-full flex items-center justify-center">
                        <img src={LockIcon} alt="" className="w-5 h-5" />
                    </button>
                </div>

                <div className="mt-7 w-12 h-12 rounded-full bg-gray-600 shadow mx-auto flex items-center justify-center">
                    <img src={AvatarIcon} alt="" className="w-6 h-6" />
                </div>
                <p className="text-base font-bold text-black truncate text-center">Alex Charles Orier Blé Arnaud</p>
                <button className="w-full h-9 flex items-center justify-center gap-x-2 bg-red-600 text-white text-sm font-semibold rounded-xl mt-2">
                    <img src={LogoutIcon} alt="" className="w-6 h-6" />
                    Déconnexion
                </button>
            </div>
        </div>
    );
};
