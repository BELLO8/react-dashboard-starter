import { Close } from '@mui/icons-material'
import { Drawer } from '@mui/material'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import React from 'react'
import { API_KEY } from '../../Utils/constant'
import Directions from '../GoogleMap/Direction'

export const CourseSideBar = ({ openSide, handleclose, selectRow }) => {
    const defaultProps = {
        center: {
            lat: 5.3707356,
            lng: -3.9572473
        },
        zoom: 11
    };
    return (
        <>
            <Drawer open={openSide} onClose={handleclose} anchor='right'>
                <div className="lg:w-[480px] mx-2 my-6 [320px]:w-[300px]">
                    <button className='btn btn-sm btn-circle' onClick={handleclose}><Close /></button>

                    <div className="h-60 bg-slate-200" style={{ borderRadius: 20 }}>
                        <APIProvider apiKey={API_KEY}>
                            <Map
                                style={{ borderRadius: 20 }}
                                disableDefaultUI={true}
                                zoom={14}
                                center={defaultProps.center}
                                mapId={'<Your custom MapId here>'}>
                            </Map>
                            <Directions origin={selectRow?.lieuDepart} destination={selectRow?.lieuDestination} />
                        </APIProvider>
                    </div>
                    <div className="grid grid-cols-3 my-2 gap-1">
                        <div class="text-left text-sm  bg-muted">
                            <div class=" gap-1">
                                <div class="p-1 rounded-lg bg-gray-100 font-semibold flex gap-1 text-xs">
                                    <div className="px-1 py-2 ">
                                        <p className="text-md font-medium">
                                            {selectRow?.distance}
                                        </p>
                                        <p className="text-sm text-center text-gray-400 font-medium truncate">Distance</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-left text-sm  bg-muted">
                            <div class=" gap-1">

                                <div class="p-1 rounded-lg bg-gray-100 font-semibold flex gap-1 text-xs">
                                    <div className="px-1 py-2 ">
                                        <p className="text-md font-medium">
                                            {selectRow?.duree === "" ? 0 : selectRow?.duree}
                                        </p>
                                        <p className="text-sm text-gray-400 font-medium truncate">Durée</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="text-left text-sm">
                            <div class=" gap-1">
                                <div class="p-1 rounded-lg bg-gray-100 font-semibold flex gap-1 text-xs">
                                    <div className="px-1 py-2 ">
                                        <p className="text-md font-medium">
                                            {selectRow?.montant + ' Fcfa'}
                                        </p>
                                        <p className="text-sm text-gray-400 font-medium truncate">Prix</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="px-3 text-xs font-medium my-2">
                        <div className='border-b-[1px]  pb-3'>
                            <p className='mt-6 font-semibold'>Trajet de la course</p>
                            <div className='flex justify-start'>
                                <ul className="timeline timeline-vertical">
                                    <li>
                                        <div className="timeline-start timeline-box">{selectRow?.lieuDepart}</div>
                                        <div className="timeline-middle">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                        </div>
                                        <hr className="bg-primary" />
                                    </li>
                                    <li className=''>
                                        <hr className="bg-primary" />
                                        <div className="timeline-middle">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                        </div>
                                        <div className="timeline-end timeline-box">{selectRow?.lieuDestination}</div>
                                    </li>
                                </ul>
                            </div>

                            {/* <div className="flex items-center my-2">
                                        <div className="rounded px-1 py-1 bg-indigo-100">
                                            Depart
                                        </div>
                                        <div className="ml-2">
                                            <p className="text-sm font-semibold">{selectRow?.lieuDepart}</p>
                                            <p className="text-xs text-gray-400">{selectRow?.dateDebutCourse !== null ? new Date(selectRow?.dateDebutCourse).toLocaleString() : ''}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center ">
                                        <div className="rounded px-2 py-1 bg-green-100">
                                            Arrivé
                                        </div>
                                        <div className="ml-2">
                                            <p className="text-sm font-semibold">{selectRow?.lieuDestination}</p>
                                            <p className="text-xs text-gray-400">{selectRow?.dateDebutCourse !== null ? new Date(selectRow?.dateFinCourse).toLocaleString() : ''}</p>
                                        </div>
                                    </div> */}
                        </div>
                    </div>
                    <div className="px-3 py-6">
                        <p className="bg-gray-200 px-2 py-2 rounded-lg text-sm mb-2 font-semibold">Conducteur</p>
                        <div>
                            <p className="text-xs font-semibold">Nom et prenoms</p>
                            <p className="text-md text-gray-900 font-bold mt-1">{selectRow?.driver?.nom} {selectRow?.driver?.prenoms}</p>
                        </div>

                        <div className="my-3">
                            <p className="text-xs font-semibold">Email</p>
                            <p className="text-md text-gray-900 font-bold mt-1">{selectRow?.driver?.email}</p>
                        </div>

                        <div className="">
                            <p className="text-xs font-semibold">Contact</p>
                            <p className="text-md text-gray-900 font-bold mt-1">{selectRow?.driver?.numero}</p>
                        </div>
                    </div>

                    <div className="px-3 py-6">
                        <p className="bg-gray-200 px-2 py-2 rounded-lg text-sm mb-2 font-semibold">Client</p>
                        <div>
                            <p className="text-xs font-semibold">Nom et prenoms</p>
                            <p className="text-md text-gray-900 font-bold  mt-1">{selectRow?.client?.nom + " " + selectRow?.client?.prenoms}</p>
                        </div>

                        <div className="my-3">
                            <p className="text-xs font-semibold">Email</p>
                            <p className="text-md text-gray-900 font-bold mt-1">{selectRow?.client?.email}</p>
                        </div>

                        <div className="my-3">
                            <p className="text-sm font-semibold">Contact</p>
                            <p className="text-md text-gray-900 font-bold mt-1">{selectRow?.client?.numero}</p>
                        </div>
                    </div>
                </div>

            </Drawer>
        </>
    )
}
