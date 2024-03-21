import { Drawer, Pagination, Skeleton } from '@mui/material';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { BadgeSwissFranc, Clock, Eye, MapIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import Directions from '../../components/GoogleMap/Direction';
import { getAllOrder } from '../../redux/store/order';

export const Commande = () => {
    const [openSide, setOpenSide] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order.order)
    const [selectRow, setSelectRow] = useState();

    useEffect(() => {
        dispatch(getAllOrder({ page: 0, param: '', size: 10 }))
        setTimeout(() => {
            setLoading(true)
        }, "2000")
    }, [dispatch])

    const defaultProps = {
        center: {
            lat: 5.3707356,
            lng: -3.9572473
        },
        zoom: 11
    };

    const OrdersColumns = [
        {
            name: "Chauffeur",
            selector: (row) =>
                !loading ? (
                    <Skeleton animation="wave" variant="text" width={80} />
                ) : (
                    row?.driver === null ? 'en attente...' :
                        row?.driver?.nom + " " + row?.driver?.prenoms
                ),
            sortable: true,
        },
        {
            name: "Cient",
            selector: (row) =>
                !loading ? (
                    <Skeleton animation="wave" variant="text" width={80} />
                ) : (
                    row?.client?.nom + " " + row?.client?.prenoms
                ),
            sortable: true,
        },
        // {
        //     name: "Categorie de vehicule",
        //     selector: (row) =>
        //         !loading ? (
        //             <Skeleton animation="wave" variant="text" width={80} />
        //         ) : (
        //             row?.categorieVehicule
        //         ),
        // },
        // {
        //     name: "Distance",
        //     selector: (row) =>
        //         !loading ? (
        //             <Skeleton animation="wave" variant="text" width={80} />
        //         ) : (
        //             row?.distance
        //         ),
        // },
        // {
        //     name: "Montant",
        //     selector: (row) =>
        //         !loading ? (
        //             <Skeleton animation="wave" variant="text" width={80} />
        //         ) : (
        //             row?.montant
        //         ),
        // },
        {
            name: "Depart",
            selector: (row) =>
                !loading ? (
                    <Skeleton animation="wave" variant="text" width={80} />
                ) : (
                    row?.lieuDepart
                ),
        },
        {
            name: "Destination",
            selector: (row) =>
                !loading ? (
                    <Skeleton animation="wave" variant="text" width={80} />
                ) : (
                    row?.lieuDestination
                ),
        },
        // {
        //     name: "Durée du trajet",
        //     selector: (row) =>
        //         !loading ? (
        //             <Skeleton animation="wave" variant="text" width={80} />
        //         ) : (
        //             row?.duree
        //         ),
        // },
        {
            name: "Status",
            selector: (row) =>
                !loading ? (
                    <Skeleton animation="wave" variant="text" width={80} />
                ) : (
                    <p className={`text-xs  ${row?.status === 'TERMINE' ? 'bg-green-100 text-green-800 font-semibold' : row?.status === 'ANNULE' ? 'bg-rose-100 text-rose-800 font-semibold' : 'bg-orange-100 text-orange-800 font-semibold'}  rounded-lg px-2 py-1`}>{row?.status === 'TERMINE' ? 'terminé' : row?.status === 'ANNULE' ? 'annulé' : 'en attente'}</p>
                ),
        },
        {
            name: "Date de la course",
            selector: (row) =>
                !loading ? (
                    <Skeleton animation="wave" variant="text" width={80} />
                ) : (
                    new Date(row?.dateCreation).toLocaleString()
                ),
        },
        {
            name: "Action",
            cell: (row) =>
                !loading ? (
                    <Skeleton animation="wave" variant="text" width={80} />
                ) : (
                    <div>
                        <div>
                            <button className="btn btn-sm" onClick={() => {
                                setSelectRow(row);
                                console.log(row);
                                setOpenSide(true)
                            }}>
                                <Eye size={15} />
                            </button>
                        </div>
                    </div>
                ),
        },
    ];
    const more = async (page) => {
        setLoading(true)
        dispatch(getAllOrder({ page: page, param: '', size: 10 }))
    }
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
                    <div className="">
                        <DataTable
                            columns={OrdersColumns}
                            data={order.courses}
                            className='border'
                            noDataComponent='Aucune données'
                            customStyles={{
                                rows: {
                                },
                            }}
                        />
                        <div className='my-3 flex justify-end'>
                            <Pagination onChange={(event, newValue) => more(newValue)}
                                onSelect={selectedPage => more(selectedPage)} count={order?.totalPages} variant="outlined" color='primary' shape="rounded" />
                        </div>
                    </div>
                    <Drawer open={openSide} onClose={() => setOpenSide(false)} anchor='right'>
                        <div className="w-[580px] mx-2 my-6">
                            <div className="h-60 bg-slate-200" style={{ borderRadius: 20 }}>
                                <APIProvider apiKey={"AIzaSyCTM4-__zorpLJu4DFe0HJNYta_lFVlvVQ"}>
                                    <Map
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
                                        <div class="p-3 rounded-lg bg-gray-200 font-semibold flex gap-1 text-xs"><MapIcon size={17} /> Trajet  de la course</div>
                                        <div class="px-3 text-xs font-medium my-2">
                                            <div>
                                                <div className="flex items-center ">
                                                    <div className="rounded-full w-3 h-3 bg-indigo-700">
                                                    </div>
                                                    <div className="ml-2">
                                                        <p className="text-sm font-semibold">{selectRow?.lieuDepart}</p>
                                                        <p className="text-sm text-gray-400">{selectRow?.dateDebutCourse !== null ? new Date(selectRow?.dateDebutCourse).toLocaleString() : ''}</p>
                                                    </div>
                                                </div>

                                                <div className="w-1 h-4 border-r-2  px-[3px] border-indigo-700"></div>
                                                <div className="flex items-center ">
                                                    <div className="rounded-full w-3 h-3 bg-indigo-700">
                                                    </div>
                                                    <div className="ml-2">
                                                        <p className="text-sm font-semibold">{selectRow?.lieuDestination}</p>
                                                        <p className="text-sm text-gray-400">{selectRow?.dateDebutCourse !== null ? new Date(selectRow?.dateFinCourse).toLocaleString() : ''}</p>
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
                                            {selectRow?.duree}
                                        </div>
                                    </div>
                                </div>

                                <div class="text-left text-sm  bg-muted">
                                    <div class=" gap-1">
                                        <div class="text-xs font-semibold flex rounded-lg bg-gray-200 p-3 gap-1"><BadgeSwissFranc size={17} />Prix de la course</div>
                                        <div class="px-3 text-lg font-semibold my-2">
                                            {selectRow?.montant + ' Fr'}
                                        </div>
                                    </div>
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

                </div>

            </div>
        </div>
    )
}
