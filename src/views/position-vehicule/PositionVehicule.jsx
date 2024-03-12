import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { AutocompleteCustom } from '../../components/Autocomplete';
import MapHandle from '../../components/MapHandle';


export const PositionVehicule = () => {

    const [value, setValue] = useState(null)
    const [load, setLoad] = useState(true)
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [center, setCenter] = useState({
        lat: 5.3707356,
        lng: -3.9572473
    })


    const locations = [
        {
            location: {
                lat: 5.3707356,
                lng: -3.9572473
            },
        },
        {
            location: {
                lat: 5.355120833912242,
                lng: -3.9760527049068872
            },
        },
        {
            location: {
                lat: 5.344663520104709,
                lng: -3.9854635742172806
            },
        },

        {
            location: {
                lat: 5.337636009746723,
                lng: -4.001451090297968
            },
        },
        {
            location: {
                lat: 5.329610602169809,
                lng: -4.004473218942943
            },
        },
        {
            location: {
                lat: 5.344098354467254,
                lng: -3.9867632477557513
            },
        },
        {
            location: {
                lat: 5.349917526194211,
                lng: -4.003752918579049
            },
        },

    ];
    if (value !== null) {
        geocodeByAddress(value.label)
            .then(results => getLatLng(results[0]))
            .then(async ({ lat, lng }) => {
                setCenter({ lat: lat, lng: lng })
            })
    }

    useEffect(() => {
        setTimeout(() => {
            setLoad(false)
        }, "5000")
    })
    console.log(selectedPlace);
    return (
        <div className='relative'>

            <APIProvider apiKey={"AIzaSyCTM4-__zorpLJu4DFe0HJNYta_lFVlvVQ"}>
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
                        locations.map((item, index) => (
                            <AdvancedMarker key={index} position={item.location} >
                                <img src="https://www.dealer.com/wp-content/uploads/sites/18/2023/06/Car-1-Orange@2x2-1024x542-1.png?h=542" alt='' height={70} width={70} />
                            </AdvancedMarker>
                        ))
                    }
                </Map>
                <MapHandle place={selectedPlace} />
            </APIProvider>

        </div>
    )
}
