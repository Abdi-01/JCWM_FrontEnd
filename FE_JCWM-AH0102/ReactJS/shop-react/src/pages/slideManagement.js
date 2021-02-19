import React, { Component } from 'react';
import Axios from 'axios';
import { Button, Dropdown, DropdownToggle, DropdownItem, DropdownMenu, Form, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap'
import { API_URL } from '../support/url'
import { getSlide } from '../redux/actions'
import { connect } from 'react-redux';
class SlideManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dbSlide: [],
            selectedIdx: null,
            modalOpen: false,
            dropOpen: false
        }
    }

    componentDidMount() {
        this.getSlide()
    }

    getSlide = (order) => {
        let url = order ? `/carousel?_sort=title&_order=${order}` : '/carousel/getCarousel'
        Axios.get(API_URL + url)
            .then((res) => {
                console.log("succes get slide", res.data)
                this.props.getSlide(res.data)
                // this.setState({ dbSlide: res.data })
            })
            .catch((err) => {
                console.log("err get slide", err)
            })
    }

    btDelete = (id) => {
        Axios.delete(API_URL + `/carousel/${id}`)
            .then((res) => {
                console.log("delete carousel success", res.data)
                this.props.getSlide(res.data)
            })
            .catch((err) => {
                console.log("delete carousel err", err)
            })
    }

    btEdit = (index) => {
        console.log(index)
        this.setState({ selectedIdx: index, modalOpen: !this.state.modalOpen })
    }

    renderData = () => {
        return this.props.slides.map((item, index) => {
            return (
                <tr>
                    <th>{index + 1}</th>
                    <td style={{ width: "20vw" }}><img src={item.image} width="100%" alt={item.title} /></td>
                    <td>{item.title}</td>
                    <td>
                        <Button color="warning" onClick={() => this.btEdit(index)}>Edit</Button>
                        <Button color="danger" onClick={() => this.btDelete(item.id)}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    btSave = (id) => {
        let image = this.slideImg.value
        let title = this.slideTitle.value

        Axios.patch(API_URL + `/carousel/${id}`, { image, title })
            .then((res) => {
                console.log("edit slide success", res.data)
                // this.getSlide()
                this.props.getSlide(res.data)
                this.setState({ modalOpen: !this.state.modalOpen })
            })
            .catch((err) => {
                console.log("edit slide error", err)
            })
    }

    render() {
        let { modalOpen, dbSlide, selectedIdx, dropOpen } = this.state
        return (
            <div className="container">
                <h2>Slide Management</h2>
                <Dropdown style={{ float: "right" }} isOpen={dropOpen} toggle={() => this.setState({ dropOpen: !dropOpen })}>
                    <DropdownToggle caret>
                        Sort
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.getSlide("asc")}>Asc</DropdownItem>
                        <DropdownItem onClick={() => this.getSlide("desc")}>Desc</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Table>
                    <thead>
                        <th>No. </th>
                        <th>Images</th>
                        <th>Title</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {this.renderData()}
                    </tbody>
                </Table>
                {
                    selectedIdx !== null &&
                    <Modal isOpen={modalOpen}>
                        <ModalHeader>
                            Edit Slide
                         </ModalHeader>
                        <ModalBody>
                            <Form>
                                <Input type="text" placeholder="Slide Image" defaultValue={this.props.slides[selectedIdx].image} innerRef={(value) => this.slideImg = value} />
                                <Input type="text" placeholder="Slide Title" defaultValue={this.props.slides[selectedIdx].title} innerRef={(value) => this.slideTitle = value} />
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={() => this.btSave(this.props.slides[selectedIdx].id)}>Save</Button>
                            <Button color="secondary" onClick={() => this.setState({ modalOpen: !this.state.modalOpen, selectedIdx: null })}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("slide")
    return {
        slides: state.slideReducer.slide
    }
}

export default connect(mapStateToProps, { getSlide })(SlideManagement);