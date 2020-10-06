import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/home'
import NavbarComp from './components/navbar';
import ProductPage from './pages/product'
import RegisterPage from './pages/register'
import AboutPage from './pages/about'
import Axios from 'axios';
import { API_URL } from './support/url';
import ProductDetail from './pages/productDetail';
import ProductManagement from './pages/productManagement';
import NotFound from './pages/notFound';
import SlideManagement from './pages/slideManagement';
import { connect } from 'react-redux'
import { login } from './redux/actions'
import CartPage from './pages/cartUser';
import TransactionPage from './pages/transaction';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.keepLogin()
  }

  keepLogin = () => {
    let id = localStorage.getItem("id")
    if (id) {
      Axios.get(API_URL + `/users?id=${id}`)
        .then((res) => {
          this.props.login(res.data[0])
        }).catch((err) => {
          console.log("keepLogin Error :", err)
        })
    }
  }

  render() {
    return (
      <div>
        <NavbarComp user={this.props.user} />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/product" component={ProductPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/product-detail" component={ProductDetail} />
          {
            this.props.role && this.props.role === "admin" ?
              <>
                <Route path="/product-admin" component={ProductManagement} />
                <Route path="/slide-admin" component={SlideManagement} />
              </>
              :
              <>
                <Route path="/cart" component={CartPage} />
                <Route path="/transaction" component={TransactionPage} />
              </>
          }
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer,
    role: state.authReducer.role
  }
}

export default connect(mapStateToProps, { login })(App);