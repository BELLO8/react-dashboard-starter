import { MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { ListAvis } from '../../redux/store/avis'
import { addAvis, deleteAvis } from '../../services/avis'

export const Avis = () => {
    const dispatch = useDispatch()
    const avis = useSelector((state) => state.avis.avis);
    const [etoile, setEtoile] = useState(null);
    const [designation, setDesignation] = useState(null);
    const [nouchi, setNouchi] = useState(null);
    const [idAvis, setIdAvis] = useState(null);

    useEffect(() => {
        dispatch(ListAvis())
    }, [dispatch])

    return (
        <>
            <div className='flex'>
                <p className='font-bold mb-4'>Liste des avis</p>
                <button onClick={() => {
                    document.getElementById('avis').showModal()
                }} className='absolute right-4 btn btn-primary btn-sm bg-indigo-900 text-white'>Ajouter un avis</button>
            </div>
            <dialog id="avis" className="modal">

                <form method="dialog" className="modal-backdrop">
                    <button id='close'>close</button>
                </form>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Ajouter un avis!</h3>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-sm font-semibold">Designation</span>
                        </div>
                        <input onChange={(e) => setDesignation(e.target.value)} type="text" placeholder="Entrer un avis" className="input input-bordered w-full h-12 font-medium" required />
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-sm font-semibold">Nombres d'étoiles</span>
                        </div>
                        <input onChange={(e) => setEtoile(e.target.value)} type="number" className="input input-bordered w-full h-12 font-medium" min={0} max={5} required />
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-sm font-semibold">Nouchi</span>
                        </div>
                        <input onChange={(e) => setNouchi(e.target.value)} type="text" className="input input-bordered w-full h-12 font-medium" min={0} max={5} required />
                    </label>

                    <div className='mt-2'>
                        <button type='submit' onClick={() => {
                            if (designation != null && etoile != null && nouchi != null) {
                                addAvis({ designation: designation, etoile: etoile, nouchi: nouchi }).then((res) => {
                                    if (res.status === 200) {
                                        document.getElementById('close').click()
                                        dispatch(ListAvis())
                                        toast.success('Avis ajouté')
                                    }
                                }).catch((err) => console.log(err))
                            }
                        }} className='btn btn-primary'>ajouter l'avis</button>
                    </div>
                </div>
            </dialog>
            <div className='relative grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-4 '>
                {
                    avis.map((item, index) => (
                        <div key={index} className='relative bg-white border border-dashed shadow-sm rounded-lg'>
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
                                    // onClick={() => openModalCreateEditUser({})}
                                    >
                                        Modifer
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIdAvis(item.id)
                                            document.getElementById(`delete${item.id}`).showModal()
                                        }
                                        }
                                        className="bg-white hover:bg-red-600 text-black hover:text-white font-semibold h-9 w-full flex items-center justify-start rounded-lg px-3"
                                    >
                                        Supprimer
                                    </button>

                                    <dialog id={`delete${item.id}`} className="modal">
                                        <div className="modal-box max-w-md rounded-lg">
                                            <h3 className="font-extrabold text-xl text-red-600 text-center">
                                                Attention
                                            </h3>
                                            <p className="pt-4 text-center text-black font-medium">
                                                Êtes-vous sûr de mener cette action ?
                                            </p>
                                            <div className="modal-action">
                                                <form
                                                    method="dialog"
                                                    className="w-full flex items-center justify-center gap-x-4"
                                                >
                                                    <button className="bg-gray-100 text-gray-600 w-fit h-10 px-4 rounded-md flex items-center justify-center font-semibold">
                                                        Annuler
                                                    </button>
                                                    <button onClick={() => {

                                                        deleteAvis(idAvis).then((res) => {
                                                            if (res.status === 200) {
                                                                dispatch(ListAvis())
                                                                toast.success('Avis supprimé')
                                                            }
                                                        }).catch((err) => {

                                                        })

                                                    }} className="bg-red-600 text-white w-fit h-10 px-4 rounded-md flex items-center justify-center font-semibold">
                                                        Supprimer
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </ul>
                            </div>
                            <div className='cursor-pointer mx-2 my-4  rounded-lg pr-8 flex'>
                                <div className='mx-2 space-y-1'>
                                    <p className='text-sm font-semibold truncate'>
                                        {item.designation}
                                    </p>
                                    <p className='text-xs font-semibold bg-blue-100 text-indigo-800 rounded-md px-2 w-fit'>
                                        {item.etoile} étoiles
                                    </p>
                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>


        </>
    )
}
