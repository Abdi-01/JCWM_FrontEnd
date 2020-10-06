import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Input, Alert } from 'reactstrap'
import Axios from 'axios'

class ModalSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            alert: false,
            message: null,
            warna: "light",
            success: false
        }
    }

    btToggle = () => {
        this.setState({ modalOpen: !this.state.modalOpen })
    }


    btSignIn = () => {
        let username = this.username.value
        let password = this.password.value

        if (username === "" || password === "") {
            this.setState({ warna: "warning", message: "Fill In The Form", alert: !this.state.alert })
        } else {
            let url = username.includes('@') && username.includes('.') ? `?email=${username}` : `?username=${username}`
            Axios.get(`http://localhost:2020/users` + url + `&password=${password}`)
                .then((res) => {
                    console.log("Login Success", res.data)
                    localStorage.setItem("id", res.data[0].id)
                    this.setState({ warna: "success", message: "Login Successfully", alert: !this.state.alert, success: true })
                    this.props.keep()
                })
                .catch((err) => {
                    console.log("Error", err)
                    this.setState({ warna: "danger", message: "User Not Exist", alert: !this.state.alert })
                })
        }
    }

    render() {
        if (this.state.alert) {
            setTimeout(() => this.setState({
                alert: !this.state.alert,
                modalOpen: this.state.success ? !this.state.modalOpen : true
            }),1500)
        }
        return (
            <div>
                <button className="btn btn-outline-primary btn-sm" onClick={this.btToggle}>
                    Sign In
                </button>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader >Sign In</ModalHeader>
                    <ModalBody>
                        <Alert color={this.state.warna} isOpen={this.state.alert}>
                            {this.state.message}
                        </Alert>
                        <Input type="text" placeholder="Username" innerRef={(isi) => this.username = isi} />
                        <Input type="password" placeholder="Password" innerRef={(isi) => this.password = isi} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.btSignIn}>Sign In</Button>
                        <Button color="secondary" onClick={this.btToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalSignIn;
