import { Skeleton } from "@mui/material";
import { Eye } from "lucide-react";

export const OrdersColumns = (loading, handleclick) => [
  {
    name: "Chauffeur",
    selector: (row) =>
      !loading ? (
        <Skeleton animation="wave" variant="text" width={80} />
      ) : row?.driver === null ? (
        "Aucun"
      ) : (
        row?.driver?.nom + " " + row?.driver?.prenoms
      ),
    sortable: true,
  },
  {
    name: "Numero du chauffeur ",
    selector: (row) =>
      !loading ? (
        <Skeleton animation="wave" variant="text" width={80} />
      ) : (
        row?.driver?.numero
      ),
    sortable: true,
  },
  {
    name: "Code de la course",
    selector: (row) =>
      !loading ? (
        <Skeleton animation="wave" variant="text" width={80} />
      ) : (
        row?.code
      ),
    sortable: true,
  },
  {
    name: "Distance",
    selector: (row) =>
      !loading ? (
        <Skeleton animation="wave" variant="text" width={80} />
      ) : (
        row?.distance
      ),
  },
  {
    name: "Montant",
    selector: (row) =>
      !loading ? (
        <Skeleton animation="wave" variant="text" width={80} />
      ) : (
        row?.montant
      ),
  },
  {
    name: "Depart",
    selector: (row) =>
      !loading ? (
        <Skeleton animation="wave" variant="text" width={80} />
      ) : (
        row?.lieuDepart
      ),
  },
  {
    name: "Destination",
    selector: (row) =>
      !loading ? (
        <Skeleton animation="wave" variant="text" width={80} />
      ) : (
        row?.lieuDestination
      ),
  },
  {
    name: "Durée du trajet",
    selector: (row) =>
      !loading ? (
        <Skeleton animation="wave" variant="text" width={80} />
      ) : (
        row?.duree
      ),
  },
  {
    name: "Status",
    selector: (row) =>
      !loading ? (
        <Skeleton animation="wave" variant="text" width={80} />
      ) : (
        <p
          className={`text-xs  ${
            row?.status === "TERMINE"
              ? "bg-green-100 text-green-800 font-semibold"
              : row?.status === "ANNULE"
              ? "bg-rose-100 text-rose-800 font-semibold"
              : "bg-orange-100 text-orange-800 font-semibold"
          }  rounded-lg px-2 py-1`}
        >
          {row?.status}
        </p>
      ),
  },
  {
    name: "Date de la course",
    selector: (row) =>
      !loading ? (
        <Skeleton animation="wave" variant="text" width={80} />
      ) : (
        new Date(row?.dateCreation).toLocaleDateString()
      ),
  },
  {
    name: "Action",
    cell: (row) =>
      !loading ? (
        <Skeleton animation="wave" variant="text" width={80} />
      ) : (
        <div>
          <div>
            <button className="btn btn-sm" onClick={handleclick}>
              <Eye size={15} />
            </button>
          </div>
        </div>
      ),
  },
];
