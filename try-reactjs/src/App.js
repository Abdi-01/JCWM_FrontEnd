import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './pages/welcome'
import FormPage from './pages/form'
import Login from './pages/login'
import Navbar from './components/navbar'
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
          <Route path='/' component={Home} exact />
          <Route path='/login' component={Login} />
          <Route path='/form' component={FormPage} />
        </Switch>
      </div>
    );
  }
}

export default App;