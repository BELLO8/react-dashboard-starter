import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo/logo.png";

export const SideBarMenu = () => {
    const navs = [
        {
            name: "Tableau de bord",
            link: "/",
        },
        {
            name: "Utilisateurs",
            link: "/utilisateurs",
        },
        {
            name: "Categorie de vehicule",
            link: "/categorie-vehicule",
        },
        {
            name: "Partenaire",
            link: "/partenaires",
        },
        {
            name: "Commandes",
            link: "/commandes",
        },
        {
            name: "Clients",
            link: "/clients",
        },
    ];

    return (
        <div className="min-[320px]:hidden bg-[#01192e] sm:hidden w-[280px] drop-shadow min-h-screen lg:flex flex-col relative">
            <div className="sticky top-2 mt-8 px-4">
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
                                    <img src="" alt="" className="blanc" />
                                    <img src="" alt="" className="gris" />
                                    {item.name}
                                </button>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
