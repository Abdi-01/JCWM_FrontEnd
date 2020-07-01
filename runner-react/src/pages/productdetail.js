import React from 'react';
import Axios from 'axios';
import Slider from "react-slick";
import { connect } from 'react-redux'
import { login } from '../redux/actions'
import { Redirect } from 'react-router-dom'
import { Paper, Typography, Grid, Button, Input, TextField } from '@material-ui/core';
const URL = "http://localhost:2500"

class Productdetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productDetail: {},
            stockSize: 0,
            selectedIndex: null,
            chooseSize: 0,
            redirect: false
        }
    }

    componentDidMount() {
        this.getProductDetail()
    }

    getProductDetail = () => {
        Axios.get(URL + "/products" + this.props.location.search)
            .then((res) => {
                console.log("product", res.data)
                this.setState({ productDetail: res.data[0] })
            }).catch((err) => {
                console.log("Error BOS !", err)
            })
    }

    onBtBuy = () => {
        let { productDetail, chooseSize } = this.state
        console.log("Buy Qty :", this.buyQty.value)
        let objCart = {
            name: productDetail.name,
            brand: productDetail.brand,
            color: productDetail.colour,
            size: chooseSize,
            qty: this.buyQty.value,
            total: parseInt(this.buyQty.value) * productDetail.price
        }
        let tempCart = this.props.cart
        tempCart.push(objCart)
        console.log("Add to cart", this.props.id, tempCart)

        Axios.patch(URL + `/users/${this.props.id}`, { cart: tempCart })
            .then((res) => {
                console.log(res.data)
                alert("Add to Cart Success ✅")
                Axios.get(URL + `/users?id=${this.props.id}`)
                    .then((res) => {
                        localStorage.setItem('loginRunner', res.data[0].id)
                        console.log(res.data)
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
    }

    render() {
        // console.log("Props location search", this.props)
        let { productDetail, stockSize, redirect } = this.state
        if (this.state.redirect) return <Redirect to="/cart" />
        const settings = {
            customPaging: function (i) {
                return (
                    <a>
                        <img src={productDetail.images[i]} width="120%" />
                    </a>
                );
            },
            dots: true,
            dotsClass: "slick-dots slick-thumb",
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div style={{ backgroundColor: '#404146', height: '100vh', paddingTop: '5%' }}>
                <Paper elevation={3} style={{ width: '80%', margin: 'auto', height: '70%', display: 'flex' }}>
                    <div style={{ width: '40%', backgroundColor: "#0376AB" }}>
                        <div style={{ width: '90%', margin: 'auto', marginTop: '4%' }}>
                            <Slider {...settings}>
                                {productDetail.id > 0 ?
                                    productDetail.images.map((item, index) => {
                                        return (
                                            <div>
                                                <img src={item} width="100%" style={{ margin: 'auto' }} />
                                            </div>
                                        )
                                    }) :
                                    <></>
                                }
                            </Slider>
                        </div>
                    </div>
                    <div style={{ width: '60%' }}>
                        <Typography style={{ fontSize: 40, borderBottom: "4px solid #404146", marginTop: -4, padding: 4 }}>{this.state.productDetail.name}</Typography>
                        <div style={{ display: 'flex', marginLeft: '3%' }}>
                            <div>
                                <Typography>Category</Typography>
                                <Typography>Brand</Typography>
                                <Typography>Color</Typography>
                                <Typography>Description</Typography>
                            </div>
                            <div style={{ marginLeft: '5%', marginRight: '2%', textAlign: 'justify' }}>
                                <Typography>{productDetail.category}</Typography>
                                <Typography>{productDetail.brand}</Typography>
                                <Typography>{productDetail.colour}</Typography>
                                <Typography>{productDetail.description}</Typography>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto', width: '80%', marginTop: '3%' }}>
                            {
                                productDetail.id > 0 ? productDetail.stock.map((item, index) => {
                                    if (index == this.state.selectedIndex) {
                                        return <Button variant="outlined" style={{ backgroundColor: 'orange' }} disabled>{item.code}</Button>
                                    } else {
                                        return <Button variant="outlined" onClick={() => this.setState({ stockSize: item.total, selectedIndex: index, chooseSize: item.code })}>{item.code}</Button>
                                    }
                                }) : <></>
                            }
                        </div>
                        <Typography style={{ textAlign: 'center', marginBottom: '10%' }}>Stock : {stockSize}</Typography>
                    </div>
                    <div style={{ display: 'flex', position: 'absolute', height: '8%', width: '48%', bottom: "10.8%", right: "10%" }}>
                        <Typography style={{ fontSize: 40, fontWeight: 'bold' }}>IDR. {productDetail.price > 0 ? productDetail.price.toLocaleString() : 0}</Typography>
                        <TextField id="outlined-basic" label="Buy qty : " inputRef={(value) => this.buyQty = value} variant="outlined" style={{ position: 'absolute', right: "14%", width: "12%" }} />
                        <Button variant="contained" style={{ backgroundColor: '#404146', color: 'white', height: '100%', position: 'absolute', right: 0 }} disableElevation onClick={this.onBtBuy}>
                            Primary
                        </Button>
                    </div>
                </Paper>
            </div>
        );
    }
}

const mapToProps = (state) => {
    console.log("Global", state.authReducer.cart)
    return {
        id: state.authReducer.id,
        cart: state.authReducer.cart
    }
}

export default connect(mapToProps, { login })(Productdetail);