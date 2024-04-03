import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserProfil } from "../../Utils/Utils";
import Car from '../../assets/icons/car.svg';
import Driver from '../../assets/icons/driver.svg';
import MapIcon from '../../assets/icons/map.svg';
import Setting from '../../assets/icons/setting.svg';
import logo from "../../assets/images/logo/logo.png";
import { handleLogout } from "../../redux/auth";
import AvatarIcon from './../../assets/icons/avatar.svg';
import CategorieIcon from './../../assets/icons/categorie.svg';
import PartenaireIcon from './../../assets/icons/client.svg';
import ClientIcon from './../../assets/icons/client1.svg';
import CommandeIcon from './../../assets/icons/commande.svg';
import HomeIcon from './../../assets/icons/home.svg';
import LockIcon from './../../assets/icons/lock.svg';
import LogoutIcon from './../../assets/icons/logout.svg';
import UtilisateurIcon from './../../assets/icons/user.svg';

export const navs = [
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
        name: "Partenaires  ",
        link: "/partenaires",
        icon: PartenaireIcon
    },
    {
        name: "Chauffeurs",
        link: "/liste-chauffeurs",
        icon: Driver
    },
    {
        name: "Vehicules",
        link: "/liste-vehicules",
        icon: Car
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
    {
        name: "Position des vehicules",
        link: "/position-vehicules",
        icon: MapIcon
    },
    {
        name: "Paramettre",
        link: "/paramettre",
        icon: Setting
    },
];

export const SideBarMenu = () => {
    const user = getUserProfil();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    return (
        <div className="sticky top-0 left-0  min-[320px]:hidden sm:hidden bg-[#01192e] w-[280px] h-screen lg:flex flex-col relative px-4 pt-5 z-50">
            <div className="">
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

                <div className="sidebar-menu flex flex-col mt-5">
                    {navs.map((item, index) => (
                        <div key={index} className="nav-links w-full">
                            <NavLink to={item.link}>
                                <button className="my-[1px] px-3 flex items-center gap-x-2 w-full h-11 rounded-lg hover:bg-[#273b4d] text-gray-400 text-sm">
                                    <img src={item.icon} alt="" className="w-6 h-6" />
                                    {item.name}
                                </button>
                            </NavLink>
                        </div>
                    ))}
                    <div className="mt-1 w-52 rounded-xl bg-white/50">
                        <div className="tooltip absolute right-12" data-tip="Modifier identifiant">
                            <NavLink to={'/modification-identifiant'} className="bg-gray-200 w-7 h-7 rounded-full flex items-center justify-center">
                                <img src={LockIcon} alt="" className="w-5 h-5" />
                            </NavLink>
                        </div>

                        <div className="mt-2 w-9 h-9 rounded-full bg-gray-600 shadow mx-auto flex items-center justify-center">
                            <img src={AvatarIcon} alt="" className="w-6 h-6" />
                        </div>
                        <p className="text-base  font-bold text-black truncate text-center">{user?.nom ?? user?.email}</p>
                        <button className="w-full h-9 flex items-center justify-center gap-x-2 bg-red-600 text-white text-sm font-semibold rounded-xl mt-2" onClick={() => {
                            dispatch(handleLogout())
                            navigate('/login')
                        }}>
                            <img src={LogoutIcon} alt="" className="w-6 h-6" />
                            Déconnexion
                        </button>
                    </div>
                </div>


            </div>
        </div>

    );
};
