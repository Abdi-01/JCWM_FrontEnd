import React from 'react';
import { Button, Table } from 'reactstrap';
import Axios from 'axios'
import { connect } from 'react-redux'
import { API_URL } from '../support/url'
import { login, keepLogin, getCart } from '../redux/actions'
import { Redirect } from 'react-router-dom';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getCart()
    }

    refreshCart = (param1, param2) => {
        Axios.patch(API_URL + `/users/editcart/${param1}`, { qty: param2 })
            .then((res) => {
                this.props.getCart()
            }).catch((err) => {
                console.log("Error inc", err)
            })
    }

    btDecrement = (idcart, index) => {
        if (this.props.cart[index].qty > 1) {
            this.props.cart[index].qty -= 1
            // this.props.cart[index].total = this.props.cart[index].qty * this.props.cart[index].price
            console.log("dec", this.props.cart[index].qty)
            this.refreshCart(idcart, this.props.cart[index].qty)
        } else {
            this.btDelete(idcart)
        }
    }

    btIncrement = (idcart, index) => {
        this.props.cart[index].qty += 1
        // this.props.cart[index].total = this.props.cart[index].qty * this.props.cart[index].price
        this.refreshCart(idcart, this.props.cart[index].qty)
        console.log("inc", this.props.cart[index].qty)
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
                        <Button onClick={() => this.btDecrement(item.idcart, index)}>-</Button>
                                &nbsp;
                                <p>{item.qty}</p>
                                &nbsp;
                        <Button onClick={() => this.btIncrement(item.idcart, index)}>+</Button>
                    </ div>
                    <th>{item.price}</th>
                    <th>{(item.qty * item.price).toLocaleString()}</th>
                    <th>
                        <Button color="danger" onClick={() => this.btDelete(item.idcart)}>Delete</Button>
                    </th>
                </tr>
            )
        })
    }

    btDelete = (idcart) => {
        Axios.delete(API_URL + `/users/cart/${idcart}`)
            .then((res) => {
                this.props.getCart()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    totalPayment = () => {
        let payment = 0
        this.props.cart.forEach(element => {
            payment += (element.qty * element.price)
        });

        return payment.toLocaleString()
    }

    decrementStock = (id, stock) => {
        Axios.patch(API_URL + `/products/${id}`, stock)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    btCheckout = () => {
        // let date = new Date
        // let obj = {
        //     iduser: this.props.id,
        //     username: this.props.user.username,
        //     date: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
        //     status: "Unpaid",
        //     cart: this.props.cart
        // }
        // Melakukan looping untuk menemukan id product yg ada di cart dengan yg ada di database product
        // this.props.cart.forEach((item, index) => {
        //     // Looping database product
        //     // Cara 1
        //     // this.props.product.forEach((value, idx) => {
        //     //     // memberikan fungsi condition dari cart(item.idproduct) dengan product(value.id)
        //     //     if (item.idproduct == value.id) {
        //     //         console.log("sama", item.idproduct, value.id)
        //     //         let indexStock = value.stock.findIndex(element => element.code == item.size)
        //     //         console.log(value.stock[indexStock])
        //     //         value.stock[indexStock].total -= item.qty
        //     //         this.decrementStock(value.id, { stock: value.stock })
        //     //     }
        //     // })
        //     // cara 2
        //     // Mencari index product
        //     let indexProduct = this.props.product.findIndex(value => value.id == item.idproduct)
        //     // Mencari index stock
        //     let indexStock = this.props.product[indexProduct].stock.findIndex(value => value.code == item.size)
        //     this.props.product[indexProduct].stock[indexStock].total -= item.qty
        //     this.decrementStock(item.idproduct, { stock: this.props.product[indexProduct].stock })
        // })

        Axios.post(API_URL + "/transactions/addTotransaction", { cart: this.props.cart, iduser: this.props.id })
            .then((res) => {
                console.log("Checkout success")
                // Axios.patch(API_URL + `/users/${this.props.id}`, { cart: [] })
                //     .then((res) => {
                //         console.log(res.data)
                //         this.setState({ toTrans: true })
                //         this.props.keepLogin()
                //     })
                //     .catch((err) => {
                //         console.log(err)
                //     })
            })
            .catch((err) => {
                console.log("Checkout Error")
            })
    }

    render() {
        if (this.state.toTrans) {
            return <Redirect to="/transaction" />
        }
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
        id: state.authReducer.iduser,
        product: state.productReducers
    }
}

export default connect(mapStateToProps, { login, keepLogin, getCart })(CartPage);