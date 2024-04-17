import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js';
import { Menu } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MobileMenu } from '../../components/Menu/MobileMenu';

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
    scales: {
        y: {

            display: false,

        },
        xAxes: [{
            maxBarThickness: 100,
        }],
        x: {
            grid: {
                display: false,
            }
        },
    }
};




export const Home = () => {

    const [loading, setLoading] = useState(false)
    const [openSide, setOpenSide] = useState(false);
    const dispatch = useDispatch();

    // const sales = {
    //     labels: dataSales?.labels,
    //     datasets: [
    //         {
    //             label: "Chiffres d'affaires",
    //             data: dataSales?.data,
    //             backgroundColor: '#08225B',
    //             barThickness: 35,
    //             borderColor: 'white',
    //             borderRadius: {
    //                 topLeft: 8,
    //                 topRight: 8,
    //                 bottomLeft: 8,
    //                 bottomRight: 8
    //             },
    //             borderSkipped: false,
    //         },

    //     ],
    // };

    // const data = {
    //     labels: dataCourses?.labels,
    //     datasets: [
    //         {
    //             label: "Nombre courses",
    //             data: dataCourses?.data,
    //             backgroundColor: '#5086d4',
    //             borderColor: 'white',
    //             barThickness: 35,
    //             borderRadius: {
    //                 topLeft: 8,
    //                 topRight: 8,
    //                 bottomLeft: 8,
    //                 bottomRight: 8
    //             },
    //             borderSkipped: false,
    //         },

    //     ],
    // };
    // const user = getUserProfil()


    return (
        <div className="p-3 pt-7">
            <div className="mb-8">
                <div className="lg:flex gap-x-2 ">
                    <button onClick={() => setOpenSide(true)} className='lg:hidden btn btn-sm'><Menu /></button>
                    <h1 className="lg:text-2xl font-extrabold text-black sm:text-lg my-auto">Salut  </h1><h1 className='lg:text-3xl text-black my-auto text-indigo-900 font-medium'>Starter Kit</h1>
                </div>
                <p className="">Bienvenue sur votre tableau de bord ! 🎉 </p>
                {/* <div className='lg:absolute top-6 right-4 my-auto lg:flex gap-x-2'>
                    <select onChange={(e) => {
                        setSelect(e.target.value)
                    }} className="my-2 select select-bordered custom-select h-8">
                        <option disabled >
                            Periode
                        </option>
                        <option value='MOIS' >Filtre par mois</option>
                        <option value='ANNEE' selected>Filtre par années</option>
                    </select>
                    {
                        select === 'MOIS' ? (
                            <select onChange={(e) => {
                                dispatch(StatsFilter({ period: select, mois: e.target.value }))
                            }} className="my-2 select select-bordered custom-select h-8">
                                <option disabled selected>
                                    mois
                                </option>
                                {
                                    months.map((item) => (
                                        <option value={item.code}>{item.name}</option>
                                    ))
                                }
                            </select>
                        ) : (
                            <select onChange={(e) => {
                                dispatch(StatsFilter({ period: select, mois: "", annee: e.target.value }))
                            }} className="my-2 select select-bordered custom-select h-8">
                                <option disabled selected>
                                    années
                                </option>
                                {
                                    years.map((item) => (
                                        <option value={item.name} selected={new Date().getFullYear() === Number(item.name) ? true : false}>{item.name}</option>

                                    ))
                                }

                            </select>
                        )
                    }

                </div> */}
                <MobileMenu openSide={openSide} setOpenSide={setOpenSide} />


            </div>

        </div>
    )
}
