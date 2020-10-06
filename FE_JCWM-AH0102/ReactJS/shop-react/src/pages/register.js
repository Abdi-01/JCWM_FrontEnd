import React from 'react';
import Axios from 'axios';
import { Button, Form, FormFeedback, FormGroup, FormText, Input, Jumbotron, Label, Progress } from 'reactstrap';
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
            emailValid: false,
            passValue: 0,
            passLvl: "",
            passNotif: "",
            uMessages: "Username inValid"
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
            Axios.get(API_URL + `/users?username=${value}`)
                .then((res) => {
                    if (res.data.length > 0 && value.length > 1) {
                        this.setState({ uMessages: "Username All Ready Exist", userValid: false })
                    } else {
                        this.setState({ uMessages: "Username inValid" })
                    }
                }).catch((err) => {
                    console.log(err)
                })
        } else if (property === "email") {
            this.setState({
                emailValid: abjad.test(value) && value.includes("@") && domain.test(value) ? true : false,
            })
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
        // Get Data Menggunankan innerRef
        // let username = this.username.value
        // let email = this.email.value
        // let phone = this.phone.value
        // let password = this.password.value
        // let confpassword = this.confpassword.value

        // Data dari state
        let { username, email, phone, password, confpassword, userValid, emailValid } = this.state

        // console.log("cek input :", username, email, phone, password, confpassword)
        if (username === '' || email === '' || phone === '' || password === '' || confpassword === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in The Form'
            })
        } else {
            if (password === confpassword && userValid && emailValid) {
                // Axios.get(API_URL + `/users?username=${username}`)
                //     .then((res) => {
                //         if (res.data.length === 0) {
                Axios.post(API_URL + "/users", { username, email, phone, password, role: "user" })
                    .then((res) => {
                        console.log("success register :", res.data)
                        this.setState({ redirect: true })
                        Swal.fire({
                            icon: 'success',
                            text: 'Register Succesfully'
                        })
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
                                    <FormFeedback>Email inValid</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="text-white">Phone</Label>
                                    <Input type="text" innerRef={(item) => this.phone = item} onChange={(e) => this.handleChange("phone", e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label className="text-white">Password</Label>
                                    <Input type="password" placeholder="Min. 6 Character (Abjad, Numb, Symbol)" innerRef={(item) => this.password = item} onChange={e => this.handleChange("password", e.target.value)} />
                                    {this.state.password.length > 5 &&
                                        <Progress value={this.state.passValue} color={this.state.passNotif}>{this.state.passLvl}</Progress>
                                    }
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