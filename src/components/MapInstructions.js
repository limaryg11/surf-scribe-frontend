
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import './MapInstructions.css'

const MapInstructions = () => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="info" className="p-3 mb-2 bg-gradient text-dark rounded-5 bg-opacity-50" onClose={() => setShow(false)} dismissible>
        <Alert.Heading className='alert-logo'>Welcome to your SurfScribe Map Interface</Alert.Heading>
        <p className='info-message'>
          Use this map interface to see your surf locations on the map.<br/>
          You can click on the name of surf location or navigate through the map to see surf locations you have already added.<br/> 
          Once you click on a location on the map, you can click on "see details" to view and edit notes about your surf locations.<br/> 
          Please click on "Add Surf Location" button to add a new surf location.
        </p>
      </Alert>
    );
  }
  return <Button 
  id="instructionButton" 
  variant="light"
  className="bg-light text-dark rounded-4 bg-opacity-75" 
  onClick={() => setShow(true)}>Show Instructions</Button>;
}

export default MapInstructions;