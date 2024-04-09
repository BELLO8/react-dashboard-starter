import { Pagination, Skeleton } from '@mui/material'
import { ChevronLeft, Eye, Info, MinusCircle, PenLine } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../Utils/constant'
import { CourseSideBar } from '../../components/Commande/CourseSideBar'
import { getAllOrderByDriver } from '../../redux/store/order'
import { driverInfo } from '../../redux/store/partner'
import { deleteCarDriver } from '../../services/Driver'

export const ChauffeurCommande = () => {

    const [selectRow, setSelectRow] = useState();
    const [openSide, setOpenSide] = useState(false)

    const { id } = useParams()
    const dispatch = useDispatch();
    const ordersDriver = useSelector((state) => state.order.driverOrder);
    const InfoDriver = useSelector((state) => state.partner.driver);
    const loading = useSelector((state) => state.order.loadingOrder);
    useEffect(() => {
        dispatch(getAllOrderByDriver({ id: id, page: 0, param: '', size: 10 }))
        dispatch(driverInfo(id))

    }, [dispatch, id])

    const OrdersColumns = [
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
                                setOpenSide(true)
                            }}>
                                <Eye size={15} />
                            </button>
                        </div>
                    </div>
                ),
        },
    ];

    return (
        <div>
            <div className="lg:flex items-start">
                <div className='lg:sticky top-0 left-0 bg-white lg:w-64 lg:min-h-screen z-50'>
                    <div className='my-3 rounded-lg px-4'>
                        <div className="flex items-center justify-between mb-12">
                            <button onClick={() => window.history.back()}
                                className="text-main w-fit h-7 rounded-full text-sm font-bold flex items-center justify-center gap-x-1"
                            >
                                <ChevronLeft size={16} />
                                Retour
                            </button>
                            <button
                                className="bg-main text-white w-fit px-3 h-7 rounded-lg text-sm font-medium flex items-center justify-center gap-x-1">
                                <PenLine size={16} />
                                Modifer
                            </button>
                        </div>

                        <div className="w-26">
                            <div className='rounded-full w-20 h-20' style={{ background: `url("${BASE_URL}/webfree/partenaire/fichier/${InfoDriver?.photo?.id}") no-repeat center/cover` }}>
                            </div>
                        </div>
                        <div className="relative my-6 pb-3 lg:h-[430px]">
                            <div>
                                <p className="text-sm font-semibold">Nom et prenoms</p>
                                <p className="text-xs text-gray-600 font-medium mt-1">
                                    {
                                        loading ? <Skeleton animation='wave' variant='text' width={80} />
                                            : InfoDriver.nom + ' ' + InfoDriver.prenoms
                                    }</p>
                            </div>

                            <div className="my-6">
                                <p className="text-sm font-semibold">Email</p>
                                <p className="text-xs text-gray-600 font-medium mt-1">
                                    {
                                        loading ? <Skeleton animation='wave' variant='text' width={80} />
                                            : InfoDriver.email
                                    }
                                </p>
                            </div>

                            <div className="my-6">
                                <p className="text-sm font-semibold">Contact</p>
                                <p className="text-xs text-gray-600 font-medium mt-1">{
                                    loading ? <Skeleton animation='wave' variant='text' width={80} />
                                        : InfoDriver.numero
                                }</p>
                            </div>


                            <div className="lg:absolute bottom-0">
                                <button onClick={() => {
                                    deleteCarDriver(id, InfoDriver?.vehicule?.id).then((res) => {
                                        toast.success('Vehicule rétiré')
                                    }).catch((err) => {
                                        console.log(err);
                                        if (err.response.status === 500) {
                                            toast.error(err.response.data)
                                        }
                                    })
                                }} className="btn btn-ghost btn-sm hover:bg-red-50 flex text-red-500 font-medium text-sm"><MinusCircle size={20} /> Retirer le vehicule</button>
                            </div>
                        </div>
                        <div className='absolute right-8 mt-2'>

                        </div>
                    </div>
                </div>

                <div className="lg:w-4/5 px-3 relative mt-2">
                    <h1 className='font-medium mt-3 text-gray-400 text-lg '>Chauffeur</h1>
                    <div className='mt-2 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2'>
                        {/* <div className="flex bg-white w-full p-4 rounded-lg shadow">
                            <div>
                                {
                                    !loading ? <Skeleton animation='wave' variant='circular' width={60} height={60} />
                                        : (<div className='rounded-full w-16 h-16' style={{ background: "url('https://info.drivedifferent.com/hubfs/SMI-BLOG-Ways-to-Improve-Drivers-Happiness%20%281%29.jpg') no-repeat center/cover" }}>
                                        </div>)
                                }

                            </div>
                            <div className='px-4 w-10/12'>
                                <p className='text-lg font-bold truncate '>
                                    {
                                        !loading ? <Skeleton animation='wave' variant='text' width={170} />
                                            : " N'da Adams Aimé Désiré Yao Kouame jean"
                                    }
                                </p>
                                <p className='text-xs font-semibold text-gray-500 mt-1'>
                                    {
                                        !loading ? <Skeleton animation='wave' variant='text' width={80} />
                                            : "  +225 0778812111"
                                    }
                                </p>
                                <p className='text-xs font-semibold text-gray-500'>
                                    {
                                        !loading ? <Skeleton animation='wave' variant='text' width={120} />
                                            : "Kulas Light,Gwenborough"
                                    }
                                </p>
                            </div>
                        </div> */}
                        <div className="p-4 drop-shadow-sm border border-dashed bg-white rounded-lg flex flex-col">
                            <div className="">
                                <p className=' text-2xl font-semibold'>{
                                    loading ? <Skeleton animation='wave' variant='text' width={130} />
                                        : new Intl.NumberFormat('fr', { style: 'currency', currency: 'XOF' }).format(InfoDriver?.solde)
                                }</p>

                            </div>
                            <p className="text-sm text-gray-400 font-medium truncate">Solde</p>
                        </div>
                        <div className="w-full p-4 drop-shadow-sm border border-dashed bg-white rounded-lg flex flex-col">
                            <div className="flex">
                                <p className=' text-2xl font-semibold'>{
                                    loading ? <Skeleton animation='wave' variant='text' width={130} />
                                        : InfoDriver?.revenu ?? 0
                                }{"  "}</p>
                                Fcfa
                            </div>
                            <p className="text-sm text-gray-400 font-medium truncate">Revenu</p>
                        </div>
                        <div className="w-full p-4 drop-shadow-sm border border-dashed bg-white rounded-lg flex flex-col">
                            <p className=" text-2xl font-semibold">{
                                loading ? <Skeleton animation='wave' variant='text' width={130} />
                                    : InfoDriver?.point ?? 0
                            }</p>
                            <p className="text-sm text-gray-400 font-medium truncate">Points</p>
                        </div>
                        <div className="w-full p-4 drop-shadow-sm border border-dashed bg-white rounded-lg flex flex-col">
                            <p className=" text-2xl font-semibold">{
                                loading ? <Skeleton animation='wave' variant='text' width={130} />
                                    : ordersDriver?.courses?.length
                            }</p>
                            <p className="text-sm text-gray-400 font-medium truncate">Courses effectées</p>
                        </div>
                    </div>
                    <h1 className='mt-5 text-lg text-gray-400 font-medium'>Historique de commandes</h1>
                    <div className='mt-2 bg-white rounded-lg p-4 shadow border border-[#E2E8F0] '>
                        <div className='flex'>
                            <input type="text" placeholder="Recherche..." className="input input-bordered px-3 my-2 w-80 h-10 text-gray-900 placeholder:text-gray-400"
                            />
                            <button className="px-3 my-2 mx-1 rounded-md border-0 py-1.5 text-white shadow-sm bg-[#04356B] placeholder:text-gray-400  sm:text-sm sm:leading-6">
                                Rechercher
                            </button>
                        </div>
                        <DataTable
                            columns={OrdersColumns}
                            data={ordersDriver.courses}
                            className='border'
                            progressPending={loading}
                            progressComponent={

                                <span class="loading loading-spinner loading-lg"></span>
                            }
                            noDataComponent={
                                <p className='my-48 flex text-rose-500'>
                                    <Info /> Aucune donnée
                                </p>}
                        />
                        <div className='my-3 flex justify-end'>
                            <Pagination count={ordersDriver?.totalPages} variant="outlined" color='primary' shape="rounded" />
                        </div>
                        <CourseSideBar openSide={openSide} handleclose={() => setOpenSide(false)} selectRow={selectRow} />

                    </div>
                </div>
            </div>


        </div>
    )
}
