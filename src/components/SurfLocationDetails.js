import React from 'react';
import { useParams } from 'react-router-dom';

function SurfLocationDetails() {
  const { id } = useParams();
//   this will need surf location data from API based on id

  return (
    <div>
      {/* Display detailed information about the surf location */}
      <h2>Surf Location Details - ID: {id}</h2>
      <p>Details for surf location with ID {id}</p>
    </div>
  );
}

export default SurfLocationDetails;
