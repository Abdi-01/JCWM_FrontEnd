import React from 'react';
import { Button, Table } from 'reactstrap';
import Axios from 'axios'
import { connect } from 'react-redux'
import { API_URL } from '../support/url'
import { login } from '../redux/actions'

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    refreshCart = () => {
        Axios.patch(API_URL + `/users/${this.props.id}`, { cart: this.props.cart })
            .then((res) => {
                localStorage.setItem("id", res.data.id)
                this.props.login(res.data)
            }).catch((err) => {
                console.log("Error inc", err)
            })
    }

    btDecrement = (index) => {
        this.props.cart[index].qty -= 1
        this.props.cart[index].total = this.props.cart[index].qty * this.props.cart[index].price
        console.log(this.props.cart[index])
        this.refreshCart()
    }

    btIncrement = (index) => {
        this.props.cart[index].qty += 1
        this.props.cart[index].total = this.props.cart[index].qty * this.props.cart[index].price
        console.log(this.props.cart[index])
        this.refreshCart()
    }

    renderCart = () => {
        let { cart } = this.props
        return cart.map((item, index) => {
            return (
                <tr key={index}>
                    <th>{index + 1}</th>
                    <th style={{ width: "10vw" }}><img src={item.image} width="100%" /> </th>
                    <th>{item.name}</th>
                    <th>{item.category}</th>
                    <th>{item.size}</th>
                    < div className="d-flex">
                        <Button onClick={() => this.btDecrement(index)}>-</Button>
                                &nbsp;
                                <p>{item.qty}</p>
                                &nbsp;
                        <Button onClick={() => this.btIncrement(index)}>+</Button>
                    </ div>
                    <th>{item.price}</th>
                    <th>{item.total}</th>
                    <th>
                        <Button color="danger" onClick={() => this.btDelete(index)}>Delete</Button>
                    </th>
                </tr>
            )
        })
    }

    btDelete = (index) => {
        this.props.cart.splice(index, 1)
        this.refreshCart()
    }

    totalPayment = () => {
        let payment = 0
        this.props.cart.forEach(element => {
            payment += element.total
        });

        return payment
    }

    btCheckout = () => {
        let date = new Date
        let obj = {
            iduser: this.props.id,
            username: this.props.user.username,
            date: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
            status: "Unpaid",
            cart: this.props.cart
        }
        console.log(obj)

        Axios.post(API_URL + "/userTransactions", obj)
            .then((res) => {
                console.log("Checkout success")
            })
            .catch((err) => {
                console.log("Checkout Error")
            })
    }

    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <th>No</th>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Size</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Amount Price</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {this.renderCart()}
                    </tbody>
                    <tfoot>
                        <th colSpan="7">Total Payment</th>
                        <th>{this.totalPayment()}</th>
                        <th><Button color="success" onClick={this.btCheckout}>Checkout</Button></th>
                    </tfoot>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("cek data", state.authReducer)
    return {
        user: state.authReducer,
        cart: state.authReducer.cart,
        id: state.authReducer.id
    }
}

export default connect(mapStateToProps, { login })(CartPage);