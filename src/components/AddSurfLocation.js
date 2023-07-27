import React, { useState } from 'react';

const AddSurfLocation = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform operation to add the new surf location
    // will need to use axios/fetch to make a POST request to backend API
    const newSurfLocation = {
      name,
      description,
    //   will need to add other properties for surf location
    };

};

return (
    <div>
      <h2>Add New Surf Location</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            />
        </div>
        {/* this is where i would add more form fields if desired */}
        <button type="submit">Add Surf Location</button>
      </form>
    </div>
  );
}

export default AddSurfLocation;

























// Code to make a POST request to your backend API
// For example, using axios:
// axios.post('/api/surf-locations', newSurfLocation)
//   .then((response) => {
//     console.log('New surf location added:', response.data);
//     // Handle success or navigate to the updated list of surf locations
//   })
//   .catch((error) => {
//     console.error('Error adding surf location:', error);
//     // Handle error
//   });