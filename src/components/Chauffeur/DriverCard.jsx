import { ArrowUpRight, Phone } from 'lucide-react'
import React from 'react'
import { BASE_URL } from '../../Utils/constant'

export const DriverCard = ({ click, item }) => {
    return (
        <>
            <div
                className="relative h-fit rounded-lg border-2 border-dashed bg-white p-4 pb-6"
            >
                <div className="dropdown dropdown-end absolute right-2 top-2">
                    <div
                        role="button"
                        className=" rounded-full flex items-center justify-center bg-gray-100"
                    >
                        <p className="px-2 text-xs text-gray-500 text-center font-semibold">
                            {
                                item.point + ' points'
                            }
                        </p>
                    </div>

                </div>

                <div style={{ backgroundImage: `url("${BASE_URL}/webfree/partenaire/fichier/${item?.fichier?.id}")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className="bg-gray-200 rounded-full w-20 h-20 border-2 mx-auto mt-5 flex items-center justify-center">
                </div>
                <h1 className="text-sm text-indigo-900 text-center font-bold mt-2 mb-1 truncate">
                    {
                        item.nom + ' ' + item.prenoms
                    }
                </h1>
                <p className="text-xs  text-gray-500 text-center font-medium">
                    <div className="flex justify-center space-x-1">
                        <Phone size={12} />
                        <p>{item.numero}</p>
                    </div>
                </p>
                <p className="text-xs  text-gray-500 text-center font-medium">
                    <div className="flex justify-center space-x-1">
                        <p>Status du compte : </p>
                        <p className={item.statusEnregistrement === 'TERMINE' ? 'text-green-500 font-bold' : 'text-orange-500 font-bold'}>{item.statusEnregistrement === 'TERMINE' ? 'validé' : item.statusEnregistrement === 'EN_COURS' ? 'en cours' : 'Rejeté'}</p>
                    </div>
                </p>
                <div
                    className="cursor-pointer bg-gray-100 w-full h-8 text-xs text-main font-semibold rounded-lg flex items-center justify-center mt-4"
                    onClick={click}
                >
                    Details du chauffeur <ArrowUpRight size={17} />
                </div>

            </div>

        </>
    )
}
