
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SurfLocationList from './components/SurfLocationList';
import SurfLocationDetails from './components/SurfLocationDetails';
import AddSurfLocation from './components/AddSurfLocation';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const API_URL = process.env.REACT_APP_API || 'http://localhost:8080';

function App() {



  const [surfLocations, setSurfLocations] = useState([]);

  const {id} = useParams();

  const currentSurfLocation = surfLocations.find((surfLocation) => surfLocation.id === id);
  const [selectedSurfLocation, setSelectedSurfLocation] = useState(currentSurfLocation);

  useEffect(() => {
    // Fetch SurfLocations from the backend API when the component mounts
    axios.get(`${API_URL}/surf-locations`)
      .then((response) => {
        console.log("getting data")
        setSurfLocations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching SurfLocations:', error);
      });
  }, []);

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
          window.location.href = '/'; 
        })
        .catch((error) => {
          console.error('Error deleting SurfLocation:', error);
        });
    }
  };

  


  return (

      <Router className='allofit'>
        <div className='sames'>
        <header>
            <div className='logo-container'>
              </div>
            <div className="navbar">
              <h1 className="logo">SurfScribe</h1>
              <nav className="nav-links">
                <a className="nav-link" href="/">Home</a>
                {/* <a className="nav-link" href="/locations/add">Add Location</a> */}
                {/* may add more */}
                <a className="nav-link" href="/login">Login</a>
                <a className="nav-link" href="/register">Register</a>
              </nav>
            </div>
          </header>
          <main className="container">
            <Routes>
              <Route path="/" element={<SurfLocationList surfLocations={surfLocations} onDelete={handleDelete} onSurfLocationClick={handleSurfLocationClick}/>} />
              <Route path="/locations/add" element={<AddSurfLocation />} />
              <Route path="/locations/:id" element={<SurfLocationDetails surfLocations={surfLocations} selectedSurfLocation={selectedSurfLocation} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
