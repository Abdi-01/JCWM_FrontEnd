import React from 'react';
import Axios from 'axios';
import { API_URL } from '../support/url'
import { Button, ButtonGroup, Input, Jumbotron } from 'reactstrap';
import { connect } from 'react-redux'

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            thumbnail: 0,
            total: 0,
            qty: 0
        }
    }

    componentDidMount() {
        this.getProductDetail()
    }

    getProductDetail = () => {
        console.log(this.props.location.search)
        Axios.get(API_URL + `/products${this.props.location.search}`)
            .then((res) => {
                console.log("success get detail:", res.data)
                this.setState({ detail: res.data[0] })
            })
            .catch((err) => {
                console.log("Error get detail:", err)
            })
    }

    renderThumbnail = (images) => {
        return images.map((item, index) => {
            return (
                <div className="flex-grow-1 select-image" onClick={() => this.setState({ thumbnail: index })} style={{ padding: "0 1px" }}>
                    <img src={item} key={index} width="100%" />
                </div>
            )
        })
    }

    renderStock = (stock) => {
        return stock.map((item, index) => {
            return (
                <Button outline color="primary" onClick={() => this.setState({ total: item.total, size: item.code })} key={index} disabled={item.total === 0 && true}>{item.code}</Button>
            )
        })
    }

    btIncrement = () => {
        if (this.state.qty < this.state.total) {
            this.setState({ qty: this.state.qty += 1 })
        } else {
            alert("Out of Stock")
        }
    }

    btAddToCart = () => {
        this.props.cart.push({
            image: this.state.detail.images[0],
            name: this.state.detail.name,
            category: this.state.detail.category,
            size: this.state.size,
            price: parseInt(this.state.detail.price),
            qty: this.state.qty,
            total: (this.state.qty * this.state.detail.price)
        })
        Axios.patch(API_URL + `/users/${localStorage.getItem("id")}`, { cart: this.props.cart })
            .then((response) => {
                console.log("success add to cart:", response.data)
            })
            .catch((err) => {
                console.log("Error add to cart:", err)
            })
    }

    render() {
        let { detail } = this.state
        return (
            <div className="container">
                {
                    detail.id &&
                    <Jumbotron className="row" style={{ padding: "3vh" }}>
                        <div className="col-md-4">
                            <img src={detail.images[this.state.thumbnail]} width="100%" />
                            <div className="d-flex mt-1">
                                {this.renderThumbnail(detail.images)}
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-7">
                                    <h3 className="font-italic">{detail.name}</h3>
                                </div>
                                <div className="col-md-5">
                                    <h3 className="font-weight-bold">IDR. {detail.price.toLocaleString()}</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <h6 className="text-muted font-weight-bold">Brand</h6>
                                    <h5>{detail.brand}</h5>
                                </div>
                                <div className="col-md-3">
                                    <h6 className="text-muted font-weight-bold">Category</h6>
                                    <h5>{detail.category}</h5>
                                </div>
                                <div className="col-md-6">
                                    <h6 className="text-muted font-weight-bold">Colour</h6>
                                    <h5>{detail.colour}</h5>
                                </div>
                            </div>
                            <p className="text-justify">{detail.description}</p>
                            <div className="text-center">
                                <ButtonGroup>
                                    {this.renderStock(detail.stock)}
                                </ButtonGroup>
                                <p>Stock : {this.state.total}</p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Button outline color="primary" onClick={() => this.setState({ qty: this.state.qty > 0 ? this.state.qty -= 1 : 0 })}>-</Button>
                                <Input value={this.state.qty} style={{ width: "3vw" }} />
                                <Button outline color="primary" onClick={this.btIncrement}>+</Button>
                            </div>
                            <div className="row">
                                <div className="col-md-7">
                                    <h3>IDR. {(this.state.qty * detail.price).toLocaleString()}</h3>
                                </div>
                                <div className="col-md-5 text-right">
                                    <Button color="primary" onClick={this.btAddToCart}>Add To Cart</Button>
                                </div>
                            </div>
                        </div>
                    </Jumbotron>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("cek data", state.authReducer)
    return {
        cart: state.authReducer.cart
    }
}

export default connect(mapStateToProps)(ProductDetail);