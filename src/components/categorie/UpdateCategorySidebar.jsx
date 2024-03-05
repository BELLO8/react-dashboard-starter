import { Drawer } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export const UpdateCategorySidebar = ({ setOpenSide, openSide, rowData }) => {
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm()

    const submit = (data) => {
        reset();
        setOpenSide(false)
        toast.success('Categorie de vehicule mis à jour')
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
                                <label htmlFor="" className='text-sm font-medium'>Marque</label>
                                <input defaultValue={rowData?.marque} type="text" placeholder="ex : ford" className="px-3 my-2 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('marque', { required: true })} />
                                {errors.marque && <span className="text-sm text-rose-600">Ce champs est obligatoire</span>}
                            </div>
                            <div className='my-2'>
                                <label htmlFor="" className='text-sm font-medium'>Modele</label>
                                <input defaultValue={rowData?.modele} type="text" placeholder="ex : mustang" className="px-3 my-2 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('modele', { required: true })} />
                                {errors.modele && <span className="text-sm text-rose-600">Ce champs est obligatoire</span>}
                            </div>
                            <div className='my-2'>
                                <label htmlFor="" className='text-sm font-medium'>Description</label>
                                <input defaultValue={rowData?.description} type="text" placeholder="ex : Une description " className="px-3 my-2 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('description', { required: true })} />
                                {errors.description && <span className="text-sm text-rose-600">Ce champs est obligatoire</span>}
                            </div>
                            <div className='my-2'>
                                <label htmlFor="" className='text-sm font-medium'>Type de carburant</label>
                                <input defaultValue={rowData?.typeCarburant} type="text" placeholder="ex : Palm ci" className="px-3 my-2 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('type_carburant', { required: true })} />
                                {errors.type_carburant && <span className="text-sm text-rose-600">Ce champs est obligatoire</span>}
                            </div>
                            <button className="btn btn-sm texte-xs hover:bg-gray-900 font-medium my-2 mx-1 w-80 rounded-md border-0 text-white shadow-sm bg-[#04356B]">
                                Modifier la categorie
                            </button>
                        </div>
                    </form>

                </div>

            </Drawer>
        </>
    )
}
