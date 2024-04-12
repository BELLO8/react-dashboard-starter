import { Skeleton } from '@mui/material'
import React from 'react'

export const LoadingDriver = () => {
    return (
        <>
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {[1, 2, 3, 4].map((index) => (
                    <div
                        key={index}
                        className="relative h-fit rounded-lg border-2 border-dashed bg-white p-4 pb-6"
                    >
                        <Skeleton className="mx-auto mt-5 flex items-center justify-center" animation='wave' variant='circular' width={80} height={80} />
                        <h1 className="text-sm text-black text-center font-medium mt-2 truncate">
                            <Skeleton animation='wave' variant='text' width={190} />
                        </h1>
                        <p className="text-xs  text-gray-500 text-center font-medium">
                            <Skeleton className="mx-auto mt-5 flex items-center justify-center" animation='wave' variant='text' width={80} />
                        </p>

                        <p className="text-xs mt-2 text-gray-500 text-center font-medium">
                            <Skeleton className="mx-auto mt-5 flex items-center justify-center" animation='wave' variant='text' width={80} />
                        </p>
                        <Skeleton animation='wave' variant='text' width={190} height={40} />
                    </div>

                ))}
            </div>
        </>
    )
}
