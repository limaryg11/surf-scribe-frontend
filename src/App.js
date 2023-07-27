
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SurfLocationList from './components/SurfLocationList';
import SurfLocationDetails from './components/SurfLocationDetails';
import AddSurfLocation from './components/AddSurfLocation';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <Router>
      <div>
      <header style={{ backgroundImage: 'url(/wave.png)' }}>
          <div className="navbar">
            <h1 className="logo">SurfScribe</h1>
            <nav className="nav-links">
              <a className="nav-link" href="/">Home</a>
              <a className="nav-link" href="/locations/add">Add Location</a>
              {/* may add more */}
              <a className="nav-link" href="/login">Login</a>
              <a className="nav-link" href="/register">Register</a>
            </nav>
          </div>
        </header>
        <main className="container">
          <Routes>
            <Route path="/" element={<SurfLocationList />} />
            <Route path="/locations/add" element={<AddSurfLocation />} />
            <Route path="/locations/:id" element={<SurfLocationDetails />} />
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
