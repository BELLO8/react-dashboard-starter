import GoogleMapReact from 'google-map-react';
import React from 'react';

export const PositionVehicule = () => {
    const defaultProps = {
        center: {
            lat: 5.3707356,
            lng: -3.9572473
        },
        zoom: 11
    };
    return (
        <div className='p-3 pt-7'>
            <h1 className="text-3xl font-extrabold text-black">Position des vehicules</h1>
            <div className="h-96 bg-slate-200" style={{ borderRadius: 20 }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                </GoogleMapReact>
            </div>
        </div>
    )
}
