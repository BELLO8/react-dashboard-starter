import { Pagination, Skeleton } from '@mui/material'
import { ChevronLeft, MinusCircle, PenLine } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { NavLink } from 'react-router-dom'
import { data } from '../../Utils/data'
import { OrdersColumns } from '../../Utils/dataColumn'

export const ChauffeurCommande = () => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, "2000")
    }, [])

    return (
        <div>
            <div className="flex items-start">
                <div className='sticky top-0 left-0 bg-white w-64 min-h-screen z-50'>

                    <div className='my-3 rounded-lg px-4'>
                        <div className="flex items-center justify-between mb-12">
                            <NavLink to="/detail-partenaire">
                                <button
                                    className="text-main w-fit h-7 rounded-full text-sm font-bold flex items-center justify-center gap-x-1"
                                >
                                    <ChevronLeft size={16} />
                                    Retour
                                </button>
                            </NavLink>
                            <button
                                className="bg-main text-white w-fit px-3 h-7 rounded-lg text-sm font-medium flex items-center justify-center gap-x-1">
                                <PenLine size={16} />
                                Modifer
                            </button>
                        </div>

                        <div className="w-26">
                            <div className='rounded-full w-20 h-20' style={{ background: "url('https://www.shutterstock.com/image-photo/new-car-cheerful-black-man-260nw-1746419990.jpg') no-repeat center/cover" }}>
                            </div>
                        </div>
                        <div className="relative my-6 h-[430px]">
                            <div>
                                <p className="text-sm font-semibold">Nom et prenoms</p>
                                <p className="text-xs text-gray-600 font-medium mt-1">
                                    {
                                        !loading ? <Skeleton animation='wave' variant='text' width={80} />
                                            : "Steeve Harvez"
                                    }</p>
                            </div>

                            <div className="my-6">
                                <p className="text-sm font-semibold">Email</p>
                                <p className="text-xs text-gray-600 font-medium mt-1">
                                    {
                                        !loading ? <Skeleton animation='wave' variant='text' width={80} />
                                            : "Sincere@april.biz"
                                    }
                                </p>
                            </div>

                            <div className="my-6">
                                <p className="text-sm font-semibold">Contact</p>
                                <p className="text-xs text-gray-600 font-medium mt-1">{
                                    !loading ? <Skeleton animation='wave' variant='text' width={80} />
                                        : "770-736-8031"
                                }</p>
                            </div>

                            <div className="my-6">
                                <p className="text-sm font-semibold">Adresse</p>
                                <p className="text-xs text-gray-600 font-medium mt-1">
                                    {
                                        !loading ? <Skeleton animation='wave' variant='text' width={80} />
                                            : "Kulas Light,Gwenborough"
                                    }

                                </p>
                            </div>
                            <div className="absolute bottom-0">
                                <button className="btn btn-ghost btn-sm hover:bg-red-50 flex text-red-500 font-medium text-sm"><MinusCircle size={20} /> Desactiver le compte</button>
                            </div>
                        </div>
                        <div className='absolute right-8 mt-2'>
                            {/* <button className='btn btn-sm text-xs' onClick={() => {
                }} >modifier le profile</button> */}
                        </div>
                    </div>
                </div>
                <div className="w-4/5 px-3 relative mt-2">
                    <h1 className='font-medium mt-3 text-gray-400 text-lg '>Chauffeur</h1>
                    <div className='mt-2 grid grid-cols-3 gap-2'>
                        <div className="flex bg-white w-full p-4 rounded-lg shadow">
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
                        </div>
                        <div className="w-full p-4 drop-shadow-sm border border-dashed bg-white rounded-lg flex flex-col">
                            <p className=" text-2xl font-semibold">
                                {
                                    !loading ? <Skeleton animation='wave' variant='text' width={130} />
                                        : "157 0000 Fr"
                                }
                            </p>
                            <p className="text-sm text-gray-400 font-medium truncate">Revenue</p>
                        </div>
                        <div className="w-full p-4 drop-shadow-sm border border-dashed bg-white rounded-lg flex flex-col">
                            <p className=" text-2xl font-semibold">{
                                !loading ? <Skeleton animation='wave' variant='text' width={130} />
                                    : "80"
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
                            columns={OrdersColumns(loading)}
                            data={data}
                            className='border'
                        />
                        <div className='my-3 flex justify-end'>
                            <Pagination count={8} variant="outlined" color='primary' shape="rounded" />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
