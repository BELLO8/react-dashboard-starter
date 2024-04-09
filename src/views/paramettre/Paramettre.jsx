import React, { useEffect, useState } from 'react';
import { tabConfigs } from '../../Utils/Utils';
import { Configuration } from '../../components/Configurations/Configuration';
import { SonConfig } from '../../components/Configurations/SonConfig';
import { Tabs } from '../../components/Widget/Tab';
import { getParametre } from '../../services/paramettre';
import { Avis } from '../avis/Avis';

export const Paramettre = () => {
    const [param, setParam] = useState();
    const [active, setActive] = useState({ index: 0, value: 'DISTANCE_LOCALISATION' });
    const [data, setData] = useState([])

    useEffect(() => {

        const getParams = async () => {
            try {
                const responses = await getParametre();
                setParam(responses.data)
            } catch (error) {
                console.log(error);
            }

        }
        getParams()

        setData(config.filter((item) => {
            return item.param === active.value
        }))

    }, [active.value])
    console.log(data);
    const config = [
        {
            id: 1,
            description: 'Distance de localisation ( Kilomettres )',
            param: 'DISTANCE_LOCALISATION',
            defaultValue: param?.distanceLocalisationDriver,
            message: 'Distance de localisation appliquée'
        },
        {
            id: 2,
            description: 'frequence de localisation ( Seconds )',
            param: 'FREQUENCE_LOCALISATION',
            defaultValue: param?.frequenceLocalisation,
            message: 'Frequence de localisation appliquée'
        },
        {
            id: 3,
            description: 'Version en cours de deploiement',
            param: 'VERSION_DEPLOIEMENT',
            defaultValue: param?.versionDriverEnCoursDeploiement,
            message: 'Version de deploiement appliquée'
        }
    ]


    return (
        <div className='p-3 pt-7'>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900">
                Configurations
            </h1>
            <Tabs tabsData={tabConfigs} setActive={setActive} active={active} />

            <div className="my-8 lg:py-0">
                {
                    data.map((item) => (
                        <Configuration key={item.id}
                            description={item.description}
                            message={item.message}
                            defaultValue={item.defaultValue}
                            param={item.param} />
                    ))
                }
                {
                    active.value === 'SON' ? (<SonConfig />) : active.value === 'AVIS' ? (<Avis />) : null
                }

                {/* <div className="bg-white w-[500px] rounded-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="space-y-4 md:space-y-6 sm:p-8">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Distance de localisation ( Kilomettres )
                            </label>
                            <input
                                type="text"
                                onChange={(e) => setDistance(e.target.value)}
                                defaultValue={param?.distanceLocalisationDriver}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                            />
                        </div>

                        <button
                            type="submit"
                            onClick={() => {

                                addOrEditParamettre({ valeur: distance, parametre: 'DISTANCE_LOCALISATION' }).then((res) => {
                                    toast.success('Distance de localisation appliquée')

                                }).catch((err) => {
                                    console.log(err);
                                    if (err.response.status === 500) {
                                        toast.error(err.response.data)
                                    }
                                })
                            }}
                            disabled={isSubmit ? true : false}
                            className={`${!isSubmit
                                ? "text-white bg-indigo-900"
                                : "text-slate-800 bg-slate-200 "
                                } w-full  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                        >
                            {!isSubmit ? "Appliquer" : "Veuillez patientez..."}{" "}
                            {isSubmit ? (
                                <span className="loading loading-dots loading-xs"></span>
                            ) : null}
                        </button>

                    </div>
                </div>

                <div className="mt-3 bg-white w-[500px] rounded-xl dark:border  sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="space-y-4 md:space-y-6 sm:p-8">

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                frequence de localisation ( Seconds )
                            </label>
                            <input
                                type="text"
                                onChange={(e) => setFrequence(e.target.value)}
                                defaultValue={param?.frequenceLocalisation}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                            />
                        </div>

                        <button
                            type="submit"
                            onClick={() => {

                                addOrEditParamettre({ valeur: frenquence, parametre: 'FREQUENCE_LOCALISATION' }).then((res) => {
                                    console.log(res);
                                    toast.success('Frequence de localisation appliquée')

                                }).catch((err) => {
                                    console.log(err);
                                    if (err.response.status === 500) {
                                        toast.error(err.response.data)
                                    }
                                })
                            }}
                            disabled={isSubmit ? true : false}
                            className={`${!isSubmit
                                ? "text-white bg-indigo-900"
                                : "text-slate-800 bg-slate-200 "
                                } w-full  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                        >
                            {!isSubmit ? "Appliquer" : "Veuillez patientez..."}{" "}
                            {isSubmit ? (
                                <span className="loading loading-dots loading-xs"></span>
                            ) : null}
                        </button>

                    </div>
                </div>

                <div className="mt-3 bg-white w-[500px] rounded-xl dark:border  sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="space-y-4 md:space-y-6 sm:p-8">

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Version en cours de deploiement
                            </label>
                            <input
                                type="text"
                                onChange={(e) => setVersion(e.target.value)}
                                defaultValue={param?.versionDriverEnCoursDeploiement}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                            />
                        </div>

                        <button
                            type="submit"
                            onClick={() => {

                                addOrEditParamettre({ valeur: version, parametre: 'VERSION_DEPLOIEMENT' }).then((res) => {
                                    console.log(res);
                                    toast.success('Version de deploiement appliquée')

                                }).catch((err) => {
                                    console.log(err);
                                    if (err.response.status === 500) {
                                        toast.error(err.response.data)
                                    }
                                })
                            }}
                            disabled={isSubmit ? true : false}
                            className={`${!isSubmit
                                ? "text-white bg-indigo-900"
                                : "text-slate-800 bg-slate-200 "
                                } w-full  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                        >
                            {!isSubmit ? "Appliquer" : "Veuillez patientez..."}{" "}
                            {isSubmit ? (
                                <span className="loading loading-dots loading-xs"></span>
                            ) : null}
                        </button>

                    </div>
                </div> */}


                {/* <div className="mt-3 bg-white w-[500px] rounded-xl dark:border  sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="space-y-4 md:space-y-6 sm:p-8">

                        <div>
                            <label className="text-sm font-medium">Ajouter une sonnerie</label>
                            {
                                son ? (
                                    <div>
                                        <div className="text-indigo-600 py-14 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-[10px] text-gray-900 shadow-sm "
                                            style={{
                                                background: "url('https://pixabay.com/static/img/audio/sfx_thumbnail_7.svg') no-repeat center/cover"
                                            }}
                                            onClick={() => document.getElementById('son').click()}
                                        >
                                        </div>
                                        <p className='text-sm'>{son[0]?.name}</p>
                                    </div>


                                ) : param?.son?.id !== null ? (
                                    <div>
                                        <div className="text-indigo-600 py-14 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-[10px] text-gray-900 shadow-sm "
                                            style={{
                                                background: "url('https://pixabay.com/static/img/audio/sfx_thumbnail_6.svg') no-repeat center/cover"
                                            }}
                                            onClick={() => document.getElementById('son').click()}
                                        >
                                        </div>
                                        <p className='text-sm'>{param?.son?.nom}</p>
                                    </div>
                                ) : (
                                    <div className="text-indigo-600 py-8 border-dashed border-2 bg-gray-200 border-indigo-300 px-3 my-2 w-full rounded-[10px] text-gray-900 shadow-sm "
                                        onClick={() => document.getElementById('son').click()}
                                    >
                                        <div className='flex justify-center mb-3'>
                                            <UploadIcon />
                                        </div>

                                        <div>
                                            <p className='text-center text-sm mx-1'>Sonnerie de la commande</p>
                                        </div>
                                    </div>
                                )
                            }
                            <input type="file" accept="audio/mp3" hidden id='son' onChange={handleChangeSon} />

                        </div>
                        <button
                            type="submit"
                            onClick={() => {

                                addOrEditParamettre({ valeur: son[0], parametre: 'SON' }).then((res) => {
                                    console.log(res);
                                    setIsSubmit(false);
                                    toast.success('Configuration appliquée')

                                }).catch((err) => {
                                    setIsSubmit(false)
                                    console.log(err);
                                    if (err.response.status === 500) {
                                        toast.error(err.response.data)
                                    }
                                })
                            }}
                            disabled={isSubmit ? true : false}
                            className={`${!isSubmit
                                ? "text-white bg-indigo-900"
                                : "text-slate-800 bg-slate-200 "
                                } w-full  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                        >
                            {!isSubmit ? "Appliquer" : "Veuillez patientez..."}{" "}
                            {isSubmit ? (
                                <span className="loading loading-dots loading-xs"></span>
                            ) : null}
                        </button>

                    </div>
                </div> */}
            </div>
        </div>
    )
}
