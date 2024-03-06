import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import DataTable from 'react-data-table-component';
import { PageTitle } from '../../components/PageTitle';
import { AddPartnerSidebar } from '../../components/Partenaire/AddPartnerSidebar';


const data = [
    {
        "nom_complet": "Jean Dupont",
        "adresse": "456 Avenue des Champs-Élysées, 75008 Paris, France",
        "telephone": "+33 6 12 34 56 78",
        "email": "jean.dupont@example.com",
        "date_naissance": "1980-03-15",
        "genre": "masculin",
        "numero_permis_conduire": "123456789",
        "date_emission_permis": "2000-05-20",
        "date_expiration_permis": "2025-05-20",
        "statut_conduite": "valide",
        "assurance": {
            "compagnie": "AssureAuto",
            "numero_police": "A123456789",
            "date_debut": "2021-01-01",
            "date_fin": "2022-12-31"
        },
        "historique_accidents": [
            {
                "date": "2022-08-10",
                "description": "Accident mineur, réparation nécessaire"
            },
            {
                "date": "2020-11-05",
                "description": "Accident avec dommages mineurs, aucune blessure"
            }
        ],
        "historique_infractions_route": [
            {
                "date": "2019-07-15",
                "description": "Excès de vitesse, amende de 100 €"
            },
            {
                "date": "2017-12-20",
                "description": "Stationnement illégal, amende de 50 €"
            }
        ]
    }

]
export const Partenaire = () => {
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
            name: "Nom complet",
            selector: (row) => row.nom_complet,
            sortable: true,
        },
        {
            name: "Adresse ",
            selector: (row) => row.adresse,
            sortable: true,
        },
        {
            name: "Numéro de téléphone",
            selector: (row) => row.telephone,
            sortable: true,
        },
        {
            name: "Adresse e-mail",
            selector: (row) => row.email,
        },
        {
            name: "Numéro de permis de conduire",
            selector: (row) => row.numero_permis_conduire,
        },
        {
            name: "Assurance ",
            selector: (row) => row.assurance.numero_police,
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
                <PageTitle title={'Partenaires'} />
                <div className='absolute inset-y-0 right-0'>
                    <button onClick={toggleDrawer(true)} className="btn btn-sm bg-[#04356B] rounded-md text-white text-xs hover:bg-gray-900" >
                        Ajouter un partenaire
                    </button>
                    <AddPartnerSidebar openSide={openSide} setOpenSide={setOpenSide} />
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
                        pagination
                        className='border'
                    />
                </div>

            </div>

        </div>
    )
}
