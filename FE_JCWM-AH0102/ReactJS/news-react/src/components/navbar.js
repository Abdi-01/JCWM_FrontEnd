import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    
    render() {
        return (
            <div className="my-2" >
                <div className="row py-3 d-flex align-items-center" style={{ borderBottom: "1px solid gray" }}>
                    <div className="col-4" >
                        <a className="pt-1">Subscribe</a>
                    </div>
                    <div className="col-4 text-center">
                        <h1>News Update</h1>
                    </div>
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        <span className="material-icons mr-2">
                            search
                        </span>
                        <button className="btn btn-outline-primary btn-sm">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;