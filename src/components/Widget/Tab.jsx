import React from 'react';

export const Tabs = ({ tabsData, active, setActive }) => {
    return (
        <>
            <div className="shadow-sm mt-2 bg-white w-fit px-2 py-1 rounded-lg space-x-4">
                {
                    tabsData.map((item, index) => (
                        <button onClick={() => {
                            setActive({ index: index, value: item?.value })
                        }} className={`text-xs font-medium text-gray-600 px-4 rounded-lg py-1 ${active?.index === index ? 'bg-[#04356B] text-white shadow' : ''}`}>{item.link}</button>
                    ))
                }
            </div>
        </>
    )
}
