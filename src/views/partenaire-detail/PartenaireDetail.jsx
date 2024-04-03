import { Drawer, Pagination, Skeleton } from "@mui/material";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { ArrowUpRight, ChevronLeft, MinusCircle, MoreHorizontal, PenLine } from "lucide-react";
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from 'react-router-dom';
import { API_KEY, BASE_URL } from "../../Utils/constant";
import { AddChauffeurSidebar } from "../../components/Chauffeur/AddChauffeurSidebar";
import { LoadingDriver } from "../../components/Chauffeur/LoadingDriving";
import { UpdateChauffeurSidebar } from "../../components/Chauffeur/UpdateChauffeurSidebar";
import Directions from "../../components/GoogleMap/Direction";
import { LoadingCar } from "../../components/categorie/LoadingCar";
import { VehiculeForm } from "../../components/categorie/VehiculeForm";
import { UpdateFormVehicule } from "../../components/categorie/updateFormVehicule";
import { getCategory } from "../../redux/store/categoryCar";
import { getAllPartnerCar, getAllPartnerDriver, getAllPartnerOrder, partnerInfo } from "../../redux/store/partner";
import { deleteCar } from "../../services/CarService";
import { associateDriver, deleteDriver } from "../../services/Driver";
import { disablePartner } from "../../services/PartenaireService";

