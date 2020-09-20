import React from 'react';
import Axios from 'axios';

const API_URL = "https://covid19.mathdro.id"
class CountriesDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                confirmed: 0,
                recovered: 0,
                deaths: 0
        }
    }

    componentDidMount() {
        this.getDetail()
    }

    getDetail = () => {
        let { params } = this.props.match
        Axios.get(API_URL + `/api/countries/${params.iso}`)
            .then((res) => {
                console.log("Get Detail :", res.data)
                let { confirmed, recovered, deaths } = res.data
                this.setState({
                        confirmed: confirmed.value,
                        recovered: recovered.value,
                        deaths: deaths.value
                })
            }).catch((err) => {
                console.log("Get Detail Error :", err)
            })
    }

    render() {
        // Untuk mendapat parameter dari URL lihat this.props.match untuk detailnya
        let { params } = this.props.match
        console.log(params)
        return (
            <div className="container">
                <div className="card text-center ">
                    <h5 className="card-header">{params.countries}</h5>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-md-4">
                                <div className="card bg-info text-white">
                                    <div className="card-body">
                                        <h5 className="card-title">Confirmed</h5>
                                        <h2>{this.state.confirmed.toLocaleString()}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="card bg-success text-white">
                                    <div className="card-body">
                                        <h5 className="card-title">Recovered</h5>
                                        <h2>{this.state.recovered.toLocaleString()}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="card bg-danger text-white">
                                    <div className="card-body">
                                        <h5 className="card-title">Deaths</h5>
                                        <h2>{this.state.deaths.toLocaleString()}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CountriesDetail;