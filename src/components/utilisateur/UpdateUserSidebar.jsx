import { Drawer } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export const UpdateUserSidebar = ({ setOpenSide, openSide, rowData }) => {
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm()

    const submit = (data) => {
        reset();
        setOpenSide(false)
        toast.success('Utilisateur mis à jour')
    }
    useEffect(() => {
        reset()
    }, [reset])
    console.log(rowData);
    return (
        <>
            <Drawer open={openSide} onClose={() => setOpenSide(false)} anchor='right'>
                <div className='bg-white w-96 px-8 mt-4'>
                    <h1 className='text-lg font-semibold'>Modification d'un utilisateur</h1>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className='my-12'>
                            <div className='my-2'>
                                <label htmlFor="" className='text-sm font-medium'>Nom et prenoms</label>
                                <input defaultValue={rowData?.name} type="text" placeholder="ex : Yao kofff" className="px-3 my-2 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('name', { required: true })} />
                                {errors.name && <span className="text-sm text-rose-600">Ce champs est obligatoire</span>}
                            </div>
                            <div className='my-2'>
                                <label htmlFor="" className='text-sm font-medium'>Username</label>
                                <input defaultValue={rowData?.username} type="text" placeholder="ex : @yao" className="px-3 my-2 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('username', { required: true })} />
                                {errors.username && <span className="text-sm text-rose-600">Ce champs est obligatoire</span>}
                            </div>
                            <div className='my-2'>
                                <label htmlFor="" className='text-sm font-medium'>Email</label>
                                <input defaultValue={rowData?.email} type="text" placeholder="ex : kofi@yao.ee" className="px-3 my-2 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('email', { required: true })} />
                                {errors.email && <span className="text-sm text-rose-600">Ce champs est obligatoire</span>}
                            </div>
                            <div className='my-2'>
                                <label htmlFor="" className='text-sm font-medium'>Adresse</label>
                                <input defaultValue={rowData?.address.street} type="text" placeholder="ex : Palm ci" className="px-3 my-2 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('address', { required: true })} />
                                {errors.address && <span className="text-sm text-rose-600">Ce champs est obligatoire</span>}
                            </div>
                            <div className='my-2'>
                                <label htmlFor="" className='text-sm font-medium'>Numéro de téléphone</label>
                                <input defaultValue={rowData?.phone} type="text" placeholder="ex : 002587663321" className="px-3 my-2 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('phone', { required: true })} />
                                {errors.phone && <span className="text-sm text-rose-600">Ce champs est obligatoire</span>}
                            </div>
                            <button className="btn btn-sm texte-xs hover:bg-gray-900 font-medium my-2 mx-1 w-80 rounded-md border-0 text-white shadow-sm bg-[#04356B]">
                                Modifier l'utilisateur
                            </button>
                        </div>
                    </form>

                </div>

            </Drawer>
        </>
    )
}
