import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/homepage';
import NewsDetail from './pages/newsDetail';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="container" >
        <Navbar/>
        <Route path="/" component={Home} exact/>
        <Route path="/newsDetail" component={NewsDetail}/>
      </div>
    );
  }
}

export default App;