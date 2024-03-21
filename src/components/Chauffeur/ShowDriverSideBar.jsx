import { Drawer } from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../../Utils/constant';
import { getMoreDrivers } from '../../redux/store/driver';
import { changerStatus } from '../../services/Driver';

export const ShowDriverSideBar = ({ setOpenSide, openSide, data }) => {

    const [raison, setRaison] = useState();
    const dispatch = useDispatch();
    return (
        <>
            <Drawer open={openSide} onClose={() => setOpenSide(false)} anchor='right'>
                <div className='bg-white w-[380px] px-8'>
                    {/* <h1 className='text-lg font-semibold'>Info sur le chauffeur</h1> */}
                    <div style={{ backgroundImage: `url("${BASE_URL}/webfree/partenaire/fichier/${data?.fichier?.id}")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className="bg-gray-200 rounded-full w-28 h-28 border-2 mx-auto mt-5 flex items-center justify-center">

                    </div>
                    {
                        data?.statusEnregistrement === 'TERMINE' || data?.statusEnregistrement === 'REJETER' ? null : (
                            <div className='flex space-x-1 justify-center my-2'>
                                <button onClick={() => {
                                    changerStatus(data.id, {
                                        "raison": "",
                                        "status": "TERMINE"
                                    }).then((res) => {
                                        if (res.status === 200) {
                                            setOpenSide(false)
                                            dispatch(getMoreDrivers({ page: 0, param: '', size: 10 }))
                                            toast.success('Compte validé ')
                                        }
                                    })
                                }} className='btn btn-sm bg-blue-800 text-white hover:bg-blue-800'>Valider le compte</button>
                                <button className='btn btn-sm' onClick={() => {
                                    document.getElementById('reject').showModal()
                                }}>Rejeter le compte</button>
                            </div>
                        )
                    }


                    <dialog id="reject" className="modal">
                        <div className="modal-box">
                            <div className="rounded-lg">
                                <h3 className="font-extrabold text-xl text-red-600 text-center">
                                    Avertissement
                                </h3>
                                <p className="text-gray-900 text-sm font-medium">
                                    Cette action désactivera les accès du chauffeur à son compte.
                                </p>
                                <div className='mt-8'>
                                    <label className="text-black font-bold text-rose-800 text-xs">
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
                                            changerStatus(data.id, {
                                                "raison": raison,
                                                "status": "REJETER"
                                            }).then((res) => {
                                                if (res.status === 200) {
                                                    setRaison("")
                                                    dispatch(getMoreDrivers({ page: 0, param: '', size: 10 }))
                                                    toast.success('Compte rejeté ')
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
