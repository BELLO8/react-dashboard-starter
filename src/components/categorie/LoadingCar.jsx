import { Skeleton } from '@mui/material'
import React from 'react'

export const LoadingCar = () => {
    return (
        <>
            <div className="mt-6 grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((index) => (
                    <div className='bg-gray-50 border border-dashed rounded-lg relative'>
                        <div className='mx-2 my-4  rounded-lg pr-8 flex'>
                            <div className="w-20">
                                <Skeleton animation='wave' variant='rounded' width={50} height={40} />
                            </div>
                            <div className='mx-2 space-y-1'>
                                <p className='text-sm font-semibold truncate'>
                                    <Skeleton animation='wave' variant='text' width={120} />
                                </p>
                                <p className='text-xs text-gray-300 font-semibold bg-blue-100 text-indigo-800 rounded-md px-2 w-fit'>
                                    <Skeleton animation='wave' variant='text' width={80} />
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
