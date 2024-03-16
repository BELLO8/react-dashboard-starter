import { Drawer, Pagination, Skeleton } from "@mui/material";
import { ArrowUpRight, MoreHorizontal, UserRound } from "lucide-react";
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { AddPartnerSidebar } from '../../components/Partenaire/AddPartnerSidebar';
import { UpdatePartnerSidebar } from "../../components/Partenaire/UpdatePartnerSidebar";
import { getAllPartner } from "../../redux/store/partner";
import { disablePartner } from "../../services/PartenaireService";

export const Partenaire = () => {

    const [openSide, setOpenSide] = useState(false);
    const [openSideUpdate, setOpenSideUpdate] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [idPartner, setIdPartner] = useState();
    const [rowData, setRowData] = useState();
    const [openSidebarModal, setOpenSidebarModal] = useState(false);
    const [search, setSearch] = useState();
    const [userInfo, setUserInfo] = useState({
        nom: "",
        prenoms: "",
        email: "",
        telephone: "",
    });
    const partner = useSelector((state) => state.partner.partner);
    const loading = useSelector((state) => state.customer.isloading);

    useEffect(() => {
        dispatch(getAllPartner({ page: 0, param: '', size: 10 }))
    }, [dispatch])

    const toggleDrawer = (newOpen) => () => {
        setOpenSide(newOpen);
    };

    const openClientDetail = (id) => {
        navigate(`/detail-partenaire/${id}`);
    };

    const handleDisableAccount = () => {
        disablePartner(idPartner).then((res) => {
            if (res.status === 200) {
                dispatch(getAllPartner({ page: 0, param: '', size: 10 }))
                toast.success('Compte desactivé')
            }
        }).catch((err) => {

        })
    }
    return (
        <div className="p-3 pt-7">
            <div className='relative'>
                <h1 className="text-3xl font-extrabold text-black">Partenaires</h1>
                <div className='absolute inset-y-0 right-4 top-3'>
                    <button onClick={toggleDrawer(true)} className="btn btn-sm bg-[#04356B] rounded-md text-white text-xs hover:bg-gray-900" >
                        Ajouter un partenaire
                    </button>
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
                                        <select className="select select-bordered custom-select w-full h-10 font-semibold">
                                            <option disabled selected>
                                                Staut d'activié
                                            </option>
                                            <option>Actif</option>
                                            <option>Inactif</option>
                                        </select>
                                    </label>
                                    <button onClick={() => {
                                        dispatch(getAllPartner({ page: 0, param: search, size: 10 }))
                                    }} className="btn btn-sm w-fit h-10 px-4 rounded-md bg-main text-white text-sm font-semibold">
                                        Rechercher
                                    </button>
                                </div>
                            </div>
                            {partner.partenaires?.length === 0 || partner.length === 0 ?
                                (<div className="py-3">
                                    <p>Aucune donnée</p>
                                </div>) : null}
                            <div className="mt-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
                                {partner.partenaires?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="relative w-48 lg:w-56 h-fit rounded-lg shadow bg-white p-4 pb-6"
                                    >
                                        {
                                            loading ? '' : (<div className="dropdown dropdown-end absolute right-2 top-2">
                                                <div
                                                    tabIndex={0}
                                                    role="button"
                                                    className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50"
                                                >
                                                    <MoreHorizontal size={20} />
                                                </div>
                                                <ul
                                                    tabIndex={0}
                                                    className="mt-1 dropdown-content z-[1] menu p-2 border shadow bg-base-100 rounded-lg w-44"
                                                >
                                                    <button
                                                        className="bg-white hover:bg-gray-100 text-gray-600 font-semibold h-9 w-full flex items-center justify-start rounded-lg px-3"
                                                        onClick={() => setOpenSideUpdate(true)}
                                                    >
                                                        Modifer
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setIdPartner(item.id);
                                                            document.getElementById("disable_client").showModal()
                                                        }
                                                        }
                                                        className="bg-white hover:bg-red-600 text-black hover:text-white font-semibold h-9 w-full flex items-center justify-start rounded-lg px-3"
                                                    >
                                                        Désactiver
                                                    </button>
                                                </ul>
                                            </div>)
                                        }


                                        {
                                            loading ? (
                                                <Skeleton className="mx-auto mt-5 flex items-center justify-center" animation='wave' variant="circular" width={80} height={80} />
                                            ) : (
                                                <div className="bg-gray-200 rounded-full w-20 h-20 mx-auto mt-5 flex items-center justify-center">
                                                    <UserRound />
                                                </div>)
                                        }

                                        <h1 className="text-lg text-black text-center font-bold mt-2 truncate">
                                            {loading ? (
                                                <Skeleton className="mx-auto mt-5 flex items-center justify-center" animation='wave' variant="text" width={190} />
                                            ) : item.nom + " " + item.prenoms}
                                        </h1>
                                        <p className="text-sm text-gray-500 text-center font-medium">
                                            {loading ? (
                                                <Skeleton className="mx-auto mt-5 flex items-center justify-center" animation='wave' variant="text" width={80} />
                                            ) : item.numero}
                                        </p>
                                        <p className="text-xs text-gray-500 text-center font-medium">
                                            {loading ? (
                                                <Skeleton className="mx-auto mt-5 flex items-center justify-center" animation='wave' variant="text" width={80} />
                                            ) : item.enabled ? 'Compte actif' : 'Compte inactif'}
                                        </p>
                                        {loading ? (
                                            <Skeleton className="mx-auto mt-5 flex items-center justify-center" animation='wave' variant="rounded" width={180} height={30} />
                                        ) : (
                                            <button
                                                className="bg-main/10 w-full h-8 text-xs text-main font-semibold rounded-lg flex items-center justify-center mt-4"
                                                onClick={() => openClientDetail(item.id)}
                                            >
                                                Détail partenaire <ArrowUpRight size={17} />
                                            </button>
                                        )}

                                    </div>
                                ))}

                            </div>
                            <div className='my-3 flex justify-end'>
                                <Pagination count={partner.totalPages} variant="outlined" color='primary' shape="rounded" />
                            </div>
                        </div>
                        <UpdatePartnerSidebar openSide={openSideUpdate} setOpenSide={setOpenSideUpdate} data={rowData} />

                        {/* MODAL DESACTIVATION COMPTE UTILISATEUR */}
                        <dialog id="disable_client" className="modal">
                            <div className="modal-box rounded-lg">
                                <h3 className="font-extrabold text-xl text-red-600 text-center">
                                    Attention
                                </h3>
                                <p className="pt-4 text-center text-black font-medium">
                                    Cette action désactivera les accès du partenaire à son compte.
                                </p>
                                <div className="modal-action">
                                    <form
                                        method="dialog"
                                        className="w-full flex items-center justify-center gap-x-4"
                                    >
                                        <button className="bg-gray-100 text-gray-600 w-fit h-10 px-4 rounded-md flex items-center justify-center font-semibold">
                                            Annuler
                                        </button>
                                        <button onClick={handleDisableAccount} className="bg-red-600 text-white w-fit h-10 px-4 rounded-md flex items-center justify-center font-semibold">
                                            Désactiver
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </dialog>

                        {/* SIDEBAR MODAL */}
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
