import { Drawer } from "@mui/material";
import { ChevronLeft, Eye, PenLine, Trash, User2, UserRound } from "lucide-react";
import React, { useState } from "react";

const ClientDetail = () => {
  const [openSidebarModal, setOpenSidebarModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nom: "",
    prenoms: "",
    email: "",
    telephone: "",
  });

  // TABLE CELL COMPONENT
  const CommandeComponent = () => {
    return (
      <tr>
        <th>
          <div>
            <p className="text-sm font-normal">Suzuki rouge</p>
            <p className="mt-1 w-fit py-px px-2 bg-gray-100 rounded text-xs font-medium">
              5783JD01
            </p>
          </div>
        </th>
        <td>
          <div className="w-36 flex items-center gap-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-100"></div>
            <p className="w-28 text-sm font-normal truncate">
              Kouassi Jean Arnaud
            </p>
          </div>
        </td>
        <td>Bingerville</td>
        <td>Adjamé</td>
        <td>35 mins</td>
        <td>14h42</td>
        <td>
          <div className="flex items-center gap-x-2">
            <button className="p-1.5 rounded-md bg-gray-100 text-black flex items-center justify-center">
              <Eye size={16} />
            </button>
            <button className="p-1.5 rounded-md bg-red-100 text-red-600 flex items-center justify-center">
              <Trash size={16} />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const openModalCreateEditUser = (user) => {
    setOpenSidebarModal(true);
    if (user) {
      setUserInfo(user);
    } else {
      setUserInfo({
        nom: "",
        prenoms: "",
        email: "",
        telephone: "",
      });
    }
  };

  return (
    <div>
      {/* <div className="flex items-center gap-x-3 bg-main/80 p-3 shadow rounded-xl">
        <NavLink to="/clients">
          <button className="w-24 h-8 rounded-full bg-stone-100 text-main text-base font-bold flex items-center justify-center">
            <ChevronLeft size={18} className="-ml-1" /> Retour
          </button>
        </NavLink>
      </div> */}
      <div className="flex items-start gap-x-4">
        <div className="relative w-96 min-h-screen bg-white drop-shadow rounded- px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              className="text-main w-fit px-3 h-7 rounded-full text-sm font-medium flex items-center justify-center gap-x-1"
              onClick={() => openModalCreateEditUser()}
            >
              <ChevronLeft size={16} />
              Retour
            </button>
            <button
              className="bg-white text-main border w-fit px-3 h-7 rounded-full text-sm font-medium flex items-center justify-center gap-x-1"
              onClick={() => openModalCreateEditUser()}
            >
              <PenLine size={16} />
              Modifer
            </button>
          </div>

          <div className="mt-10 w-20 h-20 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
            <User2 size={32} />
          </div>

          <div className="mt-3">
            <p className="text-lg text-center text-black font-bold">N'da Adams Steve Harvey</p>
            <p className="text-sm text-center text-stone-400 font-medium">+225077881211</p>
            <p className="text-sm text-center text-stone-400 font-medium">steve-harvey@xyz.com</p>
          </div>

          <div className="flex items-center justify-between gap-x-2 border-t border-t-stone-100 pt-5 mt-5">
            <div className="w-full h-16 bg-green-50 rounded-lg flex flex-col items-center justify-center">
              <p className="text-center text-xl text-green-600 font-extrabold">43</p>
              <p className="text-center text-xs text-green-600 truncate">Courses terminées</p>
            </div>
            <div className="w-full h-16 bg-red-50 rounded-lg flex flex-col items-center justify-center">
              <p className="text-center text-xl text-red-600 font-extrabold">12</p>
              <p className="text-center text-xs text-red-600 truncate">Courses annulées</p>
            </div>
          </div>
        </div>
        <div className="mt-5 w-full h-96 bg-white drop-shadow rounded-xl p-4">
          <h2 className="text-xl text-black font-bold">Historique commandes</h2>

          <div className="mt-5">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="bg-gray-100">
                    <th>Véhicule</th>
                    <th>Chauffeur</th>
                    <th>Point départ</th>
                    <th>Destination</th>
                    <th>Durée trajet</th>
                    <th>Heure</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <CommandeComponent />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Drawer
        anchor={"right"}
        open={openSidebarModal}
        onClose={() => setOpenSidebarModal((prev) => !prev)}
      >
        <div className="w-[450px] h-full p-4 relative">
          <p className="text-lg text-black font-extrabold">
            {!userInfo.nom ? "Ajouter un nouveau client" : "Modifier ce client"}
          </p>
          <div className="mt-5">
            <div className="flex flex-col items-start gap-y-3">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <UserRound />
              </div>
              <button className="bg-gray-100 text-gray-600 h-8 w-fit px-3 rounded-lg text-sm font-semibold">
                Choisir une photo
              </button>
            </div>
            <div className="flex items-center gap-x-3 mt-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-xs font-medium -mb-1">
                    Nom
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Nom client"
                  className="input input-bordered w-full h-10 font-medium"
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-xs font-medium -mb-1">
                    Prénoms
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Prénoms client"
                  className="input input-bordered w-full h-10 font-medium"
                />
              </label>
            </div>
            <div className="flex items-center gap-x-3 mt-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-xs font-medium -mb-1">
                    Téléphone
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="0700000000"
                  className="input input-bordered w-full h-10 font-medium"
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-xs font-medium -mb-1">
                    Email
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="email@xyz.com"
                  className="input input-bordered w-full h-10 font-medium"
                />
              </label>
            </div>
          </div>

          <div className="w-full absolute bottom-5 left-0 px-4 flex items-center gap-x-3 mt-4">
            <button className="w-full h-10 bg-gray-200 text-sm text-gray-600 font-semibold flex items-center justify-center rounded-lg">
              Annuler
            </button>
            <button className="w-full h-10 bg-orange-600 text-sm text-white font-semibold flex items-center justify-center rounded-lg">
              Enregistrer
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ClientDetail;
