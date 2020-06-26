import React from 'react';
import './App.css';
import Homepage from './pages/homepage'
import Productpage from './pages/productpage'
import Profilepage from './pages/profilepage'
import Loginpage from './pages/login'
import NavbarComponent from './components/navbar'
import { Route } from 'react-router-dom';
import Axios from 'axios'

const URL = "http://localhost:2500"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keepLoginUser: {}
    }
  }

  componentDidMount() {
    this.keeplogin()
  }

  keeplogin = () => {
    let token = localStorage.getItem("loginRunner")
    if (token) {
      Axios.get(URL + `/users?id=${token}`)
        .then((res) => {
          // localStorage.setItem('loginRunner', res.data[0].id)
          console.log(res.data)
          this.setState({ keepLoginUser: res.data[0] })
          // location.reload();
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  render() {
    return (
      <div>
        <NavbarComponent data={this.state.keepLoginUser} />
        <Route path="/" component={Homepage} exact />
        <Route path="/product" component={Productpage} />
        <Route path="/profile" component={Profilepage} />
        <Route path="/login" component={Loginpage} />
      </div>
    );
  }
}

export default App;