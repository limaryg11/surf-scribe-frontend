import React, { useRef, useEffect, useState } from "react";
// import Mapbox library and styles
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import custom css
import "./SurfMap.css";
// import custom component 
import MapInstructions from "./MapInstructions";
// import Boostrap components
import { Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
// import React Router's Link component
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'


// mapbox access token using env variable for security
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

// define the SurfMap component with destructuring for props
const SurfMap = ({ surfLocations }) => {
  // create reference to map container
  const mapContainerRef = useRef(null);
  // define state variable for map
  const [map, setMap] = useState(null);

  // Initialize map when component mounts
  useEffect(() => {
    // create a new mapbox map
    const initializedMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-158.1045, 21.5936],
      zoom: 3.5,
    });
    // add navigation controls to the map
    initializedMap.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // set the initalized map in the state
    setMap(initializedMap);
    
    // clean up when component unmounted
    // empty array ensures effect runs only once
    return () => initializedMap.remove();
  }, []);
  
  // function to handle click on a location on map 
  // with a specified zoom level
  const handleLocationClick = (location) => {
    if (map) {
      map.flyTo({
        center: [location.longitude, location.latitude],
        zoom: 12,
      });
    }
  };

  // effect to add markers and popups to map when surfLocations
  // or map changes
  useEffect(() => {
    if (map) {
      // loop through surfLocations and add markers/popups
      surfLocations.forEach((surfLocation) => {
        // create a marker at the specified coordinates
        const marker = new mapboxgl.Marker()
          .setLngLat([surfLocation.longitude, surfLocation.latitude])
          .addTo(map);

        // attach a popup with surf location details
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<div>
            <h5 className="map-name">${surfLocation.name}</h5>
            <p>${surfLocation.description}</p>
            <a href="/locations/${surfLocation.id}">See Details</a>
          </div>`);

        // attach the popup to the marker so that when you click
        // on marker you will see the popup
        marker.setPopup(popup);
      });
    }
    // the effect depents on map and surfLocations
  }, [map, surfLocations]);

  // rendering of SurfMap compnent
  return (
    <Container className="map-and-list-container">
      {/* render custom MapInstructions component */}
      {/* This gives brief instructions to user on how to use map */}
      <MapInstructions />
      <Row>
        {/* button to add new surf location */}
        {/* redirects to component that prompts user to 
        fill out details for a new surf location */}
        <Link to="/locations/add">
            <Button 
            size="md" 
            id="mapButton"
            variant="light"
            className="bg-info text-dark rounded-4 bg-opacity-75" 
            >Add a New Surf Location</Button></Link>
      </Row>
      {/* render the map container */}
      <Row className="map-container" ref={mapContainerRef} />
      {/* render a list of surf locations with click event handler
      that allows the user to visualize specific locations with marker/popup on map */}
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


SurfMap.propTypes = {
  surfLocations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      longitude: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
    })
  ).isRequired,
};

// expor component
export default SurfMap;