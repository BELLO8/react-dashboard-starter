import { Skeleton } from '@mui/material'
import React from 'react'

export const LoadingPatner = () => {
    return (
        <>
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                    <div
                        key={index}
                        className="relative w-48 lg:w-56 h-fit rounded-lg shadow bg-white p-4 pb-6"
                    >
                        <Skeleton className="mx-auto mt-5 flex items-center justify-center" animation='wave' variant="circular" width={80} height={80} />
                        <h1 className="text-lg text-black text-center font-bold mt-2 truncate">
                            <Skeleton className="mx-auto mt-5 flex items-center justify-center" animation='wave' variant="text" width={190} />
                        </h1>
                        <p className="text-sm text-gray-500 text-center font-medium">
                            <Skeleton className="mx-auto mt-5 flex items-center justify-center" animation='wave' variant="text" width={80} />
                        </p>
                        <p className="text-xs text-gray-500 text-center font-medium">
                            <Skeleton className="mx-auto mt-5 flex items-center justify-center" animation='wave' variant="text" width={80} />
                        </p>
                        <Skeleton className="mx-auto mt-5 flex items-center justify-center" animation='wave' variant="rounded" width={180} height={30} />
                    </div>
                ))}
            </div>
        </>
    )
}
