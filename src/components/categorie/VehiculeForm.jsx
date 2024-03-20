import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { addCar } from '../../services/CarService';
import { Trash } from '../Icons/Trash';
import { UploadIcon } from '../Icons/upload';

export const VehiculeForm = () => {
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm()
    const [category, setCategory] = useState();
    const [assurance, setAssurance] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const carCategory = useSelector((state) => state.categoryCar.categoryCar);
    const { id } = useParams()
    const carCategoryOption = []

    carCategory?.categoriesVehicule?.map((item) => {
        return carCategoryOption.push({ value: item.id, label: item.designation, description: item.description })
    })

    const handleChangeImageAssurance = (e) => {
        const selectedFiles = e.target.files;
        if (assurance.length <= 0) {
            const newFiles = Array.from(selectedFiles)
            setAssurance(prevFiles => [...prevFiles, ...newFiles])
        } else {
            toast.error('Uniquement un fichier à uploader')
        }
    }

    useEffect(() => {
        reset()
    }, [reset])

    const submitCar = (data) => {
        const categories = [];
        category?.map((item) => {
            return categories.push(item.value)
        })
        console.log({ ...data, categories: categories, partenaireId: id, fichier: assurance[0] });
        setIsSubmit(true)
        addCar({ ...data, categories: categories, partenaireId: id, fichier: assurance[0] }).then((res) => {
            setIsSubmit(false);
            if (res.status === 200) {
                toast.success('Vehicule ajouté ')
            }
            console.log(res);
        }).catch((err) => {
            setIsSubmit(false)
            console.log(err);
            if (err.response.status === 500) {
                toast.error(err.response.data)
            }
        })

    }

    return (
        <>
            <div className='bg-white w-[480px] px-8 mt-4'>
                <h1 className='text-lg font-semibold'>Ajouter un vehicule</h1>
                {errors && <span className="text-sm text-rose-600">Renseignez tout les champs</span>}
                <form onSubmit={handleSubmit(submitCar)}>
                    <div className='my-8'>
                        <div>
                            <label htmlFor="" className='text-sm font-medium'>Categorie de vehicule</label>
                            <Select
                                closeMenuOnSelect={false}
                                isMulti
                                options={carCategoryOption}
                                onChange={(e) => { setCategory(e); }}
                            />
                        </div>
                        <div className='my-2'>
                            <div>
                                <label htmlFor="" className='text-sm font-medium'>Couleur<sup className='text-rose-600'>*</sup></label>
                            </div>
                            <input type="text" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                {...register('couleur', { required: true })} />
                        </div>
                        <div className='my-2'>
                            <div>
                                <label htmlFor="" className='text-sm font-medium'>Marque<sup className='text-rose-600'>*</sup></label>
                            </div>
                            <input type="text" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                {...register('marque', { required: true })} />
                        </div>
                        <div className='my-2'>
                            <div>
                                <label htmlFor="" className='text-sm font-medium'>Modele<sup className='text-rose-600'>*</sup></label>
                            </div>
                            <input type="text" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                {...register('modele', { required: true })} />
                        </div>

                        <div className='my-2'>
                            <div>
                                <label htmlFor="" className='text-sm font-medium'>Numero de chassis<sup className='text-rose-600'>*</sup></label>
                            </div>
                            <input type="text" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                {...register('numeroChassis', { required: true })} />
                        </div>

                        <div className='my-2'>
                            <div>
                                <label htmlFor="" className='text-sm font-medium'>Numero de Matriculation<sup className='text-rose-600'>*</sup></label>
                            </div>
                            <input type="text" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                {...register('numeroMatriculation', { required: true })} />
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

                    <button type='submit'
                        disabled={isSubmit ? true : false}
                        className={`${!isSubmit
                            ? "text-white bg-indigo-900"
                            : "text-slate-800 bg-slate-200 "
                            } w-full my-3 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                    >
                        {!isSubmit ? "Ajouter un vehicule" : "Veuillez patientez..."}{" "}
                        {isSubmit ? (
                            <span className="loading loading-dots loading-xs"></span>
                        ) : null}
                    </button>
                </form>
            </div>
        </>
    )
}
