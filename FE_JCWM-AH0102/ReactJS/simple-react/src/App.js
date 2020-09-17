import React from 'react';
import './App.css';
import Home from './pages/homepage'
import NotFound from './pages/not404'
import { Route, Switch } from 'react-router-dom'
import Navbar from './components/navbar';
import Login from './pages/login';
import FormPage from './pages/form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <Navbar/>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/form" component={FormPage} />
          <Route path="*" component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;