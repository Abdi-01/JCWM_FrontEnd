import Axios from 'axios';
import React from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { API_URL } from '../support/url'
import { getProducts } from '../redux/actions'
import { connect } from 'react-redux';
class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.data.idproduct,
            name: props.data.name,
            brand: props.data.brand,
            category: props.data.category,
            colour: props.data.colour,
            description: props.data.description,
            price: props.data.price,
            stock: props.data.stock,
            images: props.data.images,
            sizeShoes: [38, 39, 40, 41, 42,43],
            sizeClothing: ["S", "M", "L", "XL", "XXL"],
            listGambar: ["images1", "images2", "images3", "images4", "images5"]
        }
        console.log(props.data)
    }

    handleChange = (property, value) => {
        this.setState({ [property]: value })
    }

    renderInputStock = () => {
        let { category, stock } = this.state
        return this.state[`size${category}`].map((item, index) => {
            return (
                <FormGroup>
                    <Label>{item}</Label>
                    <Input type="number" defaultValue={stock[index] && stock[index].total}
                        innerRef={value => this[`code${item}`] = value}
                    />
                </FormGroup>
            )
        })
    }

    btSave = () => {
        let { name, category, brand, colour, images, description, price, stock, listGambar, id } = this.state

        this.state[`size${category}`].forEach((item, index) => {
            stock.splice(index, 1, { code: item, total: parseInt(this[`code${item}`].value) })
        });

        listGambar.forEach((item, index) => {
            images.splice(index, 1, this[item].value)
        })

        console.log(name, category, brand, colour, images, description, price, stock)
        Axios.patch(API_URL + `/products/${id}`, { name, category, brand, colour, images, description, price, stock })
            .then((res) => {
                console.log("success update", res.data)
                // getProducts dari action
                this.props.getProducts(res.data)
                this.props.editClose()
            }).catch((err) => {
                console.log("error update", err)
            })
    }

    render() {
        console.log("Cek edit", this.state.name)
        let { name, brand, colour, category, price, description, images, listGambar } = this.state
        return (
            <div>
                <Modal isOpen={this.props.editOpen}>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Name</Label>
                                <Input value={name} type="text" onChange={e => this.handleChange("name", e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Images</Label>
                                <div className="d-flex flex-wrap">
                                    {
                                        listGambar.map((item, index) => {
                                            return <Input type="text" style={{ width: "30%" }} defaultValue={images[index].image}
                                                innerRef={value => this[item] = value}
                                            />
                                        })
                                    }
                                </div>
                            </FormGroup>
                            <div className="row">
                                <FormGroup className="col-md-4">
                                    <Label>Brand</Label>
                                    <Input value={brand} type="text" onChange={e => this.handleChange("brand", e.target.value)} />
                                </FormGroup>
                                <FormGroup className="col-md-4">
                                    <Label>Category</Label>
                                    <Input value={category} type="select" onChange={e => this.handleChange("category", e.target.value)}>
                                        <option>Select...</option>
                                        <option value="Shoes">Shoes</option>
                                        <option value="Clothing">Clothing</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup className="col-md-4">
                                    <Label>Colour</Label>
                                    <Input value={colour} type="text" onChange={e => this.handleChange("colour", e.target.value)} />
                                </FormGroup>
                            </div>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input value={description} type="textarea" onChange={e => this.handleChange("description", e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Stock</Label>
                                <div className="d-flex">
                                    {this.renderInputStock()}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label>Price</Label>
                                <Input value={price} type="number" onChange={e => this.handleChange("price", e.target.value)} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.btSave}>Save</Button>
                        <Button color="secondary" onClick={this.props.editClose}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect(null, { getProducts })(EditProduct);