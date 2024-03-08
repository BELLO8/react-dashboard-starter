export const OrdersColumns = [
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