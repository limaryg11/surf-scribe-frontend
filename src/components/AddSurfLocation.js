import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


const API_URL = process.env.REACT_APP_API || 'http://localhost:8080';

const AddSurfLocation = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');



  const handleSubmit = (event) => {
    event.preventDefault();
    const newSurfLocation = {
      name,
      description,
    //   will need to add other properties for surf location
    };

    axios.post(`${API_URL}/surf-locations`, newSurfLocation)
      .then((response) => {
        console.log('New SurfLocation added:', response.data);
        window.location.href = '/'; 
      })
      .catch((error) => {
        console.error('Error adding SurfLocation:', error);
      });
  };


return (
    <div>
      <h2>Add New Surf Location</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="locationName">Location Name:</label>
          <input
            id="locationName" 
            name="locationName"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            />
        </div>
        <div className='form-group'>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description" 
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            />
        </div>
        {/* this is where i would add more form fields if desired */}
        <Button type="submit">Add Surf Location</Button>
      </form>
    </div>
  );
}

export default AddSurfLocation;