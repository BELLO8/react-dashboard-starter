import { Pagination, Skeleton } from '@mui/material';
import { Eye, Menu } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { CourseSideBar } from '../../components/Commande/CourseSideBar';
import { MobileMenu } from '../../components/Menu/MobileMenu';
import { getAllOrder } from '../../redux/store/order';

export const Commande = () => {
    const [openSide, setOpenSide] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const loading = useSelector((state) => state.order.loading)
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order.order)
    const [selectRow, setSelectRow] = useState();

    useEffect(() => {
        dispatch(getAllOrder({ page: 0, param: '', size: 10 }))

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
                loading ? (
                    <Skeleton animation="wave" variant="text" width={80} />
                ) : (
                    row?.driver === null ? ' ' :
                        row?.driver?.nom + " " + row?.driver?.prenoms
                ),
            sortable: true,
        },
        {
            name: "Cient",
            selector: (row) =>
                loading ? (
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
                loading ? (
                    <Skeleton animation="wave" variant="text" width={80} />
                ) : (
                    row?.lieuDepart
                ),
        },
        {
            name: "Destination",
            selector: (row) =>
                loading ? (
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
                loading ? (
                    <Skeleton animation="wave" variant="text" width={80} />
                ) : (
                    <p className={`text-xs  ${row?.status === 'TERMINE' ? 'bg-green-100 text-green-800 font-semibold' : row?.status === 'ANNULE' ? 'bg-rose-100 text-rose-800 font-semibold' : 'bg-orange-100 text-orange-800 font-semibold'}  rounded-lg px-2 py-1`}>{row?.status === 'TERMINE' ? 'terminé' : row?.status === 'ANNULE' ? 'annulé' : 'en attente'}</p>
                ),
        },
        {
            name: "Date de la course",
            selector: (row) =>
                loading ? (
                    <Skeleton animation="wave" variant="text" width={80} />
                ) : (
                    new Date(row?.dateCreation).toLocaleString()
                ),
        },
        {
            name: "Action",
            cell: (row) =>
                loading ? (
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
        dispatch(getAllOrder({ page: page, param: '', size: 10 }))
    }
    return (
        <div className='p-3 pt-7'>
            <div className="flex gap-x-2 my-3">
                <button onClick={() => setShowMenu(true)} className='lg:hidden btn btn-sm'><Menu /></button>
                <h1 className="lg:text-3xl font-extrabold text-black sm:text-lg my-auto">Commandes</h1>
            </div>
            <MobileMenu openSide={showMenu} setOpenSide={setShowMenu} />
            <div className='relative'>
                <div className='my-8 bg-white rounded-lg p-3 border border-[#E2E8F0] '>
                    <div className='lg:flex [320px]:grid sm:flex md:flex'>
                        <input type="text" placeholder="Recherche..." className="input input-bordered px-3 my-2 w-80 h-10 text-gray-900 placeholder:text-gray-400"
                        />
                        <label className="form-control w-44">
                            <select onChange={(e) => {
                                dispatch(getAllOrder({ page: 0, param: e.target.value, size: 10 }))
                            }} className="mx-2 my-2 select select-bordered custom-select w-full h-10">
                                <option disabled selected>
                                    Staut d'activié
                                </option>
                                <option value='TERMINE'>Terminé</option>
                                <option value='ANNULE'>Annulé</option>
                            </select>
                        </label>
                        <button className="px-3 my-2 mx-3 rounded-md border-0 py-1.5 text-white shadow-sm bg-[#04356B] placeholder:text-gray-400  sm:text-sm sm:leading-6">
                            Rechercher
                        </button>

                    </div>
                    <div className="">
                        <DataTable
                            columns={OrdersColumns}
                            data={order.courses}
                            className='border'
                            progressPending={loading}
                            progressComponent={

                                <span class="loading loading-spinner loading-lg"></span>
                            }
                            noDataComponent='Aucune données'
                        />

                        {
                            loading ? null :
                                (
                                    <div className='my-3 flex justify-end'>
                                        <Pagination onChange={(event, newValue) => more(newValue)}
                                            onSelect={selectedPage => more(selectedPage)} count={order?.totalPages} variant="outlined" color='primary' shape="rounded" />
                                    </div>
                                )
                        }
                    </div>
                    <CourseSideBar openSide={openSide} handleclose={() => setOpenSide(false)} selectRow={selectRow} />
                </div>
            </div>
        </div>
    )
}
