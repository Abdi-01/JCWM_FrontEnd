import React from 'react';
import { Link } from 'react-router-dom';
import Geocode from "react-geocode";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-4">Hello, Welcome To Your Simple React!</h1>
                    <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-4" />
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <Link className="btn btn-primary btn-lg" to="/login" role="button">Go To Login</Link>
                </div>
            </div>
        );
    }
}

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyC9VdWE-ouchsSfx-XWXKSzWNaomHA7fT0");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

// Get address from latidude & longitude.
Geocode.fromLatLng("48.8583701", "2.2922926").then(
    response => {
        const address = response.results[0].formatted_address;
        console.log(address);
    },
    error => {
        console.error(error);
    }
);

// Get latidude & longitude from address.
Geocode.fromAddress("Eiffel Tower").then(
    response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
    },
    error => {
        console.error(error);
    }
);

export default Home;