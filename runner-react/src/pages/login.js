import React from 'react';
import { Paper, Button, Input, InputAdornment, InputLabel, FormControl, IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Axios from 'axios'
import { Redirect } from 'react-router-dom';

const URL = "http://localhost:2500"
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            visible: false,
            inputType: 'password'
        }
    }

    onBtVisible = () => {
        if (this.state.inputType == "password") {
            this.setState({ inputType: "text", visible: !this.state.visible })
        } else {
            this.setState({ inputType: "password", visible: !this.state.visible })
        }
    }

    onBtLogin = () => {
        let username = this.username.value
        let password = this.password.value

        Axios.get(URL + `/users?username=${username}&password=${password}`)
            .then((res) => {
                localStorage.setItem('loginRunner', res.data[0].id)
                console.log("satu")
                this.setState({ redirect: true })
                window.location.reload();
            })
            .catch((err) => {
                console.log(err)
            })

    }

    render() {
        if (localStorage.getItem("loginRunner")) {
            console.log("dua")
            return <Redirect to="/" />
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
                        <h1 style={{ color: 'white' }}>Welcome to </h1>
                        <div style={{ borderLeft: '3px solid white', height: "80px" }}></div>
                        <img src={require('../assets/images/logoBwhite.png')} width="50%" height="20%" />
                    </div>
                    <Paper style={{ width: "30%", backgroundColor: "#0376AB", textAlign: 'center' }}>
                        <fieldset style={{ position: 'relative', top: "30%", borderRadius: 20, display: 'flex', flexDirection: 'column' }}>
                            <legend style={{ color: 'white', size: 60, fontWeight: 'bold' }}>Login</legend>
                            <FormControl >
                                <InputLabel htmlFor="standard-adornment-password" style={{ color: 'white' }}>Username or Email</InputLabel>
                                <Input
                                    inputRef={(text) => this.username = text}
                                    style={{ color: 'white' }}
                                    id="standard-adornment-password"
                                    type="text"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                            // onMouseDown={handleMouseDownPassword}
                                            >
                                                <AccountCircle />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl style={{ marginTop: '2%' }}>
                                <InputLabel htmlFor="standard-adornment-password" style={{ color: 'white' }}>Password</InputLabel>
                                <Input
                                    inputRef={(text) => this.password = text}
                                    style={{ color: 'white' }}
                                    id="standard-adornment-password"
                                    type={this.state.inputType}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.onBtVisible}
                                            // onMouseDown={handleMouseDownPassword}
                                            >
                                                {this.state.visible ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <span style={{ textAlign: 'right' }}>Forget password ?</span>
                            <button onClick={this.onBtLogin}>Login</button>
                            {/* <Button
                                style={{ marginTop: '2%' }}
                                variant="contained"
                                color="default"
                                // className={classes.button}
                                onClick={this.onBtLogin}
                                startIcon={<MeetingRoomIcon />}
                            >
                                Login
                            </Button> */}
                        </fieldset>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default Login;