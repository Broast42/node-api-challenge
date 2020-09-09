import React from 'react';
import { Route } from 'react-router-dom';
import Projects from "./components/Projects"
import Actions from "./components/Actions"
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={(props) => <Projects {...props}/> } />
      <Route path="/actions/:id" render={(props) => <Actions {...props}/> } />
    </div>
  );
}

export default App;
