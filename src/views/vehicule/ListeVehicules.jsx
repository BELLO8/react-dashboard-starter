import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statusCar } from '../../Utils/Utils';
import { ShowCarSideBar } from '../../components/ShowCarSideBar';
import { Car } from '../../components/Widget/Car';
import { Tabs } from '../../components/Widget/Tab';
import { LoadingCar } from '../../components/categorie/LoadingCar';
import { documentCar, files, getCars, getDriver } from '../../redux/store/car';

export const ListeVehicules = () => {
    const dispatch = useDispatch();
    const vehicules = useSelector((state) => state.car.vehicules)
    const loading = useSelector((state) => state.car.loading)
    const [search, setSearch] = useState("")
    const [openSideUpdate, setOpenSideUpdate] = useState(false);
    const [vehicule, setVehicule] = useState({})
    const [active, setActive] = useState({ index: 0, value: 'ATTENTE_DE_VALIDATION' });

    useEffect(() => {
        dispatch(getCars({ page: 0, param: active.value, size: 10 }))
    }, [dispatch, active])

    const more = async (page) => {
        dispatch(getCars({ page: page - 1, param: active.value, size: 10 }))
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
                                onChange={(e) => {
                                    dispatch(getCars({ page: 0, param: e.target.value, size: 10 }))
                                }}
                            />
                        </label>

                    </div>
                    <Tabs tabsData={statusCar} setActive={setActive} active={active} />

                    {vehicules?.length === 0 && !loading ?
                        (
                            <div className="py-3 flex justify-center">
                                <img src="https://www.agencija-corrigo.com/build/images/background/no-results-bg.2d2c6ee3.png" height={350} width={250} alt="" />
                            </div>
                        ) : !loading && vehicules?.vehicules !== 0 ? (
                            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                                {vehicules?.vehicules?.map((item, index) => (
                                    <Car key={index} item={item} handleClick={() => {
                                        setOpenSideUpdate(true)
                                        setVehicule({ id: item.id, status: item.statusEnregistrement })
                                        dispatch(files(item.id))
                                        dispatch(getDriver(item.id))
                                        dispatch(documentCar(item.id))
                                    }} />
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
