import Axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Input, Jumbotron } from 'reactstrap';
import { API_URL } from '../support/url';

class VerificationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        // Test Mengambil data dari Parameter URL
        console.log(this.props.match.params.token)
    }

    btVerifie = () => {
        const headers = {
            headers: {
                'Authorization': `Bearer ${this.props.match.params.token}`
            }
        }
        Axios.patch(API_URL + '/users/verification', { otp: this.otp.value }, headers)
            .then(res => {
                this.setState({ redirect: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to='/' />
            )
        }
        return (
            <div className="container">
                <Jumbotron>
                    <h1 className="display-3">Verifie Your Account</h1>
                    <p className="lead">You can shop with your account if the status is VERIFIED</p>
                    <hr className="my-2" />
                    <p>Input Your OTP <Input placeholder="6 Character OTP" style={{ width: '15%' }} innerRef={e => this.otp = e}></Input></p>

                    <Button onClick={this.btVerifie}>Verifie Account</Button>
                </Jumbotron>
            </div>
        );
    }
}

export default VerificationPage;