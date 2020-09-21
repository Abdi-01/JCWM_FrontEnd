import React from 'react';
import Axios from 'axios'
import {API_URL} from '../support/list_url'

class WorldInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataWorld: {}
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        Axios.get(API_URL + '/api')
            .then((res) => {
                console.log("Get Success :", res.data)
                this.setState({ dataWorld: res.data })
            })
            .catch((err) => {
                console.log("Get Error :", err)
            })
    }

    render() {
        let { dataWorld } = this.state
        return (
            <div>
                <h2 className="text-center">Covid-19 World Summary</h2>
                <div className="row text-center">
                    <div className="col-12 col-md-4">
                        <div className="card text-white bg-primary">
                            <div className="card-body">
                                <h5 className="card-title">Confirmed</h5>
                                {
                                    dataWorld.confirmed ?
                                        <h2>{dataWorld.confirmed.value.toLocaleString()}</h2>
                                        :
                                        <h3>Waiting</h3>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="card text-white bg-success">
                            <div className="card-body">
                                <h5 className="card-title">Recovered</h5>
                                {
                                    dataWorld.recovered ?
                                        <h2>{dataWorld.recovered.value.toLocaleString()}</h2>
                                        :
                                        <h3>Waiting</h3>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="card text-white bg-danger">
                            <div className="card-body">
                                <h5 className="card-title">Deaths</h5>
                                {
                                    dataWorld.deaths ?
                                        <h2>{dataWorld.deaths.value.toLocaleString()}</h2>
                                        :
                                        <h3>Waiting</h3>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WorldInfo;