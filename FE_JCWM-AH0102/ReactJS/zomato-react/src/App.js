import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage'
import NavbarComp from './components/navbar'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <NavbarComp title="Halo!"/>
        <Switch>
          <Route path="/" component={HomePage} exact />
        </Switch>
      </div>
    );
  }
}

export default App;