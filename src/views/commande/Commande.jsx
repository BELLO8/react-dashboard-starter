import { Drawer, Pagination } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import { BadgeSwissFranc, Clock, Eye, Map } from 'lucide-react';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const data = [
    {
        "date_commande": "2024-02-22",
        "date_debut_location": "2024-03-01",
        "date_fin_location": "2024-03-05",
        "heure_debut_location": "10:00",
        "heure_fin_location": "18:00",
        "duree_location": "5 jours",
        "type_vehicule": "Minibus",
        "nombre_passagers": 10,
        "itineraire": {
            "depart": "Aéroport de Paris-Charles-de-Gaulle",
            "arrivee": "Hôtel Le Méridien, Paris"
        },
        "options_supplementaires": ["Siège bébé", "Chauffeur supplémentaire"],
        "coordonnees_client": {
            "nom": "Jeanne Dupont",
            "telephone": "+33 6 12 34 56 78",
            "email": "jeanne.dupont@example.com"
        },
        "coordonnees_contact_urgence": {
            "nom": "Marie Dupont",
            "telephone": "+33 6 98 76 54 32"
        },
        "instructions_speciales": "Le véhicule doit être équipé de sièges enfants pour les passagers."
    }

]
export const Commande = () => {
    const [openSide, setOpenSide] = useState(false)

    const defaultProps = {
        center: {
            lat: 5.3707356,
            lng: -3.9572473
        },
        zoom: 11
    };


    const columns = [
        {
            name: "Client",
            selector: (row) => row.coordonnees_client.nom,
            sortable: true,
        },
        {
            name: "Itinéraire ",
            selector: (row) => row.itineraire.depart,
            sortable: true,
        },
        {
            name: "Type de véhicule",
            selector: (row) => row.type_vehicule,
            sortable: true,
        },
        {
            name: "Date de debut",
            selector: (row) => row.date_debut_location,
        },
        {
            name: "Date de fin",
            selector: (row) => row.date_fin_location,
        },
        {
            name: "Date de la commande",
            selector: (row) => row.date_commande,
        },
        {
            name: "Action",
            cell: (row) => (
                <div>
                    <div>
                        <button className='btn btn-sm' onClick={() => { setOpenSide(true) }}><Eye size={15} /></button>
                    </div>
                    <Drawer open={openSide} onClose={() => setOpenSide(false)} anchor='right'>
                        <div className="w-[580px] mx-2 my-6">
                            <div className="h-60 bg-slate-200" style={{ borderRadius: 20 }}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: "" }}
                                    defaultCenter={defaultProps.center}
                                    defaultZoom={defaultProps.zoom}
                                >
                                </GoogleMapReact>
                            </div>
                            <div className="grid grid-cols-3 my-2 gap-1">
                                <div class="text-left text-sm  bg-muted">
                                    <div class=" gap-1">
                                        <div class="p-3 rounded-lg bg-gray-200 font-semibold flex gap-1 text-xs"><Map size={17} /> Trajet  de la course</div>
                                        <div class="px-3 text-xs font-medium my-2">
                                            <div>
                                                <div className="flex items-center ">
                                                    <div className="rounded-full w-3 h-3 bg-indigo-700">
                                                    </div>
                                                    <div className="ml-2">
                                                        <p className="text-sm font-semibold">Kulas Light</p>
                                                        <p className="text-sm text-gray-400">07/03/2024 16:40</p>
                                                    </div>
                                                </div>

                                                <div className="w-1 h-4 border-r-2  px-[3px] border-indigo-700"></div>
                                                <div className="flex items-center ">
                                                    <div className="rounded-full w-3 h-3 bg-indigo-700">
                                                    </div>
                                                    <div className="ml-2">
                                                        <p className="text-sm font-semibold">Gwenborough</p>
                                                        <p className="text-sm text-gray-400">07/03/2024 18:40</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-left text-sm  bg-muted">
                                    <div class=" gap-1">
                                        <div class="rounded-lg bg-gray-200 p-3 font-semibold flex gap-1 text-xs"><Clock size={17} />Durée de la course</div>
                                        <div class="px-3 text-lg font-semibold my-2">
                                            1 heure 45 mins
                                        </div>
                                    </div>
                                </div>

                                <div class="text-left text-sm  bg-muted">
                                    <div class=" gap-1">
                                        <div class="text-xs font-semibold flex rounded-lg bg-gray-200 p-3 gap-1"><BadgeSwissFranc size={17} />Prix de la course</div>
                                        <div class="px-3 text-lg font-semibold my-2">
                                            4 200 Fr
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-3 py-6">
                                <p className="bg-gray-200 px-2 py-2 rounded-lg text-sm mb-2 font-semibold">Conducteur</p>
                                <div>
                                    <p className="text-xs font-semibold">Nom et prenoms</p>
                                    <p className="text-md text-gray-900 font-bold mt-1">Steeve Harvez</p>
                                </div>

                                <div className="my-3">
                                    <p className="text-xs font-semibold">Email</p>
                                    <p className="text-md text-gray-900 font-bold mt-1">Sincere@april.biz</p>
                                </div>

                                <div className="">
                                    <p className="text-xs font-semibold">Contact</p>
                                    <p className="text-md text-gray-900 font-bold mt-1">770-736-8031</p>
                                </div>
                            </div>

                            <div className="px-3 py-6">
                                <p className="bg-gray-200 px-2 py-2 rounded-lg text-sm mb-2 font-semibold">Client</p>
                                <div>
                                    <p className="text-xs font-semibold">Nom et prenoms</p>
                                    <p className="text-md text-gray-900 font-bold  mt-1">Steeve Harvez</p>
                                </div>

                                <div className="my-3">
                                    <p className="text-xs font-semibold">Email</p>
                                    <p className="text-md text-gray-900 font-bold mt-1">Sincere@april.biz</p>
                                </div>

                                <div className="my-3">
                                    <p className="text-sm font-semibold">Contact</p>
                                    <p className="text-md text-gray-900 font-bold mt-1">770-736-8031</p>
                                </div>
                            </div>
                        </div>
                    </Drawer>
                </div>



            ),
        },
    ];

    return (
        <div className='p-3 pt-7'>
            <div className='relative'>
                <h1 className="text-3xl font-extrabold text-black">Commandes</h1>
                <div className='absolute inset-y-0 right-0'>

                </div>
                <div className='my-8 bg-white rounded-lg p-3 border border-[#E2E8F0] '>
                    <div className='flex'>
                        <input type="text" placeholder="Recherche..." className="input input-bordered px-3 my-2 w-80 h-10 text-gray-900 placeholder:text-gray-400"
                        />
                        <button className="px-3 my-2 mx-1 rounded-md border-0 py-1.5 text-white shadow-sm bg-[#04356B] placeholder:text-gray-400  sm:text-sm sm:leading-6">
                            Rechercher
                        </button>
                    </div>
                    <DataTable
                        columns={columns}
                        data={data}
                        className='border'
                    />
                    <div className='my-3 flex justify-end'>
                        <Pagination count={8} variant="outlined" color='primary' shape="rounded" />
                    </div>
                </div>

            </div>
        </div>
    )
}
