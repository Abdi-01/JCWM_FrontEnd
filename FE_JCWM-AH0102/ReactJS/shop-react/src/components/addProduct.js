import Axios from 'axios';
import React from 'react';
import { Button, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Swal from 'sweetalert2';
import { API_URL } from '../support/url';

class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            name: "",
            brand: "",
            category: "",
            colour: "",
            description: "",
            price: 0,
            sizeShoes: [38, 39, 40, 41, 42, 43],
            sizeClothing: ["S", "M", "L", "XL", "XXL"],
            listGambar: ["images1", "images2", "images3", "images4", "images5"]
        }
    }

    handleChange = (property, value) => {
        this.setState({ [property]: value })
    }

    btSubmit = () => {
        let stock = [], images = []
        let { name, brand, category, colour, description, price } = this.state
        if (name === "" || brand === "" || category === "" || colour === "" || description === "" || price === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in The Form'
            })

        } else {
            this.state[`size${this.state.category}`].forEach((item, index) => {
                stock.push({ code: item.toString(), total: this[`code${item}`].value === "" ? 0 : parseInt(this[`code${item}`].value) })
            })
            this.state.listGambar.forEach((item, index) => {
                if (this[item].value.length > 0) {
                    images.push(this[item].value)
                }
            })

            Axios.post(API_URL + "/products", { name, brand, category, colour, description, price, stock, images })
                .then((res) => {
                    console.log("add success", res.data)
                    this.setState({ modalOpen: !this.state.modalOpen })
                    this.props.getProducts()
                }).catch((err) => {
                    console.log(err)
                })

        }

    }

    renderInputStock = () => {
        let { category } = this.state
        if (category === "") {
            return <h5>Waiting Category</h5>
        } else {
            return this.state[`size${category}`].map((item, index) => {
                return (
                    <FormGroup key={index}>
                        <Label>{item}</Label>
                        <Input type="number" innerRef={(value) => this[`code${item}`] = value} />
                    </FormGroup>
                )
            })
        }
    }

    render() {
        return (
            <div style={{ float: "right", marginRight: "2vw" }}>
                <Button color="info" onClick={() => this.setState({ modalOpen: !this.state.modalOpen })}>Add Product</Button>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Add Product</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Name</Label>
                                <Input type="text" onChange={e => this.handleChange("name", e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Image</Label>
                                <div className="d-flex flex-wrap">
                                    {
                                        this.state.listGambar.map((item, index) => {
                                            return <Input style={{ width: '30%' }} placeholder={`Images ${index + 1}`}
                                                type="text" innerRef={value => this[item] = value} />
                                        })
                                    }
                                </div>
                            </FormGroup>
                            <div className="row">
                                <FormGroup className="col-md-4">
                                    <Label>Brand</Label>
                                    <Input type="text" onChange={e => this.handleChange("brand", e.target.value)} />
                                </FormGroup>
                                <FormGroup className="col-md-4">
                                    <Label>Category</Label>
                                    <Input type="select" onChange={e => this.handleChange("category", e.target.value)}>
                                        <option>Select...</option>
                                        <option value="Shoes">Shoes</option>
                                        <option value="Clothing">Clothing</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup className="col-md-4">
                                    <Label>Colour</Label>
                                    <Input type="text" onChange={e => this.handleChange("colour", e.target.value)} />
                                </FormGroup>
                            </div>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input type="textarea" onChange={e => this.handleChange("description", e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Stock</Label>
                                <div className="d-flex">
                                    {this.renderInputStock()}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label>Price</Label>
                                <Input type="number" onChange={e => this.handleChange("price", e.target.value)} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.btSubmit}>Submit</Button>
                        <Button color="warning" onClick={() => this.setState({ modalOpen: !this.state.modalOpen })}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddProduct;