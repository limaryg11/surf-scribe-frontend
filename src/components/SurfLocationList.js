import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const SurfLocationList = ({surfLocations}) => {
 

  return (
    <div>
      <h2>Surf Locations</h2>
      <ul>
        {surfLocations.map(location => (
          <li key={location.id}>
            <Link to={`/locations/${location.id}`}>
                <h3>{location.name}</h3>
                </Link>
          </li>
        ))}
      </ul>
        <Link to="/locations/add">
            <Button>Add a New Surf Location</Button></Link>
      
    </div>
    
    
  );
}

export default SurfLocationList;
