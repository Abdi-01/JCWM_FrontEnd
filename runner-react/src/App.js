import React from 'react';
import './App.css';
import Homepage from './pages/homepage'
import Productpage from './pages/productpage'
import Loginpage from './pages/login'
import Registerpage from './pages/register'
import Productdetail from './pages/productdetail'
import NavbarComponent from './components/navbar'
import { Route } from 'react-router-dom';
import Axios from 'axios'
import { connect } from 'react-redux'
import { login, logout } from './redux/actions'
import CartPage from './pages/cartpage';

const URL = "http://localhost:2500"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.keeplogin()
  }

  keeplogin = () => {
    let token = localStorage.getItem("loginRunner")
    if (token) {
      Axios.get(URL + `/users?id=${token}`)
        .then((res) => {
          localStorage.setItem('loginRunner', res.data[0].id)
          console.log(res.data)
          this.props.login(res.data[0])
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  render() {
    // console.log("test", this.props)
    return (
      <div>
        <NavbarComponent data={this.props.user} funcLogout={this.props.logout}/>
        <Route path="/" component={Homepage} exact />
        <Route path="/product" component={Productpage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/login" component={Loginpage} />
        <Route path="/register" component={Registerpage} />
        <Route path="/productdetail" component={Productdetail} />
      </div>
    );
  }
}

const mapToProps = (state) => {
  console.log("Global", state)
  return {
    user: state.authReducer
  }
}

export default connect(mapToProps, { login, logout })(App);