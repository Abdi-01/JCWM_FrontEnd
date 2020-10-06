import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import ModalLogin from './modalLogin';
import { connect } from 'react-redux'
import { logout } from '../redux/actions'

class NavbarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            dropOpen: false
        }
    }

    btLogout = () => {
        localStorage.removeItem("id")
        this.props.logout()
    }

    render() {
        let { user } = this.props
        return (
            <div>
                <Navbar color="faded" light expand="md">
                    <NavbarBrand>
                        <Link to="/" className="nav-link">
                            <img src={require('../assets/images/logoA.png')} width="50px" alt="brand" />
                        </Link>
                    </NavbarBrand>
                    <NavbarToggler onClick={() => this.setState({ collapsed: !this.state.collapsed })} className="mr-2" />
                    <Collapse isOpen={this.state.collapsed} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link to="/product" className="nav-link">Product</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/about" className="nav-link">About</Link>
                            </NavItem>
                            <div style={{ marginLeft: '70vw' }}>
                                {
                                    user.id ?
                                        user.role === "user" ?
                                            <Dropdown isOpen={this.state.dropOpen} toggle={() => this.setState({ dropOpen: !this.state.dropOpen })}>
                                                <DropdownToggle caret>
                                                    {user.username}
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem>Profile</DropdownItem>
                                                    <DropdownItem>
                                                        <Link to="/cart">
                                                            Cart
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link to="/transaction">
                                                            Transactions
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem onClick={this.btLogout}>Logout</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                            :
                                            <Dropdown isOpen={this.state.dropOpen} toggle={() => this.setState({ dropOpen: !this.state.dropOpen })}>
                                                <DropdownToggle caret>
                                                    {user.username}
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem>
                                                        <Link to="/product-admin">
                                                            Products Management
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>Transactions Management</DropdownItem>
                                                    <DropdownItem>
                                                        <Link to="/slide-admin">
                                                            Slide Management
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem onClick={this.btLogout}>Logout</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        :
                                        <>
                                            <ModalLogin />
                                            <Button color="secondary" size="sm">
                                                <Link to={{ pathname: '/register' }} style={{ textDecoration: 'none', color: 'white' }}>
                                                    Register
                                                </Link>
                                            </Button>
                                        </>
                                }

                            </div>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default connect(null, { logout })(NavbarComp);