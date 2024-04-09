import { Drawer } from '@mui/material';
import { MapPin, Phone } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../Utils/constant';
import { getMoreDrivers } from '../../redux/store/driver';
import { changerStatus } from '../../services/Driver';

export const ShowDriverSideBar = ({ setOpenSide, openSide, data, action }) => {

    const [raison, setRaison] = useState();
    const dispatch = useDispatch();
    const pieces = useSelector((state) => state.driver.listePieces);
    const loadingDoc = useSelector((state) => state.driver.loadingPiece);


    return (
        <>
            <Drawer open={openSide} onClose={() => setOpenSide(false)} anchor='right'>
                <div className='bg-white w-[380px] px-8'>
                    <div style={{ backgroundImage: `url("${BASE_URL}/webfree/partenaire/fichier/${data?.fichier?.id}")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                        className="bg-gray-200 rounded-full w-28 h-28 border-2 mx-auto mt-5 flex items-center justify-center">

                    </div>

                    <div className='flex justify-center'>
                        <div className=' my-2 bg-blue-600 w-fit text-white rounded-full p-1'>
                            <p className='text-xs font-medium'>{data?.email}</p>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <p className='text-xl font-bold text-blue-900'>{data?.nom + ' ' + data?.prenoms}</p>
                    </div>
                    <div className="flex justify-center space-x-1 text-gray-400">
                        <Phone size={15} />
                        <p className='text-sm'>{data?.numero}</p>
                    </div>
                    <div className="flex justify-center space-x-1 text-gray-400">
                        <MapPin size={15} />
                        <p className='text-sm'>{data?.lieuHabitation}</p>
                    </div>
                    <div className="my-3 flex justify-center gap-x-2">
                        <div className="px-3 py-3 border border-dashed rounded-lg flex flex-col">
                            <p className=" text-md font-medium">
                                {
                                    data?.solde ?? 0
                                }{" "}
                                Fcfa
                            </p>
                            <p className="text-sm text-center text-gray-400 font-medium truncate">Solde</p>
                        </div>
                        <div className="px-3 py-3 border border-dashed rounded-lg flex flex-col">
                            <p className="text-md font-medium">
                                {
                                    data?.revenues ?? 0
                                }{" "}
                                Fcfa
                            </p>
                            <p className="text-sm text-center text-gray-400 font-medium truncate">Revenue</p>
                        </div>
                        <div className="px-3 py-3 border border-dashed rounded-lg flex flex-col">
                            <p className=" text-md font-medium">
                                {
                                    data?.point ?? 0
                                }{" "}
                            </p>
                            <p className="text-sm text-center text-gray-400 font-medium truncate">Point</p>
                        </div>
                    </div>
                    <div>
                        <p className='text-sm '>Liste des pieces</p>
                        {
                            pieces.length === 0 && !loadingDoc ? (
                                <div className="py-3 flex justify-center">
                                    <img src="https://www.agencija-corrigo.com/build/images/background/no-results-bg.2d2c6ee3.png" height={350} width={250} alt="" />
                                </div>
                            ) : null
                        }
                        <div className="flex gap-x-1">
                            {
                                pieces?.map((item, index) => (
                                    <PhotoProvider>
                                        <PhotoView key={index} src={`${BASE_URL}/webfree/partenaire/fichier/${item.id}`}>
                                            <div>
                                                <div style={{ backgroundImage: `url("${BASE_URL}/webfree/partenaire/fichier/${item.id}")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                                                    className="bg-gray-200 rounded-lg w-28 h-32 border-2 mx-auto mt-5 flex items-center justify-center">
                                                    <p className='text-xs bg-white font-bold p-1 rounded'>{item.typeFichier === 'PERMIS_DE_CONDUIRE' ? 'Permis' : item.typeFichier === 'CNI_RECTO' ? 'Cni recto' : item.typeFichier === 'PASSEPORT' ? 'Passeport' : 'Cni verso'}</p>

                                                </div>
                                            </div>
                                        </PhotoView>
                                    </PhotoProvider>
                                ))
                            }
                        </div>


                        {
                            data?.Vehicule !== null ? (
                                <div>
                                    <p className='text-sm mt-3 '>Info sur le vehicule</p>
                                    <div className='my-3 bg-gray-50 shadow-sm border border-dashed rounded-lg relative'>
                                        <div className='mx-2 my-4 flex'>
                                            <div style={{ backgroundImage: `url("https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20_Modelpc.png")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className="bg-gray-50 rounded w-32 h-14 mb-2">
                                            </div>

                                            <div className='mx-2 space-y-1'>
                                                <p className='text-sm font-semibold truncate'>
                                                    {
                                                        (data?.Vehicule?.marque ?? '') + ' ' + (data?.Vyehicule?.modele ?? '')
                                                    }
                                                </p>
                                                <p className='text-xs text-gray-400 truncate'>
                                                    {
                                                        data?.Vehicule?.numeroMatriculation ?? ''
                                                    }
                                                </p>
                                                {/* {data?.Vehicule ? (
                                                    <div>
                                                        <span
                                                            className="color-box"
                                                            style={{
                                                                backgroundColor:
                                                                    data.Vehicule &&
                                                                        data.Vehicule
                                                                        ? data.Vehicule.couleur
                                                                        : "",
                                                            }}
                                                        ></span>
                                                    </div>
                                                ) : (
                                                    <div>indéfinie</div>
                                                )} */}

                                                <p className='text-xs font-semibold  truncate'>
                                                    couleur : {
                                                        <div className={`w-10 h-10 bg-[${data?.Vehicule?.couleur}] `}>
                                                        </div>

                                                        // data?.Vehicule?.couleur ?? ''
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            ) : null
                        }

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
                                            action()
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
