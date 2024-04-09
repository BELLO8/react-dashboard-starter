import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListAvis } from '../../redux/store/avis'

export const Avis = () => {
    const dispatch = useDispatch()
    const avis = useSelector((state) => state.avis.avis);

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
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Ajouter un avis!</h3>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-sm font-semibold">Designation</span>
                        </div>
                        <input type="text" placeholder="Entrer un avis" className="input input-bordered w-full h-12 font-medium" />
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-sm font-semibold">Nombres d'étoiles</span>
                        </div>
                        <input type="number" className="input input-bordered w-full h-12 font-medium" />
                    </label>
                    
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <div className='grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-4 '>
                {
                    avis.map((item, index) => (
                        <div key={index} className='bg-gray-50 bg-white border border-dashed shadow-sm rounded-lg'>
                            <div onClick={() => {

                            }}
                                className='cursor-pointer mx-2 my-4  rounded-lg pr-8 flex'>
                                <div className='mx-2 space-y-1'>
                                    <p className='text-sm font-semibold truncate'>
                                        {item.designation}
                                    </p>
                                    <p className='text-xs text-gray-300 font-semibold bg-blue-100 text-indigo-800 rounded-md px-2 w-fit'>
                                        {item.etoile} étoiles
                                    </p>
                                </div>
                            </div>
                            {/* <dialog id={`create_categorie${index}`} className="modal">
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
                            <label className="form-control w-full mt-2">
                                <div className="label">
                                    <span className="label-text text-sm font-semibold">Mot nouchi</span>
                                </div>
                                <textarea onChange={(e) => setNouchi(e.target.value)} className="textarea textarea-bordered" defaultValue={categorieInfo?.nouchi}>

                                </textarea>
                            </label>
                        </div>

                        <div className="modal-action">
                            <button onClick={() => {
                                editCarCategoryDescription(id, description, nouchi).then((res) => {
                                    if (res.status === 200) {
                                        document.getElementById(`close${item.id}`).click()
                                        dispatch(getCategory({ page: 0, param: '', size: 10 }))
                                        toast.success('Description modifiée ')
                                    }
                                }).catch((err) => console.log(err))

                            }} className="btn btn-md bg-blue-900 text-white hover:bg-blue-900">Modifier</button>
                        </div>
                    </div>
                </dialog> */}

                        </div>
                    ))
                }
            </div>


        </>
    )
}
