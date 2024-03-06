import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem, Pagination } from '@mui/material';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { PageTitle } from '../../components/PageTitle';
import { AddCategorySidebar } from '../../components/categorie/AddCategorySidebar';
import { UpdateCategorySidebar } from '../../components/categorie/UpdateCategorySidebar';


export const ListeCategorieVehicule = () => {


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openSide, setOpenSide] = useState(false);
    const [openSideUpdate, setOpenSideUpdate] = useState(false);
    const [rowData, setRowData] = useState(null)
    const toggleDrawer = (newOpen) => () => {
        setOpenSide(newOpen);
    };

    const columns = [
        {
            name: "Marque",
            selector: (row) => row.marque,
            sortable: true,
        },
        {
            name: "Modèle",
            selector: (row) => row.model,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.description,
            sortable: true,
        },
        {
            name: "Type de carburant",
            selector: (row) => row.typeCarburant,
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
                    </Menu>
                    <UpdateCategorySidebar rowData={rowData} openSide={openSideUpdate} setOpenSide={setOpenSideUpdate} />
                </div>
            ),
        },
    ];
    const data = [{ marque: 'Toyota', model: 'Camry', description: 'Une description détaillée du véhicule', typeCarburant: 'essence' }]
    return (
        <div>
            <div className='relative'>
                <PageTitle title={'Categorie de vehicule'} />
                <div className='absolute inset-y-0 right-0'>
                    <button onClick={toggleDrawer(true)} className="btn btn-sm bg-[#04356B] rounded-md text-white text-xs hover:bg-gray-900" >
                        Ajouter une categorie
                    </button>
                    <AddCategorySidebar setOpenSide={setOpenSide} openSide={openSide} />
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
                    data={data}
                    className='border'
                />
                <div className='my-3 flex justify-end'>
                    <Pagination count={8} variant="outlined" color='primary' shape="rounded" />
                </div>
            </div>

        </div>
    )
}
