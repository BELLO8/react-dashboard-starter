import { Pagination } from '@mui/material'
import { ChevronLeft, Edit, MinusCircle } from 'lucide-react'
import React from 'react'
import DataTable from 'react-data-table-component'
import { NavLink } from 'react-router-dom'
import { data } from '../../Utils/data'
import { OrdersColumns } from '../../Utils/dataColumn'

export const ChauffeurCommande = () => {
    return (
        <div>

            <div className="flex items-start">
                <div className='sticky top-0 left-0 bg-white w-64 min-h-screen z-50'>

                    <div className='my-3 rounded-lg px-4'>

                        <div className='flex items-center gap-x-3 mb-8'>
                            <NavLink to="/detail-partenaire">
                                <button className='w-fit h-9 rounded-lg text-main text-sm font-medium flex items-center justify-center gap-x-1'><ChevronLeft size={18} /> Retour</button>
                            </NavLink>
                        </div>
                        <div className="relative w-26">
                            <div className="absolute right-0">
                                <button className="hover:bg-white btn btn-sm bg-white shadow-sm flex text-indigo-800 font-medium text-xs"><Edit size={17} /> modifier</button>
                            </div>
                            <div className='rounded-full w-20 h-20' style={{ background: "url('https://www.shutterstock.com/image-photo/new-car-cheerful-black-man-260nw-1746419990.jpg') no-repeat center/cover" }}>
                            </div>
                        </div>


                        <div className="relative my-6 h-[430px]">
                            <div>
                                <p className="text-sm font-semibold">Nom et prenoms</p>
                                <p className="text-xs text-gray-600 font-medium mt-1">Steeve Harvez</p>
                            </div>

                            <div className="my-6">
                                <p className="text-sm font-semibold">Email</p>
                                <p className="text-xs text-gray-600 font-medium mt-1">Sincere@april.biz</p>
                            </div>

                            <div className="my-6">
                                <p className="text-sm font-semibold">Contact</p>
                                <p className="text-xs text-gray-600 font-medium mt-1">770-736-8031</p>
                            </div>

                            <div className="my-6">
                                <p className="text-sm font-semibold">Adresse</p>
                                <p className="text-xs text-gray-600 font-medium mt-1">Kulas Light,Gwenborough</p>
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

                <div className="w-4/5 px-1 relative">

                    <div className='my-6'>
                        <div className="flex">
                            <div>
                                <div className='rounded-full w-20 h-20' style={{ background: "url('https://info.drivedifferent.com/hubfs/SMI-BLOG-Ways-to-Improve-Drivers-Happiness%20%281%29.jpg') no-repeat center/cover" }}>
                                </div>
                            </div>
                            <div className='px-2'>
                                <p className='text-lg font-bold'>N'da Adams Aimé Désiré Yao</p>
                                <p className='text-sm bg-main/10 rounded-lg w-fit px-3 py-1 font-semibold text-main/80'>+225 0778812111</p>
                                <p className='text-sm font-semibold text-gray-500'>Kulas Light,Gwenborough</p>
                            </div>
                        </div>
                    </div>
                    <h1 className='p-3 text-lg font-semibold'>Commandes du chauffeur</h1>
                    <div className=' bg-white rounded-lg p-8 border border-[#E2E8F0] '>
                        <div className='flex'>
                            <input type="text" placeholder="Rechercher une categorie..." className="px-3 my-2 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                            />
                            <button className="px-3 my-2 mx-1 rounded-md border-0 py-1.5 text-white shadow-sm bg-[#04356B] placeholder:text-gray-400  sm:text-sm sm:leading-6">
                                Rechercher
                            </button>
                        </div>
                        <DataTable
                            columns={OrdersColumns}
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