const PartenaireDetail = () => {
  const [active, setActive] = useState(0);
  const [openSide, setOpenSide] = useState(false)
  const [openSideUpdate, setOpenSideUpdate] = useState(false)
  const [openSideAddCar, setOpenSideAddCar] = useState(false);
  const [openSideCarUpdate, setOpenSideCarUpdate] = useState(false);
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
    dispatch(getAllPartnerCar({ id: id, page: 0, param: '', size: 10 }))
    dispatch(getAllPartnerDriver({ id: id, page: 0, param: '', size: 10 }))
    dispatch(getAllPartnerOrder({ id: id, page: 0, param: '', size: 10 }))
  }, [dispatch, id])

  const tab = [
    {
      link: 'Vehicule',
    },
    {
      link: 'Chauffeur',
    },
    {
      link: 'Courses',
    }
  ]

  const defaultProps = {
    center: {
      lat: 5.3707356,
      lng: -3.9572473
    },
    zoom: 11
  };
  const submitCar = (data) => {
    setOpenSideAddCar(false)
    toast.success('vehicule enregistrer')
  }
  const handleDisableAccount = () => {
    disablePartner(id).then((res) => {
      if (res.status === 200) {
        dispatch(partnerInfo(id))
        toast.success('Compte desactivé')
      }
    }).catch((err) => {

    })
  }

  return (
    <div>
      <div className="flex items-start">
        <div className='sticky top-0 left-0 bg-white w-64 min-h-screen z-50'>
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
              <div className='rounded-full w-20 h-20' style={{ background: "url('https://www.shutterstock.com/image-photo/new-car-cheerful-black-man-260nw-1746419990.jpg') no-repeat center/cover" }}>
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

        <div className="w-4/5 px-1 relative">
          <div className="flex justify-between gap-x-2 pt-2">
            <div className="px-3 py-3 w-full border border-dashed bg-blue-50 rounded-lg flex flex-col">
              <p className=" text-2xl font-semibold">
                {
                  loadingInfoPartner ? <Skeleton animation='wave' variant='text' width={80} />
                    : "43 0000 Fr"
                }

              </p>
              <p className="text-sm text-gray-400 font-medium truncate">Revenue</p>
            </div>

            <div className="px-3 py-3 w-full border border-dashed bg-indigo-50 rounded-lg flex flex-col">
              <p className=" text-2xl font-semibold">
                {
                  loadingInfoPartner ? <Skeleton animation='wave' variant='text' width={80} />
                    : partner?.nombreDriver ?? 0
                }
              </p>
              <p className="text-sm text-gray-400 font-medium truncate">Chauffeurs</p>
            </div>

            <div className="px-3 py-3 w-full border border-dashed bg-violet-50 rounded-lg flex flex-col">
              <p className=" text-2xl font-semibold">
                {
                  loadingInfoPartner ? <Skeleton animation='wave' variant='text' width={80} />
                    : partner?.nombreVehicules ?? 0
                }
              </p>
              <p className="text-sm text-gray-400 font-medium truncate">Vehicule</p>
            </div>

            <div className="px-3 py-3 w-full border border-dashed bg-teal-50 rounded-lg flex flex-col">
              <p className=" text-2xl font-semibold">
                {
                  loadingInfoPartner ? <Skeleton animation='wave' variant='text' width={80} />
                    : partner?.nombreCourse ?? 0
                }
              </p>
              <p className="text-sm text-gray-400 font-medium truncate">Commandes</p>
            </div>

          </div>
          <div className="mt-2 bg-white w-fit px-2 py-1 rounded-lg space-x-4">
            {
              tab.map((item, index) => (
                <button onClick={() => {
                  setActive(index)
                }} className={`text-xs font-medium text-gray-600 px-4 rounded-lg py-1 ${active === index ? 'bg-[#04356B] text-white' : ''}`}>{item.link}</button>
              ))
            }
          </div>

          <div className=' mt-1 bg-white rounded-lg h-full'>
            <div className='p-3 h-full'>
              <div className='h-full'>
                {
                  active === 0 ? (
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
                      {partnerCars?.vehicules?.length === 0 || (partnerCars.length && !loadingCars) ?
                        (
                          <div className="py-3 flex justify-center">
                            <img src="https://www.agencija-corrigo.com/build/images/background/no-results-bg.2d2c6ee3.png" height={350} width={250} alt="" />
                          </div>
                        ) : !loadingCars && partnerCars?.vehicules?.length !== 0 ? (
                          <div className="mt-6 grid grid-cols-4 gap-4">
                            {partnerCars?.vehicules?.map((item, index) => (
                              <div className='bg-gray-50 border border-dashed rounded-lg relative'>

                                <div className="dropdown dropdown-end absolute right-1 top-1">

                                  <div
                                    tabIndex={0}
                                    role="button"
                                    className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-50"
                                  >
                                    <MoreHorizontal size={14} />
                                  </div>

                                  <ul
                                    tabIndex={0}
                                    className="mt-1 dropdown-content z-[1] menu p-2 border shadow bg-base-100 rounded-lg w-44"
                                  >
                                    <button
                                      className="bg-white hover:bg-gray-100 text-gray-600 font-semibold h-9 w-full flex items-center justify-start rounded-lg px-3"
                                      onClick={() => setOpenSideCarUpdate(true)}
                                    >
                                      Modifier
                                    </button>

                                    <button
                                      onClick={() => {
                                        setVehiculeId(item.id)
                                        document.getElementById(`delete_car${index}`).showModal()
                                      }

                                      }
                                      className="bg-white hover:bg-red-600 text-black hover:text-white font-semibold h-9 w-full flex items-center justify-start rounded-lg px-3"
                                    >
                                      supprimer
                                    </button>
                                  </ul>

                                </div>

                                <div className='mx-2 my-4  rounded-lg pr-8 flex'>
                                  <div className="w-20">
                                    <img width={90} src="data:image/jpeg;base64,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" alt="" srcset="" />
                                  </div>
                                  <div className='mx-2 space-y-1'>
                                    <p className='text-sm font-semibold truncate'>
                                      {
                                        item.marque + ' ' + item.modele
                                      }
                                    </p>
                                    <p className='text-xs text-gray-300 font-semibold bg-blue-100 text-indigo-800 rounded-md px-2 w-fit'>
                                      {
                                        item.numeroMatriculation ?? '7552AE5'
                                      }
                                    </p>
                                  </div>
                                </div>
                                <dialog id={`delete_car${index}`} className="modal">
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
                                        <button id={`CloseCar${index}`} className="bg-gray-100 text-gray-600 w-fit h-10 px-4 rounded-md flex items-center justify-center font-semibold">
                                          Annuler
                                        </button>
                                        <button onClick={() => {
                                          deleteCar(vehiculeId).then((res) => {
                                            dispatch(getAllPartnerCar({ id: id, page: 0, param: '', size: 10 }))
                                            document.getElementById(`CloseCar${index}`).click()
                                            toast.success('Chauffeur supprimé ')
                                          }).catch((err) => {
                                            console.log(err);
                                            if (err.response.status === 500) {
                                              document.getElementById(`CloseCar${index}`).click()
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
                              </div>
                            ))}
                            <Drawer open={openSideCarUpdate} onClose={() => setOpenSideCarUpdate(false)} anchor='right'>
                              <UpdateFormVehicule submitCar={submitCar} data={[]} />
                            </Drawer>
                          </div>
                        ) : (
                          <LoadingCar />
                        )}
                      {
                        loadingCars ? null :
                          (
                            <div className='my-3 flex justify-end'>
                              <Pagination count={partnerCars.totalPages} variant="outlined" color='primary' shape="rounded" />
                            </div>
                          )
                      }

                    </div>
                  ) : active === 1 ? (
                    <div className='mt-3'>
                      <div className="flex">
                        <h1 className='text-2xl font-semibold text-[#04356B]'>Chauffeur</h1>
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
                      {partnerDriver?.drivers?.length === 0 || (partnerDriver.length && !loadingDriver) ?
                        (
                          <div className="py-3 flex justify-center">
                            <img src="https://www.agencija-corrigo.com/build/images/background/no-results-bg.2d2c6ee3.png" height={150} width={150} alt="" />
                          </div>
                        ) : !loadingDriver && partnerDriver?.drivers?.length !== 0 ? (
                          <div className="mt-6 grid grid-cols-4 gap-4">
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

                                <NavLink to={`/chauffeur-commande/${item.id}`}
                                  className="bg-gray-100 w-full h-8 text-xs text-main font-semibold rounded-lg flex items-center justify-center mt-4"
                                  onClick={() => {
                                    localStorage.setItem('activeTab', index)
                                  }}
                                >
                                  Liste des commandes <ArrowUpRight size={17} />
                                </NavLink>


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
                                  <div className="modal-box">
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
                                          className="input input-bordered w-48 h-8 text-sm"
                                        />
                                      </label>
                                      <button className="w-fit h-8 px-4 rounded-lg bg-main text-white text-xs font-medium">
                                        Rechercher
                                      </button>
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
                                          <div className='mx-2 my-4  rounded-lg pr-8 flex'>
                                            <div className="w-20">
                                              <img width={90} src="data:image/jpeg;base64,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" alt="" srcset="" />
                                            </div>
                                            <div className='mx-2 space-y-1'>
                                              <p className='text-sm font-semibold truncate'>{item.marque + ' ' + item.modele}</p>
                                              <p className='text-[10px] text-gray-300 font-semibold bg-blue-100 text-indigo-800 rounded-md px-2 w-fit'>{item.numeroMatriculation}</p>
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
                        <Pagination count={partnerDriver.totalPages} variant="outlined" color='primary' shape="rounded" />
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
                            <option value='ANNULE'>Annullé</option>
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