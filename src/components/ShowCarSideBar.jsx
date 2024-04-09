import { Drawer, Skeleton } from '@mui/material';
import { Phone } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../Utils/constant';
import { getCars } from '../redux/store/car';
import { changerStatus } from '../services/CarService';

export const ShowCarSideBar = ({ setOpenSide, openSide, id, status, action }) => {

    const [raison, setRaison] = useState();
    const dispatch = useDispatch();
    const carImages = useSelector((state) => state.car.carFiles);
    const isloading = useSelector((state) => state.car.fileLoading);
    const loading = useSelector((state) => state.car.driverLoading);
    const drivers = useSelector((state) => state.car.drivers)
    const documentsCar = useSelector((state) => state.car.carDocuments)

    return (
        <>
            <Drawer open={openSide} onClose={() => setOpenSide(false)} anchor='right'>
                <div className='bg-white w-[380px] px-8'>
                    <div>
                        <p className='text-sm font-semibold'>Liste des photos du vehicule</p>
                        {
                            carImages === "" || drivers === "" ? (
                                <div>
                                    <div className=" flex justify-center">
                                        <img src="https://www.agencija-corrigo.com/build/images/background/no-results-bg.2d2c6ee3.png" height={200} width={200} alt="" />
                                    </div>
                                    <p className='text-sm text-center'>Aucun fichier pour ce vehicule</p>
                                </div>
                            ) : isloading ? (
                                <div className="grid grid-cols-2 gap-1 mt-8">
                                    {
                                        [1, 2, 3, 4].map((item, index) => (
                                            <Skeleton animation='wave' variant="rounded" height={120} />
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-x-1">
                                    {
                                        carImages?.map((item, index) => (
                                            <PhotoProvider>
                                                <PhotoView key={index} src={`${BASE_URL}/webfree/partenaire/fichier/${item.id}`}>
                                                    <div>
                                                        <div style={{ backgroundImage: `url("${BASE_URL}/webfree/partenaire/fichier/${item.id}")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                                                            className="bg-gray-200 rounded-lg  h-32 border-2 mx-auto mt-5 flex items-center justify-center">
                                                            <p className='text-xs bg-white font-bold p-1 rounded'>{item.orientation}</p>
                                                        </div>
                                                    </div>
                                                </PhotoView>
                                            </PhotoProvider>
                                        ))
                                    }
                                </div>
                            )
                        }
                        <p className='mt-12 text-sm font-semibold'>Liste des documents du vehicule</p>
                        {
                            documentsCar !== "" ? (
                                <div className="grid grid-cols-2 gap-x-1">
                                    {
                                        documentsCar?.map((item, index) => (
                                            <PhotoProvider>
                                                <PhotoView key={index} src={`${BASE_URL}/webfree/partenaire/fichier/${item.id}`}>
                                                    <div>
                                                        <div style={{ backgroundImage: `url("${BASE_URL}/webfree/partenaire/fichier/${item.id}")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                                                            className="bg-gray-200 rounded-lg  h-32 border-2 mx-auto mt-5 flex items-center justify-center">
                                                            <p className='text-xs bg-white font-bold p-1 rounded'>{item.typeFichier === 'CARTE_GRISE' ? 'CARTE GRISE' : item.typeFichier === 'ASSURANCE' ? 'ASSURANCE' : ''}</p>
                                                        </div>
                                                    </div>
                                                </PhotoView>
                                            </PhotoProvider>
                                        ))
                                    }
                                </div>
                            ) : (<p className='text-sm mt-8'>Aucun document</p>)
                        }


                        <p className='mt-12 text-sm font-semibold'>Liste des chauffeurs associé à ce vehicule</p>

                        {!loading && drivers !== "" ? (
                            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6">
                                {drivers?.map((item, index) => (
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
                                    </div>
                                ))}

                            </div>
                        ) : (
                            <p className='mt-8 mx-auto text-sm'>Aucun chauffeur associé</p>
                        )}




                    </div>
                    {
                        status === 'TERMINE' || status === 'REJETER' ? null : (
                            <div className='flex space-x-1 my-12'>
                                <button onClick={() => {
                                    changerStatus(id, {
                                        "raison": "",
                                        "status": "TERMINE"
                                    }).then((res) => {
                                        if (res.status === 200) {
                                            setOpenSide(false)
                                            action()
                                            toast.success('Vehicule validé ')
                                        }
                                    })
                                }} className='btn btn-sm bg-blue-800 text-white hover:bg-blue-800'>Valider</button>
                                <button className='btn btn-sm' onClick={() => {
                                    document.getElementById('reject').showModal()

                                }}>Rejeter</button>
                            </div>
                        )
                    }


                    <dialog id="reject" className="modal">
                        <div className="modal-box">
                            <div className="rounded-lg">
                                <h3 className="font-extrabold text-xl text-red-600 text-center">
                                    Avertissement
                                </h3>
                                <p className="text-center text-gray-900 text-sm font-medium">
                                    Êtes-vous sûr de vouloir effectuer cette action.
                                </p>
                                <div className='my-3'>
                                    <label className="mb-3 text-black font-bold text-rose-800 text-xs">
                                        Nous vous demandons de nous fournir un motif supplémentaires.
                                    </label>
                                    <textarea onChange={(e) => { setRaison(e.target.value) }} className='input input-bordered w-full' cols="80" rows="10"></textarea>
                                </div>

                                <div className="modal-action">
                                    <form
                                        method="dialog"
                                        className="w-full flex items-center justify-center gap-x-4"
                                    >
                                        <button className="bg-gray-100 text-gray-600 w-fit h-10 px-4 rounded-md flex items-center justify-center font-semibold">
                                            Annuler
                                        </button>
                                        <button onClick={() => {
                                            changerStatus(id, {
                                                "raison": raison,
                                                "status": "REJETER"
                                            }).then((res) => {
                                                if (res.status === 200) {
                                                    setRaison("")
                                                    dispatch(getCars({ page: 0, param: '', size: 10 }))
                                                    toast.success('Vehicule rejeté ')
                                                }
                                            })
                                        }} className="bg-red-600 text-white w-fit h-10 px-4 rounded-md flex items-center justify-center font-semibold">
                                            Valider
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </dialog>
                </div >

            </Drawer >
        </>
    )
}
