import { Drawer, Pagination, Skeleton } from "@mui/material";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { ArrowUpRight, ChevronLeft, MinusCircle, MoreHorizontal, PenLine } from "lucide-react";
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from 'react-router-dom';
import { status, statusCar, tab } from "../../Utils/Utils";
import { API_KEY, BASE_URL } from "../../Utils/constant";
import { AddChauffeurSidebar } from "../../components/Chauffeur/AddChauffeurSidebar";
import { LoadingDriver } from "../../components/Chauffeur/LoadingDriving";
import { ShowDriverSideBar } from "../../components/Chauffeur/ShowDriverSideBar";
import { UpdateChauffeurSidebar } from "../../components/Chauffeur/UpdateChauffeurSidebar";
import Directions from "../../components/GoogleMap/Direction";
import { StatsCount } from "../../components/Partenaire/statsCount";
import { ShowCarSideBar } from "../../components/ShowCarSideBar";
import { Car } from "../../components/Widget/Car";
import { Tabs } from "../../components/Widget/Tab";
import { LoadingCar } from "../../components/categorie/LoadingCar";
import { VehiculeForm } from "../../components/categorie/VehiculeForm";
import { documentCar, files, getDriver } from "../../redux/store/car";
import { getCategory } from "../../redux/store/categoryCar";
import { getDriverPieces } from "../../redux/store/driver";
import { getAllPartnerCar, getAllPartnerDriver, getAllPartnerOrder, partnerInfo } from "../../redux/store/partner";
import { associateDriver, deleteDriver } from "../../services/Driver";
import { disablePartner } from "../../services/PartenaireService";

