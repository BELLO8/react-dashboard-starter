import { Drawer, Skeleton } from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../Utils/constant';
import { getCars } from '../redux/store/car';
import { changerStatus } from '../services/CarService';

export const ShowCarSideBar = ({ setOpenSide, openSide, id, status }) => {

    const [raison, setRaison] = useState();
    const dispatch = useDispatch();
    const carImages = useSelector((state) => state.car.carFiles);
    const isloading = useSelector((state) => state.car.fileLoading);

    return (
        <>
            <Drawer open={openSide} onClose={() => setOpenSide(false)} anchor='right'>
                <div className='bg-white w-[380px] px-8'>
                    <div>
                        <p className='text-md font-semibold'>Liste des photos du vehicule</p>
                        {
                            carImages === "" ? 'Aucun fichier pour ce vehicule' : null
                        }



                        {
                            isloading ? (
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
                                            dispatch(getCars({ page: 0, param: '', size: 10 }))
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
