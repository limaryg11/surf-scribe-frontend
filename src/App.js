
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SurfLocationList from './components/SurfLocationList';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SurfLocationDetails from './components/SurfLocationDetails';
import AddSurfLocation from './components/AddSurfLocation';
import Footer from './components/Footer';
import SurfMap from './components/SurfMap';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = process.env.REACT_APP_API

function App() {



  const [surfLocations, setSurfLocations] = useState([]);

  const {id} = useParams();

  const currentSurfLocation = surfLocations.find((surfLocation) => surfLocation.id === id);
  const [selectedSurfLocation, setSelectedSurfLocation] = useState(currentSurfLocation);

  useEffect(() => {fetchSurfLocations()}, []);

  const fetchSurfLocations = () => {
    axios.get(`${API_URL}/surf-locations`)
      .then((response) => {
        console.log("getting data")
        setSurfLocations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching SurfLocations:', error);
      });
  }; 
  console.log(surfLocations);

  const handleSurfLocationClick = (id) => {
    axios.get(`${API_URL}/surf-locations/${id}`)
      .then((response) => {
        setSelectedSurfLocation(response.data);
      })
      .catch((error) => {
        console.error('Error fetching SurfLocation:', error);
      });
  };


  const handleDelete = (surfLocationId) => {
    // Show confirmation popup
    const confirmed = window.confirm("Are you sure you want to delete this location?");

    if (confirmed) {
      
      axios.delete(`${API_URL}/surf-locations/${surfLocationId}`)
        .then((response) => {
          setSurfLocations((prevSurfLocations) =>
            prevSurfLocations.filter((surfLocation) => surfLocation.id !== surfLocationId)
          );
          window.location.href = '/locations'; 
        })
        .catch((error) => {
          console.error('Error deleting SurfLocation:', error);
        });
    }
  };


const handleDeleteNote = (surfLocationId, noteId) => {

  const confirmed = window.confirm("Are you sure you want to delete this location?");

  if (confirmed) {
  axios
    .delete(`${API_URL}/surf-locations/${surfLocationId}/notes/${noteId}`)
    .then((response) => {
      console.log('Note deleted:', response.data);
      // Update the UI to reflect the changes
      const updatedSurfLocations = surfLocations.map((surfLocation) => {
        if (surfLocation.id === surfLocationId) {
          const updatedNotes = surfLocation.notes.filter((note) => note.id !== noteId);
          return { ...surfLocation, notes: updatedNotes };
        }
        return surfLocation;
      });
      setSurfLocations(updatedSurfLocations);
    })
    .catch((error) => {
      console.error('Error deleting Note:', error);
    });
  }
};
  



  return (
    <Router>
      <Navbar bg="light" data-bs-theme='light'>
        <Container className='nav'>
          <Navbar.Brand href="/">SurfScribe</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">Map</Nav.Link>
              <Nav.Link href="/locations">Surf Spots</Nav.Link>
              {/* add more Nav.Link components */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className="main-container">
        <Row className="flex-grow-1">
          <Col>
            <Routes>
              <Route path="/" element={<SurfMap surfLocations={surfLocations} />} />
              <Route
                path="/locations"
                element={<SurfLocationList surfLocations={surfLocations} onDelete={handleDelete} onSurfLocationClick={handleSurfLocationClick} />}
              />
              <Route path="/locations/add" element={<AddSurfLocation onSubmit={fetchSurfLocations} />} />
              <Route
                path="/locations/:id"
                element={<SurfLocationDetails surfLocations={surfLocations} selectedSurfLocation={selectedSurfLocation} handleDeleteNote={handleDeleteNote} />}
              />
              <Route
              path="/"
              />
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;