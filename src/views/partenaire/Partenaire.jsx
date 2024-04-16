import { Pagination } from "@mui/material";
import { ArrowUpRight, Menu, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { status } from "../../Utils/Utils";
import { BASE_URL } from "../../Utils/constant";
import { MobileMenu } from "../../components/Menu/MobileMenu";
import { AddPartnerSidebar } from '../../components/Partenaire/AddPartnerSidebar';
import { LoadingPatner } from "../../components/Partenaire/LoadingPatner";
import { ShowPartnerSideBar } from "../../components/Partenaire/ShowPartnerSideBar";
import { UpdatePartnerSidebar } from "../../components/Partenaire/UpdatePartnerSidebar";
import { Tabs } from "../../components/Widget/Tab";
import { document, getAllPartner } from "../../redux/store/partner";
import { disablePartner } from "../../services/PartenaireService";

export const Partenaire = () => {

    const [openSide, setOpenSide] = useState(false);
    const [openSideUpdate, setOpenSideUpdate] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [idPartner, setIdPartner] = useState();
    const [rowData, setRowData] = useState();
    const [openSidebarModal, setOpenSidebarModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false)
    const [active, setActive] = useState({ index: 0, value: 'EN_COURS' });

    const partner = useSelector((state) => state.partner.partner);
    const loading = useSelector((state) => state.partner.isloading);

    useEffect(() => {
        dispatch(getAllPartner({ page: 0, param: active.value, size: 10 }))
    }, [dispatch, active])

    const toggleDrawer = (newOpen) => () => {
        setOpenSide(newOpen);
    };

    const openClientDetail = (id) => {
        navigate(`/detail-partenaire/${id}`);
    };

    const handleDisableAccount = () => {
        disablePartner(idPartner).then((res) => {
            if (res.status === 200) {
                dispatch(getAllPartner({ page: 0, param: active.value, size: 10 }))
                toast.success('Compte desactivé')
            }
        }).catch((err) => {

        })
    }

    const more = async (page) => {
        dispatch(getAllPartner({ page: page - 1, param: active.value, size: 10 }))
    }

    return (
        <div className="p-3 pt-7">
            <div className="flex gap-x-2 my-3">
                <button onClick={() => setShowMenu(true)} className='lg:hidden btn btn-sm'><Menu /></button>
                <h1 className="lg:text-3xl font-extrabold text-black sm:text-lg my-auto">Partenaires</h1>
                <div className='absolute right-4 my-auto'>
                    <button onClick={toggleDrawer(true)} className="btn btn-sm bg-[#04356B] rounded-md text-white text-xs hover:bg-gray-900" >
                        Ajouter un partenaire
                    </button>
                    <AddPartnerSidebar openSide={openSide} setOpenSide={setOpenSide} />
                </div>
            </div>
            <MobileMenu openSide={showMenu} setOpenSide={setShowMenu} />
            <div className='relative'>


                <div className='my-3 rounded-lg'>
                    <div>
                        <div className="mt-10">
                            <div className="w-full flex items-end justify-between">
                                <div className="lg:flex [320px]:grid sm:flex md:flex items-end gap-x-3">
                                    <label className="form-control w-80">
                                        <div className="label">
                                            <span className="label-text text-xs font-medium -mb-1">
                                                Rechercher
                                            </span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                dispatch(getAllPartner({ page: 0, param: e.target.value, size: 10 }))
                                            }}
                                            type="text"
                                            placeholder="Rechercher un élément..."
                                            className="input input-bordered w-full h-10 text-sm"
                                        />
                                    </label>

                                </div>
                            </div>
                            <Tabs tabsData={status} setActive={setActive} active={active} />

                            {partner.partenaires?.length === 0 || (partner.length === 0 && !loading) ?
                                (
                                    <div className="py-3 flex justify-center">
                                        <img src="https://www.agencija-corrigo.com/build/images/background/no-results-bg.2d2c6ee3.png" height={350} width={250} alt="" />
                                    </div>
                                ) : !loading && partner.partenaires?.length !== 0 ? (
                                    <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                                        {partner.partenaires?.map((item, index) => (
                                            <div
                                                key={index}
                                                className="relative h-fit rounded-lg shadow bg-white p-4 pb-6"
                                            >
                                                <div className="dropdown dropdown-end absolute right-2 top-2">
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
                                                            {
                                                                item.enabled ? 'Désactiver' : 'Activer'
                                                            }
                                                        </button>
                                                    </ul>
                                                </div>
                                                <div style={{ backgroundImage: `url("${BASE_URL}/webfree/partenaire/fichier/${item?.photo?.id}")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className="bg-gray-200 rounded-full w-20 h-20 border-2 mx-auto mt-5 flex items-center justify-center">
                                                </div>
                                                <h1 className="text-lg text-black text-center font-bold mt-2 truncate">
                                                    {item.nom + " " + item.prenoms}
                                                </h1>
                                                <p className="text-sm text-gray-500 text-center font-medium">
                                                    {item.numero}
                                                </p>
                                                <p className="text-xs  text-gray-500 text-center font-medium">
                                                    <div className="flex justify-center space-x-1">
                                                        <p>Status du compte : </p>
                                                        <p className={item.statusEnregistrement === 'TERMINE' ? 'text-green-500 font-bold' : 'text-orange-500 font-bold'}>{item.statusEnregistrement === 'TERMINE' ? 'validé' : item.statusEnregistrement === 'EN_COURS' ? 'en cours' : 'Rejeté'}</p>
                                                    </div>
                                                </p>

                                                {
                                                    item.statusEnregistrement === 'EN_COURS' || item.statusEnregistrement === 'REJETER' ? (
                                                        <button
                                                            className="btn btn-sm bg-main/10 w-full h-8 text-xs text-main font-semibold rounded-lg flex items-center justify-center mt-4"
                                                            onClick={() => {
                                                                dispatch(document(item.id))
                                                                setOpenSidebarModal(true)
                                                                setRowData(item)
                                                            }}
                                                        >
                                                            Validation du compte
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn btn-sm bg-main/10 w-full h-8 text-xs text-main font-semibold rounded-lg flex items-center justify-center mt-4"
                                                            onClick={() => openClientDetail(item.id)}
                                                        >
                                                            Détail partenaire <ArrowUpRight size={17} />
                                                        </button>
                                                    )
                                                }

                                            </div>
                                        ))}

                                    </div>

                                ) : (
                                    <LoadingPatner />
                                )
                            }

                            {
                                loading ? null : (
                                    <div className='my-3 flex justify-end'>
                                        <Pagination onChange={(event, newValue) => more(newValue)}
                                            onSelect={selectedPage => more(selectedPage)} count={partner.totalPages} variant="outlined" color='primary' shape="rounded" />
                                    </div>
                                )
                            }

                        </div>
                        <UpdatePartnerSidebar openSide={openSideUpdate} setOpenSide={setOpenSideUpdate} data={rowData} />
                        <ShowPartnerSideBar openSide={openSidebarModal} setOpenSide={setOpenSidebarModal} data={rowData} />

                        {/* MODAL DESACTIVATION COMPTE UTILISATEUR */}
                        <dialog id="disable_client" className="modal">
                            <div className="modal-box rounded-lg">
                                <h3 className="font-extrabold text-xl text-red-600 text-center">
                                    Attention
                                </h3>
                                <p className="pt-4 text-center text-black font-medium">
                                    Voulez vous vraiment effectuer cette action ?
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
                                            Confirmer
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </dialog>

                    </div>
                </div>

            </div>

        </div >
    )
}
