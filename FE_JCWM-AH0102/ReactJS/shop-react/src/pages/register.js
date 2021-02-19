import React from 'react';
import Axios from 'axios';
import { Button, Form, FormFeedback, FormGroup, FormText, Input, Jumbotron, Label, Progress, CustomInput } from 'reactstrap';
import { API_URL } from '../support/url'
import Swal from 'sweetalert2'
import { Redirect } from 'react-router-dom'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            phone: "",
            password: "",
            confpassword: "",
            userValid: false,
            emailValid: true,
            passValue: 0,
            passLvl: "",
            passNotif: "",
            uMessages: "Username inValid",
            type: 'password',
            visible: false
        }
    }

    handleChange = (property, value) => {
        // String validation with regex
        let abjad = /[a-z]/i
        let numb = /[0-9]/
        let symbol = /[!@#$%^&*():]/
        let domain = /(.id|.com|.co.id|.edu|.tech)/

        //Membuat properti objek menggunakan string, ["namaProperty"]
        this.setState({ [property]: value })
        if (property === "username") {
            //    username harus terdiri dari abjad dan angka
            this.setState({
                userValid: abjad.test(value) && numb.test(value) ? true : false,
            })
            //Mengecek username apakah ada yang sama di server setiap input form diisi
            // Axios.get(API_URL + `/users?username=${value}`)
            //     .then((res) => {
            //         if (res.data.length > 0 && value.length > 1) {
            //             this.setState({ uMessages: "Username All Ready Exist", userValid: false })
            //         } else {
            //             this.setState({ uMessages: "Username inValid" })
            //         }
            //     }).catch((err) => {
            //         console.log(err)
            //     })
        } else if (property === "email") {
            // Axios.get(API_URL + `/users?email=${value}`)
            //     .then((res) => {
            //         if (res.data.length > 0 && value.length > 1) {
            //             this.setState({ eMessages: "Email All Ready Exist", emailValid: false })
            //             // this.setState({
            //             //     emailValid: abjad.test(value) && value.includes("@") && domain.test(value) ? true : false,
            //             // })
            //         } else {
            //             this.setState({ uMessages: "Email inValid" })
            //         }
            //     }).catch((err) => {
            //         console.log(err)
            //     })
        } else if (property === "password") {
            if (abjad.test(value) && !numb.test(value) && !symbol.test(value) && value.length > 5) {
                // Jika hanya huruf
                this.setState({ passValue: 30, passLvl: "Weak", passNotif: "danger" })
            } else if (abjad.test(value) && numb.test(value) && !symbol.test(value) && value.length > 5) {
                // Jika hanya huruf dan angka
                this.setState({ passValue: 70, passLvl: "Middle", passNotif: "warning" })
            } else if (abjad.test(value) && numb.test(value) && symbol.test(value) && value.length > 5) {
                // Jika hanya huruf, angka dan symbol
                this.setState({ passValue: 100, passLvl: "Strong", passNotif: "success" })
            } else {
                // Jika hanya angka saja atau symbol saja
                this.setState({ passValue: 15, passLvl: "Easy", passNotif: "danger" })
            }
        }
    }

    btRegister = () => {

        let { username, email, phone, password, confpassword, userValid, emailValid } = this.state
        if (username === '' || email === '' || phone === '' || password === '' || confpassword === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in The Form'
            })
        } else {
            if (password === confpassword) {
                // Axios.get(API_URL + `/users?username=${username}`)
                //     .then((res) => {
                //         if (res.data.length === 0) {
                // console.log(username, email, phone, password)
                Axios.post(API_URL + "/users/regis", { username, email, phone, password })
                    .then((res) => {
                        console.log("success register :", res.data)
                        // this.setState({ redirect: true })
                        // Swal.fire({
                        //     icon: 'success',
                        //     text: 'Register Succesfully'
                        // })
                        // Axios.get(API_URL + `/users?id=${res.data.id}`)
                        //     .then((res) => localStorage.setItem("id", res.data[0].id))
                        //     .catch((err) => console.log("Error :", err))
                    })
                    .catch((err) => {
                        console.log("err register :", err)
                    })
                //     } else {
                //         Swal.fire({
                //             icon: 'error',
                //             title: 'Oops...',
                //             text: 'User All Ready Exist'
                //         })
                //     }
                // }).catch((err) => {
                //     console.log("err register :", err)
                // })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Your Password Not Match'
                })
            }

        }
    }

    showPass = () => {
        this.setState({ visible: !this.state.visible, type: !this.state.visible ? 'text' : 'password' })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <Jumbotron className="my-5" style={{ backgroundColor: "#404146" }}>
                    <div className="row">
                        <div className="col-12 col-sm-7">
                            <img src={require('../assets/images/logoBwhite.png')} alt="logo" width="100%" style={{ margin: "10% auto" }} />
                            <hr style={{ backgroundColor: 'white' }} />
                        </div>
                        <div className="col-12 col-sm-5">
                            <Form>
                                <FormGroup>
                                    <Label className="text-white">Username</Label>
                                    <Input type="text" valid={this.state.userValid} invalid={this.state.username.length > 0 && !this.state.userValid} innerRef={(item) => this.username = item} onChange={(e) => this.handleChange("username", e.target.value)} />
                                    <FormFeedback valid >Username Valid</FormFeedback>
                                    <FormFeedback>{this.state.uMessages}</FormFeedback>
                                    <FormText color="white">Username terdiri dari huruf dan angka</FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="text-white">Email</Label>
                                    <Input type="email" valid={this.state.emailValid} invalid={this.state.email.length > 0 && !this.state.emailValid} innerRef={(item) => this.email = item} onChange={(e) => this.handleChange("email", e.target.value)} />
                                    <FormFeedback valid >Email Valid</FormFeedback>
                                    <FormFeedback>{this.state.eMessages}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="text-white">Phone</Label>
                                    <Input type="text" innerRef={(item) => this.phone = item} onChange={(e) => this.handleChange("phone", e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label className="text-white">Password</Label>
                                    <div class="input-group">
                                        <Input type={this.state.type} placeholder="Min. 6 Character (Abjad, Numb, Symbol)" innerRef={(item) => this.password = item} onChange={e => this.handleChange("password", e.target.value)} />
                                        {this.state.password.length > 5 &&
                                            <Progress value={this.state.passValue} color={this.state.passNotif}>{this.state.passLvl}</Progress>
                                        }
                                        <div class="input-group-append">
                                            <div class="input-group-text">
                                                <span class="material-icons" style={{ cursor: 'pointer' }} onClick={this.showPass}>
                                                    {this.state.visible ? 'visibility_off' : 'visibility'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup className="text-white">
                                    <Label>Conf. Password</Label>
                                    <Input type="password" innerRef={(item) => this.confpassword = item} onChange={e => this.handleChange("confpassword", e.target.value)} />
                                </FormGroup>
                            </Form>
                            <Button outline color="info" onClick={this.btRegister}>Register</Button>
                        </div>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}

export default RegisterPage;