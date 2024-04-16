import React from 'react'

export const Car = ({ handleClick, item }) => {
    return (
        <>
            <div onClick={handleClick} className='bg-white shadow-sm cursor-pointer border border-dashed rounded-lg relative'>

                <div className='mx-2 my-4 flex'>
                    <div style={{ backgroundImage: `url("https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20_Modelpc.png")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className="bg-gray-200 rounded w-32 h-14 border-2 mb-2">
                    </div>
                    <div className='mx-2 space-y-1'>
                        <p className='text-sm font-semibold truncate w-36'>
                            {item.marque}
                            {
                                item.modele === null ? "" : item.modele
                            }
                        </p>
                        <p className='text-xs text-gray-400 truncate w-36'>
                            {
                                item.numeroMatriculation ?? ''
                            }
                        </p>
                        <p className="text-xs  text-gray-500 text-center font-medium">
                            <div className="flex space-x-1">
                                <p>status : </p>
                                <p className={item.statusEnregistrement === 'TERMINE' ? 'text-green-500 font-bold' : 'text-orange-500 font-bold'}>{item.statusEnregistrement === 'TERMINE' ? 'validé' : item.statusEnregistrement === 'EN_COURS' ? 'en cours' : item.statusEnregistrement === 'REJETER' ? 'rejeté' : 'en cours'}</p>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
