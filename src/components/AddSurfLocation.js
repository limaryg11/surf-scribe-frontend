import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import './AddSurfLocation.css';


const API_URL = process.env.REACT_APP_API || 'https://agile-badlands-99127-e0dd8e555c49.herokuapp.com/http://18.117.189.190:8080';


const AddSurfLocation = ({onSubmit, surfLocations}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isValidLocation, setIsValidLocation] = useState(true);
  const [suggestedLocations, setSuggestedLocations] = useState([]);

  const handleLocationValidation = async () => {
    try {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${name}.json`, {
        params: {
          access_token: 'pk.eyJ1IjoibGltYXJ5ZzExIiwiYSI6ImNsa3ZwdGRtMzBtb3kzZ29jM3R3MDBoanoifQ.2QNl2lmg3q3v0xWuflJeYQ',
        },
      });
      setIsValidLocation(response.data.features.length > 0); // Check if location is valid
      
      if (response.data.features.length > 0) {
        const locations = response.data.features.map((feature) => feature.place_name);
        setSuggestedLocations(locations);
      } else {
        setSuggestedLocations([]);
      }
    } catch (error) {
      console.error('Error validating location:', error);
      setIsValidLocation(false);
    }
  };

  const handleAutofillSuggestion = (suggestion) => {
    setName(suggestion);
    setSuggestedLocations([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuggestedLocations([]);

    if (!isValidLocation) {
      console.log('Invalid Location')
      return;
    }

    const newSurfLocation = {
      name,
      description,
    //   will need to add other properties for surf location
    };

    

    
    try {
      await axios.post(`${API_URL}/surf-locations`, newSurfLocation);
      onSubmit(); // Fetch updated surf locations
      window.location.href = '/locations'; // Navigate back to the map
    } catch (error) {
      console.error('Error adding SurfLocation:', error);
    }
    
  };

  
  return (
    <div>
      <h2 className="p-3 mb-2 bg-light bg-gradient text-dark bg-opacity-50">Add New Surf Location</h2>
      <ListGroup as="ul">
      <Form onSubmit={handleSubmit}>
        <ListGroup.Item as="li" action variant="info" className="p-3 mb-2 bg-gradient text-dark rounded-5">
        <Row className="form-group">
          <Form.Group as={Col}>
            <Form.Label className="label" htmlFor="locationName">Location Name:</Form.Label>
            <Form.Control
              id="locationName"
              name="locationName"
              type="text"
              placeholder="Enter Surf Location..."
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                handleLocationValidation(); // Trigger validation on every change
              }}
              required
            />
            {suggestedLocations.length > 0 && (
              <ul className="suggested-locations">
                {suggestedLocations.map((suggestion, index) => (
                  <li
                    key={index}
                    onBlur={handleLocationValidation}
                    onClick={() => handleAutofillSuggestion(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            {!isValidLocation && (
              <Alert variant="danger" className="error-message">
                Invalid location name
              </Alert>
            )}
          </Form.Group>
        </Row>
        </ListGroup.Item>
        <ListGroup.Item as="li" action variant="info" className="p-3 mb-2 bg-gradient text-dark rounded-5">
        <Form.Group className='form-group'>
          <Form.Label className="label" htmlFor="description">Description:</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            id="description" 
            name="description"
            placeholder='Enter City or Beach Name of your surf spot'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            />
        </Form.Group>
        </ListGroup.Item>
        {/* this is where i would add more form fields if desired */}
        <Button 
        id="addSurfLocationButton" 
        variant='light'
        className="p-3 mb-2 bg-info bg-gradient text-white rounded-4 bg-opacity-75" 
        type="submit">Add Surf Location</Button>
      </Form>
      </ListGroup>
    </div>
  );
}

export default AddSurfLocation;                                