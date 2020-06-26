import React from 'react';
import CardComp from '../components/card'
import Axios from 'axios';

const URL = "http://localhost:2500"
class Productpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbProducts: []
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

    printCard = () => {
        return this.state.dbProducts.map((item, index) => {
            return <CardComp name={item.name} price={item.price} image={item.images[1]} />
        })
    }
    render() {
        return (
            <div>
                <h1>
                    ini PRODUCTPAGE
                </h1>
                <div className="container" style={{ margin: 'auto', width: '80vw', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {this.printCard()}
                </div>
            </div>
        );
    }
}

export default Productpage;