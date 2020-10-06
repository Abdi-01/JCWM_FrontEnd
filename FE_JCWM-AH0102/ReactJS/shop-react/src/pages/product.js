import React from 'react';
import Axios from 'axios';
import { API_URL } from '../support/url'
import CardProduct from '../components/cardProduct';
import { connect } from 'react-redux'
import { getProducts } from '../redux/actions'

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.getProducts()
    }

    getProducts = () => {
        Axios.get(API_URL + "/products")
            .then((res) => {
                console.log("Get Product success :", res.data)
                this.props.getProducts(res.data)
            })
            .catch((err) => {
                console.log("Get Product Error :", err)
            })
    }

    renderProduct = () => {
        return this.props.products.map((item, index) => {
            return (
                <CardProduct data={item} />
            )
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row" style={{ margin: "auto" }}>
                    {this.renderProduct()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ productReducers }) => {
    console.log("mapstate", productReducers)
    return {
        products: productReducers
    }
}

export default connect(mapStateToProps, { getProducts })(ProductPage);