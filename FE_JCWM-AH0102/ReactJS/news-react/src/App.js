import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/homepage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="container">
        <Navbar/>
        <Route path="/" component={Home} exact/>
      </div>
    );
  }
}

export default App;