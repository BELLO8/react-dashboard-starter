import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { LoadingCar } from "../../components/categorie/LoadingCar";
import { getCategory } from "../../redux/store/categoryCar";
import { editCarCategoryDescription } from "../../services/CarCategory";

export const ListeCategorieVehicule = () => {
    const [openSide, setOpenSide] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [categorieInfo, setCategorieInfo] = useState(null);
    const [description, setDescription] = useState();
    const [id, setId] = useState();
    const carCategory = useSelector((state) => state.categoryCar.categoryCar);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.categoryCar.loading);

    useEffect(() => {
        dispatch(getCategory({ page: 0, param: '', size: 10 }))
    }, [dispatch])


    const more = async (page) => {
        dispatch(getCategory({ page: page, param: '', size: 10 }))
    }

    return (
        <div className="p-3 pt-7">
            <h1 className="text-3xl font-extrabold text-black">
                Catégories de véhicule
            </h1>

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
                            />
                        </label>
                        <button className="w-fit h-10 px-4 rounded-lg bg-main text-white text-sm font-semibold">
                            Rechercher
                        </button>
                    </div>
                    <div>
                        {/* <button
                            className="w-fit h-10 px-4 rounded-lg bg-main text-white text-sm font-semibold"
                            onClick={() => document.getElementById('create_categorie').showModal()}
                        >
                            Ajouter une catégorie
                        </button> */}
                    </div>
                </div>
            </div>
            <div className="mt-5 bg-white rounded-lg p-3">
                {carCategory.length === 0 && !loading ?
                    (
                        <div className="py-3 flex justify-center">
                            <img src="https://www.agencija-corrigo.com/build/images/background/no-results-bg.2d2c6ee3.png" height={350} width={250} alt="" srcset="" />
                        </div>
                    ) : !loading && carCategory?.categoriesVehicule.length !== 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                            {
                                carCategory?.categoriesVehicule?.map((item, index) => (
                                    <div key={index} className='bg-gray-50 border border-dashed rounded-lg'>
                                        <div onClick={() => {
                                            setCategorieInfo(item)
                                            setId(item.id)
                                            setDescription(item.description)
                                            document.getElementById(`create_categorie${index}`).showModal()
                                        }}
                                            className='cursor-pointer mx-2 my-4  rounded-lg pr-8 flex'>

                                            <div className="md:w-96 rounded bg-orange-300" >

                                            </div>


                                            <div className='mx-2 space-y-1'>
                                                <p className='text-sm font-semibold truncate'>
                                                    {
                                                        item.designation
                                                    }
                                                </p>
                                                <p className='text-xs truncate w-48'>
                                                    {
                                                        item.description
                                                    }
                                                </p>
                                                <p className='text-xs text-gray-300 font-semibold bg-blue-100 text-indigo-800 rounded-md px-2 w-fit'>
                                                    {
                                                        item.prixParKilometrage + ' Fr'
                                                    }

                                                </p>
                                            </div>
                                        </div>
                                        <dialog id={`create_categorie${index}`} className="modal">
                                            <div className="modal-box rounded-lg max-w-md">
                                                <h3 className="font-bold text-lg text-black">
                                                    {categorieInfo === null
                                                        ? "Ajouter une catégorie"
                                                        : "Modifier cette catégorie"}
                                                </h3>
                                                <form method="dialog">
                                                    <button id={`close${item.id}`} className="w-8 h-8 rounded-lg bg-red-100 absolute right-3 top-3 text-red-600 text-lg font-bold">✕</button>
                                                </form>

                                                <div className="py-4">
                                                    <label className="form-control w-full">
                                                        <div className="label">
                                                            <span className="label-text text-sm font-semibold">Designation</span>
                                                        </div>
                                                        <input type="text" disabled defaultValue={categorieInfo?.designation} placeholder="Désignation de la catégorie" className="input input-bordered w-full h-12 font-medium" />
                                                    </label>
                                                    <label className="form-control w-full mt-2">
                                                        <div className="label">
                                                            <span className="label-text text-sm font-semibold">Description</span>
                                                        </div>
                                                        <textarea onChange={(e) => setDescription(e.target.value)} className="textarea textarea-bordered" defaultValue={categorieInfo?.description}>

                                                        </textarea>
                                                    </label>
                                                </div>

                                                <div className="modal-action">
                                                    <button onClick={() => {
                                                        editCarCategoryDescription(id, description).then((res) => {
                                                            if (res.status === 200) {
                                                                document.getElementById(`close${item.id}`).click()
                                                                dispatch(getCategory({ page: 0, param: '', size: 10 }))
                                                                toast.success('Description modifiée ')
                                                            }
                                                        })
                                                    }} className="btn btn-md bg-blue-900 text-white hover:bg-blue-900">Modifier</button>
                                                </div>
                                            </div>
                                        </dialog>

                                    </div>
                                ))
                            }
                        </div>
                    ) : <LoadingCar />}

                {
                    loading ? null :
                        <div className="my-3 flex justify-end">
                            <Pagination
                                count={carCategory.totalPages}
                                variant="outlined"
                                color="primary"
                                shape="rounded"
                                onChange={(event, newValue) => more(newValue)}
                                onSelect={selectedPage => more(selectedPage)}
                            />
                        </div>
                }

            </div>

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
