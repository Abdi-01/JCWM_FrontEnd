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
import { login, getProducts, keepLogin, getCart } from './redux/actions'
import CartPage from './pages/cartUser';
import TransactionPage from './pages/transaction';
import TransactionAdmin from './pages/adminTransaction';
import VerificationPage from './pages/verification';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.props.keepLogin()
    this.props.getCart()
    this.getProducts()
  }

  // keepLogin = () => {
  //   let id = localStorage.getItem("id")
  //   if (id) {
  //     Axios.get(API_URL + `/users?id=${id}`)
  //       .then((res) => {
  //         this.props.login(res.data[0])
  //       }).catch((err) => {
  //         console.log("keepLogin Error :", err)
  //       })
  //   }
  // }

  getProducts = () => {
    Axios.get(API_URL + "/products/getProducts")
      .then((res) => {
        console.log("Get Product success :", res.data)
        this.props.getProducts(res.data)
      })
      .catch((err) => {
        console.log("Get Product Error :", err)
      })
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
          <Route path='/verification/:token' component={VerificationPage}/>
          {
            this.props.role && this.props.role === "admin" ?
              <>
                <Route path="/product-admin" component={ProductManagement} />
                <Route path="/transaction-admin" component={TransactionAdmin} />
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

export default connect(mapStateToProps, { login, getProducts, keepLogin, getCart })(App);