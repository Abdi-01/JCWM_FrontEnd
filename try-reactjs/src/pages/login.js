import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbUser: [
                { username: 'user', password: 'user' }
            ]
        }
    }

    render() {
        return (
            <div style={{ width: '40vw', margin: 'auto', marginTop: '10vh' }}>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>Username</InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' innerRef={(username) => this.username = username} />
                </InputGroup>
                <br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>Password</InputGroupText>
                    </InputGroupAddon>
                    <Input type='password' innerRef={(pass) => this.password = pass} />
                </InputGroup>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button style={{ margin: 'auto' }}>Login</Button>
                </div>
            </div>
        );
    }
}

export default Login;