import { Pagination, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { AddUserSidebar } from '../../components/utilisateur/AddUserSidebar';
import EditPenIcon from "./../../assets/icons/pen.svg";
import TrashIcon from "./../../assets/icons/trash.svg";
const users = [
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

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, "2000")
    }, [])
    const columns = [
        {
            name: "Nom et prenoms",
            selector: (row) => !loading ? <Skeleton animation='wave' variant='text' width={80} />
                : row.name,
            sortable: true,
        },
        {
            name: "Username",
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
            name: "Adresse",
            selector: (row) => !loading ? <Skeleton animation='wave' variant='text' width={80} />
                : row.address.street,
        },
        {
            name: "Numero telephone",
            selector: (row) => !loading ? <Skeleton animation='wave' variant='text' width={80} />
                : row.phone,
        },
        {
            name: "Site web",
            selector: (row) => !loading ? <Skeleton animation='wave' variant='text' width={80} />
                : row.website,
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
                        <div className="tooltip" data-tip="Supprimer">
                            <button className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center" >
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
                <div className=""><DataTable
                    columns={columns}
                    data={users}
                    className='border'
                />
                    <div className='my-3 flex justify-end'>
                        <Pagination count={8} variant="outlined" color='primary' shape="rounded" />
                    </div>
                </div>
            </div>
        </div>
    )
}
