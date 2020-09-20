import React from 'react';
import { Button, FormGroup, Input, Jumbotron, Label } from 'reactstrap';
import Axios from 'axios'
import { Redirect } from 'react-router-dom';

const API_URL = "http://localhost:2000"
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipe: "password",
            labelCek: "Look Password",
            dataLogin: {}
        }
    }

    btLogin = () => {
        let email = this.email.value
        let password = this.password.value

        Axios.get(API_URL + `/staff?email=${email}&password=${password}`)
            .then((res) => {
                if (res.data.length === 0) {
                    alert("Gag Kedaftar Bos :")
                }
                this.setState({ dataLogin: res.data[0] })
            })
            .catch((err) => {
                console.log("Error Bos :", err)
            })
    }

    cekPass = () => {
        // Mode checkbox
        // console.log(this.see.checked)
        // if (this.see.checked) {
        //     this.setState({ tipe: "text", labelCek: "Hidden Password" })
        // } else {
        //     this.setState({ tipe: "password", labelCek: "Look Password" })
        // }
        // Mode button
        if (this.state.tipe === "password") {
            this.setState({ tipe: "text", labelCek: "Hidden Password" })
        } else {
            this.setState({ tipe: "password", labelCek: "Look Password" })
        }
    }

    render() {
        if (this.state.dataLogin.id) {
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <Jumbotron>
                    <h1>Login Page</h1>
                    <Input type="email" placeholder="Input Email" innerRef={(item) => this.email = item} />
                    <Input style={{ width: "50%" }} type={this.state.tipe} placeholder="Input Password" innerRef={(item) => this.password = item} />
                    <FormGroup>
                        <Input type="checkbox" innerRef={(cek) => this.see = cek} onClick={this.cekPass} />
                        <Label>{this.state.labelCek}</Label>
                        <Button onClick={this.cekPass}>{this.state.labelCek}</Button>
                    </FormGroup>
                    <Button onClick={this.btLogin}>Login</Button>
                </Jumbotron>
            </div>
        );
    }
}

export default Login;