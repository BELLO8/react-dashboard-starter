import { UploadIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { addOrEditParamettre, getParametre } from '../../services/paramettre';

export const Paramettre = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [son, setSon] = useState();
    const [param, setParam] = useState();
    const [distance, setDistance] = useState();
    const [frenquence, setFrequence] = useState();
    const [version, setVersion] = useState();

    const handleChangeSon = (e) => {
        const selectedFiles = e.target.files;
        if (son !== undefined) {
            const newFiles = Array.from(selectedFiles)
            setSon(newFiles)
        } else {
            const newFiles = Array.from(selectedFiles)
            setSon(newFiles)
        }
        console.log(son);
    }

    useEffect(() => {
        const getParams = async () => {
            const responses = await getParametre();
            setParam(responses.data)
        }

        getParams()
    }, [])



    return (
        <div className='p-3 pt-7'>
            <h1 className="text-center text-2xl font-semibold leading-tight tracking-tight text-gray-900">
                Modification des paramettre de configuration
            </h1>
            <div className="flex flex-col items-center justify-center my-2 lg:py-0">
                <div className="bg-white w-[500px] rounded-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                </div>

                <div className="mt-3 bg-white w-[500px] rounded-xl dark:border  sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                </div>
            </div>
        </div>
    )
}
