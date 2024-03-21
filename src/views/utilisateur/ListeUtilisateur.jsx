import { Pagination, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AddUserSidebar } from '../../components/utilisateur/AddUserSidebar';
import { getAllUser } from '../../redux/store/user';
import { disableUser } from '../../services/UserService';
import EditPenIcon from "./../../assets/icons/pen.svg";
import TrashIcon from "./../../assets/icons/trash.svg";
export const users = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    },
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    },
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    },
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    },
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    },
]
export const ListeUtilisateur = () => {

    const [openSide, setOpenSide] = useState(false);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    useEffect(() => {
        dispatch(getAllUser({ page: 0, param: '', size: 10 }))
        setTimeout(() => {
            setLoading(true)
        }, "2000")
    }, [dispatch])

    const more = async (page) => {
        setLoading(true)
        dispatch(getAllUser({ page: page, param: '', size: 10 }))
    }

    const columns = [
        {
            name: "Nom et prenoms",
            selector: (row) => !loading ? <Skeleton animation='wave' variant='text' width={80} />
                : row.nom,
            sortable: true,
        },
        {
            name: "Nom d'utilisateur",
            selector: (row) => !loading ? <Skeleton animation='wave' variant='text' width={80} />
                : row.username,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => !loading ? <Skeleton animation='wave' variant='text' width={80} />
                : row.email,
            sortable: true,
        },
        {
            name: "Numero telephone",
            selector: (row) => !loading ? <Skeleton animation='wave' variant='text' width={80} />
                : row.numero,
        },
        {
            name: "Etat du compte",
            selector: (row) => !loading ? <Skeleton animation='wave' variant='text' width={80} />
                : <p className={`text-xs  ${row?.enabled ? 'bg-green-100 text-green-800 font-semibold' : 'bg-rose-100 text-rose-800 font-semibold'}  rounded-lg px-2 py-1`}>{row?.enabled ? 'Actif' : 'Inactif'}</p>
        },
        {
            name: "Action",
            cell: (row) => !loading ? <Skeleton animation='wave' variant='text' width={80} />
                : (
                    <div className="flex items-center gap-x-3">
                        <div className="tooltip" data-tip="Modifier">
                            <button className="w-7 h-7 rounded-lg bg-main/30 flex items-center justify-center">
                                <img src={EditPenIcon} alt="icon" className="w-5" />
                            </button>
                        </div>
                        <div>
                            <button onClick={() => {
                                disableUser(row.id).then((res) => {
                                    console.log(res);
                                    if (res.status === 200) {
                                        dispatch(getAllUser({ page: 0, param: '', size: 10 }))
                                        toast.success('Compte supprimé')
                                    }
                                }).catch((err) => {

                                })
                            }} className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center" >
                                <img src={TrashIcon} alt="icon" className="w-5" />
                            </button>
                        </div>
                    </div>
                ),
        },
    ];


    return (
        <div className='p-3 pt-7'>
            <div className='relative'>
                <h1 className="text-3xl font-extrabold text-black">Utilisateur</h1>
                <div className='absolute inset-y-0 right-0'>
                    <button onClick={() => {
                        setOpenSide(true)
                    }} className="btn btn-sm bg-[#04356B] rounded-md text-white text-xs hover:bg-gray-900" >
                        Ajouter un utilisateur
                    </button>
                    <AddUserSidebar openSide={openSide} setOpenSide={setOpenSide} />
                </div>

            </div>

            <div className='my-8 bg-white rounded-lg p-3 border border-[#E2E8F0] '>
                <div className='flex'>
                    <input type="text" placeholder="Recherche..." className="input input-bordered px-3 my-2 w-80 h-10 text-gray-900 placeholder:text-gray-400"
                    />
                    <button className="px-3 my-2 mx-1 rounded-md border-0 py-1.5 text-white shadow-sm bg-[#04356B] placeholder:text-gray-400  sm:text-sm sm:leading-6">
                        Rechercher
                    </button>
                </div>
                <div className="">
                    <DataTable
                        columns={columns}
                        data={users.users}
                        className='border'
                        noDataComponent='Aucune donnée'
                    />
                    <div className='my-3 flex justify-end'>
                        <Pagination onChange={(event, newValue) => more(newValue)}
                            onSelect={selectedPage => more(selectedPage)} count={users.totalPages} variant="outlined" color='primary' shape="rounded" />
                    </div>
                </div>
            </div>
        </div>
    )
}
