import { Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllPartnerDriver } from '../../redux/store/partner';
import { addDriver } from '../../services/PartenaireService';
import { Trash } from '../Icons/Trash';
import { UploadIcon } from '../Icons/upload';

export const AddChauffeurSidebar = ({ setOpenSide, openSide }) => {
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm()
    const [recto, setRecto] = useState([]);
    const [verso, setVerso] = useState([]);
    const [photo, setPhoto] = useState([]);
    const [permisPhoto, setPermisPhoto] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();
    const handleChangeRecto = (e) => {
        const selectedFiles = e.target.files;
        if (recto.length <= 0) {
            const newFiles = Array.from(selectedFiles)
            setRecto(prevFiles => [...prevFiles, ...newFiles])
        } else {
            const newFiles = Array.from(selectedFiles)
            setRecto(newFiles)
        }
    }
    const handleChangeVerso = (e) => {
        const selectedFiles = e.target.files;
        if (verso.length <= 0) {
            const newFiles = Array.from(selectedFiles)
            setVerso(prevFiles => [...prevFiles, ...newFiles])
        } else {
            const newFiles = Array.from(selectedFiles)
            setVerso(newFiles)
        }
    }

    const handleChangePermiPhoto = (e) => {
        const selectedFiles = e.target.files;
        if (permisPhoto.length <= 0) {
            const newFiles = Array.from(selectedFiles)
            setPermisPhoto(prevFiles => [...prevFiles, ...newFiles])
        } else {
            const newFiles = Array.from(selectedFiles)
            setPermisPhoto(newFiles)
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
        setIsSubmit(true)
        addDriver(id, { ...data, photo: photo, permisConduire: permisPhoto, cniRecto: recto, cniVerso: verso }).then((res) => {
            setIsSubmit(false);
            if (res.status === 200) {
                dispatch(getAllPartnerDriver({ id: id, page: 0, param: '', size: 10 }))
                reset();
                setOpenSide(false)
                toast.success('Partenaire ajouté ')
            }
        }).catch((err) => {
            setIsSubmit(false)
            console.log(err);
            if (err.response.status === 500) {
                toast.error(err.response.data)
            }
        })
    }


    useEffect(() => {
        reset()
    }, [reset])

    return (
        <>
            <Drawer open={openSide} onClose={() => setOpenSide(false)} anchor='right'>
                <div className='bg-white w-[480px] px-8 mt-4'>
                    <h1 className='text-lg font-semibold'>Ajouter un chauffeur</h1>
                    <div>
                        {errors.assurance && <span className="text-sm text-rose-600">Renseignez tout les champs</span>}
                    </div>

                    <form onSubmit={handleSubmit(submit)}>
                        <div className='my-8'>
                            <input type="file" accept="image/jpeg, image/png " hidden id='photo' onChange={handleChangePhoto} />
                            <div className='border rounded-full w-28 h-28 bg-slate-100'>
                                {photo?.map((file, index) => (
                                    <div key={index} className='rounded-full w-28 h-28' style={{
                                        background: "url('" + URL.createObjectURL(file) + "') no-repeat center/cover"
                                    }}>
                                        <button className='bg-white rounded text-rose-800 text-sm p-1 m-1' onClick={() => {
                                            setPhoto(photo.filter(deleteFile => deleteFile !== file))
                                        }}>
                                            <Trash />
                                        </button></div>
                                ))}
                            </div>
                            <div className="flex w-48 text-indigo-600 mb-8 justify-center bg-gray-200 border-indigo-300 p-2 my-2 rounded-lg shadow-sm "
                                onClick={() => document.getElementById('photo').click()}
                            >
                                <div className='flex'>
                                    <UploadIcon />
                                </div>
                                <div>
                                    <p className='text-sm mx-1'>Ajouter une photo</p>
                                </div>
                            </div>
                            <div className='my-2'>
                                <div>
                                    <label htmlFor="" className='text-sm font-medium'>Nom<sup className='text-rose-600'>*</sup></label>
                                </div>
                                <input type="text" placeholder="ex : Yao kofff" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('nom', { required: true })} />
                            </div>
                            <div className='my-2'>
                                <div>
                                    <label htmlFor="" className='text-sm font-medium'>Prenoms<sup className='text-rose-600'>*</sup></label>
                                </div>
                                <input type="text" placeholder="ex : kofff" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('prenoms', { required: true })} />
                            </div>
                            <div className='my-2'>
                                <div>
                                    <label htmlFor="" className='text-sm font-medium'>Email<sup className='text-rose-600'>*</sup></label>
                                </div>
                                <input type="text" placeholder="ex : kofff" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('email', { required: true })} />
                            </div>
                            <div className='my-2'>
                                <div>
                                    <label htmlFor="" className='text-sm font-medium'>Adresse<sup className='text-rose-600'>*</sup></label>
                                </div>
                                <input type="text" placeholder="ex : Palm ci" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('lieuHabitation', { required: true })} />
                            </div>
                            <div className='my-2'>
                                <div>
                                    <label htmlFor="" className='text-sm font-medium'>Numéro de téléphone<sup className='text-rose-600'>*</sup></label>
                                </div>
                                <input type="text" placeholder="ex : 002587663321" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('numero', { required: true })} />
                            </div>

                            <label className='text-sm font-medium'>Pièces d'identité</label>
                            <div className='grid grid-cols-2 gap-1'>
                                {
                                    recto.length !== 0 ? (
                                        recto.map((rectofile) => (
                                            <div className="text-indigo-600 py-14 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-md text-gray-900 shadow-sm "
                                                style={{
                                                    background: "url('" + URL.createObjectURL(rectofile) + "') no-repeat center/cover"
                                                }}
                                                onClick={() => document.getElementById('recto').click()}
                                            >
                                            </div>
                                        ))

                                    ) : (
                                        <div className="text-indigo-600 py-8 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-md text-gray-900 shadow-sm "
                                            onClick={() => document.getElementById('recto').click()}
                                        >
                                            <div className='flex justify-center mb-3'>
                                                <UploadIcon />
                                            </div>

                                            <div>
                                                <p className='text-center text-sm mx-1'>Piece Recto</p>
                                            </div>
                                        </div>
                                    )
                                }


                                {
                                    verso.length !== 0 ? (
                                        verso.map((versofile) => (
                                            <div className="text-indigo-600 py-1 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-md  py-2 text-gray-900 shadow-sm "
                                                style={{
                                                    background: "url('" + URL.createObjectURL(versofile) + "') no-repeat center/cover"
                                                }}
                                                onClick={() => document.getElementById('verso').click()}
                                            >
                                            </div>
                                        ))

                                    ) : (
                                        <div className="text-indigo-600 py-8 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-md text-gray-900 shadow-sm "
                                            onClick={() => document.getElementById('verso').click()}
                                        >
                                            <div className='flex justify-center mb-3'>
                                                <UploadIcon />
                                            </div>

                                            <div>
                                                <p className='text-center text-sm mx-1'>Piece verso</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                            <label className='text-sm font-medium'>Permis de conduit</label>
                            {
                                permisPhoto.length !== 0 ? (
                                    permisPhoto.map((permis) => (
                                        <div className="h-36 text-indigo-600 py-1 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-md  py-2 text-gray-900 shadow-sm "
                                            style={{
                                                background: "url('" + URL.createObjectURL(permis) + "') no-repeat center/cover"
                                            }}
                                            onClick={() => document.getElementById('permis').click()}
                                        >
                                        </div>
                                    ))

                                ) : (
                                    <div className="text-indigo-600 py-8 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-md text-gray-900 shadow-sm "
                                        onClick={() => document.getElementById('permis').click()}
                                    >
                                        <div className='flex justify-center mb-3'>
                                            <UploadIcon />
                                        </div>

                                        <div>
                                            <p className='text-center text-sm mx-1'>Permis de conduit</p>
                                        </div>
                                    </div>
                                )
                            }
                            <input type="file" accept="image/jpeg, image/png " hidden id='recto' onChange={handleChangeRecto} />
                            <input type="file" accept="image/jpeg, image/png " hidden id='verso' onChange={handleChangeVerso} />
                            <input type="file" accept="image/jpeg, image/png " hidden id='permis' onChange={handleChangePermiPhoto} />
                            <button type='submit'
                                disabled={isSubmit ? true : false}
                                className={`${!isSubmit
                                    ? "text-white bg-indigo-900"
                                    : "text-slate-800 bg-slate-200 "
                                    } w-full my-3 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                            >
                                {!isSubmit ? "Ajouter un chauffeur" : "Veuillez patientez..."}{" "}
                                {isSubmit ? (
                                    <span className="loading loading-dots loading-xs"></span>
                                ) : null}
                            </button>
                        </div>
                    </form>

                </div >

            </Drawer >
        </>
    )
}
