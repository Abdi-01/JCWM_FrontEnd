import React from 'react';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TableFooter, TextField, Typography } from '@material-ui/core';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../redux/actions'
import Axios from 'axios'

const URL = "http://localhost:2500"
let count = 0
class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 0, total: 0, price: 0, selectedIdx: null, dbProducts: []
        }
    }

    componentDidMount() {
        this.getProduct()
    }

    getProduct = () => {
        Axios.get(URL + "/products")
            .then((res) => {
                console.log("product", res.data)
                this.setState({ dbProducts: res.data })
            }).catch((err) => {
                console.log("Error BOS !", err)
            })
    }

    onBtDelete = (index) => {
        let tempCart = this.props.cart
        tempCart.splice(index, 1)

        Axios.patch(URL + `/users/${this.props.id}`, { cart: tempCart })
            .then((res) => {
                console.log(res.data)
                alert("Delete Success ✅🧺")
                Axios.get(URL + `/users?id=${this.props.id}`)
                    .then((res) => {
                        localStorage.setItem('loginRunner', res.data[0].id)
                        console.log(res.data)
                        this.props.login(res.data[0])
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    onBtCheckout = () => {
        let tempProducts = this.state.dbProducts
        let tempCart = this.props.cart
        tempProducts.forEach((item, index) => {
            tempCart.forEach((value, idx) => {
                if (item.name == value.name) {
                    console.log(item.name, value.name)
                    this.handleStock(index, idx)
                }
            })
        })

        Axios.post(URL + `/userTransaction`, { userID: this.props.id, date: new Date().toLocaleString(), total: count, cart: tempCart })
            .then((res) => {
                Axios.patch(URL + `/users/${this.props.id}`, { cart: [] })
                    .then((res) => {
                        Axios.get(URL + `/users?id=${this.props.id}`)
                            .then((res) => {
                                localStorage.setItem('loginRunner', res.data[0].id)
                                this.props.login(res.data[0])
                                this.setState({ redirect: true })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleStock = (index, idx) => {
        let tempStocks = this.state.dbProducts[index].stock//array of object
        let tempCart = this.props.cart[idx]//object
        tempStocks.forEach((item, index) => {
            if (item.code == tempCart.size) {
                item.total -= tempCart.qty
            }
        });
        Axios.patch(URL + `/products/${this.state.dbProducts[index].id}`, { stock: tempStocks })
            .then((res) => {
                console.log("sukses")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidUpdate() {
        for (let i = 0; i < this.props.cart.length; i++) {
            console.log(this.props.cart[i].qty)
        }
    }

    onBtSave = () => {
        let tempCart = this.props.cart
        tempCart[this.state.selectedIdx].qty = this.state.qty
        tempCart[this.state.selectedIdx].total = this.state.total

        Axios.patch(URL + `/users/${this.props.id}`, { cart: tempCart })
            .then((res) => {
                Axios.get(URL + `/users?id=${this.props.id}`)
                    .then((res) => {
                        localStorage.setItem('loginRunner', res.data[0].id)
                        this.props.login(res.data[0])
                        this.setState({ selectedIdx: null })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    onBtInc = () => {
        let count = this.state.qty
        count++
        console.log(count)

        this.setState({ qty: count, total: count * this.state.price })
    }

    onBtDec = () => {
        let count = this.state.qty
        count--
        console.log(count)
        if (count == 0) {
            this.onBtDelete(this.state.selectedIdx)
        }
        this.setState({ qty: count, total: count * this.state.price })
    }

    printData = () => {
        return this.props.cart.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        {index + 1}
                    </TableCell>
                    <TableCell align="left"><img src={item.image} width="100%" style={{ margin: 'auto' }} /></TableCell>
                    <TableCell align="left">{item.name}</TableCell>
                    <TableCell align="left">{item.brand}</TableCell>
                    <TableCell align="left">{item.color}</TableCell>
                    <TableCell align="left">{item.size}</TableCell>
                    {
                        this.state.selectedIdx === index ?
                            <>
                                <TableCell align="left" >
                                    <Button color="secondary" onClick={this.onBtDec}>-</Button>
                                    {this.state.qty}
                                    <Button color="primary" onClick={this.onBtInc}>+</Button>
                                </TableCell>
                                <TableCell align="left">IDR. {this.state.total.toLocaleString()}</TableCell>
                                <TableCell align="left">
                                    <Button variant="contained" color="secondary" onClick={() => this.setState({ selectedIdx: null })}>
                                        No
                                </Button>
                                    <Button variant="contained" color="primary" onClick={this.onBtSave}>
                                        Save
                                 </Button>
                                </TableCell>
                            </>
                            :
                            <>
                                <TableCell align="left">{item.qty}</TableCell>
                                <TableCell align="left">IDR. {item.total.toLocaleString()}</TableCell>
                                <TableCell align="left">
                                    <Button variant="contained" color="secondary" onClick={() => this.onBtDelete(index)}>
                                        Delete
                                </Button>
                                    <Button variant="contained" color="primary" onClick={() => this.setState({ selectedIdx: index, qty: item.qty, total: item.total, price: item.price })}>
                                        Edit
                                 </Button>
                                </TableCell>
                            </>
                    }
                </TableRow>
            )
        })
    }

    render() {
        count = 0
        this.props.cart.map((item, index) => {
            count += item.total
        })
        if (this.state.redirect) {
            console.log("dua")
            return <Redirect to="/" />
        }
        return (
            <div>
                <h1>
                    Look what you buy this time !!!
                </h1>
                <div style={{ marginTop: '3%' }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell align="center" style={{ width: '10%' }}>Image</TableCell>
                                    <TableCell align="center">Product Name</TableCell>
                                    <TableCell align="center">Brand</TableCell>
                                    <TableCell align="center">Color</TableCell>
                                    <TableCell align="center">Size</TableCell>
                                    <TableCell align="center">Qty</TableCell>
                                    <TableCell align="center">Total</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* ⬇⬇⬇ Memanggil javascript syntax didalam return(<element/>) harus menggunakan {bracket}, tapi hanya berlaku untuk single line syntax */}
                                {this.printData()}
                            </TableBody>
                            <TableFooter style={{ backgroundColor: '#404146', color: 'white' }}>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell><Typography style={{ color: 'white' }}> IDR. {count.toLocaleString()}</Typography></TableCell>
                                    <TableCell>
                                        <Button style={{ backgroundColor: '#0376AB', color: 'white' }} onClick={this.onBtCheckout}>Checkout</Button>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    console.log("MapToprops", state.sliderReducer)
    return {
        cart: state.authReducer.cart,
        id: state.authReducer.id
    }
}

export default connect(mapToProps, { login })(CartPage);