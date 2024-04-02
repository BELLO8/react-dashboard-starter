import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { API_KEY } from '../../Utils/constant';
import { AutocompleteCustom } from '../../components/Autocomplete';
import { ShowDriverSideBar } from '../../components/Chauffeur/ShowDriverSideBar';
import MapHandle from '../../components/MapHandle';
import { getDriverPieces, getMoreDrivers } from '../../redux/store/driver';


export const PositionVehicule = () => {

    const [value, setValue] = useState(null)
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [center, setCenter] = useState({
        lat: 5.3707356,
        lng: -3.9572473
    })
    const dispatch = useDispatch();
    const driver = useSelector((state) => state.driver.driverListe);
    const [openSideUpdate, setOpenSideUpdate] = useState(false);
    const [rowData, setRowData] = useState();

    if (value !== null) {
        geocodeByAddress(value.label)
            .then(results => getLatLng(results[0]))
            .then(async ({ lat, lng }) => {
                setCenter({ lat: lat, lng: lng })
            })
    }

    useEffect(() => {
        dispatch(getMoreDrivers({ page: 0, param: '', size: 10 }))
    }, [dispatch])

    console.log(selectedPlace);
    return (
        <div className='relative'>

            <APIProvider apiKey={API_KEY}>
                <div className='px-3 absolute top-3 w-96  z-50'>
                    <AutocompleteCustom onPlaceSelect={setSelectedPlace} />
                </div>
                <Map
                    disableDefaultUI={true}
                    className='w-full min-h-screen'
                    zoom={14}
                    center={center}
                    mapId={'<Your custom MapId here>'}>
                    {
                        driver?.listDriver?.map((item, index) => (
                            <AdvancedMarker key={index} position={{ lat: item.latitude, lng: item.longitude }} onClick={() => {
                                setOpenSideUpdate(true)
                                setRowData(item)
                                dispatch(getDriverPieces(item.id))
                            }}>
                                <img src="https://www.dealer.com/wp-content/uploads/sites/18/2023/06/Car-1-Orange@2x2-1024x542-1.png?h=542" alt='' height={65} width={65} />
                            </AdvancedMarker>
                        ))
                    }
                </Map>
                <MapHandle place={selectedPlace} />
            </APIProvider>
            <ShowDriverSideBar openSide={openSideUpdate} setOpenSide={setOpenSideUpdate} data={rowData} />
        </div>
    )
}
