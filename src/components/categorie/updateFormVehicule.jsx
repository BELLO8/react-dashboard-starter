import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Trash } from '../Icons/Trash';
import { UploadIcon } from '../Icons/upload';

export const UpdateFormVehicule = ({ submitCar, data }) => {
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm()

    const [assurance, setAssurance] = useState([]);

    const handleChangeImageAssurance = (e) => {
        const selectedFiles = e.target.files;
        if (assurance.length <= 0) {
            const newFiles = Array.from(selectedFiles)
            setAssurance(prevFiles => [...prevFiles, ...newFiles])
        } else {
            toast.error('Uniquement un fichier à uploader')
        }
    }

    const vehiculeCategorie = [{ name: 'Toyota' }];

    useEffect(() => {
        reset()
    }, [reset])

    return (
        <>
            <div className='bg-white w-[480px] px-8 mt-4'>
                <h1 className='text-lg font-semibold'>Ajouter un vehicule</h1>
                {errors && <span className="text-sm text-rose-600">Renseignez tout les champs</span>}
                <form onSubmit={handleSubmit(submitCar)}>
                    <div className='my-8'>
                        <div>
                            <label htmlFor="" className='text-sm font-medium'>Categorie de vehicule</label>
                            <label className="form-control w-full min-w-xs">
                                <select className="select rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                                    <option disabled selected>Selectionnez une categorie vehicule</option>
                                    {vehiculeCategorie.map((item) => (
                                        <option>{item.name}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className='my-2'>
                            <div>
                                <label htmlFor="" className='text-sm font-medium'>Nom du vehicule<sup className='text-rose-600'>*</sup></label>
                            </div>
                            <input defaultValue={data.fullname} type="text" placeholder="ex : toyo" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                {...register('fullname', { required: true })} />
                        </div>
                        <div className='my-2'>
                            <div>
                                <label htmlFor="" className='text-sm font-medium'>Matricule<sup className='text-rose-600'>*</sup></label>
                            </div>
                            <input defaultValue={data.mat} type="text" placeholder="ex : A55588648" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                {...register('mat', { required: true })} />
                        </div>
                    </div>

                    <div className="text-indigo-600 py-8 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-md  py-2 text-gray-900 shadow-sm "
                        onClick={() => document.getElementById('assurance').click()}
                    >
                        <div className='flex justify-center mb-3'>
                            <UploadIcon />
                        </div>

                        <div>
                            <p className='text-center text-sm mx-1'>Uploader votre assurance de vehicule</p>
                        </div>
                    </div>
                    <input type="file" accept="image/jpeg, image/png " hidden id='assurance' onChange={handleChangeImageAssurance} />

                    <div className='grid grid-cols-2 gap-1'>
                        {assurance?.map((file, index) => (
                            <div key={index} className='rounded min-h-40 mx-1 border' style={{
                                background: "url('" + URL.createObjectURL(file) + "') no-repeat center/cover"
                            }}>
                                <button className='bg-white rounded text-rose-800 text-sm p-1 m-1' onClick={() => {
                                    setAssurance(assurance.filter(deleteFile => deleteFile !== file))
                                }}>
                                    <Trash />
                                </button></div>
                        ))}
                    </div>

                    <button type='submit' className="btn btn-sm texte-xs hover:bg-gray-900 font-medium my-2 mx-1 w-full rounded-md border-0 text-white shadow-sm bg-[#04356B]">
                        Ajouter un vehicule
                    </button>
                </form>
            </div>
        </>
    )
}
