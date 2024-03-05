import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem, Pagination } from '@mui/material';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { PageTitle } from '../../components/PageTitle';
import { AddUserSidebar } from '../../components/utilisateur/AddUserSidebar';
import { UpdateUserSidebar } from '../../components/utilisateur/UpdateUserSidebar';

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
]
export const ListeUtilisateur = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);

    };

    const [openSide, setOpenSide] = useState(false);
    const [openSideUpdate, setOpenSideUpdate] = useState(false);

    const [rowData, setRowData] = useState(null);

    const columns = [
        {
            name: "Nom et prenoms",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Username",
            selector: (row) => row.username,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Adresse",
            selector: (row) => row.address.street,
        },
        {
            name: "Numero telephone",
            selector: (row) => row.phone,
        },
        {
            name: "Site web",
            selector: (row) => row.website,
        },
        {
            name: "Action",
            cell: (row) => (
                <div>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => {
                            setAnchorEl(null)
                            setOpenSideUpdate(true)
                            setRowData(row)
                        }}>Modifier</MenuItem>
                        <MenuItem onClick={handleClose}>Supprimer</MenuItem>
                        <MenuItem onClick={handleClose}>Desactiver</MenuItem>
                    </Menu>
                    <UpdateUserSidebar openSide={openSideUpdate} setOpenSide={setOpenSideUpdate} rowData={rowData} />
                </div>
            ),
        },
    ];


    return (
        <div>
            <div className='relative'>
                <PageTitle title={'Utilisateurs'} />
                <div className='absolute inset-y-0 right-0'>
                    <button onClick={() => {
                        setOpenSide(true)
                    }} className="btn btn-sm bg-[#04356B] rounded-md text-white text-xs hover:bg-gray-900" >
                        Ajouter un utilisateur
                    </button>
                    <AddUserSidebar openSide={openSide} setOpenSide={setOpenSide} />
                </div>

            </div>

            <div className='my-8 bg-white rounded-lg p-8 border border-[#E2E8F0] '>
                <div className='flex'>
                    <input type="text" placeholder="Rechercher une categorie..." className="px-3 my-2 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    />
                    <button className="px-3 my-2 mx-1 rounded-md border-0 py-1.5 text-white shadow-sm bg-[#04356B] placeholder:text-gray-400  sm:text-sm sm:leading-6">
                        Rechercher
                    </button>
                </div>
                <DataTable
                    columns={columns}
                    data={users}
                    className='border'
                />
                <div className='my-3 flex justify-end'>
                    <Pagination count={8} variant="outlined" color='primary' shape="rounded" />
                </div>
            </div>
        </div>
    )
}
