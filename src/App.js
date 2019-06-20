import React from 'react';
import './App.css';

import Home from './components/home.js';

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/:number" component={Home} />
      <Route exact path="/" component={Home} />
    </Router>
  );
}

export default App;
