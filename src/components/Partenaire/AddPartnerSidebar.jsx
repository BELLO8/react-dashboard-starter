import { Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getAllPartner } from '../../redux/store/partner';
import { addPartner } from '../../services/PartenaireService';
import { Trash } from '../Icons/Trash';
import { UploadIcon } from '../Icons/upload';

export const AddPartnerSidebar = ({ setOpenSide, openSide }) => {
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm()
    const [recto, setRecto] = useState([]);
    const [verso, setVerso] = useState([]);
    const [photo, setPhoto] = useState([]);
    const [typePartner, setTypePartner] = useState()
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch()
    // const [vehicule, setVehicule] = useState([{ fullname: 'Toyota', cate: 'voiture', mat: "13236647", img: '' }]);
    // const [open, setOpen] = useState(false);
    // const [openUpdate, setOpenUpdate] = useState(false);
    // const [rowData, setRowData] = useState();

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
        addPartner({ ...data, typePartenaire: typePartner, pieceRecto: recto[0], pieceVerso: verso[0], photo: photo[0] }).then((res) => {
            setIsSubmit(false);
            if (res.status === 200) {
                dispatch(getAllPartner({ page: 0, param: '', size: 10 }))
                reset();
                setOpenSide(false)
                toast.success('Partenaire ajouté ')
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

    useEffect(() => {
        reset()
    }, [reset])

    return (
        <>
            <Drawer open={openSide} onClose={() => setOpenSide(false)} anchor='right'>
                <div className='bg-white w-[480px] px-8 mt-4'>
                    <h1 className='text-lg font-semibold'>Création d'un partenaire</h1>
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
                                    <p className='text-sm mx-1'>Photo ou logo</p>
                                </div>
                            </div>
                            <div className='my-2'>
                                <div>
                                    <label htmlFor="" className='text-sm font-medium'>Nom <sup className='text-rose-600'>*</sup></label>
                                </div>
                                <input type="text" placeholder="ex : Yao kofff" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('nom', { required: true })} />
                            </div>
                            <div className='my-2'>
                                <div>
                                    <label htmlFor="" className='text-sm font-medium'>Prenoms <sup className='text-rose-600'>*</sup></label>
                                </div>
                                <input type="text" placeholder="ex : Yao kofff" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('prenoms', { required: true })} />
                            </div>
                            <div className="my-2">
                                <div>
                                    <label htmlFor="" className='text-sm font-medium'>Type de partenaire<sup className='text-rose-600'>*</sup></label>
                                </div>
                                <select onChange={(e) => { setTypePartner(e.target.value) }} className="select select-bordered w-full ">
                                    <option selected>Selectionnez un element</option>
                                    <option value="PARTICULIER">Particulier</option>
                                    <option value='ENTREPRISE'>Entreprise</option>
                                </select>
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
                            <div className='my-2'>
                                <div>
                                    <label htmlFor="" className='text-sm font-medium'>Email<sup className='text-rose-600'>*</sup></label>
                                </div>
                                <input type="email" placeholder="ex : kofi@yao.ee" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('email', { required: true })} />
                            </div>
                            <div className='my-2'>
                                <div>
                                    <label htmlFor="" className='text-sm font-medium'>Mot de passe<sup className='text-rose-600'>*</sup></label>
                                </div>
                                <input type="password" className="px-3 my-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('password', { required: true })} />
                            </div>

                            <label className='text-sm font-medium'>Pièces d'identité</label>
                            <div className='grid grid-cols-2 gap-1'>
                                {
                                    recto.length !== 0 ? (
                                        recto.map((rectofile, index) => (
                                            <div key={index} className="text-indigo-600 py-14 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-md text-gray-900 shadow-sm "
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
                                        verso.map((versofile, index) => (
                                            <div key={index} className="text-indigo-600 py-1 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-md  py-2 text-gray-900 shadow-sm "
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
                            <input type="file" accept="image/jpeg, image/png " hidden id='recto' onChange={handleChangeRecto} />
                            <input type="file" accept="image/jpeg, image/png " hidden id='verso' onChange={handleChangeVerso} />
                            
                            {/* <div className='bg-gray-100  mt-3 rounded p-2'> <p className='text-xs font-medium'>Liste des vehicules</p> </div> */}
                            {/* {
                                vehicule.map((item, index) => (
                                    <div key={index} className='border mt-3 rounded-lg border-indigo-600 p-0.5 flex'>
                                        <div className='rounded-lg w-16 h-14 bg-slate-200'>
                                        </div>
                                        <div className='mx-2 mt-1'>
                                            <p className='text-sm font-semibold text-indigo-800'>{item.fullname} ({item.cate})</p>
                                            <p className='text-sm text-gray-400'>{item.mat}</p>
                                        </div>
                                        <div className='absolute right-8 mt-2'>
                                            <button className='btn btn-sm text-xs' onClick={() => {
                                                setOpenUpdate(true)
                                                setRowData(item)
                                            }} >modifier</button>
                                            <button className='btn btn-sm mx-2 text-xs' onClick={() => setVehicule(vehicule.filter((car) => car.fullname !== item.fullname))}>supprimer</button>
                                        </div>
                                    </div>
                                ))
                            }
                            <button onClick={() => setOpen(true)} className='my-4 text-sm text-[#04356B] btn btn-sm'>Ajouter un vehicule</button>
                            <Drawer open={open} onClose={() => setOpen(false)} anchor='right'>
                                <VehiculeForm submitCar={submitCar} />
                            </Drawer> */}

                            {/* <Drawer open={openUpdate} onClose={() => setOpenUpdate(false)} anchor='right'>
                                <UpdateFormVehicule submitCar={submitCar} data={rowData} />
                            </Drawer> */}

                            <button type='submit'
                                disabled={isSubmit ? true : false}
                                className={`${!isSubmit
                                    ? "text-white bg-indigo-900"
                                    : "text-slate-800 bg-slate-200 "
                                    } w-full my-3 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                            >
                                {!isSubmit ? "Ajouter un partenaire" : "Veuillez patientez..."}{" "}
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
