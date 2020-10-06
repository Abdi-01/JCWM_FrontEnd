import React from 'react';
import Axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Input, Alert } from 'reactstrap'

class ModalSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            alert: false,
            message: null,
            warna: "light",
            success: false,
            cekUser: false
        }
    }

    btToggle = () => {
        this.setState({ modalOpen: !this.state.modalOpen })
    }

    btRegis = () => {
        let username = this.username.value
        let email = this.email.value
        let password = this.password.value
        let confpassword = this.confpassword.value

        if (username === "" || email === "" || password === "" || confpassword === "") {
            this.setState({ warna: "warning", message: "Fill In The Form", alert: !this.state.alert })
        } else {
            if (password === confpassword) {
                Axios.get(`http://localhost:2020/users?username=${username}`)
                    .then((res) => {
                        console.log("Login Success", res.data)
                        // console.log(this.state.cekUser)
                        this.setState({ cekUser: true })
                        // console.log(this.state.cekUser)
                        // if (res.data.length === 0) {
                        //     Axios.post('http://localhost:2020/users', { username, email, password })
                        //         .then((res) => {
                        //             console.log("Success", res.data)
                        //             this.setState({ warna: "success", message: "Registration Successfully", alert: !this.state.alert, success: true })
                        //             localStorage.setItem("id", res.data.id)
                        //             this.props.keep()
                        //         })
                        //         .catch((err) => {
                        //             console.log("Error", err)
                        //             this.setState({ warna: "danger", message: "Registration Missing", alert: !this.state.alert })
                        //         })
                        // } else {
                        //     this.setState({ warna: "danger", message: "Username Already Exist", alert: !this.state.alert })
                        // }
                    })
                    .catch((err) => {
                        console.log("Error", err)
                        this.setState({ warna: "danger", message: "User Not Exist", alert: !this.state.alert })
                    })
                console.log(this.state.cekUser)
            } else {
                this.setState({ warna: "danger", message: "Password Missing", alert: !this.state.alert })
            }
        }
    }

    render() {
        console.log(this.state.cekUser)
        if (this.state.alert) {
            setTimeout(() => {
                this.setState({
                    alert: !this.state.alert,
                    modalOpen: this.state.success ? !this.state.modalOpen : true,
                    success: this.state.success && false
                })
            }
                , 1500)
        }
        return (
            <div>
                <button className="btn btn-outline-primary btn-sm" onClick={this.btToggle}>
                    Sign Up
                </button>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader >Register</ModalHeader>
                    <ModalBody>
                        <Alert color={this.state.warna} isOpen={this.state.alert}>
                            {this.state.message}
                        </Alert>
                        <Input type="text" placeholder="Username" innerRef={(isi) => this.username = isi} />
                        <Input type="email" placeholder="Email" innerRef={(isi) => this.email = isi} />
                        <Input type="password" placeholder="Password" innerRef={(isi) => this.password = isi} />
                        <Input type="password" placeholder="Confirmation Password" innerRef={(isi) => this.confpassword = isi} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.btRegis}>Regist</Button>
                        <Button color="secondary" onClick={this.btToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalSignUp;