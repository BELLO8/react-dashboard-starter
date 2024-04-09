import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { addOrEditParamettre } from '../../services/paramettre';

export const Configuration = ({ description, message, defaultValue, param }) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [value, setValue] = useState();

    return (
        <>
            <div className="mb-2 border bg-white w-fit rounded-xl">
                <div className="flex gap-2 space-y-4 md:space-y-6 sm:p-8">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {description}
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setValue(e.target.value)}
                            defaultValue={defaultValue}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-80 p-2.5"

                        />
                    </div>

                    <button
                        type="submit"
                        onClick={() => {

                            addOrEditParamettre({ valeur: value, parametre: param }).then((res) => {
                                toast.success(message)

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
                            }  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center `}
                    >
                        {!isSubmit ? "Appliquer" : "Veuillez patientez..."}{" "}
                        {isSubmit ? (
                            <span className="loading loading-dots loading-xs"></span>
                        ) : null}
                    </button>

                </div>
            </div>

        </>
    )
}
