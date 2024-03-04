import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import DataTable from 'react-data-table-component';
import { PageTitle } from '../../components/PageTitle';

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
export const Client = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openSide, setOpenSide] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpenSide(newOpen);
    };
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
                        <MenuItem onClick={handleClose}>Modifier</MenuItem>
                        <MenuItem onClick={handleClose}>Supprimer</MenuItem>
                        <MenuItem onClick={handleClose}>Desactiver</MenuItem>
                    </Menu>
                </div>
            ),
        },
    ];
    return (
        <div>
            <div className='relative'>
                <PageTitle title={'Liste des utilisateurs'} />
                {/* <div className='absolute inset-y-0 right-0'>
                    <button onClick={toggleDrawer(true)} className="btn btn-sm bg-[#04356B] rounded-md text-white text-xs hover:bg-gray-900" >
                        Ajouter un utilisateur
                    </button>
                    <Drawer open={openSide} onClose={toggleDrawer(false)} anchor='right'>
                        <div className='bg-white w-96 px-8 mt-4'>
                            <h1 className='text-lg font-semibold'>Ajouter un utilisateur</h1>
                        </div>
                    </Drawer>
                </div> */}

            </div>

            <div className='my-8 bg-white rounded-lg p-8 border border-[#E2E8F0] '>
                <input type="text" placeholder="Rechercher un client..." className="px-3 my-2 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
                <DataTable
                    columns={columns}
                    data={users}
                    pagination
                    className='border'
                />
            </div>

        </div>
    )
}
