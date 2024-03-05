import { Drawer } from "@mui/material";
import React from "react";
import { useState } from "react";
import { ArrowUpRight, MoreHorizontal, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fakeClient = {
    nom: "Steve",
    prenoms: "Harvey",
    telephone: "0708080808",
    email: "steve@yxyz.com",
};

export const Client = () => {
    const navigate = useNavigate();
    const [openSidebarModal, setOpenSidebarModal] = useState(false);
    const [userInfo, setUserInfo] = useState({
        nom: "",
        prenoms: "",
        email: "",
        telephone: "",
    });

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

    const openClientDetail = (client) => {
        navigate("/detail-client");
    };

    return (
        <div>
            <h1 className="text-3xl font-extrabold text-black">Clients</h1>

            <div className="mt-10">
                <div className="w-full flex items-end justify-between">
                    <div className="flex items-end gap-x-3">
                        <label className="form-control w-44">
                            <div className="label">
                                <span className="label-text text-xs font-medium -mb-1">
                                    Rechercher
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher un élément..."
                                className="input input-bordered w-full h-10 font-semibold"
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
                        <button className="w-fit h-10 px-4 rounded-md bg-main text-white text-sm font-semibold">
                            Rechercher
                        </button>
                    </div>
                    <div>
                        <button
                            className="w-fit h-10 px-4 rounded-md bg-orange-600 text-white text-sm font-semibold"
                            onClick={() => openModalCreateEditUser()}
                        >
                            Ajouter un client
                        </button>
                    </div>
                </div>

                <div className="mt-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
                    {[0, 1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div
                            key={index}
                            className="relative w-48 lg:w-56 h-fit rounded-lg shadow bg-white p-4 pb-6"
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
                                        onClick={() => openModalCreateEditUser(fakeClient)}
                                    >
                                        Modifer
                                    </button>
                                    <button
                                        onClick={() =>
                                            document.getElementById("disable_client").showModal()
                                        }
                                        className="bg-white hover:bg-red-600 text-black hover:text-white font-semibold h-9 w-full flex items-center justify-start rounded-lg px-3"
                                    >
                                        Désactiver
                                    </button>
                                </ul>
                            </div>
                            <div className="bg-gray-200 rounded-full w-20 h-20 mx-auto mt-5 flex items-center justify-center">
                                <UserRound />
                            </div>
                            <h1 className="text-lg text-black text-center font-bold mt-2 truncate">
                                N'da Adams Aimé Désiré Yao
                            </h1>
                            <p className="text-sm text-gray-500 text-center font-medium">
                                +225 0778812111
                            </p>
                            <button
                                className="bg-main/80 w-full h-8 text-xs text-white font-semibold rounded-full flex items-center justify-center mt-4"
                                onClick={() => openClientDetail(item)}
                            >
                                Détail client <ArrowUpRight size={17} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL DESACTIVATION COMPTE UTILISATEUR */}
            <dialog id="disable_client" className="modal">
                <div className="modal-box rounded-lg">
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
                            <button className="bg-red-600 text-white w-fit h-10 px-4 rounded-md flex items-center justify-center font-semibold">
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
    );
};
