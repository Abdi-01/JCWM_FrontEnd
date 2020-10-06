import Axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Alert, Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { API_URL } from '../support/url'
import { connect } from 'react-redux'
import { login } from '../redux/actions'

class ModalLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            modalOpen: false,
            warna: "",
            alert: false,
            message: "",
            success: false
        }
    }

    btModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen })
    }

    handleChange = (property, value) => {
        console.log(property, value)
        this.setState({ [property]: value })
    }

    btLogin = () => {
        let { username, password } = this.state
        if (username === "" || password === "") {
            this.setState({ warna: "warning", message: "Fill in the form", alert: !this.state.alert })
        } else {
            let query = username.includes("@") ? "email" : "username"
            Axios.get(API_URL + `/users?${query}=${username}&password=${password}`)
                .then((res) => {
                    console.log("Login Success :", res.data)
                    this.setState({ warna: "success", message: "Login Successfully", alert: !this.state.alert, success: true })
                    localStorage.setItem("id", res.data[0].id)
                    this.props.login(res.data[0])
                })
                .catch((err) => {
                    console.log("Login Error :", err)
                })
        }
    }

    render() {
        if (this.state.alert) {
            setTimeout(() => this.setState({
                alert: !this.state.alert,
                modalOpen: this.state.success ? !this.state.modalOpen : true
            }), 1500)
        }
        return (
            <>
                <Button color="primary" size="sm" onClick={this.btModal}>Login</Button>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                        <Alert color={this.state.warna} isOpen={this.state.alert}>
                            {this.state.message}
                        </Alert>
                        <Input type="text" className="my-3" placeholder="Username or Email" onChange={(e) => this.handleChange("username", e.target.value)} />
                        <Input type="password" className="my-3" placeholder="Password" onChange={event => this.handleChange("password", event.target.value)} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.btLogin}>Login</Button>
                        <Button color="warning" onClick={this.btModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default connect(null, { login })(ModalLogin);