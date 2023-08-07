import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const API_URL = process.env.REACT_APP_API || 'http://localhost:8080';


const AddSurfLocation = ({onSubmit, surfLocations}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');



  const handleSubmit = async (event) => {
    event.preventDefault();
    const newSurfLocation = {
      name,
      description,
    //   will need to add other properties for surf location
    };

    

    // axios.post(`${API_URL}/surf-locations`, newSurfLocation)
    //   .then((response) => {
    //     console.log('New SurfLocation added:', response.data);
    //     onSubmit(); // Call the onSubmit function with the new location name
    //     window.location.href = '/';
    //   })
    //   .catch((error) => {
    //     console.error('Error adding SurfLocation:', error);
    //   });

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
      <h2>Add New Surf Location</h2>
      <Form onSubmit={handleSubmit}>
        <Row className='form-group'>
        <Form.Group as={Col} controlId='formGridLocationName'>
          <Form.Label htmlFor="locationName">Location Name:</Form.Label>
          <Form.Control
            id="locationName" 
            name="locationName"
            type="text"
            placeholder='Enter Surf Location...'
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            />
        </Form.Group>
        </Row>
        <Form.Group className='form-group' controlId='formGridAddress'>
          <Form.Label htmlFor="description">Description:</Form.Label>
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
        {/* this is where i would add more form fields if desired */}
        <Button variant='primary' type="submit">Add Surf Location</Button>
      </Form>
    </div>
  );
}

export default AddSurfLocation;