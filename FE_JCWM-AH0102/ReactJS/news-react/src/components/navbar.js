import Axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import ModalSignIn from './modalSignin';
import ModalSignUp from './modalSignup';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: {},
            dropOpen: false
        }
    }

    componentDidMount() {
        this.keepLogin()
    }

    keepLogin = () => {
        let id = localStorage.getItem("id")
        if (id) {
            Axios.get(`http://localhost:2020/users?id=${id}`)
                .then((res) => {
                    console.log("KeepLogin Success :", res.data)
                    this.setState({ dataUser: res.data[0] })
                })
                .catch((err) => {
                    console.log("KeepLogin Error :", err)
                })
        }
    }

    btLogout = () => {
        localStorage.removeItem("id")
        this.setState({ dataUser: {} })
    }

    render() {
        return (
            <div className="my-2" >
                <div className="row py-3 d-flex align-items-center" style={{ borderBottom: "1px solid gray" }}>
                    <div className="col-4" >
                        <a className="pt-1">Subscribe</a>
                    </div>
                    <div className="col-4 text-center">
                        <Link to="/">
                            <h1>News Update</h1>
                        </Link>
                    </div>
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        <span className="material-icons mr-2">
                            search
                        </span>
                        {
                            localStorage.getItem("id")
                                ?
                                <Dropdown isOpen={this.state.dropOpen} toggle={() => this.setState({ dropOpen: !this.state.dropOpen })}>
                                    <DropdownToggle caret>
                                        {this.state.dataUser.username}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Profile</DropdownItem>
                                        <DropdownItem onClick={this.btLogout}>Logout</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                :
                                <>
                                    <ModalSignIn keep={this.keepLogin} />
                                    <ModalSignUp keep={this.keepLogin} />
                                </>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;