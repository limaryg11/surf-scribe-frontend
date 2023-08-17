import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import './SurfLocationList.css'


const SurfLocationList = ({surfLocations, onDelete, onSurfLocationClick}) => {


  return (
    <Container className='surflocation-container'>
      <Row>
      <h2>Surf Locations</h2>
      </Row>
      <Row>
      <ListGroup className='list-group' as="ul">
        {surfLocations.map(location => (
          <ListGroup.Item action variant="info" as="li" key={location.id}>
            <Stack direction='horizontal' gap={2}>
            <Link className='link-info mx-2' to={`/locations/${location.id}`} onClick={() => onSurfLocationClick(location.id)}>
                <h3>{location.name.split(',')[0]}</h3>
                </Link>
                <Button variant="info" className="bg-info text-dark rounded-4 bg-opacity-50"  size="sm"onClick={() => onDelete(location.id)}>Delete</Button></Stack>
          </ListGroup.Item>
        ))}
      </ListGroup>
      </Row>
      <Row>
        <Link to="/locations/add">
            <Button variant="light"
                    className="bg-info text-dark rounded-4 bg-opacity-50 " 
                    id="addNewButton"
                    size="lg">Add a New Surf Location</Button></Link>
      </Row>
    </Container>
    
    
  );
}

export default SurfLocationList;
