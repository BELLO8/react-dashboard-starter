import { Drawer, Pagination } from "@mui/material";
import { Menu, UserRound } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { status } from "../../Utils/Utils";
import { DriverCard } from "../../components/Chauffeur/DriverCard";
import { LoadingDriver } from "../../components/Chauffeur/LoadingDriving";
import { ShowDriverSideBar } from "../../components/Chauffeur/ShowDriverSideBar";
import { MobileMenu } from "../../components/Menu/MobileMenu";
import { Tabs } from "../../components/Widget/Tab";
import { getDriverPieces, getMoreDrivers } from "../../redux/store/driver";

export const Chauffeur = () => {

    const [openSide, setOpenSide] = useState(false);
    const [openSideUpdate, setOpenSideUpdate] = useState(false);
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState();
    const [openSidebarModal, setOpenSidebarModal] = useState(false);
    const [search, setSearch] = useState();
    const [active, setActive] = useState({ index: 0, value: 'EN_COURS' });

    const [userInfo, setUserInfo] = useState({
        nom: "",
        prenoms: "",
        email: "",
        telephone: "",
    });
    const driver = useSelector((state) => state.driver.driverListe);
    const loading = useSelector((state) => state.driver.loading);

    useEffect(() => {
        dispatch(getMoreDrivers({ page: 0, param: active.value, size: 10 }))
    }, [dispatch, active])


    const more = async (page) => {
        dispatch(getMoreDrivers({ page: page - 1, param: active.value, size: 10 }))
    }

    return (
        <div className="p-3 pt-7">
            <div className="flex gap-x-2 my-3">
                <button onClick={() => setOpenSide(true)} className='lg:hidden btn btn-sm'><Menu /></button>
                <h1 className="lg:text-3xl font-extrabold text-black sm:text-lg my-auto">Chauffeurs</h1>
            </div>
            <MobileMenu openSide={openSide} setOpenSide={setOpenSide} />
            <div className='relative'>

                <div className='my-3 rounded-lg'>
                    <div>
                        <div className="mt-10">
                            <div className="w-full flex items-end justify-between">
                                <div className="lg:flex [320px]:grid sm:flex md:flex items-end gap-3">
                                    <label className="form-control w-72">
                                        <div className="label">
                                            <span className="label-text text-xs font-medium -mb-1">
                                                Rechercher
                                            </span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                dispatch(getMoreDrivers({ page: 0, param: e.target.value, size: 10 }))
                                            }}
                                            type="text"
                                            placeholder="Rechercher un élément..."
                                            className="input input-bordered w-full h-10 text-sm"
                                        />
                                    </label>
                                </div>
                            </div>
                            <Tabs tabsData={status} setActive={setActive} active={active} />

                            {driver.listDriver?.length === 0 && !loading ?
                                (
                                    <div className="py-3 flex justify-center">
                                        <img src="https://www.agencija-corrigo.com/build/images/background/no-results-bg.2d2c6ee3.png" height={350} width={250} alt="" />
                                    </div>
                                ) : !loading && driver.listDriver.length !== 0 ? (
                                    <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                                        {driver.listDriver?.map((item, index) => (
                                            <DriverCard key={index} click={() => {
                                                setOpenSideUpdate(true)
                                                setRowData(item)
                                                dispatch(getDriverPieces(item.id))
                                            }} item={item} />
                                        ))}

                                    </div>
                                ) : <LoadingDriver />}
                            {
                                loading ? null : (
                                    <div className='my-3 flex justify-end'>
                                        <Pagination onChange={(event, newValue) => more(newValue)}
                                            onSelect={selectedPage => more(selectedPage)} count={driver.totalPages} variant="outlined" color='primary' shape="rounded" />
                                    </div>
                                )
                            }

                        </div>
                        <ShowDriverSideBar openSide={openSideUpdate} setOpenSide={setOpenSideUpdate} data={rowData} action={() => dispatch(getMoreDrivers({ page: 0, param: '', size: 10 }))
                        } />

                        <Drawer
                            anchor={"right"}
                            open={openSidebarModal}
                            onClose={() => setOpenSidebarModal((prev) => !prev)}
                        >
                            <div className="w-[450px] h-full p-4 relative">
                                <p className="text-lg text-black font-extrabold">
                                    {!userInfo.nom ? "Ajouter un nouveau client" : "Modifier ce client"}
                                </p>
                                <div className="mt-5">
                                    <div className="flex flex-col items-start gap-y-3">
                                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                                            <UserRound />
                                        </div>
                                        <button className="bg-gray-100 text-gray-600 h-8 w-fit px-3 rounded-lg text-sm font-semibold">
                                            Choisir une photo
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-x-3 mt-4">
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text text-xs font-medium -mb-1">
                                                    Nom
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Nom client"
                                                className="input input-bordered w-full h-10 font-medium"
                                            />
                                        </label>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text text-xs font-medium -mb-1">
                                                    Prénoms
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Prénoms client"
                                                className="input input-bordered w-full h-10 font-medium"
                                            />
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3 mt-4">
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text text-xs font-medium -mb-1">
                                                    Téléphone
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="0700000000"
                                                className="input input-bordered w-full h-10 font-medium"
                                            />
                                        </label>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text text-xs font-medium -mb-1">
                                                    Email
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="email@xyz.com"
                                                className="input input-bordered w-full h-10 font-medium"
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="w-full absolute bottom-5 left-0 px-4 flex items-center gap-x-3 mt-4">
                                    <button className="w-full h-10 bg-gray-200 text-sm text-gray-600 font-semibold flex items-center justify-center rounded-lg">
                                        Annuler
                                    </button>
                                    <button className="w-full h-10 bg-orange-600 text-sm text-white font-semibold flex items-center justify-center rounded-lg">
                                        Enregistrer
                                    </button>
                                </div>
                            </div>
                        </Drawer>
                    </div>
                </div>

            </div>

        </div >
    )
}
