import React from 'react'

export const Counter = ({ label, count, text, icon }) => {
    return (
        <>
            <div class="rounded-xl border bg-white shadow">
                <div class="p-3 flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 class="tracking-tight text-sm font-medium">{label}</h3>
                    <div class="flex-shrink-0 flex justify-center items-center size-[46px] bg-blue-600 text-white rounded-full dark:bg-blue-900 dark:text-blue-200">
                        {icon}
                    </div>
                </div>
                <div class="p-3 pt-0">
                    <div class="text-2xl font-bold">{count}</div>
                    <p class="text-xs text-green-800">{text}</p>
                </div>
            </div>
        </>
    )
}
