import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SurfLocationDetails = ({surfLocations}) => {
  const { id } = useParams();
//   this will need surf location data from API based on id

  return (
    <div>
      {/* display detailed information about the surf location */}
      {/* I will edit what it actually displays */}
      <h2>Surf Location Details - ID: {id}</h2>
      <p>Details for surf location with ID {id}</p>
      
    </div>
  );
}

export default SurfLocationDetails;
