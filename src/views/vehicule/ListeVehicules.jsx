import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShowCarSideBar } from '../../components/ShowCarSideBar';
import { LoadingCar } from '../../components/categorie/LoadingCar';
import { files, getCars } from '../../redux/store/car';

export const ListeVehicules = () => {
    const dispatch = useDispatch();
    const vehicules = useSelector((state) => state.car.vehicules)
    const loading = useSelector((state) => state.car.loading)
    const [search, setSearch] = useState("")
    const [openSideUpdate, setOpenSideUpdate] = useState(false);
    const [vehicule, setVehicule] = useState()

    useEffect(() => {
        dispatch(getCars({ page: 0, param: '', size: 10 }))
    }, [dispatch])

    const more = async (page) => {
        dispatch(getCars({ page: page - 1, param: '', size: 10 }))
    }

    return (
        <div className='p-3 pt-7'>
            <div className="relative">
                <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900">
                    Vehicules
                </h1>
                <div className="flex flex-col my-2 lg:py-0">
                    <div className="flex items-end gap-x-3">
                        <label className="form-control w-80">
                            <div className="label">
                                <span className="label-text text-xs font-medium -mb-1">
                                    Rechercher
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher un élément..."
                                className="input input-bordered  h-10 text-sm"
                                onChange={(e) => { setSearch(e.target.value) }}
                            />
                        </label>
                        <button onClick={() => {
                            dispatch(getCars({ page: 0, param: search, size: 10 }))
                        }} className="btn btn-sm w-fit h-10 px-4 rounded-lg bg-main text-white text-sm font-semibold">
                            Rechercher
                        </button>

                    </div>
                    {vehicules?.length === 0 && !loading ?
                        (
                            <div className="py-3 flex justify-center">
                                <img src="https://www.agencija-corrigo.com/build/images/background/no-results-bg.2d2c6ee3.png" height={350} width={250} alt="" />
                            </div>
                        ) : !loading && vehicules?.vehicules !== 0 ? (
                            <div className="mt-6 grid grid-cols-4 gap-4">
                                {vehicules?.vehicules?.map((item, index) => (
                                    <div onClick={() => {
                                        setOpenSideUpdate(true)
                                        setVehicule({ id: item.id, status: item.statusEnregistrement })
                                        dispatch(files(item.id))
                                    }} className='bg-white shadow-sm cursor-pointer border border-dashed rounded-lg relative'>

                                        <div className='mx-2 my-4 flex'>
                                            <div style={{ backgroundImage: `url("https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20_Modelpc.png")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className="bg-gray-200 rounded w-32 h-14 border-2 mb-2">
                                            </div>

                                            <div className='mx-2 space-y-1'>
                                                <p className='text-sm font-semibold truncate'>
                                                    {
                                                        item.marque + ' ' + item.modele
                                                    }
                                                </p>
                                                <p className='text-xs text-gray-300 text-gray-400 truncate'>
                                                    {
                                                        item.numeroMatriculation ?? ''
                                                    }

                                                </p>
                                                <p className="text-xs  text-gray-500 text-center font-medium">
                                                    <div className="flex space-x-1">
                                                        <p>status : </p>
                                                        <p className={item.statusEnregistrement === 'TERMINE' ? 'text-green-500 font-bold' : 'text-orange-500 font-bold'}>{item.statusEnregistrement === 'TERMINE' ? 'validé' : item.statusEnregistrement === 'EN_COURS' ? 'en cours' : 'Rejeté'}</p>
                                                    </div>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : <LoadingCar />}

                    <ShowCarSideBar openSide={openSideUpdate} setOpenSide={setOpenSideUpdate} id={vehicule?.id} status={vehicule?.status} />

                    {
                        loading ? null : (
                            <div className='my-3 flex justify-end'>
                                <Pagination
                                    onChange={(event, newValue) => more(newValue)}
                                    onSelect={selectedPage => more(selectedPage)}
                                    count={vehicules?.totalPages}
                                    variant="outlined" color='primary' shape="rounded" />
                            </div>
                        )
                    }


                </div>
            </div>

        </div>
    )
}
