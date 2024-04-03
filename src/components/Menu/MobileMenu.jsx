import { Drawer } from '@mui/material';
import React from 'react';
import 'react-photo-view/dist/react-photo-view.css';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUserProfil } from '../../Utils/Utils';
import AvatarIcon from '../../assets/icons/avatar.svg';
import LockIcon from '../../assets/icons/lock.svg';
import LogoutIcon from '../../assets/icons/logout.svg';
import logo from '../../assets/images/logo/logo.png';
import { handleLogout } from '../../redux/auth';
import { navs } from './SideBarMenu';

export const MobileMenu = ({ setOpenSide, openSide }) => {
    const user = getUserProfil();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <>
            <Drawer open={openSide} onClose={() => setOpenSide(false)} anchor='left'>
                <div className='bg-[#01192e] px-4 py-4 h-full'>
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
                </div >

            </Drawer >
        </>
    )
}

