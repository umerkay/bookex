import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Map, { Marker, ScaleControl } from 'react-map-gl';
import {
    FaMapMarker
} from "react-icons/fa";

const MAPBOX_TOKEN = 'pk.eyJ1IjoidW1lcmtrMTY0IiwiYSI6ImNsaGlzNmVocjBiNXUzaHFwcXJqbDZ5OWkifQ.X23PArNp5HdvXHx_K8IjHQ';

function LocationSelectionForm(props) {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [collectionPoints, setCollectionPoints] = useState([]);
    const [viewport, setViewport] = useState({
        width: '100%',
        height: 400,
        latitude: 33.6844,
        longitude: 73.0479,
        zoom: 11
    });

    useEffect(() => {
        // Simulated API call to fetch collection points
        fetchCollectionPoints()
            .then((points) => setCollectionPoints(points))
            .catch((error) => console.error('Error fetching collection points:', error));
    }, []);

    const fetchCollectionPoints = () => {
        // Simulated API call to fetch collection points
        return new Promise((resolve, reject) => {
            // Replace this with your actual API call to fetch collection points
            const collectionPoints = [
                { id: 1, name: 'Roots Millenium Islamabad', latitude: 33.7067976277573, longitude: 73.04546246758157 },
                { id: 2, name: 'Punjab College', latitude: 33.6852003, longitude: 73.0257636 },
                { id: 3, name: 'KIPS College Rawalpindi', latitude: 33.6681734, longitude: 73.0200987 },
            ];
            resolve(collectionPoints);
        });
    };

    const handleLocationSelect = (event) => {
        const selectedPointId = parseInt(event.target.value);
        const selectedPoint = collectionPoints.find((point) => point.id === selectedPointId);
        setSelectedLocation(selectedPoint);
        props.handleChange({ target: { name: 'collectionPoint', value: selectedPoint } })

        setViewport({
            ...viewport,
            latitude: selectedPoint.latitude,
            longitude: selectedPoint.longitude,
            zoom: 10
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.nextStep();
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Select Location</Form.Label>
                    <Form.Control as="select" onChange={handleLocationSelect}>
                        <option value="">-- Select a Collection Point --</option>
                        {collectionPoints.map((point) => (
                            <option key={point.id} value={point.id}>
                                {point.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                {/* <Button type="submit" disabled={!selectedLocation}>
                    Submit
                </Button> */}
                <input type='submit' className='btn btn-main' value='Next' />
            </Form>
            <Map
                mapboxAccessToken={MAPBOX_TOKEN}
                style={{ width: 600, height: 400 }}
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
        </>
    );
}

export default LocationSelectionForm;
