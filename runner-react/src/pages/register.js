import React from 'react';
import { Paper, Button, Input, InputAdornment, InputLabel, FormControl, IconButton, Slider } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Axios from 'axios'
import { Redirect } from 'react-router-dom';

const URL = "http://localhost:2500"
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            visible: false,
            inputType: 'password',
            btRegis: true,
            num: false,
            spec: false,
            abjad: false,
            char: false,
            border: false,
            colorBar: "gray",
            valueBar: 0,
            statusBar: "Low"
        }
    }

    onBtVisible = () => {
        if (this.state.inputType == "password") {
            this.setState({ inputType: "text", visible: !this.state.visible })
        } else {
            this.setState({ inputType: "password", visible: !this.state.visible })
        }
    }

    handleChange = (e) => {
        let pass = e.target.value
        let abjad = /[a-zA-Z]/
        let num = /[0-9]/
        let spec = /[$#@!%^&*()]/
        this.setState({
            abjad: abjad.test(pass),
            num: num.test(pass),
            spec: spec.test(pass),
            char: pass.length > 7,
            border: (abjad.test(pass) && num.test(pass) && spec.test(pass) && (pass.length > 7))
        })
        console.log("huruf:", abjad.test(pass), "angka:", num.test(pass), "symbol:", spec.test(pass), "pass:", (pass.length > 7), (abjad.test(pass) ^ num.test(pass)))
        if (abjad.test(pass) && num.test(pass) && spec.test(pass) && (pass.length > 7)) {
            this.setState({ colorBar: "green", valueBar: 90 })
        }
        else if ((abjad.test(pass) ^ num.test(pass)) === 1 && spec.test(pass) && (pass.length > 7)) {
            this.setState({ colorBar: "yellow", valueBar: 60 })
        }
        else if (abjad.test(pass) && num.test(pass) && (pass.length > 7)) {
            this.setState({ colorBar: "red", valueBar: 30 })
        }
        else {
            this.setState({ colorBar: "grey", valueBar: 0 })
        }
    }

    onBtRegister = () => {
        let username = this.username.value
        let password = this.password.value
        let confpass = this.confpassword.value
        let email = this.email.value
        let role = "user"

        if (username === "" || email === "" || password === "" || confpass === "") {
            alert("Fill in all forms ✍")
        } else {
            if (password === confpass) {
                Axios.post(URL + `/users`, { username, email, password, role })
                    .then((res) => {
                        this.setState({ redirect: true })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/login" />
        }
        return (
            <div>
                <div style={{
                    backgroundColor: '#404146',
                    width: '75vw',
                    height: "80vh",
                    margin: 'auto',
                    marginTop: '2%',
                    display: 'flex'
                }}>
                    <div style={{ width: "70%", display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <h1 style={{ color: 'white' }}>Register your account </h1>
                        <div style={{ borderLeft: '3px solid white', height: "80px" }}></div>
                        <img src={require('../assets/images/logoBwhite.png')} width="50%" height="20%" />
                    </div>
                    <Paper style={{ width: "30%", backgroundColor: "#0376AB", textAlign: 'center' }}>
                        <fieldset style={{ position: 'relative', top: "25%", borderRadius: 20, display: 'flex', flexDirection: 'column' }}>
                            <legend style={{ color: 'white', size: 60, fontWeight: 'bold' }}>Register</legend>
                            <FormControl >
                                <InputLabel htmlFor="standard-adornment-username" style={{ color: 'white' }}>Username</InputLabel>
                                <Input
                                    inputRef={(text) => this.username = text}
                                    style={{ color: 'white' }}
                                    id="standard-adornment-username"
                                    type="text"
                                    endAdornment={<AccountCircle />}
                                />
                            </FormControl>
                            <FormControl >
                                <InputLabel htmlFor="standard-adornment-email" style={{ color: 'white' }}>Email</InputLabel>
                                <Input
                                    inputRef={(text) => this.email = text}
                                    style={{ color: 'white' }}
                                    id="standard-adornment-email"
                                    type="email"
                                    endAdornment={<EmailIcon />}
                                />
                            </FormControl>
                            <FormControl style={{ marginTop: '2%' }}>
                                <InputLabel htmlFor="standard-adornment-password" style={{ color: 'white' }}>Password</InputLabel>
                                <Input
                                    inputRef={(text) => this.password = text}
                                    style={{ color: 'white' }}
                                    id="standard-adornment-password"
                                    type={this.state.inputType}
                                    onChange={this.handleChange}
                                    endAdornment={
                                        <InputAdornment position="end" >
                                            <IconButton
                                                style={{ color: 'white', marginLeft: '25%' }}
                                                aria-label="toggle password visibility"
                                                onClick={this.onBtVisible}
                                            >
                                                {this.state.visible ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Slider
                                defaultValue={30}
                                style={{ color: `${this.state.colorBar}` }}
                                // getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider"
                                // valueLabelDisplay="auto"
                                step={30}
                                value={this.state.valueBar}
                                disabled
                                marks
                                min={0}
                                max={90}
                            />
                            <FormControl style={{ marginTop: '-3%' }}>
                                <InputLabel htmlFor="standard-adornment-password" style={{ color: 'white' }}>Confirmation Password</InputLabel>
                                <Input
                                    inputRef={(text) => this.confpassword = text}
                                    style={{ color: 'white' }}
                                    id="standard-adornment-password"
                                    type={this.state.inputType}

                                />
                            </FormControl>
                            <Button
                                style={{ marginTop: '2%' }}
                                variant="contained"
                                color="default"
                                // className={classes.button}
                                disabled={this.state.border ? false : true}
                                onClick={this.onBtRegister}
                                startIcon={<AssignmentIndIcon />}
                            >
                                Register
                            </Button>
                        </fieldset>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default Login;