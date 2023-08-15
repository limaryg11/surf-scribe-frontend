
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import './MapInstructions.css'

const MapInstructions = () => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="info" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Welcome to your Surf Spot Map Interface</Alert.Heading>
        <p>
          Use this map interface to see your surf locations on the map. 
          You can click on the name of surf location or navigate through the map to see surf locations you have already added. 
          Once you click on a location on the map, you can click on "see details" to view and edit notes about your surf locations. 
          Please click on "Add Surf Location" button to add a new surf location.
        </p>
      </Alert>
    );
  }
  return <Button className="instructionButton" variant="light" onClick={() => setShow(true)}>Show Instructions</Button>;
}

export default MapInstructions;