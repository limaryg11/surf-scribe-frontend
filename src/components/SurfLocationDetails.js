import React from 'react';
import { useParams } from 'react-router-dom';

const SurfLocationDetails = ({ surfLocations }) => {

  const {id} = useParams();
  const selectedSurfLocation = surfLocations.find((surfLocation) => surfLocation.id === id);

  console.log(id);
  console.log(selectedSurfLocation);
  
  return (

    <div>
      <h2>Surf Location Details</h2>
      {selectedSurfLocation ? (
        <div>
          <h3>{selectedSurfLocation.name}</h3>
          <p>{selectedSurfLocation.description}</p>
          <h3>Notes:</h3>
          <ul>
            {selectedSurfLocation.notes.map((note) => (
              <li key={note.id}>{note.text}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Surf location not found.</p>
      )}
    </div>
  );



};

export default SurfLocationDetails;
