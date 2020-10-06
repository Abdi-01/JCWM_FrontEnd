import React from 'react';
import Axios from 'axios';
import { API_URL } from '../support/url'
import { Button, Table, Badge } from 'reactstrap';
import AddProduct from '../components/addProduct';
import EditProduct from '../components/editProduct';

class ProductManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbProducts: [],
            selectedIdx: null,
            editOpen: false
        }
    }

    componentDidMount() {
        this.getProducts()
    }

    getProducts = () => {
        Axios.get(API_URL + "/products")
            .then((res) => {
                console.log("Get Products Success :", res.data)
                this.setState({ dbProducts: res.data })
            })
            .catch((err) => {
                console.log("Get Products Error :", err)
            })
    }

    renderStock = (stock) => {
        return stock.map((item, index) => {
            return (
                <Badge>{item.code} Stock = {item.total}</Badge>
            )
        })
    }

    renderProduct = () => {
        return this.state.dbProducts.map((item, index) => {
            return (
                <tr key={index}>
                    <th>{index + 1}</th>
                    <td><img src={item.images[0]} width="100%" /></td>
                    <td>{item.name}</td>
                    <td>{item.brand}</td>
                    <td>{item.category}</td>
                    <td>{item.colour}</td>
                    <td>{item.description}</td>
                    <td>{this.renderStock(item.stock)}</td>
                    <td>IDR. {item.price.toLocaleString()}</td>
                    <td>
                        <Button color="warning" onClick={() => this.setState({ editOpen: !this.state.editOpen, selectedIdx: index })}>Edit</Button>
                        <Button color="danger" onClick={() => this.btDelete(item.id)}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    btDelete = (id) => {
        Axios.delete(API_URL + `/products/${id}`)
            .then((res) => {
                console.log("delete success", res.data)
                this.getProducts()
            })
            .catch((err) => {
                console.log("delete error", err)
            })
    }

    render() {
        return (
            <div>
                <h3 className="text-center">Products Management</h3>
                <AddProduct getProducts={this.getProducts} />
                <Table hover>
                    <thead>
                        <th>No.</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Colour</th>
                        <th>Description</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {this.renderProduct()}
                    </tbody>
                </Table>
                {
                    this.state.selectedIdx !== null
                    &&
                    <EditProduct
                        editOpen={this.state.editOpen}
                        editClose={() => this.setState({ editOpen: !this.state.editOpen, selectedIdx: null })}
                        data={this.state.dbProducts[this.state.selectedIdx]}
                        getProducts={this.getProducts}
                    />
                }
            </div>
        );
    }
}

export default ProductManagement;