import React from 'react'
import { BASE_URL } from '../../Utils/constant'

export const ClientCard = ({ item }) => {
    return (
        <>
            <div
                className="relative w-full h-fit rounded-lg shadow bg-white p-3 pb-5"
            >
                <div className="bg-gray-200 rounded-full w-16 h-16 mx-auto mt-5 flex items-center justify-center">
                    <img
                        src={item.photo != null ? `${BASE_URL}/webfree/partenaire/fichier/${item.photo.id}` : `https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg`}
                        alt=""
                        className="rounded-full"
                    />

                </div>
                <h1 className="text-base text-black text-center font-bold mt-2 truncate">
                    {
                        item.nom + " " + item.prenoms
                    }
                </h1>
                <p className="text-sm text-gray-500 text-center font-medium">
                    {
                        "+225 " + item.numero
                    }
                </p>
                <p className="mt-1 text-xs text-gray-400 text-center font-medium">
                    {
                        "Inscrit le: " + new Date(item?.dateCreation).toLocaleString()
                    }
                </p>
                <p className="text-sm text-gray-500 text-center font-medium">
                    {item.enabled ? 'Compte actif' : 'Compte inactif'}
                </p>
            </div>


        </>
    )
}
