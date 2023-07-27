import React from 'react';
import { Link } from 'react-router-dom';

function SurfLocationList() {
  // Replace this with actual surf location data from your API
  const surfLocations = [
    { id: 1, name: 'Surf Location 1', description: 'Description 1' },
    { id: 2, name: 'Surf Location 2', description: 'Description 2' },
    // Add more surf location data as needed
  ];

  return (
    <div>
      <h2>Surf Locations</h2>
      <ul>
        {surfLocations.map(location => (
          <li key={location.id}>
            <Link to={`/locations/${location.id}`}>{location.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SurfLocationList;
