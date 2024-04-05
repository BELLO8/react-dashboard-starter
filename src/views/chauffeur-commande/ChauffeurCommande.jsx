import { Pagination, Skeleton } from '@mui/material'
import { ChevronLeft, Eye, Info, MinusCircle, PenLine } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../Utils/constant'
import { getAllOrderByDriver } from '../../redux/store/order'
import { driverInfo } from '../../redux/store/partner'
import { deleteCarDriver } from '../../services/Driver'

export const ChauffeurCommande = () => {

    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const dispatch = useDispatch();
    const ordersDriver = useSelector((state) => state.order.driverOrder);
    const InfoDriver = useSelector((state) => state.partner.driver);

    useEffect(() => {
        dispatch(getAllOrderByDriver({ id: id, page: 0, param: '', size: 10 }))
        dispatch(driverInfo(id))
        setTimeout(() => {
            setLoading(true)
        }, "2000")
    }, [dispatch, id])

    const OrdersColumns = [
        // {
        //     name: "Chauffeur",
        //     selector: (row) =>
        //         !loading ? (
        //             <Skeleton animation="wave" variant="text" width={80} />
        //         ) : (
        //             row?.driver === null ? 'en attente...' :
        //                 row?.driver?.nom + " " + row?.driver?.prenoms
        //         ),
        //     sortable: true,
        // },
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
                                // setSelectRow(row);
                                // console.log(row);
                                // setOpenSide(true)
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
                                        !loading ? <Skeleton animation='wave' variant='text' width={80} />
                                            : InfoDriver.nom + ' ' + InfoDriver.prenoms
                                    }</p>
                            </div>

                            <div className="my-6">
                                <p className="text-sm font-semibold">Email</p>
                                <p className="text-xs text-gray-600 font-medium mt-1">
                                    {
                                        !loading ? <Skeleton animation='wave' variant='text' width={80} />
                                            : InfoDriver.email
                                    }
                                </p>
                            </div>

                            <div className="my-6">
                                <p className="text-sm font-semibold">Contact</p>
                                <p className="text-xs text-gray-600 font-medium mt-1">{
                                    !loading ? <Skeleton animation='wave' variant='text' width={80} />
                                        : InfoDriver.numero
                                }</p>
                            </div>

                            {/* <div className="my-6">
                                <p className="text-sm font-semibold">Info sur le vehicule</p>


                                <div className='cursor-pointer bg-neutral-50 border  rounded-lg hover:border hover:border-blue-500'>
                                    <div className='mx-2 my-4  rounded-lg pr-8 flex'>
                                        <div className="w-20">
                                            <img width={90} src="data:image/jpeg;base64,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" alt="" srcset="" />
                                        </div>
                                        <div className='mx-2 space-y-1'>
                                            <p className='text-sm font-semibold truncate'>{InfoDriver?.vehicule?.marque + ' ' + InfoDriver?.vehicule?.modele}</p>
                                            <p className='text-[10px] text-gray-300 font-semibold bg-blue-100 text-indigo-800 rounded-md px-2 w-fit'>{InfoDriver?.vehicule?.numeroMatriculation}</p>
                                        </div>
                                    </div>
                                </div>

                            </div> */}
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
                            {/* <button className='btn btn-sm text-xs' onClick={() => {
                }} >modifier le profile</button> */}
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
                                    !loading ? <Skeleton animation='wave' variant='text' width={130} />
                                        : new Intl.NumberFormat('fr', { style: 'currency', currency: 'XOF' }).format(InfoDriver?.solde)
                                }</p>

                            </div>
                            <p className="text-sm text-gray-400 font-medium truncate">Solde</p>
                        </div>
                        <div className="w-full p-4 drop-shadow-sm border border-dashed bg-white rounded-lg flex flex-col">
                            <div className="flex">
                                <p className=' text-2xl font-semibold'>{
                                    !loading ? <Skeleton animation='wave' variant='text' width={130} />
                                        : InfoDriver?.revenu ?? 0
                                }{"  "}</p>
                                Fcfa
                            </div>
                            <p className="text-sm text-gray-400 font-medium truncate">Revenu</p>
                        </div>
                        <div className="w-full p-4 drop-shadow-sm border border-dashed bg-white rounded-lg flex flex-col">
                            <p className=" text-2xl font-semibold">{
                                !loading ? <Skeleton animation='wave' variant='text' width={130} />
                                    : InfoDriver?.point ?? 0
                            }</p>
                            <p className="text-sm text-gray-400 font-medium truncate">Points</p>
                        </div>
                        <div className="w-full p-4 drop-shadow-sm border border-dashed bg-white rounded-lg flex flex-col">
                            <p className=" text-2xl font-semibold">{
                                !loading ? <Skeleton animation='wave' variant='text' width={130} />
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
                            noDataComponent={
                                <p className='my-48 flex text-rose-500'>
                                    <Info /> Aucune donnée
                                </p>}
                        />
                        <div className='my-3 flex justify-end'>
                            <Pagination count={ordersDriver?.totalPages} variant="outlined" color='primary' shape="rounded" />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
