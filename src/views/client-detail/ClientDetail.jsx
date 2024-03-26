import { Drawer, Pagination, Skeleton } from '@mui/material'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import { BadgeSwissFranc, ChevronLeft, Clock, Eye, MapIcon, MinusCircle, PenLine } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import Directions from '../../components/GoogleMap/Direction'
import { customerInfo, getAllCustomerOrder } from '../../redux/store/customer'
import { disableAccount } from '../../services/CustomerService'

export const ClientDetail = () => {
  const [selectRow, setSelectRow] = useState();
  const [openSide, setOpenSide] = useState(false)
  const customer = useSelector((state) => state.customer.selectCustomer)
  const order = useSelector((state) => state.customer.order)
  const loading = useSelector((state) => state.customer.loadingOrder)
  const loadingInfo = useSelector((state) => state.customer.loadingInfo)

  const { id } = useParams()
  const dispatch = useDispatch();
  const handleDisableAccount = () => {
    disableAccount(id).then((res) => {
      if (res.status === 200) {
        dispatch(customerInfo(id))
        toast.success('Compte desactivé')
      }
    }).catch((err) => {

    })
  }
  useEffect(() => {
    dispatch(customerInfo(id))
    dispatch(getAllCustomerOrder({ id: id, page: 0, param: '', size: 10 }))

  }, [dispatch, id])

  const more = async (page) => {
    dispatch(getAllCustomerOrder({ id: id, page: page, param: '', size: 10 }))
  }
  const defaultProps = {
    center: {
      lat: 5.3707356,
      lng: -3.9572473
    },
    zoom: 11
  };
  const OrdersColumns = [
    {
      name: "Chauffeur",
      selector: (row) =>
        loading ? (
          <Skeleton animation="wave" variant="text" width={80} />
        ) : (
          row?.driver === null ? ' ' :
            row?.driver?.nom + " " + row?.driver?.prenoms
        ),
      sortable: true,
    },
    // {
    //   name: "Distance",
    //   selector: (row) =>
    //     !loading ? (
    //       <Skeleton animation="wave" variant="text" width={80} />
    //     ) : (
    //       row?.distance
    //     ),
    // },
    {
      name: "Montant",
      selector: (row) =>
        loading ? (
          <Skeleton animation="wave" variant="text" width={80} />
        ) : (
          row?.montant + ' Fcfa'
        ),
    },
    {
      name: "Depart",
      selector: (row) =>
        loading ? (
          <Skeleton animation="wave" variant="text" width={80} />
        ) : (
          row?.lieuDepart
        ),
    },
    {
      name: "Destination",
      selector: (row) =>
        loading ? (
          <Skeleton animation="wave" variant="text" width={80} />
        ) : (
          row?.lieuDestination
        ),
    },
    // {
    //   name: "Durée du trajet",
    //   selector: (row) =>
    //     !loading ? (
    //       <Skeleton animation="wave" variant="text" width={80} />
    //     ) : (
    //       row?.duree
    //     ),
    // },
    {
      name: "Status",
      selector: (row) =>
        loading ? (
          <Skeleton animation="wave" variant="text" width={80} />
        ) : (
          <p className={`text-xs  ${row?.status === 'TERMINE' ? 'bg-green-100 text-green-800 font-semibold' : row?.status === 'ANNULE' ? 'bg-rose-100 text-rose-800 font-semibold' : 'bg-orange-100 text-orange-800 font-semibold'}  rounded-lg px-2 py-1`}>{row?.status === 'TERMINE' ? 'terminé' : row?.status === 'ANNULE' ? 'annulé' : 'en attente'}</p>
        ),
    },
    {
      name: "Date de la course",
      selector: (row) =>
        loading ? (
          <Skeleton animation="wave" variant="text" width={80} />
        ) : (
          new Date(row?.dateCreation).toLocaleString()
        ),
    },
    {
      name: "Action",
      cell: (row) =>
        loading ? (
          <Skeleton animation="wave" variant="text" width={80} />
        ) : (
          <div>
            <div>
              <button className="btn btn-sm" onClick={() => {
                setSelectRow(row);
                console.log(row);
                setOpenSide(true)
              }}>
                <Eye size={15} />
              </button>
            </div>
          </div>
        ),
    },
  ];

  return (
    <div>
      <div className="flex items-start">
        <div className='sticky top-0 left-0 bg-white w-64 min-h-screen z-50'>
          <div className='my-3 rounded-lg px-4'>
            <div className="flex items-center justify-between mb-12">
              <NavLink to="/clients">
                <button
                  className="text-main w-fit h-7 rounded-full text-sm font-bold flex items-center justify-center gap-x-1"
                >
                  <ChevronLeft size={16} />
                  Retour
                </button>
              </NavLink>
              <button
                className="bg-main text-white w-fit px-3 h-7 rounded-lg text-sm font-medium flex items-center justify-center gap-x-1">
                <PenLine size={16} />
                Modifer
              </button>
            </div>

            <div className="w-26">
              <div className='rounded-full w-20 h-20' style={{ background: "url('https://www.shutterstock.com/image-photo/new-car-cheerful-black-man-260nw-1746419990.jpg') no-repeat center/cover" }}>
              </div>
            </div>
            <div className="relative my-6 h-[430px]">
              <div>
                <p className="text-sm font-semibold">Nom et prenoms</p>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  {
                    loadingInfo ? <Skeleton animation='wave' variant='text' width={80} />
                      : customer?.nom ?? "Aucun nom"
                  }</p>
              </div>

              <div className="my-6">
                <p className="text-sm font-semibold">Email</p>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  {
                    loadingInfo ? <Skeleton animation='wave' variant='text' width={80} />
                      : customer?.email ?? "Aucun mail"
                  }
                </p>
              </div>

              <div className="my-6">
                <p className="text-sm font-semibold">Contact</p>
                <p className="text-xs text-gray-600 font-medium mt-1">{
                  loadingInfo ? <Skeleton animation='wave' variant='text' width={80} />
                    : customer?.numero
                }</p>
              </div>

              <div className="my-6">
                <p className="text-sm font-semibold">Etat du compte</p>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  {
                    loadingInfo ? <Skeleton animation='wave' variant='text' width={80} />
                      : customer.enabled ? 'compte actif' : 'compte bloqué'
                  }

                </p>
              </div>
              <div className="absolute bottom-0">
                <button onClick={handleDisableAccount} className={`btn btn-ghost btn-sm ${!customer.enabled ? 'hover:bg-green-50 text-green-500' : 'hover:bg-red-50 text-red-500'}  flex  font-medium text-sm`}><MinusCircle size={20} />{customer.enabled ? 'Desactiver le compte' : 'Activer le compte'} </button>
              </div>
            </div>
            <div className='absolute right-8 mt-2'>
              {/* <button className='btn btn-sm text-xs' onClick={() => {
                }} >modifier le profile</button> */}
            </div>
          </div>
        </div>
        <div className="w-4/5 px-3 relative mt-2">
          <h1 className='font-medium mt-3 text-gray-400 text-lg '>Client</h1>
          <div className='mt-2 grid grid-cols-3 gap-2'>

            <div className="w-full p-4 drop-shadow-sm border border-dashed bg-white rounded-lg flex flex-col">
              <p className=" text-2xl font-semibold">
                {
                  loadingInfo ? <Skeleton animation='wave' variant='text' width={130} />
                    : customer.depenses + ' Fcfa' ?? 0
                }
              </p>
              <p className="text-sm text-gray-400 font-medium truncate">Dépenses</p>
            </div>
            <div className="w-full p-4 drop-shadow-sm border border-dashed bg-white rounded-lg flex flex-col">
              <p className=" text-2xl font-semibold">{
                loadingInfo ? <Skeleton animation='wave' variant='text' width={130} />
                  : customer?.nombreCourseEffectuees
              }</p>
              <p className="text-sm text-gray-400 font-medium truncate">Nombres de courses effectuées</p>
            </div>
            <div className="w-full p-4 drop-shadow-sm border border-dashed bg-white rounded-lg flex flex-col">
              <p className=" text-2xl font-semibold">{
                loadingInfo ? <Skeleton animation='wave' variant='text' width={130} />
                  : customer?.nombreCourseAnnulees
              }</p>
              <p className="text-sm text-gray-400 font-medium truncate">Nombres de courses annulé</p>
            </div>
          </div>
          <h1 className='mt-5 text-lg text-gray-400 font-medium'>Historique de commandes</h1>
          <div className='mt-2 bg-white rounded-lg p-4 shadow border border-[#E2E8F0] '>
            <div className='flex'>
              <input type="text" placeholder="Recherche..." className="input input-bordered px-3 my-2 w-80 h-10 text-gray-900 placeholder:text-gray-400"
              />
              <button className="px-3 my-2 mx-1 rounded-md border-0 py-1.5 text-white shadow-sm bg-[#04356B] placeholder:text-gray-400  sm:text-sm sm:leading-6">
                Rechercher
              </button>
            </div>
            <DataTable
              columns={OrdersColumns}
              data={order.courses}
              className='border'
              noDataComponent='Aucune données'
            />
            <div className='my-3 flex justify-end'>
              <Pagination onChange={(event, newValue) => more(newValue)}
                onSelect={selectedPage => more(selectedPage)} count={order?.totalPages} variant="outlined" color='primary' shape="rounded" />
            </div>
            <Drawer open={openSide} onClose={() => setOpenSide(false)} anchor='right'>
              <div className="w-[580px] mx-2 my-6">
                <div className="h-60 bg-slate-200" style={{ borderRadius: 20 }}>
                  <APIProvider apiKey={"AIzaSyCTM4-__zorpLJu4DFe0HJNYta_lFVlvVQ"}>
                    <Map
                      disableDefaultUI={true}
                      zoom={14}
                      center={defaultProps.center}
                      mapId={'<Your custom MapId here>'}>
                    </Map>
                    <Directions origin={selectRow?.lieuDepart} destination={selectRow?.lieuDestination} />
                  </APIProvider>
                </div>
                <div className="grid grid-cols-3 my-2 gap-1">
                  <div class="text-left text-sm  bg-muted">
                    <div class=" gap-1">
                      <div class="p-3 rounded-lg bg-gray-200 font-semibold flex gap-1 text-xs"><MapIcon size={17} /> Trajet  de la course</div>
                      <div class="px-3 text-xs font-medium my-2">
                        <div>
                          <div className="flex items-center ">
                            <div className="rounded-full w-3 h-3 bg-indigo-700">
                            </div>
                            <div className="ml-2">
                              <p className="text-sm font-semibold">{selectRow?.lieuDepart}</p>
                              <p className="text-sm text-gray-400">{selectRow?.dateDebutCourse !== null ? new Date(selectRow?.dateDebutCourse).toLocaleString() : ''}</p>
                            </div>
                          </div>

                          <div className="w-1 h-4 border-r-2  px-[3px] border-indigo-700"></div>
                          <div className="flex items-center ">
                            <div className="rounded-full w-3 h-3 bg-indigo-700">
                            </div>
                            <div className="ml-2">
                              <p className="text-sm font-semibold">{selectRow?.lieuDestination}</p>
                              <p className="text-sm text-gray-400">{selectRow?.dateDebutCourse !== null ? new Date(selectRow?.dateFinCourse).toLocaleString() : ''}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="text-left text-sm  bg-muted">
                    <div class=" gap-1">
                      <div class="rounded-lg bg-gray-200 p-3 font-semibold flex gap-1 text-xs"><Clock size={17} />Durée de la course</div>
                      <div class="px-3 text-lg font-semibold my-2">
                        {selectRow?.duree}
                      </div>
                    </div>
                  </div>

                  <div class="text-left text-sm  bg-muted">
                    <div class=" gap-1">
                      <div class="text-xs font-semibold flex rounded-lg bg-gray-200 p-3 gap-1"><BadgeSwissFranc size={17} />Prix de la course</div>
                      <div class="px-3 text-lg font-semibold my-2">
                        {selectRow?.montant + ' Fr'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-3 py-6">
                  <p className="bg-gray-200 px-2 py-2 rounded-lg text-sm mb-2 font-semibold">Conducteur</p>
                  <div>
                    <p className="text-xs font-semibold">Nom et prenoms</p>
                    <p className="text-md text-gray-900 font-bold mt-1">{selectRow?.driver?.nom} {selectRow?.driver?.prenoms}</p>
                  </div>

                  <div className="my-3">
                    <p className="text-xs font-semibold">Email</p>
                    <p className="text-md text-gray-900 font-bold mt-1">{selectRow?.driver?.email}</p>
                  </div>

                  <div className="">
                    <p className="text-xs font-semibold">Contact</p>
                    <p className="text-md text-gray-900 font-bold mt-1">{selectRow?.driver?.numero}</p>
                  </div>
                </div>
              </div>

            </Drawer>
          </div>
        </div>
      </div>
    </div>
  )
}
