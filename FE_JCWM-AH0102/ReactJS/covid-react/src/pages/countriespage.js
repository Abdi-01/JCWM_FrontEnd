import React from 'react';
import Axios from 'axios';
import CardCountries from '../components/cardCountries';
import {API_URL} from '../support/list_url'

class Countries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCount:[],
            caseCountries:[],
        }
    }

    componentDidMount() {
        this.getDataCountries()
    }

    getDataCountries = () => {
        Axios.get(API_URL + "/api/countries")
            .then((res) => {
                console.log("Get Countries Success :", res.data)
                this.setState({ dataCount: res.data.countries })
            }).catch((err) => {
                console.log("Get Countries Error :", err)
            })
    }

    renderCountries = () => {
        return this.state.dataCount.map((item, index) => {
            return (
                <CardCountries data={item} key={index} />
            )
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.renderCountries()}
                </div>
            </div>
        );
    }
}

export default Countries;