import { Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Trash } from '../Icons/Trash';
import { UploadIcon } from '../Icons/upload';
import { CategoryForm } from '../categorie/CategoryForm';

export const AddPartnerSidebar = ({ setOpenSide, openSide }) => {
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm()
    const [files, setFiles] = useState([]);

    const [photo, setPhoto] = useState([]);
    const [vehicule, setVehicule] = useState([]);
    const [open, setOpen] = useState(false);

    const handleChangeImage = (e) => {
        const selectedFiles = e.target.files;
        if (files.length <= 1) {
            const newFiles = Array.from(selectedFiles)
            setFiles(prevFiles => [...prevFiles, ...newFiles])
        } else {
            toast.error('Uniquement deux fichier à uploader')
        }
    }


    const handleChangePhoto = (e) => {
        const selectedFiles = e.target.files;
        if (photo.length <= 0) {
            const newFiles = Array.from(selectedFiles)
            setPhoto(prevFiles => [...prevFiles, ...newFiles])

        } else {
            toast.error('Uniquement un fichier à uploader')
        }
    }

    const submit = (data) => {
        reset();
        setOpenSide(false)
        toast.success('Utilisateur enregistrer')
    }

    const submitCar = (data) => {
        const vehiculeData = []
        vehiculeData.push(data)
        console.log(vehiculeData);
        reset();
        setOpen(false)
        setVehicule([data])
        console.log(vehicule);
        toast.success('Categorie de vehicule enregistrer')
    }

    useEffect(() => {
        reset()
    }, [reset])

    return (
        <>
            <Drawer open={openSide} onClose={() => setOpenSide(false)} anchor='right'>
                <div className='bg-white w-[550px] px-8 mt-4'>
                    <h1 className='text-lg font-semibold'>Création d'un partenaire</h1>
                    <div>
                        {errors.assurance && <span className="text-sm text-rose-600">Renseignez tout les champs</span>}
                    </div>

                    <form onSubmit={handleSubmit(submit)}>
                        <div className='my-12'>

                            <div className=" text-indigo-600 py-8 mb-8 justify-center border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-md  py-2 text-gray-900 shadow-sm "
                                onClick={() => document.getElementById('photo').click()}
                            >
                                <div className='flex justify-center mb-3'>
                                    <UploadIcon />
                                </div>

                                <div>
                                    <p className='text-center text-sm mx-1'>Uploader votre photo</p>
                                </div>
                            </div>
                            <input type="file" accept="image/jpeg, image/png " hidden id='photo' onChange={handleChangePhoto} />
                            {photo?.map((file, index) => (
                                <div key={index} className='rounded min-h-40 mx-1 border' style={{
                                    background: "url('" + URL.createObjectURL(file) + "') no-repeat center/cover"
                                }}>
                                    <button className='bg-white rounded text-rose-800 text-sm p-1 m-1' onClick={() => {
                                        setPhoto(photo.filter(deleteFile => deleteFile !== file))
                                    }}>
                                        <Trash />
                                    </button></div>
                            ))}

                            <div className='my-2'>
                                <div>
                                    <label htmlFor="" className='text-sm font-medium'>Nom complet<sup className='text-rose-600'>*</sup></label>
                                </div>
                                <input type="text" placeholder="ex : Yao kofff" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('name', { required: true })} />
                            </div>
                            <div className='my-2'>
                                <div>
                                    <label htmlFor="" className='text-sm font-medium'>Adresse<sup className='text-rose-600'>*</sup></label>
                                </div>
                                <input type="text" placeholder="ex : Palm ci" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('address', { required: true })} />
                            </div>
                            <div className='my-2'>
                                <div>
                                    <label htmlFor="" className='text-sm font-medium'>Numéro de téléphone<sup className='text-rose-600'>*</sup></label>
                                </div>
                                <input type="text" placeholder="ex : 002587663321" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('phone', { required: true })} />
                            </div>
                            <div className='my-2'>
                                <div>
                                    <label htmlFor="" className='text-sm font-medium'>Email<sup className='text-rose-600'>*</sup></label>
                                </div>
                                <input type="text" placeholder="ex : kofi@yao.ee" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('email', { required: true })} />
                            </div>
                            <div className='my-2'>
                                <div>
                                    <label htmlFor="" className='text-sm font-medium'>Numero de permis<sup className='text-rose-600'>*</sup></label>
                                </div>
                                <input type="text" placeholder="ex : 1234578894" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('permis', { required: true })} />
                            </div>
                            <div className='my-2'>
                                <div>
                                    <label htmlFor="" className='text-sm font-medium'>Assurance<sup className='text-rose-600'>*</sup></label>
                                </div>
                                <input type="text" placeholder="ex : A55588648" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('assurance', { required: true })} />
                            </div>
                            <div className="text-indigo-600 py-8 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-md  py-2 text-gray-900 shadow-sm "
                                onClick={() => document.getElementById('pieces').click()}
                            >
                                <div className='flex justify-center mb-3'>
                                    <UploadIcon />
                                </div>

                                <div>
                                    <p className='text-center text-sm mx-1'>Uploader votre photo</p>
                                </div>
                            </div>
                            <input type="file" accept="image/jpeg, image/png " hidden id='pieces' onChange={handleChangeImage} />
                            <div className='grid grid-cols-2 gap-1'>
                                {files?.map((file, index) => (
                                    <div key={index} className='rounded min-h-40 mx-1 border' style={{
                                        background: "url('" + URL.createObjectURL(file) + "') no-repeat center/cover"
                                    }}>
                                        <button className='bg-white rounded text-rose-800 text-sm p-1 m-1' onClick={() => {
                                            setFiles(files.filter(deleteFile => deleteFile !== file))
                                        }}>
                                            <Trash />
                                        </button></div>
                                ))}
                            </div>
                            <div>
                                <label htmlFor="" className='text-sm font-medium'>Vehicule</label>
                                <label className="form-control w-full min-w-xs">
                                    <select className="select rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                                        <option disabled selected>Selectionnez un vehicule</option>
                                        {vehicule.map((item, index) => (
                                            <option key={index}>{item.fullname}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <button onClick={() => setOpen(true)} className='my-4 text-sm text-[#04356B] btn btn-sm'>Ajouter un vehicule</button>
                            <Drawer open={open} onClose={() => setOpen(false)} anchor='right'>
                                <CategoryForm submitCar={submitCar} />
                            </Drawer>
                            <button type='submit' className="btn btn-sm texte-xs hover:bg-gray-900 font-medium my-2 mx-1 w-full rounded-md border-0 text-white shadow-sm bg-[#04356B]">
                                Ajouter un partenaire
                            </button>
                        </div>
                    </form>

                </div>

            </Drawer>
        </>
    )
}
