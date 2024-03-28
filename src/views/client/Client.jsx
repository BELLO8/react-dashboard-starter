import { Drawer, Pagination } from "@mui/material";
import { MoreHorizontal, UserRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../Utils/constant";
import { LoadingPatner } from "../../components/Partenaire/LoadingPatner";
import { getAllCustomer } from "../../redux/store/customer";
import { disableAccount } from "../../services/CustomerService";


export const Client = () => {
    const [openSidebarModal, setOpenSidebarModal] = useState(false);
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        nom: "",
        prenoms: "",
        email: "",
        telephone: "",
    });
    const [search, setSearch] = useState();
    const [idCustomer, setIdCustomer] = useState();
    const customer = useSelector((state) => state.customer.customer);
    const loading = useSelector((state) => state.customer.loading);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        dispatch(getAllCustomer({ page: 0, param: '', size: 10 }))

    }, [dispatch])

    const openModalCreateEditUser = (user) => {
        setOpenSidebarModal(true);
        if (user) {
            setUserInfo(user);
        } else {
            setUserInfo({
                nom: "",
                prenoms: "",
                email: "",
                telephone: "",
            });
        }
    };

    const handleDisableAccount = () => {
        disableAccount(idCustomer).then((res) => {
            if (res.status === 200) {
                dispatch(getAllCustomer({ page: 0, param: '', size: 10 }))
                toast.success('Compte desactivé')
            }
        }).catch((err) => {

        })
    }

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        if (scrollY + windowHeight >= documentHeight - 100) {
            setCurrentPage(currentPage + 1)
            if (currentPage <= customer.totalPages - 1) {
                dispatch(getAllCustomer({ page: currentPage, param: '', size: 5 }))
            } else {

                console.log(currentPage);
            }

        }
    };

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };


    // }, [dispatch, currentPage]);

    return (
        <div className="p-3 pt-7">
            <h1 className="text-3xl font-extrabold text-black">Clients</h1>
            <div className="mt-10">
                <div className="w-full flex items-end justify-between">
                    <div className="flex items-end gap-x-3">
                        <label className="form-control w-80">
                            <div className="label">
                                <span className="label-text text-xs font-medium -mb-1">
                                    Rechercher
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher un élément..."
                                className="input input-bordered w-full h-10 text-sm"
                                onChange={(e) => { setSearch(e.target.value) }}
                            />
                        </label>
                        {/* <label className="form-control w-44">
                            <div className="label">
                                <span className="label-text text-xs font-medium -mb-1">
                                    Statut
                                </span>
                            </div>
                            <select onChange={(e) => {
                                dispatch(getAllCustomer({ page: 0, param: e.target.value, size: 10 }))
                            }} className="select select-bordered custom-select w-full h-10 ">
                                <option disabled selected>
                                    Staut d'activié
                                </option>
                                <option value=''>Actif</option>
                                <option value=''>Inactif</option>
                            </select>
                        </label> */}
                        <button onClick={() => {
                            dispatch(getAllCustomer({ page: 0, param: search, size: 10 }))
                        }} className="btn btn-sm w-fit h-10 px-4 rounded-lg bg-main text-white text-sm font-semibold">
                            Rechercher
                        </button>
                    </div>
                    <div>
                        {/* <button
                            className="w-fit h-10 px-4 rounded-lg bg-orange-600 text-white text-sm font-semibold"
                            onClick={() => openModalCreateEditUser()}
                        >
                            Ajouter un client
                        </button> */}
                    </div>
                </div>
                {customer.clients?.length === 0 || (customer.length === 0 && !loading) ?
                    (
                        <div className="py-3 flex justify-center">
                            <img src="https://www.agencija-corrigo.com/build/images/background/no-results-bg.2d2c6ee3.png" height={200} width={200} alt="" srcset="" />
                        </div>
                    ) : !loading && customer?.clients.length !== 0 ? (

                        <div className="mt-7 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
                            {customer.clients?.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="relative w-full h-fit rounded-lg shadow bg-white p-3 pb-5"
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
                                                onClick={() => openModalCreateEditUser({})}
                                            >
                                                Modifer
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIdCustomer(item.id)
                                                    document.getElementById("disable_client").showModal()
                                                }
                                                }
                                                className="bg-white hover:bg-red-600 text-black hover:text-white font-semibold h-9 w-full flex items-center justify-start rounded-lg px-3"
                                            >
                                                Désactiver
                                            </button>
                                        </ul>
                                    </div>
                                    <NavLink to={`/detail-client/${item.id}`} >
                                        <div className="bg-gray-200 rounded-full w-16 h-16 mx-auto mt-5 flex items-center justify-center">
                                            <img
                                                src={item.photo != null ? `${BASE_URL}/webfree/partenaire/fichier/${item.photo.id}` : `https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg`}
                                                alt=""
                                                className="rounded-full"
                                            />

                                        </div>
                                        <h1 className="text-base text-black text-center font-bold mt-2 truncate">
                                            {
                                                item.nom + " " + item.prenoms
                                            }
                                        </h1>
                                        <p className="text-sm text-gray-500 text-center font-medium">
                                            {
                                                "+225 " + item.numero
                                            }
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400 text-center font-medium">
                                            {
                                                "Inscrit le: " + new Date(item?.dateCreation).toLocaleString()
                                            }
                                        </p>
                                        <p className="text-sm text-gray-500 text-center font-medium">
                                            {item.enabled ? 'Compte actif' : 'Compte inactif'}
                                        </p>
                                        <div className="mt-4 w-full h-9 rounded-lg bg-green-50 flex items-center justify-center gap-x-2 px-2">

                                            <p className="text-base text-green-600 font-extrabold">{item?.nombreCourseEffectuees}</p>
                                            <p className="text-xs font-medium truncate">
                                                Courses effectuées
                                            </p>
                                        </div>

                                    </NavLink>
                                </div>
                            ))}
                        </div>
                    ) :
                        <LoadingPatner />}
                {
                    loading ? null : (
                        <div className='my-3 flex justify-end'>
                            <Pagination count={customer.totalPages} variant="outlined" color='primary' shape="rounded" />
                        </div>
                    )
                }

            </div>

            {/* MODAL DESACTIVATION COMPTE UTILISATEUR */}
            <dialog id="disable_client" className="modal">
                <div className="modal-box max-w-md rounded-lg">
                    <h3 className="font-extrabold text-xl text-red-600 text-center">
                        Attention
                    </h3>
                    <p className="pt-4 text-center text-black font-medium">
                        Cette action désactivera les accès du client à son compte.
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
                        <button className="w-full h-10 bg-main text-sm text-white font-semibold flex items-center justify-center rounded-lg">
                            Enregistrer
                        </button>
                    </div>
                </div>
            </Drawer>

        </div>
    );
};
