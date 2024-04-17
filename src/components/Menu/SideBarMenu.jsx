import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo/logo.png";
import HomeIcon from './../../assets/icons/home.svg';

export const navs = [
    {
        name: "Tableau de bord",
        link: "/",
        icon: HomeIcon
    },
    {
        name: "Menu 1",
        link: "/menu",
        icon: HomeIcon
    },
    {
        name: "Menu 2",
        link: "/menu",
        icon: HomeIcon
    },
];

export const SideBarMenu = () => {
    // const user = getUserProfil();
    // const dispatch = useDispatch();
    // const navigate = useNavigate();


    return (
        <div className="sticky shadow-lg top-0 left-0  min-[320px]:hidden sm:hidden  w-[280px] h-screen lg:flex flex-col relative px-4 pt-5 z-50">
            <div className="">
                <div className="flex gap-x-3">
                    <img
                        className="rounded-md"
                        src={logo}
                        height={35}
                        width={35}
                        alt=""
                    />
                    <p className="my-auto text-dark font-bold text-lg">Dashboard Starter</p>
                </div>

                <div className="sidebar-menu flex flex-col mt-5">
                    {navs.map((item, index) => (
                        <div key={index} className="nav-links w-full">
                            <NavLink to={item.link}>
                                <button className="my-[1px] px-3 flex items-center gap-x-2 w-full h-11 rounded-lg hover:bg-blue-600 hover:text-white text-gray-400 text-sm">
                                    <img src={item.icon} alt="" className="w-6 h-6" />
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
