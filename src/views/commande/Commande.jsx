import { Pagination } from '@mui/material';
import React from 'react';
import DataTable from 'react-data-table-component';
import { PageTitle } from '../../components/PageTitle';
const data = [
    {
        "date_commande": "2024-02-22",
        "date_debut_location": "2024-03-01",
        "date_fin_location": "2024-03-05",
        "heure_debut_location": "10:00",
        "heure_fin_location": "18:00",
        "duree_location": "5 jours",
        "type_vehicule": "Minibus",
        "nombre_passagers": 10,
        "itineraire": {
            "depart": "Aéroport de Paris-Charles-de-Gaulle",
            "arrivee": "Hôtel Le Méridien, Paris"
        },
        "options_supplementaires": ["Siège bébé", "Chauffeur supplémentaire"],
        "coordonnees_client": {
            "nom": "Jeanne Dupont",
            "telephone": "+33 6 12 34 56 78",
            "email": "jeanne.dupont@example.com"
        },
        "coordonnees_contact_urgence": {
            "nom": "Marie Dupont",
            "telephone": "+33 6 98 76 54 32"
        },
        "instructions_speciales": "Le véhicule doit être équipé de sièges enfants pour les passagers."
    }

]
export const Commande = () => {

    const columns = [
        {
            name: "Client",
            selector: (row) => row.coordonnees_client.nom,
            sortable: true,
        },
        {
            name: "Itinéraire ",
            selector: (row) => row.itineraire.depart,
            sortable: true,
        },
        {
            name: "Type de véhicule",
            selector: (row) => row.type_vehicule,
            sortable: true,
        },
        {
            name: "Date de debut",
            selector: (row) => row.date_debut_location,
        },
        {
            name: "Date de fin",
            selector: (row) => row.date_fin_location,
        },
        {
            name: "Date de la commande",
            selector: (row) => row.date_commande,
        },
        {
            name: "Action",
            cell: (row) => (
                <div>
                    {/* <IconButton
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
                    </Menu> */}
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className='relative'>
                <PageTitle title={'Commandes'} />
                <div className='absolute inset-y-0 right-0'>

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
        </div>
    )
}
