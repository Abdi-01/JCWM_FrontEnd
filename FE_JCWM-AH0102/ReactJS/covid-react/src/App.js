import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar'
import CountriesDetail from './pages/countriesDetail';
import Countries from './pages/countriespage';
import Home from './pages/homepage';
import NotFound from './pages/not404';
import Province from './pages/provincepage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/province" component={Province} />
          <Route path="/countries" component={Countries} />
          {/* Menerapkan parameter pada path route */}
          <Route path="/countries-detail/:countries/:iso" component={CountriesDetail} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;