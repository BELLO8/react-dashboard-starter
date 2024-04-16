import { Pagination, Skeleton } from '@mui/material'
import { ChevronLeft, Eye, MinusCircle, PenLine } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { BASE_URL } from '../../Utils/constant'
import car from '../../assets/icons/car.svg'
import wallet from '../../assets/icons/walley.svg'
import { CourseSideBar } from '../../components/Commande/CourseSideBar'
import { Counter } from '../../components/Stats/Counter'
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
      <div className="lg:flex items-start">

        <div className='lg:sticky lg:top-0 lg:left-0 bg-white lg:w-64 lg:min-h-screen z-50'>
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
              <div className="bg-gray-200 rounded-full w-16 h-16">
                <img
                  src={customer.photo != null ? `${BASE_URL}/webfree/partenaire/fichier/${customer.photo.id}` : `https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg`}
                  alt=""
                  className="rounded-full"
                />

              </div>
            </div>
            <div className="relative my-6 p-3 lg:h-[430px]">
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
              <div className="lg:absolute bottom-0">
                <button onClick={handleDisableAccount} className={`btn btn-ghost btn-sm ${!customer.enabled ? 'hover:bg-green-50 text-green-500' : 'hover:bg-red-50 text-red-500'}  flex  font-medium text-sm`}><MinusCircle size={20} />{customer.enabled ? 'Desactiver le compte' : 'Activer le compte'} </button>
              </div>
            </div>
            <div className='absolute right-8 mt-2'>
              {/* <button className='btn btn-sm text-xs' onClick={() => {
                }} >modifier le profile</button> */}
            </div>
          </div>
        </div>

        <div className="lg:w-4/5 px-3 relative mt-2">
          <h1 className='font-medium mt-3 text-gray-400 text-lg '>Client</h1>
          <div className='mt-2 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2'>
            <Counter icon={<img src={wallet} alt="" className="w-6 h-6" />} label={"Les depenses"}
              count={new Intl.NumberFormat('fr', { style: 'currency', currency: 'XOF' }).format(customer?.depenses !== undefined ? customer?.depenses : 0)}
              text={""} />

            <Counter icon={<img src={car} alt="" className="w-6 h-6" />} label={"Nombres de courses effectuées"}
              count={customer?.nombreCourseEffectuees ?? 0}
              text={""} />

            <Counter icon={<img src={car} alt="" className="w-6 h-6" />} label={"Nombres de courses annulées"}
              count={customer?.nombreCourseAnnulees ?? 0}
              text={""} />

            {/* <StatsCount count={customer?.depenses !== undefined ? customer?.depenses + ' FCFA' : 0} label={"Depenses"} /> */}
            {/* <StatsCount count={customer?.nombreCourseEffectuees ?? 0} label={"Nombres de courses effectuées"} />
            <StatsCount count={customer?.nombreCourseAnnulees ?? 0} label={"Nombres de courses annulé"} /> */}

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
            <CourseSideBar openSide={openSide} handleclose={() => setOpenSide(false)} selectRow={selectRow} />

          </div>
        </div>
      </div>
    </div>
  )
}
