// imports
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './SurfMap.css';
import MapInstructions from './MapInstructions';
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'


// mapbox access token using env variable for security
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

// define the SurfMap component which takes prop surfLocations
const SurfMap = ({ surfLocations }) => {

  // create reference to map container
  const mapContainerRef = useRef(null);

  // define state variable for map
  const [map, setMap] = useState(null);

  // Initialize map when component mounts
  useEffect(() => {
    // initialize a mapbox map 
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
    return () => initializedMap.remove();
  }, []);
  
  // function to handle click on a location and view on map with a specified zoom level
  const handleLocationClick = (location) => {
    if (map) {
      map.flyTo({
        center: [location.longitude, location.latitude],
        zoom: 12,
      });
    }
  };

  // effect to add markers and popups to map when surfLocations or map changes
  useEffect(() => {
    if (map) {
      // loop through surfLocations
      surfLocations.forEach((surfLocation) => {
        // create a marker at the specified coordinates of location
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

        // attach the popup to the marker so that when user clicks on marker they will see the popup
        marker.setPopup(popup);
      });
    }
    // the effect depents on map and surfLocations
  }, [map, surfLocations]);

  // rendering of SurfMap compnent
  return (
    <Container className='map-and-list-container'>
      {/* render custom MapInstructions component */}
      {/* this gives brief instructions to user on how to use map */}
      <MapInstructions />
      <Row>
        {/* button to add new surf location */}
        {/* this redirects to a separate component that prompts user to 
        fill out details for a new surf location and submit it */}
        <Link to='/locations/add'>
            <Button 
            size='md' 
            id='mapButton'
            variant='light'
            className='bg-info text-dark rounded-4 bg-opacity-75' 
            >Add a New Surf Location</Button></Link>
      </Row>
      {/* render the map container */}
      <Row className='map-container' ref={mapContainerRef} />
      {/* render a list of surf locations with click event handler
      that allows the user to visualize specific locations with marker/popup on map */}
      <Row className='locations-list'>
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

// proptypes to ensure correct datatype for each prop
SurfMap.propTypes = {
  surfLocations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      longitude: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
    })
  ).isRequired,
};

// export component
export default SurfMap;