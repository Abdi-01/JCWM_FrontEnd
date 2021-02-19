import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, Badge, NavItem, ListGroupItem } from 'reactstrap';
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
        // this.setState({ redirect: true })
    }

    render() {
        let { user } = this.props
        // if (this.state.redirect) {
        //     return <Redirect to="/" />
        // }
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
                            <div style={{ marginLeft: '70vw', display: 'flex' }}>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.setState({ dropdownOpen: !this.state.dropdownOpen })}>
                                    <DropdownToggle caret>
                                        <>
                                            <span class="material-icons">
                                                shopping_cart
                                            </span>
                                            {/* <Badge color="secondary">{this.props.cart.length}</Badge> */}
                                        </>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        {
                                            // this.props.cart.length == 0 ?
                                            //     <DropdownItem>Cart is Empty</DropdownItem>
                                            //     :
                                            //     this.props.cart.map((item, index) => {
                                            //         return (
                                            //             <DropdownItem style={{ width: 300 }} >
                                            //                 <div className="row">
                                            //                     <div className="col-3">
                                            //                         <img src={item.image} width="60px" />
                                            //                     </div>
                                            //                     <div className="col-4">
                                            //                         <p style={{ marginBottom: 0 }}>{item.name}</p>
                                            //                         <p style={{ marginBottom: 0 }}>Size : {item.size}</p>
                                            //                         <p style={{ marginBottom: 0 }}>Qty : {item.qty}</p>
                                            //                         <p style={{ marginBottom: 0 }}>Rp. {item.price.toLocaleString()}</p>
                                            //                     </div>
                                            //                 </div>
                                            //             </DropdownItem >
                                            //         )
                                            //     })
                                        }
                                        <DropdownItem divider />
                                        <DropdownItem >
                                            <Link to="/cart">
                                                Go To Cart
                                        </Link>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                {
                                    user.iduser ?
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
                                                    <DropdownItem>
                                                        <Link to="/transaction-admin">
                                                            Transactions Management
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link to="/slide-admin">
                                                            Slide Management
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem onClick={this.btLogout}>
                                                        Logout
                                                        </DropdownItem>
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
const mapStateToProps = (state) => {
    console.log("cek data", state.authReducer)
    return {
        user: state.authReducer,
        cart: state.authReducer.cart,
        iduser: state.authReducer.iduser
    }
}

export default connect(mapStateToProps, { logout })(NavbarComp);