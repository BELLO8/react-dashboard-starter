import { Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getAllUser } from '../../redux/store/user';
import { addUser } from '../../services/UserService';

export const AddUserSidebar = ({ setOpenSide, openSide }) => {
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm()
    const [isSubmit, setIsSubmit] = useState(false);

    const dispatch = useDispatch();

    const submit = (data) => {
        setIsSubmit(true)
        addUser(data).then((res) => {
            setIsSubmit(false);
            if (res.status === 200) {
                dispatch(getAllUser({ page: 0, param: '', size: 10 }))
                reset();
                setOpenSide(false)
                toast.success('Utilisateur ajouté ')
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
                <div className='bg-white w-96 px-8 mt-4'>
                    <h1 className='text-lg font-semibold'>Création d'un utilisateur</h1>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className='my-12'>
                            <div className='my-2'>
                                <label htmlFor="" className='text-sm font-medium'>Nom et prenoms</label>
                                <input type="text" placeholder="ex : Yao kofff" className="px-3 my-2 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('nom', { required: true })} />
                                {errors.nom && <span className="text-sm text-rose-600">Ce champs est obligatoire</span>}
                            </div>
                            <div className='my-2'>
                                <label htmlFor="" className='text-sm font-medium'>Username</label>
                                <input type="text" placeholder="ex : @yao" className="px-3 my-2 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('username', { required: true })} />
                                {errors.username && <span className="text-sm text-rose-600">Ce champs est obligatoire</span>}
                            </div>
                            <div className='my-2'>
                                <label htmlFor="" className='text-sm font-medium'>Email</label>
                                <input type="text" placeholder="ex : kofi@yao.ee" className="px-3 my-2 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('email', { required: true })} />
                                {errors.email && <span className="text-sm text-rose-600">Ce champs est obligatoire</span>}
                            </div>

                            <div className='my-2'>
                                <label htmlFor="" className='text-sm font-medium'>Numéro de téléphone</label>
                                <input type="text" placeholder="ex : 002587663321" className="px-3 my-2 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('numero', { required: true })} />
                                {errors.numero && <span className="text-sm text-rose-600">Ce champs est obligatoire</span>}
                            </div>

                            <div className='my-2'>
                                <label htmlFor="" className='text-sm font-medium'>Mot de passe</label>
                                <input type="password" placeholder="ex : Palm ci" className="px-3 my-2 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                    {...register('password', { required: true })} />
                                {errors.password && <span className="text-sm text-rose-600">Ce champs est obligatoire</span>}
                            </div>

                            <button type='submit'
                                disabled={isSubmit ? true : false}
                                className={`${!isSubmit
                                    ? "text-white bg-indigo-900"
                                    : "text-slate-800 bg-slate-200 "
                                    } w-full my-3 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                            >
                                {!isSubmit ? "Ajouter un utilisateur" : "Veuillez patientez..."}{" "}
                                {isSubmit ? (
                                    <span className="loading loading-dots loading-xs"></span>
                                ) : null}
                            </button>
                        </div>
                    </form>

                </div>

            </Drawer>
        </>
    )
}
