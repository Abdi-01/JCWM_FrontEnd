import React from 'react';
import './App.css'
import Navbar from './components/navbar'
import Home from './pages/homepage'
import Profile from './pages/profilepage'
import Biodata from './pages/biodatapage'
import { Route } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <Navbar title="Purwadhika" />
        <Route path="/" component={Home} exact />
        <Route path="/profile" component={Profile} />
        <Route path="/biodata" component={Biodata} />
      </div>
    );
  }
}

export default App;