const PartenaireDetail = () => {
  const [active, setActive] = useState({ index: 0, value: 'VEHICULE' });
  const [activeStatus, setActiveStatus] = useState({ index: 1, value: 'TERMINE' });
  const [activeStatusDriver, setActiveStatusDriver] = useState({ index: 2, value: 'TERMINE' });
  const [openSide, setOpenSide] = useState(false)
  const [openSideUpdate, setOpenSideUpdate] = useState(false)
  const [openSideAddCar, setOpenSideAddCar] = useState(false);
  const [openSideDriver, setOpenSideDriver] = useState(false);
  const [openSideCar, setOpenSideCar] = useState(false);
  const [vehicule, setVehicule] = useState({});
  const [click, setClick] = useState();
  const [loadData, setLoadData] = useState(false);
  const [driverId, setDriverId] = useState();
  const [vehiculeId, setVehiculeId] = useState();
  const [search, setSearch] = useState();
  const [selectedRow, setSelectedRow] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const partner = useSelector((state) => state.partner.infoPartner);
  const partnerCars = useSelector((state) => state.partner.cars);
  const partnerDriver = useSelector((state) => state.partner.drivers);
  const partnerOrder = useSelector((state) => state.partner.order);

  const loadingInfoPartner = useSelector((state) => state.partner.loadingInfo)
  const loadingCars = useSelector((state) => state.partner.loadingCars)
  const loadingDriver = useSelector((state) => state.partner.loadingDriver)
  const loadingOrder = useSelector((state) => state.partner.loadingOrder);

  useEffect(() => {
    dispatch(getCategory({ page: 0, param: '', size: 10 }))
    dispatch(partnerInfo(id))
    dispatch(getAllPartnerCar({ id: id, page: 0, param: activeStatus.value, size: 10 }))
    dispatch(getAllPartnerDriver({ id: id, page: 0, param: activeStatusDriver.value, size: 10 }))
    dispatch(getAllPartnerOrder({ id: id, page: 0, param: '', size: 10 }))
  }, [dispatch, id, activeStatus, activeStatusDriver])



  const defaultProps = {
    center: {
      lat: 5.3707356,
      lng: -3.9572473
    },
    zoom: 11
  };

  const handleDisableAccount = () => {
    disablePartner(id).then((res) => {
      if (res.status === 200) {
        dispatch(partnerInfo(id))
        toast.success('Compte desactivé')
      }
    }).catch((err) => {

    })
  }

  const more = async (page) => {
    dispatch(getAllPartnerCar({ id: id, page: page - 1, param: activeStatus.value, size: 10 }))
  }

  const moreDriver = async (page) => {
    dispatch(getAllPartnerDriver({ id: id, page: page - 1, param: activeStatusDriver.value, size: 10 }))
  }

  return (
    <div>
      <div className="lg:flex items-start">
        <div className='lg:sticky lg:top-0 lg:left-0 bg-white lg:w-64 sm:w-screen lg:min-h-screen z-50'>
          <div className='my-3 rounded-lg px-4'>
            <div className="flex items-center justify-between mb-12">
              <NavLink to="/partenaires">
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
              <div style={{ backgroundImage: `url("${BASE_URL}/webfree/partenaire/fichier/${partner?.profile?.id}")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className="bg-gray-200 rounded-full w-20 h-20 border-2 mt-5 flex items-center justify-center">
              </div>
            </div>
            <div className="relative my-6 h-[430px]">
              <div>
                <p className="text-sm font-semibold">Nom et prenoms</p>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  {
                    loadingInfoPartner ? <Skeleton animation='wave' variant='text' width={80} />
                      : partner?.nom + " " + partner?.prenoms
                  }</p>
              </div>

              <div className="my-6">
                <p className="text-sm font-semibold">Email</p>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  {
                    loadingInfoPartner ? <Skeleton animation='wave' variant='text' width={80} />
                      : partner?.email
                  }
                </p>
              </div>

              <div className="my-6">
                <p className="text-sm font-semibold">Contact</p>
                <p className="text-xs text-gray-600 font-medium mt-1">{
                  loadingInfoPartner ? <Skeleton animation='wave' variant='text' width={80} />
                    : partner?.numero
                }</p>
              </div>

              <div className="my-6">
                <p className="text-sm font-semibold">Type de partenaire</p>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  {
                    loadingInfoPartner ? <Skeleton animation='wave' variant='text' width={80} />
                      : partner?.typePartenaire ?? 'Particulier'
                  }

                </p>
              </div>
              <div className="my-6">
                <p className="text-sm font-semibold">Etat du compte</p>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  {
                    loadingInfoPartner ? <Skeleton animation='wave' variant='text' width={80} />
                      : partner?.enabled ? 'compte actif' : 'compte bloqué'
                  }

                </p>
              </div>
              {
                loadingInfoPartner ? null :
                  (
                    <div className="absolute bottom-0">
                      <button onClick={handleDisableAccount} className={`btn btn-ghost btn-sm ${!partner?.enabled ? 'hover:bg-green-50 text-green-500' : 'hover:bg-red-50 text-red-500'}  flex  font-medium text-sm`}><MinusCircle size={20} />{partner?.enabled ? 'Desactiver le compte' : 'Activer le compte'} </button>
                    </div>
                  )
              }

            </div>
            <div className='absolute right-8 mt-2'>
              {/* <button className='btn btn-sm text-xs' onClick={() => {
                }} >modifier le profile</button> */}
            </div>
          </div>
        </div>

        <div className="lg:w-4/5 px-1 relative">

          {/* counter: revenu, chauffeur,etc... */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2 pt-2">

            <StatsCount count={new Intl.NumberFormat('fr', { style: 'currency', currency: 'XOF' }).format(partner?.chiffreAffaire ?? 0)} label={"Revenue"} />
            <StatsCount count={partner?.nombreDriver ?? 0} label={"Chauffeurs"} />
            <StatsCount count={partner?.nombreVehicules ?? 0} label={"Vehicule"} />
            <StatsCount count={partner?.nombreCourse ?? 0} label={"Courses"} />

          </div>

          {/* tap option  */}

          <Tabs tabsData={tab} setActive={setActive} active={active} />

          <div className=' mt-1 bg-white rounded-lg h-full'>
            <div className='p-3 h-full'>
              <div className='h-full'>
                {
                  active.index === 0 ? (
                    <div className='mt-3'>
                      <div className="flex">
                        <h1 className='text-2xl font-semibold text-[#04356B]'>Vehicules</h1>
                        <div className='absolute right-6'>
                          <button className="btn btn-sm bg-[#04356B] rounded-lg text-white text-xs hover:bg-gray-900" onClick={() => setOpenSideAddCar(true)}>
                            Ajouter un vehicule
                          </button>
                        </div>
                      </div>
                      <Drawer open={openSideAddCar} onClose={() => setOpenSideAddCar(false)} anchor='right'>
                        <VehiculeForm />
                      </Drawer>

                      <div className="flex items-end gap-x-3">
                        <label className="form-control w-60">
                          <div className="label">
                            <span className="label-text text-xs font-medium -mb-1">
                              Rechercher
                            </span>
                          </div>
                          <input
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Rechercher un élément..."
                            className="input input-bordered w-60 h-8 text-sm"
                          />
                        </label>
                        <button
                          onClick={() => {
                            dispatch(getAllPartnerCar({ id: id, page: 0, param: search, size: 10 }))
                          }}
                          className="w-fit h-8 px-4 rounded-lg bg-main text-white text-xs font-medium">
                          Rechercher
                        </button>
                      </div>
                      <Tabs tabsData={statusCar} setActive={setActiveStatus} active={activeStatus} />

                      {partnerCars?.vehicules?.length === 0 || (partnerCars.length && !loadingCars) ?
                        (
                          <div className="py-3 flex justify-center">
                            <img src="https://www.agencija-corrigo.com/build/images/background/no-results-bg.2d2c6ee3.png" height={350} width={250} alt="" />
                          </div>
                        ) : !loadingCars && partnerCars?.vehicules?.length !== 0 ? (
                          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2">
                            {partnerCars?.vehicules?.map((item, index) => (
                              <Car key={index} item={item} handleClick={() => {
                                setOpenSideCar(true)
                                setVehicule({ id: item.id, status: item.statusEnregistrement })
                                dispatch(files(item.id))
                                dispatch(getDriver(item.id))
                                dispatch(documentCar(item.id))
                              }} />
                            ))}

                            <ShowCarSideBar openSide={openSideCar} setOpenSide={setOpenSideCar} id={vehicule?.id} status={vehicule?.status} action={() => dispatch(getAllPartnerCar({ id: id, page: 0, param: '', size: 10 }))} />

                          </div>
                        ) : (
                          <LoadingCar />
                        )}
                      {
                        loadingCars ? null :
                          (
                            <div className='my-3 flex justify-end'>
                              <Pagination onChange={(event, newValue) => more(newValue)}
                                onSelect={selectedPage => more(selectedPage)} count={partnerCars.totalPages} variant="outlined" color='primary' shape="rounded" />
                            </div>
                          )
                      }

                    </div>
                  ) : active.index === 1 ? (
                    <div className='mt-3'>
                      <div className="flex">
                        <h1 className='text-2xl font-semibold text-[#04356B]'>Chauffeurs</h1>
                        <div className='absolute right-4'>
                          <button onClick={() => setOpenSide(true)} className="btn btn-sm bg-[#04356B] rounded-md text-white text-xs hover:bg-gray-900" >
                            Ajouter un chauffeur
                          </button>
                          <AddChauffeurSidebar openSide={openSide} setOpenSide={setOpenSide} />
                        </div>
                      </div>
                      <div className="flex items-end gap-x-3">
                        <label className="form-control w-60">
                          <div className="label">
                            <span className="label-text text-xs font-medium -mb-1">
                              Rechercher
                            </span>
                          </div>
                          <input
                            type="text"
                            placeholder="Rechercher un élément..."
                            className="input input-bordered w-60 h-8 text-sm"
                          />
                        </label>
                        <button className="w-fit h-8 px-4 rounded-lg bg-main text-white text-xs font-medium">
                          Rechercher
                        </button>
                      </div>
                      <Tabs tabsData={status} setActive={setActiveStatusDriver} active={activeStatusDriver} />

                      {partnerDriver?.drivers?.length === 0 || (partnerDriver.length && !loadingDriver) ?
                        (
                          <div className="py-3 flex justify-center">
                            <img src="https://www.agencija-corrigo.com/build/images/background/no-results-bg.2d2c6ee3.png" height={150} width={150} alt="" />
                          </div>
                        ) : !loadingDriver && partnerDriver?.drivers?.length !== 0 ? (
                          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2">
                            {partnerDriver?.drivers?.map((item, index) => (
                              <div
                                key={index}
                                className="relative h-fit rounded-lg border-2 border-dashed bg-white p-4 pb-6"
                              >
                                <div className="dropdown dropdown-end absolute right-2 top-2">
                                  <div
                                    tabIndex={0}
                                    role="button"
                                    className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50"
                                  >
                                    <MoreHorizontal size={20} />
                                  </div>
                                  <ul
                                    tabIndex={0}
                                    className="mt-1 dropdown-content z-[1] menu p-2 border shadow bg-base-100 rounded-lg w-48"
                                  >
                                    <button
                                      className="bg-white hover:bg-gray-100 text-gray-600 font-semibold h-9 w-full flex items-center justify-start rounded-lg px-3"
                                      onClick={() => setOpenSideUpdate(true)}
                                    >
                                      Modifer
                                    </button>
                                    <button
                                      className="bg-white hover:bg-gray-100 text-gray-600 font-semibold h-9 w-full flex items-center justify-start rounded-lg px-3"
                                      onClick={() => {
                                        setDriverId(item.id)
                                        document.getElementById(`car_driver${index}`).showModal()
                                      }}
                                    >
                                      Associé un vehicule
                                    </button>
                                    <button
                                      onClick={() => {
                                        setDriverId(item.id)
                                        document.getElementById(`disable_client${index}`).showModal()

                                      }
                                      }
                                      className="bg-white hover:bg-red-600 text-black hover:text-white font-semibold h-9 w-full flex items-center justify-start rounded-lg px-3"
                                    >
                                      Supprimer
                                    </button>
                                  </ul>
                                </div>
                                <div style={{ backgroundImage: `url("${BASE_URL}/webfree/partenaire/fichier/${item?.fichier?.id}")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className="bg-gray-200 rounded-full w-20 h-20 border-2 mx-auto mt-5 flex items-center justify-center">
                                </div>
                                <h1 className="text-sm text-black text-center font-medium mt-2 truncate">
                                  {
                                    item.nom + ' ' + item.prenoms
                                  }
                                </h1>
                                <p className="text-xs  text-gray-500 text-center font-medium">
                                  {
                                    item.numero
                                  }
                                </p>

                                <p className="text-xs mt-2 text-gray-500 text-center font-medium">
                                  <p className={item.isAssociate ? 'text-green-800 font-bold' : 'text-rose-600 font-semibold'}>{item.isAssociate ? 'Possède un vehicule' : 'aucun vehicule associé'}</p>
                                </p>
                                {
                                  item.statusEnregistrement === 'EN_COURS' ? (
                                    <div
                                      className="cursor-pointer bg-gray-100 w-full h-8 text-xs text-main font-semibold rounded-lg flex items-center justify-center mt-4"
                                      onClick={() => {
                                        setOpenSideDriver(true)
                                        setSelectedRow(item)
                                        dispatch(getDriverPieces(item.id))
                                      }}
                                    >
                                      Validation du compte <ArrowUpRight size={17} />
                                    </div>
                                  ) : (
                                    <NavLink to={`/chauffeur-commande/${item.id}`}
                                      className="bg-gray-100 w-full h-8 text-xs text-main font-semibold rounded-lg flex items-center justify-center mt-4"
                                      onClick={() => {
                                        localStorage.setItem('activeTab', index)
                                      }}
                                    >
                                      Liste des commandes <ArrowUpRight size={17} />
                                    </NavLink>
                                  )
                                }

                                <ShowDriverSideBar openSide={openSideDriver} setOpenSide={setOpenSideDriver} data={selectedRow} action={() => dispatch(getAllPartnerDriver({ id: id, page: 0, param: '', size: 10 }))} />

                                <dialog id={`disable_client${index}`} className="modal">
                                  <div className="modal-box rounded-lg">
                                    <h3 className="font-extrabold text-xl text-red-600 text-center">
                                      Attention
                                    </h3>
                                    <p className="pt-4 text-center text-black font-medium">
                                      Êtes vous sûr de vouloir effectuer cette action ?
                                    </p>
                                    <div className="modal-action">
                                      <form
                                        method="dialog"
                                        className="w-full flex items-center justify-center gap-x-4"
                                      >
                                        <button id={`CloseClient${index}`} className="bg-gray-100 text-gray-600 w-fit h-10 px-4 rounded-md flex items-center justify-center font-semibold">
                                          Annuler
                                        </button>
                                        <button onClick={() => {
                                          deleteDriver(driverId).then((res) => {
                                            dispatch(getAllPartnerDriver({ id: id, page: 0, param: '', size: 10 }))
                                            document.getElementById(`CloseClient${index}`).click()
                                            toast.success('Chauffeur supprimé ')
                                          }).catch((err) => {
                                            console.log(err);
                                            if (err.response.status === 500) {
                                              document.getElementById(`closeCarDriver${index}`).click()
                                              toast.error(err.response.data)
                                            }
                                          })
                                        }} className="bg-red-600 text-white w-fit h-10 px-4 rounded-md flex items-center justify-center font-semibold">
                                          Supprimer
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </dialog>

                                <dialog id={`car_driver${index}`} className="modal">
                                  <div className="modal-box max-w-3xl">
                                    <form method="dialog">
                                      <button id={`closeCarDriver${index}`} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <h3 className="font-bold text-lg">Associer un vehicule à un chauffeur!</h3>
                                    <div className="mt-6 flex items-end gap-x-3">
                                      <label className="form-control w-48">
                                        <div className="label">
                                          <span className="label-text text-xs font-medium -mb-1">
                                            Rechercher
                                          </span>
                                        </div>
                                        <input
                                          type="text"
                                          placeholder="Rechercher un élément..."
                                          className="input input-bordered w-72 h-8 text-sm"
                                          onChange={() => { }}
                                        />
                                      </label>
                                    </div>
                                    {partnerCars?.vehicules?.length === 0 ?
                                      (
                                        <div className="py-3 flex justify-center">
                                          <img src="https://www.agencija-corrigo.com/build/images/background/no-results-bg.2d2c6ee3.png" height={150} width={150} alt="" />
                                        </div>
                                      ) : null}
                                    <div className="mt-6 grid grid-cols-2 gap-4">
                                      {partnerCars?.vehicules?.map((item, index) => (
                                        <div onClick={() => {
                                          setVehiculeId(item.id)
                                          setClick(index)
                                        }} className={`${click === index ? 'border-blue-500' : ''} acursor-pointer bg-neutral-50 border rounded-lg hover:border hover:border-blue-500`}>
                                          <div className='mx-2 my-4 flex'>
                                            <div style={{ backgroundImage: `url("https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20_Modelpc.png")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className="bg-gray-200 rounded w-32 h-14 border-2 mb-2">
                                            </div>
                                            <div className='mx-2 space-y-1'>
                                              <p className='text-sm font-semibold truncate'>
                                                {
                                                  item.marque + ' ' + item.modele
                                                }
                                              </p>
                                              <p className='text-xs text-gray-300 text-gray-400 truncate'>
                                                {
                                                  item.numeroMatriculation ?? ''
                                                }

                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    <button onClick={() => {
                                      associateDriver(driverId, vehiculeId).then((res) => {
                                        dispatch(getAllPartnerDriver({ id: id, page: 0, param: '', size: 10 }))
                                        document.getElementById(`closeCarDriver${index}`).click()
                                        toast.success('Vehicule associé ')
                                      }).catch((err) => {
                                        console.log(err);
                                        if (err.response.status === 500) {
                                          document.getElementById(`closeCarDriver${index}`).click()
                                          toast.error(err.response.data)

                                        }
                                      })
                                    }} disabled={partnerCars?.vehicules?.length === 0 ? true : false} className="my-3 btn px-8 rounded-lg bg-main hover:bg-main text-white text-sm font-medium">
                                      Assigner
                                    </button>
                                  </div>
                                </dialog>

                              </div>

                            ))}
                          </div>
                        ) : (
                          <LoadingDriver />
                        )}

                      <div className='my-3 flex justify-end'>
                        <Pagination onChange={(event, newValue) => moreDriver(newValue)}
                          onSelect={selectedPage => moreDriver(selectedPage)} count={partnerDriver.totalPages} variant="outlined" color='primary' shape="rounded" />
                      </div>
                      <UpdateChauffeurSidebar openSide={openSideUpdate} setOpenSide={setOpenSideUpdate} />
                    </div>
                  ) : (
                    <div className='mt-3 h-full'>
                      <div className="flex">
                        <h1 className='text-2xl font-semibold text-[#04356B]'>Courses</h1>
                      </div>
                      <div className="flex items-end gap-x-3">
                        <label className="form-control w-60">
                          <div className="label">
                            <span className="label-text text-xs font-medium -mb-1">
                              Rechercher
                            </span>
                          </div>
                          <input
                            type="text"
                            placeholder="Rechercher un élément..."
                            className="input input-bordered w-full h-8 text-sm"
                          />
                        </label>
                        <label className="form-control w-44">
                          <div className="label">
                            <span className="label-text text-xs font-medium -mb-1">
                              Statut
                            </span>
                          </div>
                          <select
                            onChange={(e) => {
                              dispatch(getAllPartnerOrder({ id: id, page: 0, param: e.target.value, size: 10 }))
                            }}
                            className="text-xs select select-bordered custom-select w-full h-8 font-semibold">
                            <option disabled selected>
                              Statut d'activité
                            </option>
                            <option value='EN_COURS'>En cours</option>
                            <option value='TERMINE'>Terminé</option>
                            <option value='ANNULE'>Annulé</option>
                          </select>
                        </label>
                        <button className="w-fit h-8 px-4 rounded-md bg-main text-white text-xs font-medium">
                          Rechercher
                        </button>
                      </div>
                      <div className="flex items-start">
                        <div className="cursor-pointer mt-6 grid grid-row-3 gap-2 bg-gray-50 w-80 p-4 h-[500px] overflow-y-scroll rounded-lg">
                          {partnerOrder?.courses?.map((item, index) => (
                            <div onClick={() => {
                              setLoadData(!loadData)
                              setSelectedRow(item)
                            }} className='max-h-52 relative px-4 bg-white border border-dashed border-indigo-800 rounded-lg '>
                              <div className="flex items-start">
                                <div className="px-2 py-2">
                                  <p className="text-xs font-bold">{
                                    item.driver.nom + " " + item.driver.prenoms
                                  }</p>
                                  <p className="text-xs text-gray-400 font-medium">{
                                    item.driver.numero
                                  }</p>
                                </div>
                                <div className={`absolute my-2  ${item.status === 'TERMINE' ? 'bg-green-100 text-green-500' : 'bg-orange-100 text-orange-500'}  right-2  w-fit h-6 px-2 py-1 rounded-lg`}>
                                  <p className="text-xs  font-semibold">
                                    {item.status}
                                  </p>
                                </div>

                              </div>
                              <div className='rounded-lg px-2 my-4 flex'>
                                <div>
                                  <div className="flex items-center ">
                                    <div className="rounded-full w-3 h-3 bg-indigo-700">
                                    </div>
                                    <div className="ml-2">
                                      <p className="text-xs font-semibold">
                                        {
                                          item.lieuDepart
                                        }
                                      </p>
                                      <p className="text-xs text-gray-400">
                                        {item?.dateDebutCourse !== null ? new Date(item?.dateDebutCourse).toLocaleString() : ''}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="w-1 h-8 border-r-2 border-dashed px-[2.8px] border-indigo-700"></div>
                                  <div className="flex items-center ">
                                    <div className="rounded-full w-3 h-3 bg-indigo-700">
                                    </div>
                                    <div className="ml-2">
                                      <p className="text-xs font-semibold">
                                        {
                                          item.lieuDestination
                                        }
                                      </p>
                                      <p className="text-xs text-gray-400">
                                        {item?.dateFinCourse !== null ? new Date(item?.dateFinCourse).toLocaleString() : ''}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="w-[580px] mx-2 my-6 h-[500px] overflow-y-scroll">
                          {
                            selectedRow === "" ? (
                              <div className="py-3 flex justify-center">
                                <img src="https://www.agencija-corrigo.com/build/images/background/no-results-bg.2d2c6ee3.png" height={300} width={200} alt="" />
                              </div>
                            ) : (
                              <div>
                                <div className="h-60 bg-slate-200" style={{ borderRadius: 20 }}>
                                  <APIProvider apiKey={API_KEY}>
                                    <Map
                                      disableDefaultUI={true}
                                      zoom={14}
                                      center={defaultProps.center}
                                      mapId={'<Your custom MapId here>'}>
                                    </Map>
                                    <Directions origin={selectedRow?.lieuDepart} destination={selectedRow?.lieuDestination} />
                                  </APIProvider>
                                </div>

                                <div className="grid grid-cols-3 my-2 gap-1">
                                  <div class="text-left text-sm  bg-muted">
                                    <div class=" gap-1">
                                      <div class="p-1 rounded-lg bg-gray-100 font-semibold flex gap-1 text-xs">
                                        <div className="px-1 py-2 ">
                                          <p className="text-md font-medium">
                                            {selectedRow?.distance}
                                          </p>
                                          <p className="text-sm text-center text-gray-400 font-medium truncate">Distance</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="text-left text-sm  bg-muted">
                                    <div class=" gap-1">

                                      <div class="p-1 rounded-lg bg-gray-100 font-semibold flex gap-1 text-xs">
                                        <div className="px-1 py-2 ">
                                          <p className="text-md font-medium">
                                            {selectedRow?.duree === "" ? 0 : selectedRow?.duree}
                                          </p>
                                          <p className="text-sm text-gray-400 font-medium truncate">Durée</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="text-left text-sm">
                                    <div class=" gap-1">
                                      <div class="p-1 rounded-lg bg-gray-100 font-semibold flex gap-1 text-xs">
                                        <div className="px-1 py-2 ">
                                          <p className="text-md font-medium">
                                            {selectedRow?.montant + ' Fcfa'}
                                          </p>
                                          <p className="text-sm text-gray-400 font-medium truncate">Prix</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="px-3 text-xs font-medium my-2">
                                  <div className='border-b-[1px]  pb-3'>
                                    <p className='mt-6 font-semibold'>Trajet de la course</p>
                                    <div className='flex justify-start'>
                                      <ul className="timeline timeline-vertical">
                                        <li>
                                          <div className="timeline-start timeline-box">{selectedRow?.lieuDepart}</div>
                                          <div className="timeline-middle">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                          </div>
                                          <hr className="bg-primary" />
                                        </li>
                                        <li className=''>
                                          <hr className="bg-primary" />
                                          <div className="timeline-middle">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                          </div>
                                          <div className="timeline-end timeline-box">{selectedRow?.lieuDestination}</div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="px-3 py-6">
                                  <p className="bg-gray-200 px-2 py-2 rounded-lg text-sm mb-2 font-semibold">Conducteur</p>
                                  <div>
                                    <p className="text-xs font-semibold">Nom et prenoms</p>
                                    <p className="text-md text-gray-900 font-bold mt-1">{selectedRow?.driver?.nom} {selectedRow?.driver?.prenoms}</p>
                                  </div>

                                  <div className="my-3">
                                    <p className="text-xs font-semibold">Email</p>
                                    <p className="text-md text-gray-900 font-bold mt-1">{selectedRow?.driver?.email}</p>
                                  </div>

                                  <div className="">
                                    <p className="text-xs font-semibold">Contact</p>
                                    <p className="text-md text-gray-900 font-bold mt-1">{selectedRow?.driver?.numero}</p>
                                  </div>
                                </div>

                                <div className="px-3 py-6">
                                  <p className="bg-gray-200 px-2 py-2 rounded-lg text-sm mb-2 font-semibold">Client</p>
                                  <div>
                                    <p className="text-xs font-semibold">Nom et prenoms</p>
                                    <p className="text-md text-gray-900 font-bold  mt-1">{selectedRow?.client?.nom + " " + selectedRow?.client?.prenoms}</p>
                                  </div>

                                  <div className="my-3">
                                    <p className="text-xs font-semibold">Email</p>
                                    <p className="text-md text-gray-900 font-bold mt-1">{selectedRow?.client?.email}</p>
                                  </div>

                                  <div className="my-3">
                                    <p className="text-sm font-semibold">Contact</p>
                                    <p className="text-md text-gray-900 font-bold mt-1">{selectedRow?.client?.numero}</p>
                                  </div>
                                </div>
                              </div>

                            )
                          }

                        </div>
                      </div>
                    </div>
                  )
                }
              </div>


            </div>
          </div>
        </div>

      </div>


    </div>
  )
}

export default PartenaireDetail