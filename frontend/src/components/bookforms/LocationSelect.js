import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Map, { Marker, ScaleControl } from 'react-map-gl';
import {
    FaExternalLinkAlt,
    FaMapMarker
} from "react-icons/fa";
import { Link } from 'react-router-dom';
import './LocationSelect.scss'

const MAPBOX_TOKEN = 'pk.eyJ1IjoidW1lcmtrMTY0IiwiYSI6ImNsaGlzNmVocjBiNXUzaHFwcXJqbDZ5OWkifQ.X23PArNp5HdvXHx_K8IjHQ';

function LocationSelectionForm(props) {
    const cities = [
        {
            id: 1, name: 'Islamabad/Rawalpindi', latitude: 33.6844, longitude: 73.0479, collectionPoints: [
                { id: 1, name: 'Roots Millenium Islamabad', latitude: 33.7067976277573, longitude: 73.04546246758157, link: 'maps link' },
                { id: 2, name: 'Punjab College', latitude: 33.6852003, longitude: 73.0257636 },
                { id: 3, name: 'KIPS College Rawalpindi', latitude: 33.6681734, longitude: 73.0200987 },
            ]
        },
        {
            id: 2, name: 'Lahore', latitude: 31.5204, longitude: 74.3587, collectionPoints: [
                { id: 4, name: 'Lahore Grammar School', latitude: 31.5204, longitude: 74.3587 },
                { id: 5, name: 'Beaconhouse School System', latitude: 31.5204, longitude: 74.3587 },
                { id: 6, name: 'Lahore College of Arts and Sciences', latitude: 31.5204, longitude: 74.3587 },
            ]
        },
        {
            id: 3, name: 'Karachi', latitude: 24.8607, longitude: 67.0011, collectionPoints: [
                { id: 7, name: 'Karachi Grammar School', latitude: 24.8607, longitude: 67.0011 },
                { id: 8, name: 'Beaconhouse School System', latitude: 24.8607, longitude: 67.0011 },
                { id: 9, name: 'Karachi American School', latitude: 24.8607, longitude: 67.0011 },
            ]
        },
        {
            id: 4, name: 'Peshawar', latitude: 34.0151, longitude: 71.5249, collectionPoints: [
                { id: 10, name: 'Peshawar Grammar School', latitude: 34.0151, longitude: 71.5249 },
                { id: 11, name: 'Beaconhouse School System', latitude: 34.0151, longitude: 71.5249 },
                { id: 12, name: 'Peshawar College of Arts and Sciences', latitude: 34.0151, longitude: 71.5249 },
            ]
        },
    ]
    const [city, setCity] = useState(cities[0]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: 400,
        latitude: 33.6844,
        longitude: 73.0479,
        zoom: 11
    });

    useEffect(() => {
        if (city) {
            setViewport({
                ...viewport,
                latitude: city.latitude,
                longitude: city.longitude
            });
        }
    }, [city]);

    useEffect(() => {
        if (selectedLocation) {
            setViewport({
                ...viewport,
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude
            });
        }
    }, [selectedLocation]);

    const handleCitySelect = (event) => {
        const cityId = parseInt(event.target.value);
        const city = cities.find((city) => city.id === cityId);
        setCity(city);
        setSelectedLocation(null);
    };

    const handleLocationSelect = (event) => {
        const locationId = parseInt(event.target.value);
        const location = city.collectionPoints.find((point) => point.id === locationId);
        setSelectedLocation(location);
        props.handleChange({ target: { name: 'collectionPoint', value: location.name + " - " + city.name } })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.nextStep();
    };

    return (
        <div id='locSelect'>
            <Form onSubmit={handleSubmit}>

                <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control required as="select" onChange={handleCitySelect}>
                        <option value="">-- Select a City Point --</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select Location</Form.Label>
                    <Form.Control required as="select" onChange={handleLocationSelect} disabled={!city}>
                        <option value="">-- Select a Collection Point --</option>
                        {(city?.collectionPoints).map((point) => (
                            <option key={point.id} value={point.id}>
                                {point.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                {/* <Button type="submit" disabled={!selectedLocation}>
                    Submit
                </Button> */}
                <Map
                    mapboxAccessToken={MAPBOX_TOKEN}
                    style={{ width: '100%', height: 400 }}
                    // initialViewState={
                    //     {
                    //         width: '100%',
                    //         height: 400,
                    //         latitude: 33.6844,
                    //         longitude: 73.0479,
                    //         zoom: 11
                    //     }
                    // }
                    {...viewport}
                    onViewportChange={(newViewport) => setViewport(newViewport)}
                    mapStyle="mapbox://styles/mapbox/streets-v9"

                >
                    {selectedLocation && (
                        <Marker
                            key={selectedLocation.id}
                            latitude={selectedLocation.latitude}
                            longitude={selectedLocation.longitude}
                        >
                            <FaMapMarker
                                size={20}
                            // color={selectedLocation && selectedLocation.id === point.id ? 'red' : 'blue'}
                            // onClick={() => setSelectedLocation(point)}
                            />
                        </Marker>
                    )}
                </Map>
                <div className='flex buttonholder'>
                    <Link to={selectedLocation?.link} disabled={!selectedLocation} target='_blank' className='btn btn-main'>
                        <span>Map <FaExternalLinkAlt></FaExternalLinkAlt> </span>
                    </Link>
                    <button className='btn btn-main' onClick={props.prevStep}>Back</button>
                    <input type='submit' className='btn btn-main' value='Next' />
                </div>
            </Form>
        </div>
    );
}

export default LocationSelectionForm;
