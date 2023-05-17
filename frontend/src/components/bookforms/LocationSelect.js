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
            id: 2, name: 'Lahore', latitude: 31.52935204229024, longitude: 74.33706563308519  , collectionPoints: [
                { id: 4, name: 'Lahore Grammar School Johar Town Campus', latitude: 31.461386841955427, longitude: 74.28140686082945 },
                { id: 5, name: 'Beaconhouse School System', latitude: 31.46727212899114,  longitude: 74.31947620383356  },
                { id: 6, name: 'Lahore College of Arts and Sciences', latitude: 31.47379423660845, longitude:  74.28121433645886 },
            ]
        },
        {
            id: 3, name: 'Karachi', latitude: 24.883168912576007,  longitude:66.97937921655397, collectionPoints: [
                { id: 7, name: 'Karachi Grammar School', latitude: 24.961859021227983,  longitude: 67.07321862853824 },
                { id: 8, name: 'Beaconhouse School System', latitude: 24.95496605770426, longitude:  67.0443792593025},
                { id: 9, name: 'Karachi American School', latitude: 24.885591565961715,  longitude: 67.08664310706033 },
            ]
        },
        {
            id: 4, name: 'Peshawar', latitude: 34.0227236392623,longitude: 71.51464142321672, collectionPoints: [
                { id: 10, name: 'Peshawar Grammar School', latitude: 33.99421142042145,  longitude:71.50073774320818},
                { id: 11, name: 'Beaconhouse Primary Campus Peshawar', latitude:34.026699261638306, longitude:  71.54232498194601 },
                { id: 12, name: 'The City College of Arts and Science', latitude: 34.02753913677442,  longitude: 71.57888879503116},
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
                    <Link disabled={!selectedLocation} to={`https://www.google.com/maps/search/${selectedLocation?.name.split(" ").join("+")}/${selectedLocation?.latitude},${selectedLocation?.longitude},15z`} disabled={!selectedLocation} target='_blank' className='btn btn-main'>
                        <span>Map <FaExternalLinkAlt></FaExternalLinkAlt> </span>
                    </Link>
                    {props.prevStep && <button className='btn btn-main' onClick={props.prevStep}>Back</button>}
                    {/* <button className='btn btn-main' onClick={props.prevStep}>Back</button> */}
                    <input type='submit' className='btn btn-main' value='Next' />
                </div>
            </Form>
        </div>
    );
}

export default LocationSelectionForm;
