import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { MapPin, X } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';


export const AutocompleteCustom = ({ onPlaceSelect }) => {
    const map = useMap();
    const places = useMapsLibrary('places');

    const [sessionToken, setSessionToken] =
        useState();

    const [autocompleteService, setAutocompleteService] =
        useState(null);

    const [placesService, setPlacesService] =
        useState(null);

    const [predictionResults, setPredictionResults] = useState([]);

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (!places || !map) return;

        setAutocompleteService(new places.AutocompleteService());
        setPlacesService(new places.PlacesService(map));
        setSessionToken(new places.AutocompleteSessionToken());

        return () => setAutocompleteService(null);
    }, [map, places]);

    const fetchPredictions = useCallback(
        async (inputValue) => {
            if (!autocompleteService || !inputValue) {
                setPredictionResults([]);
                return;
            }

            const request = { input: inputValue, sessionToken };
            const response = await autocompleteService.getPlacePredictions(request);

            setPredictionResults(response.predictions);
        },
        [autocompleteService, sessionToken]
    );

    const onInputChange = useCallback(
        (event) => {
            const value = event.target.value;

            setInputValue(value);
            fetchPredictions(value);
        },
        [fetchPredictions]
    );

    const handleSuggestionClick = useCallback(
        (placeId) => {
            if (!places) return;

            const detailRequestOptions = {
                placeId,
                fields: ['geometry', 'name', 'formatted_address'],
                sessionToken
            };

            const detailsRequestCallback = (
                placeDetails
            ) => {
                onPlaceSelect(placeDetails);
                setPredictionResults([]);
                setInputValue(placeDetails && placeDetails.formatted_address ? placeDetails.formatted_address : '');
                setSessionToken(new places.AutocompleteSessionToken());
            };

            placesService.getDetails(detailRequestOptions, detailsRequestCallback);
        },
        [onPlaceSelect, places, placesService, sessionToken]
    );

    return (
        <div className="autocomplete-container">
            <div className='relative flex input input-bordered w-full max-w-xs'>
                <input
                    value={inputValue}
                    onInput={(event) => onInputChange(event)} type="text" placeholder="Rechercher un lieu" className="" />
                <button onClick={() => { setInputValue("") }} className='absolute right-2 top-3 bg-white'><X /></button>
            </div>

            {predictionResults.length > 0 && (
                <ul className="custom-list bg-white min-w-[400px] px-3 py-2 rounded-lg mt-3 shadow-lg">
                    {predictionResults.map(({ place_id, description }) => {
                        return (
                            <div className='flex space-x-2'>
                                <MapPin size={15} className='mt-3' />
                                <button
                                    key={place_id}
                                    className="custom-list-item my-2 truncate "
                                    onClick={() => handleSuggestionClick(place_id)}>
                                    {description}
                                </button>
                            </div>

                        );
                    })}
                </ul>
            )}
        </div>
    );
};
