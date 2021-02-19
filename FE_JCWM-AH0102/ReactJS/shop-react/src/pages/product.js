import React from 'react';
import Axios from 'axios';
import { API_URL } from '../support/url'
import CardProduct from '../components/cardProduct';
import { connect } from 'react-redux'
import { getProducts } from '../redux/actions'
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap';

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isOpenSort: false,
        }
    }

    renderProduct = () => {
        return this.props.products.map((item, index) => {
            return (
                <CardProduct data={item} />
            )
        })
    }

    getProducts = (cat) => {
        // let fill = cat === 'all' ? '/' : `?category=${cat}`
        Axios.get(API_URL + `/products/getProducts`)
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
            <div className="container">
                <ButtonDropdown isOpen={this.state.isOpen} toggle={() => this.setState({ isOpen: !this.state.isOpen })}>
                    <Button id="caret" color="primary" onClick={() => this.getProducts('all')}>All Products</Button>
                    <DropdownToggle caret color="primary" />
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.getProducts('Shoes')}>Shoes</DropdownItem>
                        <DropdownItem onClick={() => this.getProducts('Clothing')}>Clothing</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
                <div className="d-flex" >
                    <Input type="select" style={{width:'10%'}}>
                        <option>ASC</option>
                        <option>DESC</option>
                    </Input>
                    <Input type="select" style={{width:'10%'}}>
                        <option>ID</option>
                        <option>Name</option>
                        <option>Price</option>
                    </Input>
                    <Button>OK</Button>
                </div>
                {/* <div className="d-flex">
                    <Input placeholder="Min. Price" innerRef={e => this.min = e} style={{ width: '20%' }} />
                    <Input placeholder="Max. Price" innerRef={e => this.max = e} style={{ width: '20%' }} />
                    <Button>Search</Button>
                </div> */}
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