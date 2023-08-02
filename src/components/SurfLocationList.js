import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Stack } from 'react-bootstrap';


const SurfLocationList = ({surfLocations, onDelete}) => {

  const [selectedSurfLocation, setSelectedSurfLocation] = useState(null);

  const handleSurfLocationClick = (surfLocation) => {
    setSelectedSurfLocation(surfLocation);
  };
 

  return (
    <div>
      <h2>Surf Locations</h2>
      <Stack gap={3}>
      <ul>
        {surfLocations.map(location => (
          <li key={location.id}>
            <Link to={`/locations/${location.id}`} onClick={() => handleSurfLocationClick(location)}>
                <h3>{location.name}</h3>
                <button onClick={() => onDelete(location.id)}>Delete</button>
                </Link>
          </li>
        ))}
      </ul>
        <Link to="/locations/add">
            <Button>Add a New Surf Location</Button></Link>
      </Stack>
    </div>
    
    
  );
}

export default SurfLocationList;
