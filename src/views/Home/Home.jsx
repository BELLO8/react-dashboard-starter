import { Skeleton } from '@mui/material';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js';
import { Menu } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfil, months, years } from '../../Utils/Utils';
import Car from '../../assets/icons/car.svg';
import Driver from '../../assets/icons/driver.svg';
import User from '../../assets/icons/user.svg';
import Wallet from '../../assets/icons/walley.svg';
import { MobileMenu } from '../../components/Menu/MobileMenu';
import { Counter } from '../../components/Stats/Counter';
import { StatsFilter } from '../../redux/store/stats';
import { statSales, statsCourses } from '../../services/statService';

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
    const counters = useSelector((state) => state.stats.counters);
    const [dataCourses, setDataCourses] = useState();
    const [dataSales, setDataSales] = useState();

    const [selected, setSelected] = useState('MOIS');
    const [select, setSelect] = useState('ANNEE');

    const currentDate = new Date();
    const currentMonthName = months[currentDate.getMonth()]
    const sales = {
        labels: dataSales?.labels,
        datasets: [
            {
                label: "Chiffres d'affaires",
                data: dataSales?.data,
                backgroundColor: '#08225B',
                barThickness: 35,
                borderColor: 'white',
                borderRadius: {
                    topLeft: 8,
                    topRight: 8,
                    bottomLeft: 8,
                    bottomRight: 8
                },
                borderSkipped: false,
            },

        ],
    };

    const data = {
        labels: dataCourses?.labels,
        datasets: [
            {
                label: "Nombre courses",
                data: dataCourses?.data,
                backgroundColor: '#5086d4',
                borderColor: 'white',
                barThickness: 35,
                borderRadius: {
                    topLeft: 8,
                    topRight: 8,
                    bottomLeft: 8,
                    bottomRight: 8
                },
                borderSkipped: false,
            },

        ],
    };
    const user = getUserProfil()
    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, "2000")
        statSales({ periode: selected, mois: currentMonthName.code }).then((res) => {
            setDataSales(res.data)
        }).catch((err) => console.log(err))

        statsCourses({ periode: selected, mois: currentMonthName.code, status: '' }).then((res) => {
            setDataCourses(res.data)
        }).catch((err) => console.log(err))

        dispatch(StatsFilter({ period: 'ANNEE', mois: "", annee: new Date().getFullYear() }))
    }, [dispatch])

    return (
        <div className="p-3 pt-7">
            <div className="mb-8">
                <div className="lg:flex gap-x-2 ">
                    <button onClick={() => setOpenSide(true)} className='lg:hidden btn btn-sm'><Menu /></button>
                    <h1 className="lg:text-2xl font-extrabold text-black sm:text-lg my-auto">Salut  </h1><h1 className='lg:text-3xl text-black my-auto text-indigo-900 font-medium'>{user?.nom}</h1>

                    {/* <input type="date" placeholder="Type here" className="absolute right-4 my-auto input input-bordered input-sm my-4 w-50" /> */}
                </div>
                <p className="">Bienvenue sur votre tableau de bord ! 🎉 </p>
                <div className='lg:absolute top-6 right-4 my-auto lg:flex gap-x-2'>
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

                </div>
                <MobileMenu openSide={openSide} setOpenSide={setOpenSide} />
                <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2">

                    <Counter icon={<img src={Wallet} alt="" className="w-6 h-6" />} label={"Montant des courses"}
                        count={new Intl.NumberFormat('fr', { style: 'currency', currency: 'XOF' }).format(counters?.montantTotalCourse ?? 0)}
                        text={"+20000 Fcfa par rapport au mois dernier"} />

                    <Counter icon={<img src={Car} alt="" className="w-6 h-6" />} label={"Courses terminées"}
                        count={counters?.statsCourses?.nbreCouresTermines ?? 0}
                        text={"+200 par rapport au mois dernier"} />

                    <Counter icon={<img src={User} alt="" className="w-6 h-6" />} label={"Clients"}
                        count={counters?.totalClients ?? 0}
                        text={"+2 par rapport au mois dernier"} />


                    <Counter icon={<img src={Driver} alt="" className="w-6 h-6" />} label={"Chauffeur actifs"}
                        count={counters?.statDrivers?.nbreDriverActives ?? 0}
                        text={"+2 par rapport au mois dernier"} />

                    {/* <div className="p-4 border border-dashed bg-white shadow rounded-md flex flex-col">
                        <p className="text-sm text-gray-400 font-medium truncate ">Montant des courses</p>
                        {
                            !loading ? (<Skeleton variant='text' width={80} height={40} animation="wave" />
                            ) : (
                                <div className="flex">
                                    <p className=' text-2xl font-semibold'>{
                                        !loading ? <Skeleton animation='wave' variant='text' width={130} />
                                            : counters.statsCourses.montantTotalCourses
                                    }{"  "}</p>
                                    Fcfa
                                </div>
                            )
                        }
                    </div> */}

                </div>
                <div className='grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2'>

                    <div className="bg-white p-4 rounded-xl my-3 ">
                        <p className='text-sm mb-2 font-medium'>Statistique global détaillé des courses </p>
                        <div className='grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2'>
                            <div className="p-3 border border-dashed bg-sky-50 rounded-[15px] flex flex-col">
                                <p className="text-sm text-gray-400 font-medium truncate">Courses</p>

                                <div className='flex gap-x-4 mt-1'>
                                    <div>
                                        <p className="text-[10px] font-medium text-gray-400 truncate">Courses aucune reponse</p>

                                        {
                                            !loading ? (<Skeleton variant='text' width={55} height={20} animation="wave" />
                                            ) : (<p className="text-md font-bold">{counters?.statsCourses?.nbreCouresAucuneReponses ?? 0}</p>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-medium truncate">Courses annulées</p>
                                        {
                                            !loading ? (<Skeleton variant='text' width={55} height={20} animation="wave" />
                                            ) : (<p className="text-md font-bold">{counters?.statsCourses?.nbreCoursesAnnules ?? 0}</p>

                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 border border-dashed bg-sky-50 rounded-[15px] flex flex-col">
                                <p className="text-sm text-gray-400 font-medium truncate">Courses</p>

                                <div className='flex gap-x-4 mt-1'>
                                    <div>
                                        <p className="text-[10px] font-medium text-gray-400 truncate">Courses en cours</p>

                                        {
                                            !loading ? (<Skeleton variant='text' width={55} height={20} animation="wave" />
                                            ) : (<p className="text-md font-bold">{counters?.statsCourses?.nbreCoursesDemarre ?? 0}</p>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-medium truncate">Courses Totals</p>
                                        {
                                            !loading ? (<Skeleton variant='text' width={55} height={20} animation="wave" />
                                            ) : (<p className="text-md font-bold">{counters?.statsCourses?.nbreCourses ?? 0}</p>

                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="bg-white p-4 rounded-xl my-3 ">
                        <p className='text-sm mb-2 font-medium'>Statistique global détaillé des chauffeurs </p>
                        <div className='grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2'>
                            <div className="p-3 border border-dashed bg-sky-50 rounded-[15px] flex flex-col">
                                <p className="text-sm text-gray-400 font-medium truncate">Chauffeur</p>

                                <div className='flex gap-x-4 mt-1'>
                                    <div>
                                        <p className="text-[10px] font-medium text-gray-400 truncate">Compte desactivé</p>

                                        {
                                            !loading ? (<Skeleton variant='text' width={55} height={20} animation="wave" />
                                            ) : (<p className="text-md font-bold">{counters?.statDrivers?.nbreDriverDesactives ?? 0}</p>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-medium truncate">Compte en attente</p>
                                        {
                                            !loading ? (<Skeleton variant='text' width={55} height={20} animation="wave" />
                                            ) : (<p className="text-md font-bold">{counters?.statsCourses?.nbreCoursesAnnules ?? 0}</p>

                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 border border-dashed bg-sky-50 rounded-[15px] flex flex-col">
                                <p className="text-sm text-gray-400 font-medium truncate">Chauffeur</p>

                                <div className='flex gap-x-4 mt-1'>
                                    <div>
                                        <p className="text-[10px] font-medium text-gray-400 truncate">Compte rejeté</p>

                                        {
                                            !loading ? (<Skeleton variant='text' width={55} height={20} animation="wave" />
                                            ) : (<p className="text-md font-bold">{counters?.statDrivers?.nbreDriverRejetes ?? 0}</p>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-medium truncate">Compte validé</p>
                                        {
                                            !loading ? (<Skeleton variant='text' width={55} height={20} animation="wave" />
                                            ) : (<p className="text-md font-bold">{counters?.statDrivers?.nbreDriverTermines ?? 0}</p>

                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>



            </div>

            <div className='my-8'>
                {/* <h1 className='mb-3 text-lg font-bold'>Statistiques global</h1> */}
                <div className='grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-1'>
                    <div className='rounded-xl border bg-white shadow '>
                        <div className='px-4 py-2'>
                            <p className='text-sm font-semibold'>Chiffres d'affaires</p>
                            <p className='text-xs font-medium text-gray-500'>Statistique des chiffres d'affaire</p>

                            <div className='flex gap-x-2'>
                                <select onChange={(e) => {
                                    setSelected(e.target.value)
                                }} className="my-2 select select-bordered custom-select h-8">
                                    <option disabled >
                                        Periode
                                    </option>
                                    <option value='MOIS' selected>Filtre par mois</option>
                                    <option value='ANNEE'>Filtre par années</option>
                                </select>
                                {
                                    selected === 'MOIS' ? (
                                        <select onChange={(e) => {
                                            statSales({ periode: selected, mois: e.target.value }).then((res) => {
                                                setDataSales(res.data)
                                            }).catch((err) => console.log(err))
                                        }} className="my-2 select select-bordered custom-select h-8">
                                            <option disabled >
                                                mois
                                            </option>
                                            {
                                                months.map((item) => (
                                                    <option value={item.code} selected={currentMonthName.code === item.code ? true : false}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                    ) : (
                                        <select onChange={(e) => {
                                            statSales({ periode: selected, annee: e.target.value }).then((res) => {
                                                setDataSales(res.data)
                                            }).catch((err) => console.log(err))
                                        }} className="my-2 select select-bordered custom-select h-8">
                                            <option disabled selected>
                                                années
                                            </option>
                                            {
                                                years.map((item) => (
                                                    <option value={item.name}>{item.name}</option>
                                                ))
                                            }

                                        </select>
                                    )
                                }

                            </div>

                        </div>
                        <div className='p-4'>
                            <Bar height={150} options={options} data={sales} />
                        </div>
                    </div>


                    <div className='rounded-xl border bg-white shadow '>
                        <div className='px-4 py-2'>
                            <p className='text-sm font-semibold'>Courses</p>
                            <p className='text-xs font-medium text-gray-500'>Statistique des courses</p>
                            <div className='flex gap-x-2'>
                                <select onChange={(e) => {
                                    setSelected(e.target.value)
                                }} className="my-2 select select-bordered custom-select h-8">
                                    <option disabled >
                                        Periode
                                    </option>
                                    <option value='MOIS' selected>Filtre par mois</option>
                                    <option value='ANNEE'>Filtre par années</option>
                                </select>
                                {
                                    selected === 'MOIS' ? (
                                        <select onChange={(e) => {
                                            statsCourses({ periode: selected, mois: e.target.value, status: '' }).then((res) => {
                                                setDataCourses(res.data)
                                            }).catch((err) => console.log(err))
                                        }} className="my-2 select select-bordered custom-select h-8">
                                            <option disabled >
                                                mois
                                            </option>
                                            {
                                                months.map((item) => (
                                                    <option value={item.code} selected={currentMonthName.code === item.code ? true : false}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                    ) : (
                                        <select onChange={(e) => {
                                            statsCourses({ periode: selected, annee: e.target.value, status: '' }).then((res) => {
                                                setDataCourses(res.data)
                                                console.log(res.data.data);
                                            }).catch((err) => console.log(err))
                                        }} className="my-2 select select-bordered custom-select h-8">
                                            <option disabled selected>
                                                années
                                            </option>
                                            {
                                                years.map((item) => (
                                                    <option value={item.name}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                    )
                                }

                            </div>

                        </div>
                        <div className='p-4'>
                            <Bar height={150} options={options} data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
