import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import { Link } from 'react-router-dom';
class NavbarComp extends React.Component {
    state = {
        open: false
    }
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Front End Tester</NavbarBrand>
                    <NavbarToggler onClick={() => this.setState({ open: !this.state.open })} />
                    <Collapse isOpen={this.state.open} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link to="/login" style={{marginLeft:'1vw'}}>Login</Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/form' style={{marginLeft:'1vw'}}>Form</Link>
                            </NavItem>
                        </Nav>
                        <NavbarText>Simple Text</NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavbarComp;