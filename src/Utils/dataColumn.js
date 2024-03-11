import { Skeleton } from "@mui/material";

export const OrdersColumns = (loading) => [
  {
    name: "Client",
    selector: (row) =>
      !loading ? (
        <Skeleton animation="wave" variant="text" width={80} />
      ) : (
        row.coordonnees_client.nom
      ),
    sortable: true,
  },
  {
    name: "Itinéraire ",
    selector: (row) =>
      !loading ? (
        <Skeleton animation="wave" variant="text" width={80} />
      ) : (
        row.itineraire.depart
      ),
    sortable: true,
  },
  {
    name: "Type de véhicule",
    selector: (row) =>
      !loading ? (
        <Skeleton animation="wave" variant="text" width={80} />
      ) : (
        row.type_vehicule
      ),
    sortable: true,
  },
  {
    name: "Date de debut",
    selector: (row) =>
      !loading ? (
        <Skeleton animation="wave" variant="text" width={80} />
      ) : (
        row.date_debut_location
      ),
  },
  {
    name: "Date de fin",
    selector: (row) =>
      !loading ? (
        <Skeleton animation="wave" variant="text" width={80} />
      ) : (
        row.date_fin_location
      ),
  },
  {
    name: "Date de la commande",
    selector: (row) =>
      !loading ? (
        <Skeleton animation="wave" variant="text" width={80} />
      ) : (
        row.date_commande
      ),
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
