import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./SurfMap.css";
import MapInstructions from "./MapInstructions";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';


mapboxgl.accessToken =
  "pk.eyJ1IjoibGltYXJ5ZzExIiwiYSI6ImNsa3ZwdGRtMzBtb3kzZ29jM3R3MDBoanoifQ.2QNl2lmg3q3v0xWuflJeYQ";

const SurfMap = ({ surfLocations }) => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  // Initialize map when component mounts
  useEffect(() => {
    const initializedMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-158.1045, 21.5936],
      zoom: 3.5,
    });

    initializedMap.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    setMap(initializedMap);

    return () => initializedMap.remove();
  }, []);
  

  const handleLocationClick = (location) => {
    if (map) {
      map.flyTo({
        center: [location.longitude, location.latitude],
        zoom: 12,
      });
    }
  };

  useEffect(() => {
    if (map) {
      surfLocations.forEach((surfLocation) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([surfLocation.longitude, surfLocation.latitude])
          .addTo(map);

        // Attach a popup with surf location details
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<div>
            <h5 className="map-name">${surfLocation.name}</h5>
            <p>${surfLocation.description}</p>
            <a href="/locations/${surfLocation.id}">See Details</a>
          </div>`);

        marker.setPopup(popup);
      });
    }
  }, [map, surfLocations]);

  return (
    <Container className="map-and-list-container">
      <MapInstructions />
      {/* <h2 className="tag">Your Surf Locations</h2> */}
      <Row>
        <Link to="/locations/add">
            <Button 
            size="md" 
            id="mapButton"
            variant="light"
            className="bg-info text-dark rounded-4 bg-opacity-75" 
            >Add a New Surf Location</Button></Link>
      </Row>
      <Row className="map-container" ref={mapContainerRef} />
      <Row className="locations-list">
        <ul>
          {surfLocations.map((location) => (
            <li className='location-item' key={location.id} onClick={() => handleLocationClick(location)}>
              {location.name.split(',')[0]}
            </li>
          ))}
        </ul>
      </Row>
    </Container>
  );
};


export default SurfMap;