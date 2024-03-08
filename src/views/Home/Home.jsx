import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
);

export const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: '',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => Math.floor(Math.random() * 1001)),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => Math.floor(Math.random() * 1001)),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export const Home = () => {
    return (
        <div className="p-3 pt-7">
            <div className="">
                <div className="flex relative">
                    <h1 className="text-3xl font-extrabold text-black">Tableau de bord</h1>
                    <input type="date" placeholder="Type here" className="absolute right-4 top-2 input input-bordered w-50" />

                </div>

                <div className="mt-8 grid grid-cols-4 gap-2">
                    <div className="p-4 w-72  border border-dashed bg-slate-100 rounded-[15px] flex flex-col">
                        <p className="text-sm text-gray-400 font-medium truncate ">Revenue global</p>
                        <p className=" text-2xl font-bold">157 0000 Fr</p>
                    </div>
                    <div className="p-3 w-72  border border-dashed bg-sky-50 rounded-[15px] flex flex-col">
                        <p className="text-sm text-gray-400 font-medium truncate">Commandes</p>
                        <p className="text-2xl font-bold">274</p>
                        <div className='flex gap-x-4 mt-1'>
                            <div>
                                <p className="text-[10px] font-medium text-gray-400 truncate">Commandes terminées</p>
                                <p className="text-md font-bold">74</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-medium truncate">Commandes annulées</p>
                                <p className="text-md font-bold">200</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 w-72 border border-dashed bg-indigo-50 rounded-[15px] flex flex-col">
                        <p className="text-sm text-gray-400 font-medium truncate">Chauffeurs</p>
                        <p className="text-2xl font-bold">54</p>
                        <div className='flex gap-4 mt-1'>
                            <div>
                                <p className="text-[10px] text-gray-400 font-medium">Chauffeurs actifs</p>
                                <p className="text-md font-bold">50</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-medium truncate">Chauffeurs inactifs</p>
                                <p className="text-md font-bold">4</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 w-72 border border-dashed bg-blue-50 rounded-[15px] flex flex-col">
                        <p className="text-sm text-gray-400 font-medium truncate">Clients</p>
                        <p className="text-2xl font-bold">974</p>
                    </div>
                </div>
            </div>

            <div className='my-8'>
                <h1 className='mb-3 text-lg font-bold'>Statistiques global</h1>
                <div className='flex gap-1'>
                    <div className='w-full bg-white p-3 rounded-[15px] border border-dashed'>
                        <Bar height={220} options={options} data={data} />
                    </div>
                    <div className='w-full bg-white p-3 rounded-[15px] border border-dashed'>
                        <Bar height={220} options={options} data={data} />
                    </div>
                </div>
            </div>


        </div>
    )
}
