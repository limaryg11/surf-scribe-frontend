
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
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

function App() {



  const [surfLocations, setSurfLocations] = useState([]);

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


  const handleDelete = (surfLocationId) => {
    // Show confirmation popup
    const confirmed = window.confirm("Are you sure you want to delete this location?");

    if (confirmed) {
      
      axios.delete(`${API_URL}/surf-locations/${surfLocationId}`)
        .then((response) => {
          setSurfLocations((prevSurfLocations) =>
            prevSurfLocations.filter((surfLocation) => surfLocation.id !== surfLocationId)
          );
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
            <Route path="/" element={<SurfLocationList surfLocations={surfLocations} onDelete={handleDelete}/>} />
            <Route path="/locations/add" element={<AddSurfLocation />} />
            <Route path="/locations/:id" element={<SurfLocationDetails surfLocations={surfLocations} />} />
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
