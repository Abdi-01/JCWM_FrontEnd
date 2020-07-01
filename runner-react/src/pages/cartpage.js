import React from 'react';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TableFooter, TextField, Typography } from '@material-ui/core';
import { connect } from 'react-redux'
class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbCart: [], selectedID: null
        }
    }

    printData = () => {
        return this.props.cart.map((item, index) => {
            if (item.id === this.state.selectedID) {
                return (
                    <TableRow key={index}>
                        <TableCell component="th" scope="row">
                            {index + 1}
                        </TableCell>
                        <TableCell align="right"><TextField id="standard-basic" label={item.name} defaultValue={item.username} inputRef={(text) => this.newUsername = text} /></TableCell>
                        <TableCell align="right"><TextField id="standard-basic" label={item.brand} defaultValue={item.password} inputRef={(text) => this.newPassword = text} /></TableCell>
                        <TableCell align="right"><TextField id="standard-basic" label={item.color} defaultValue={item.email} inputRef={(text) => this.newEmail = text} /></TableCell>
                        <TableCell align="right"><TextField id="standard-basic" label={item.size} defaultValue={item.email} inputRef={(text) => this.newEmail = text} /></TableCell>
                        <TableCell align="right"><TextField id="standard-basic" label={item.qty} defaultValue={item.email} inputRef={(text) => this.newEmail = text} /></TableCell>
                        <TableCell align="right"><TextField id="standard-basic" label={item.total} defaultValue={item.email} inputRef={(text) => this.newEmail = text} /></TableCell>
                        <TableCell align="right">
                            <Button variant="contained" color="secondary" onClick={() => this.setState({ selectedID: null })}>
                                No
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => this.onBtEdit(item.id)}>
                                Yes
                            </Button>
                        </TableCell>
                    </TableRow>
                )
            } else {
                return (
                    <TableRow key={index}>
                        <TableCell component="th" scope="row">
                            {index + 1}
                        </TableCell>
                        <TableCell align="left">{item.name}</TableCell>
                        <TableCell align="left">{item.brand}</TableCell>
                        <TableCell align="left">{item.color}</TableCell>
                        <TableCell align="left">{item.size}</TableCell>
                        <TableCell align="left">{item.qty}</TableCell>
                        <TableCell align="left">IDR. {item.total.toLocaleString()}</TableCell>
                        <TableCell align="left">
                            <Button variant="contained" color="secondary" onClick={() => this.onBtDelete(item.id)}>
                                Delete
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => this.setState({ selectedID: item.id })}>
                                Edit
                            </Button>
                        </TableCell>
                    </TableRow>
                )
            }
        })
    }

    render() {
        let count = 0
        this.props.cart.map((item, index) => {
            count += item.total
        })
        // console.log("total", count)
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
                                    <TableCell><Typography style={{ color: 'white' }}> IDR. {count.toLocaleString()}</Typography></TableCell>
                                    <TableCell>
                                        <Button style={{backgroundColor:'#0376AB',color:'white'}}>Checkout</Button>
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
        cart: state.authReducer.cart
    }
}

export default connect(mapToProps)(CartPage);