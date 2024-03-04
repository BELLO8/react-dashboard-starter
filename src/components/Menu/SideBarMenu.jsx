import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import logo from '../../assets/images/logo/logo.png';
import { AppMenu } from "../../layout/AppMenu";
export const SideBarMenu = () => {
    const navs = AppMenu();
    const { pathname } = useLocation();
    return (
        <div className=" min-[320px]:hidden bg-white sm:hidden w-[270] drop-shadow-xl min-h-screen lg:flex flex-col relative">
            <div className="sticky top-2">
                <div className="flex space-x-3 px-4 py-1">
                    <img className="rounded-full" src={logo} height={50} width={50} alt="" />
                    <p className="my-auto text-dark font-bold text-lg">Treize Taxi</p>
                </div>

                <div className="flex flex-col mt-4 px-4">
                    {navs.map((item, index) => (
                        <div key={index} className="nav-links w-full">
                            <NavLink to={item.link} >
                                <div className={`flex space-x-3 px-6 py-3 mb-1 w-full rounded  ${item.link === pathname
                                    ? "bg-[#04356B] shadow-md text-white font-semibold"
                                    : "text-[#7D8172] hover:bg-neutral-50"}`}>
                                    {item.icon}
                                    <p className="text-sm">
                                        {item.name}
                                    </p>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
