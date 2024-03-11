import { Pagination, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import EditPenIcon from "./../../assets/icons/pen.svg";
import TrashIcon from "./../../assets/icons/trash.svg";

export const ListeCategorieVehicule = () => {
    const [openSide, setOpenSide] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [categorieInfo, setCategorieInfo] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, "2000")
    }, [])

    const CategorieRowElement = () => {
        return (
            <tr>
                <td className="border-b font-medium">
                    {
                        !loading ? <Skeleton animation='wave' variant='text' width={80} />
                            : "Cy Ganderton"
                    }
                </td>
                <td className="border-b font-medium">

                    {
                        !loading ? <Skeleton animation='wave' variant='text' width={80} />
                            : "Quality Control Specialist"
                    }

                </td>
                <td className="border-b">
                    {
                        !loading ? <Skeleton animation='wave' variant='text' width={80} />
                            : (<div className="flex items-center gap-x-3">
                                <div className="tooltip" data-tip="Modifier">
                                    <button className="w-7 h-7 rounded-lg bg-main/30 flex items-center justify-center" onClick={() => document.getElementById('create_categorie').showModal()}>
                                        <img src={EditPenIcon} alt="icon" className="w-5" />
                                    </button>
                                </div>
                                <div className="tooltip" data-tip="Supprimer">
                                    <button className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center" onClick={() => document.getElementById('delete_categorie').showModal()}>
                                        <img src={TrashIcon} alt="icon" className="w-5" />
                                    </button>
                                </div>
                            </div>)
                    }

                </td>
            </tr>
        );
    };

    return (
        <div className="p-3 pt-7">
            <h1 className="text-3xl font-extrabold text-black">
                Catégories de véhicule
            </h1>

            <div className="mt-10">
                <div className="w-full flex items-end justify-between">
                    <div className="flex items-end gap-x-3">
                        <label className="form-control w-60">
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
                        <button className="w-fit h-10 px-4 rounded-lg bg-main text-white text-sm font-semibold">
                            Rechercher
                        </button>
                    </div>
                    <div>
                        <button
                            className="w-fit h-10 px-4 rounded-lg bg-main text-white text-sm font-semibold"
                            onClick={() => document.getElementById('create_categorie').showModal()}
                        >
                            Ajouter une catégorie
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-5 bg-white rounded-lg">
                <div className="overflow-x-auto">
                    <table className="custom-table table table-zebr">
                        <thead>
                            <tr className="bg-gray-100 text-main h-12">
                                <th className="text-sm font-bold uppercase">Designation</th>
                                <th className="text-sm font-bold uppercase">Description</th>
                                <th className="text-sm font-bold uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[0, 1, 2, 3, 4, 5, 6].map((item, index) => (
                                <CategorieRowElement key={index} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="my-3 flex justify-end">
                    <Pagination
                        count={8}
                        variant="outlined"
                        color="primary"
                        shape="rounded"
                    />
                </div>
            </div>


            {/* MODAL CREATE CATEGORIE */}
            <dialog id="create_categorie" className="modal">
                <div className="modal-box rounded-lg max-w-md">
                    <h3 className="font-bold text-lg text-black">
                        {categorieInfo === null
                            ? "Ajouter une catégorie"
                            : "Modifier cette catégorie"}
                    </h3>
                    <form method="dialog">
                        <button className="w-8 h-8 rounded-lg bg-red-100 absolute right-3 top-3 text-red-600 text-lg font-bold">✕</button>
                    </form>

                    <div className="py-4">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-sm font-semibold">Designation</span>
                            </div>
                            <input type="text" placeholder="Désignation de la catégorie" className="input input-bordered w-full h-12 font-medium" />
                        </label>
                        <label className="form-control w-full mt-2">
                            <div className="label">
                                <span className="label-text text-sm font-semibold">Description</span>
                            </div>
                            <input type="text" placeholder="Description de la catégorie" className="input input-bordered w-full h-12 font-medium" />
                        </label>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {!addLoading ? (
                                <button className="bg-gray-200 text-sm text-gray-600 font-semibold px-4 py-2 rounded-md cursor-pointer">
                                    Annuler
                                </button>
                            ) : (
                                <button className="bg-gray-200 text-sm text-gray-600 font-semibold px-4 py-2 rounded-md pointer-events-none">
                                    Annuler
                                </button>
                            )}
                        </form>
                        {categorieInfo === null ? (
                            <div
                                disabled={addLoading}
                                className="bg-main text-white text-sm font-semibold px-4 py-2 rounded-md flex items-center justify-center cursor-pointer"
                            // onClick={ajoutNouvelUtilisateur}
                            >
                                {!addLoading ? (
                                    <span>Enregistrer</span>
                                ) : (
                                    <ThreeDots
                                        height="20"
                                        width="40"
                                        radius="9"
                                        color="#000"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClassName=""
                                        visible={addLoading}
                                    />
                                )}
                            </div>
                        ) : (
                            <div
                                disabled={addLoading}
                                className="bg-main text-white text-sm font-semibold px-4 py-2 rounded-md flex items-center justify-center cursor-pointer"
                            // onClick={modifierInfoUtilisateur}
                            >
                                {!addLoading ? (
                                    <span>Modifier</span>
                                ) : (
                                    <ThreeDots
                                        height="20"
                                        width="40"
                                        radius="9"
                                        color="#000"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClassName=""
                                        visible={addLoading}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </dialog>


            {/* MODAL SUPPRESSION CATEGORIE */}
            <dialog id="delete_categorie" className="modal">
                <div className="modal-box rounded-lg max-w-md">
                    <h3 className="font-bold text-lg text-red-600">
                        Supprimer cette catégorie
                    </h3>
                    <form method="dialog">
                        <button className="w-8 h-8 rounded-lg bg-red-100 absolute right-3 top-3 text-red-600 text-lg font-bold">✕</button>
                    </form>

                    <div className="py-4">
                        <p className="text-left font-medium">Cette action est irréversible et supprimera cette catégorie de la liste.</p>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {!addLoading ? (
                                <button className="bg-gray-200 text-sm text-gray-600 font-semibold px-4 py-2 rounded-md cursor-pointer">
                                    Annuler
                                </button>
                            ) : (
                                <button className="bg-gray-200 text-sm text-gray-600 font-semibold px-4 py-2 rounded-md pointer-events-none">
                                    Annuler
                                </button>
                            )}
                        </form>
                        <div
                            disabled={addLoading}
                            className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-md flex items-center justify-center cursor-pointer"
                        // onClick={ajoutNouvelUtilisateur}
                        >
                            {!addLoading ? (
                                <span>Supprimer</span>
                            ) : (
                                <ThreeDots
                                    height="20"
                                    width="40"
                                    radius="9"
                                    color="#000"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={addLoading}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};
