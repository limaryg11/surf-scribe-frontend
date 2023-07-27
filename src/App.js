// App.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SurfLocationList from './components/SurfLocationList.js';
import SurfLocationDetails from './components/SurfLocationDetails';
import AddSurfLocation from './components/AddSurfLocation';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={SurfLocationList} />
          <Route path="/locations/add" component={AddSurfLocation} />
          <Route path="/locations/:id" component={SurfLocationDetails} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

