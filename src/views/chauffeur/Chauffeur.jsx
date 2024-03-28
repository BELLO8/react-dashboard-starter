import { Drawer, Pagination } from "@mui/material";
import { ArrowUpRight, Phone, UserRound } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../Utils/constant";
import { LoadingDriver } from "../../components/Chauffeur/LoadingDriving";
import { ShowDriverSideBar } from "../../components/Chauffeur/ShowDriverSideBar";
import { AddPartnerSidebar } from '../../components/Partenaire/AddPartnerSidebar';
import { getDriverPieces, getMoreDrivers } from "../../redux/store/driver";

export const Chauffeur = () => {

    const [openSide, setOpenSide] = useState(false);
    const [openSideUpdate, setOpenSideUpdate] = useState(false);
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState();
    const [openSidebarModal, setOpenSidebarModal] = useState(false);
    const [search, setSearch] = useState();
    const [userInfo, setUserInfo] = useState({
        nom: "",
        prenoms: "",
        email: "",
        telephone: "",
    });
    const driver = useSelector((state) => state.driver.driverListe);
    const loading = useSelector((state) => state.driver.loading);

    useEffect(() => {
        dispatch(getMoreDrivers({ page: 0, param: '', size: 10 }))
    }, [dispatch])


    const more = async (page) => {
        dispatch(getMoreDrivers({ page: page - 1, param: '', size: 10 }))
    }

    return (
        <div className="p-3 pt-7">
            <div className='relative'>
                <h1 className="text-3xl font-extrabold text-black">Chauffeurs</h1>
                <div className='absolute inset-y-0 right-4 top-3'>
                    {/* <button onClick={toggleDrawer(true)} className="btn btn-sm bg-[#04356B] rounded-md text-white text-xs hover:bg-gray-900" >
                        Ajouter un chauffeur
                    </button> */}
                    <AddPartnerSidebar openSide={openSide} setOpenSide={setOpenSide} />
                </div>

                <div className='my-3 rounded-lg'>
                    <div>
                        <div className="mt-10">
                            <div className="w-full flex items-end justify-between">
                                <div className="flex items-end gap-x-3">
                                    <label className="form-control w-72">
                                        <div className="label">
                                            <span className="label-text text-xs font-medium -mb-1">
                                                Rechercher
                                            </span>
                                        </div>
                                        <input
                                            onChange={(e) => setSearch(e.target.value)}
                                            type="text"
                                            placeholder="Rechercher un élément..."
                                            className="input input-bordered w-full h-10 text-sm"
                                        />
                                    </label>
                                    <label className="form-control w-44">
                                        <div className="label">
                                            <span className="label-text text-xs font-medium -mb-1">
                                                Statut
                                            </span>
                                        </div>
                                        <select onChange={(e) => {
                                            dispatch(getMoreDrivers({ page: 0, param: e.target.value, size: 10 }))
                                        }} className="select select-bordered custom-select w-full h-10 ">
                                            <option disabled selected>
                                                Status
                                            </option>
                                            <option value='EN_COURS'>En cours</option>
                                            <option value='TERMINE'>Validé</option>
                                        </select>
                                    </label>
                                    <button onClick={() => {
                                        dispatch(getMoreDrivers({ page: 0, param: search, size: 10 }))
                                    }} className="btn btn-sm w-fit h-10 px-4 rounded-md bg-main text-white text-sm font-semibold">
                                        Rechercher
                                    </button>
                                </div>
                            </div>
                            {driver.length === 0 && !loading ?
                                (
                                    <div className="py-3 flex justify-center">
                                        <img src="https://www.agencija-corrigo.com/build/images/background/no-results-bg.2d2c6ee3.png" height={350} width={250} alt="" />
                                    </div>
                                ) : !loading && driver.listDriver.length !== 0 ? (
                                    <div className="mt-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
                                        {driver.listDriver?.map((item, index) => (
                                            <div
                                                key={index}
                                                className="relative h-fit rounded-lg border-2 border-dashed bg-white p-4 pb-6"
                                            >
                                                <div className="dropdown dropdown-end absolute right-2 top-2">
                                                    <div
                                                        role="button"
                                                        className=" rounded-full flex items-center justify-center bg-gray-100"
                                                    >
                                                        <p className="px-2 text-xs text-gray-500 text-center font-semibold">
                                                            {
                                                                item.point + ' points'
                                                            }
                                                        </p>
                                                    </div>

                                                </div>

                                                <div style={{ backgroundImage: `url("${BASE_URL}/webfree/partenaire/fichier/${item?.fichier?.id}")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className="bg-gray-200 rounded-full w-20 h-20 border-2 mx-auto mt-5 flex items-center justify-center">
                                                </div>
                                                <h1 className="text-sm text-indigo-900 text-center font-bold mt-2 mb-1 truncate">
                                                    {
                                                        item.nom + ' ' + item.prenoms
                                                    }
                                                </h1>
                                                <p className="text-xs  text-gray-500 text-center font-medium">
                                                    <div className="flex justify-center space-x-1">
                                                        <Phone size={12} />
                                                        <p>{item.numero}</p>
                                                    </div>
                                                </p>
                                                <p className="text-xs  text-gray-500 text-center font-medium">
                                                    <div className="flex justify-center space-x-1">
                                                        <p>Status du compte : </p>
                                                        <p className={item.statusEnregistrement === 'TERMINE' ? 'text-green-500 font-bold' : 'text-orange-500 font-bold'}>{item.statusEnregistrement === 'TERMINE' ? 'validé' : item.statusEnregistrement === 'EN_COURS' ? 'en cours' : 'Rejeté'}</p>
                                                    </div>
                                                </p>
                                                <div
                                                    className="cursor-pointer bg-gray-100 w-full h-8 text-xs text-main font-semibold rounded-lg flex items-center justify-center mt-4"
                                                    onClick={() => {
                                                        setOpenSideUpdate(true)
                                                        setRowData(item)
                                                        dispatch(getDriverPieces(item.id))
                                                    }}
                                                >
                                                    Details du chauffeur <ArrowUpRight size={17} />
                                                </div>

                                            </div>
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
                        <ShowDriverSideBar openSide={openSideUpdate} setOpenSide={setOpenSideUpdate} data={rowData} />

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
