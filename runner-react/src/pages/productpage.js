import React from 'react';
import CardComp from '../components/card'
import Axios from 'axios';
import { connect } from 'react-redux'
import { getProducts } from '../redux/actions'

const URL = "http://localhost:2500"

class Productpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // dbProducts: []
        }
    }

    componentDidMount() {
        this.getProduct()
    }

    getProduct = () => {
        Axios.get(URL + "/products")
            .then((res) => {
                // console.log("product", res.data)
                this.props.getProducts(res.data)
                // this.setState({ dbProducts: res.data })
            }).catch((err) => {
                console.log("Error BOS !", err)
            })
    }

    printCard = () => {
        return this.props.products.map((item, index) => {
            return <CardComp id={item.id} name={item.name} price={item.price} image={item.images[1]} />
        })
    }
    render() {
        return (
            <div >
                <h1 style={{ rotate: "90deg", position: 'fixed', top: "50%", left: '-7%' }}>
                    Our Collection Now
                </h1>
                <div style={{ marginTop: '3%' }}>
                    <div style={{ margin: 'auto', width: '80vw', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {this.printCard()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        products: state.productReducer
    }
}

export default connect(mapToProps, { getProducts })(Productpage);