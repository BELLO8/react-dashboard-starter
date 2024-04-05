import React from 'react'

export const StatsCount = ({ count, label }) => {
    return (
        <>
            <div className="px-3 py-3 border border-dashed bg-white shadow-sm rounded-lg">
                <p className=" text-2xl font-semibold">
                    {
                        count
                    }

                </p>
                <p className="text-sm text-gray-400 font-medium truncate">{label}</p>
            </div>
        </>
    )
}
