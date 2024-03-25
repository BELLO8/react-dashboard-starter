import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { getAllPartnerCar } from '../../redux/store/partner';
import { addCar } from '../../services/CarService';
import { UploadIcon } from '../Icons/upload';

export const VehiculeForm = () => {
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm()
    const [category, setCategory] = useState();
    const [assurance, setAssurance] = useState([]);
    const [cartGrise, setCarteGrise] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const carCategory = useSelector((state) => state.categoryCar.categoryCar);
    const { id } = useParams()
    const dispatch = useDispatch()
    const [typeFichier, setTypeFicher] = useState([
        { id: 'AVANT', image: null, description: 'Avant' },
        { id: 'ARRIERE', image: null, description: 'Arriere' },
        { id: 'GAUCHE', image: null, description: 'Gauche' },
        { id: 'DROITE', image: null, description: 'Droit' },
        { id: 'INTERIEUR', image: null, description: 'Interieur' },
    ]);

    const handleImageUpload = (cardId, selectedFile) => {

        const updatedFichier = typeFichier.map(fichier => {
            if (fichier.id === cardId) {
                return { ...fichier, image: selectedFile };
            }
            return fichier;
        });
        setTypeFicher(updatedFichier);
    };

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
            const newFiles = Array.from(selectedFiles)
            setAssurance(newFiles)
        }
    }

    const handleChangeImageCarteGrise = (e) => {
        const selectedFiles = e.target.files;
        if (cartGrise.length <= 0) {
            const newFiles = Array.from(selectedFiles)
            setCarteGrise(prevFiles => [...prevFiles, ...newFiles])
        } else {
            const newFiles = Array.from(selectedFiles)
            setCarteGrise(newFiles)
        }
    }

    useEffect(() => {
        reset()
    }, [reset])

    const submitCar = (data) => {
        const categories = [];
        const files = [];
        category?.map((item) => {
            return categories.push(item.value)
        })
        typeFichier.map((fichier) => {
            return files.push(fichier.image)
        })

        setIsSubmit(true)
        addCar(id, { ...data, categories: categories, listOrienatations: ['AVANT', 'ARRIERE', 'GAUCHE', 'DROITE', 'INTERIEUR'], typeFichiers: ['ASSURANCE', 'CARTE_GRISE'], fichiers: [assurance[0], cartGrise[0]], listPhotosVehicule: files }).then((res) => {
            setIsSubmit(false);
            if (res.status === 200) {
                dispatch(getAllPartnerCar({ id: id, page: 0, param: '', size: 10 }))
                toast.success('Vehicule ajouté ')
            }
            reset()
        }).catch((err) => {
            setIsSubmit(false)
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

                    <label htmlFor="" className='text-sm font-medium'>Assurance et carte grise du vehicule<sup className='text-rose-600'>*</sup></label>
                    <div className="flex gap-x-1">
                        {
                            assurance.length !== 0 ? (
                                assurance.map((assur, index) => (
                                    <div key={index} className="text-indigo-600 py-14 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-md text-gray-900 shadow-sm "
                                        style={{
                                            background: "url('" + URL.createObjectURL(assur) + "') no-repeat center/cover"
                                        }}
                                        onClick={() => document.getElementById('assurance').click()}
                                    >
                                    </div>
                                ))

                            ) : (
                                <div className="text-indigo-600 py-8 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-md text-gray-900 shadow-sm "
                                    onClick={() => document.getElementById('assurance').click()}
                                >
                                    <div className='flex justify-center mb-3'>
                                        <UploadIcon />
                                    </div>

                                    <div>
                                        <p className='text-center text-sm mx-1'>Assurance du vehicule</p>
                                    </div>
                                </div>
                            )
                        }

                        {
                            cartGrise.length !== 0 ? (
                                cartGrise.map((grise, index) => (
                                    <div key={index} className="text-indigo-600 py-14 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-md text-gray-900 shadow-sm "
                                        style={{
                                            background: "url('" + URL.createObjectURL(grise) + "') no-repeat center/cover"
                                        }}
                                        onClick={() => document.getElementById('grise').click()}
                                    >
                                    </div>
                                ))

                            ) : (
                                <div className="text-indigo-600 py-8 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-md text-gray-900 shadow-sm "
                                    onClick={() => document.getElementById('grise').click()}
                                >
                                    <div className='flex justify-center mb-3'>
                                        <UploadIcon />
                                    </div>

                                    <div>
                                        <p className='text-center text-sm mx-1'>Carte grise du vehicule</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    <input type="file" accept="image/jpeg, image/png " hidden id='assurance' onChange={handleChangeImageAssurance} />
                    <input type="file" accept="image/jpeg, image/png " hidden id='grise' onChange={handleChangeImageCarteGrise} />

                    <label htmlFor="" className='text-sm font-medium'>Images du vehicule<sup className='text-rose-600'>*</sup></label>
                    <div className='grid grid-cols-3 gap-x-1'>
                        {typeFichier.map(card => (
                            <div key={card.id}>
                                {
                                    card.image != null ? (
                                        <div className="text-indigo-600 py-14 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-md text-gray-900 shadow-sm "
                                            style={{
                                                background: "url('" + URL.createObjectURL(card.image) + "') no-repeat center/cover"
                                            }}
                                            onClick={() => document.getElementById(`fileInput${card.id}`).click()}
                                        >
                                        </div>
                                    ) : (
                                        <div className="text-indigo-600 py-8 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-md text-gray-900 shadow-sm "
                                            onClick={() => document.getElementById(`fileInput${card.id}`).click()}
                                        >
                                            <div className='flex justify-center mb-3'>
                                                <UploadIcon />
                                            </div>

                                            <div>
                                                <p className='text-center text-sm mx-1'>{card.description}</p>
                                            </div>
                                        </div>
                                    )
                                }

                                <input hidden accept="image/jpeg, image/png " type="file" id={`fileInput${card.id}`} onChange={(e) => handleImageUpload(card.id, e.target.files[0])} />
                            </div>
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
