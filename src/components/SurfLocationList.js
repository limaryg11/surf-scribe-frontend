import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './SurfLocationList.css'


const SurfLocationList = ({surfLocations, onDelete, onSurfLocationClick}) => {

  // const [selectedSurfLocation, setSelectedSurfLocation] = useState(null);

  // const handleSurfLocationClick = (surfLocation) => {
  //   setSelectedSurfLocation(surfLocation);
  // };
 

  return (
    <Container className='surflocation-container'>
      <Row>
      <h2>Surf Locations</h2>
      </Row>
      <Row>
      <ul>
        {surfLocations.map(location => (
          <li key={location.id}>
            <Stack direction='horizontal' gap={2}>
            <Link to={`/locations/${location.id}`} onClick={() => onSurfLocationClick(location.id)}>
                <h3>{location.name}</h3>
                </Link>
                <Button variant="secondary" size="sm"onClick={() => onDelete(location.id)}>Delete</Button></Stack>
          </li>
        ))}
      </ul>
      </Row>
      <Row>
        <Link to="/locations/add">
            <Button variant="primary" size="lg">Add a New Surf Location</Button></Link>
      </Row>
    </Container>
    
    
  );
}

export default SurfLocationList;
