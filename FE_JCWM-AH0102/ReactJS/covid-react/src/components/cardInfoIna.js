import React from 'react';
import Axios from 'axios';
import {API_URL_IDN} from '../support/list_url'

class IndoInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataIndo: {

            }
        }
    }

    componentDidMount() {
        this.getDataIndo()
    }

    getDataIndo = () => {
        Axios.get(API_URL_IDN + "/api")
            .then((res) => {
                console.log("Get Indo Success :", res.data)
                this.setState({ dataIndo: res.data })
            }).catch((err) => {
                console.log("Get Indo Error :", err)
            })
    }


    render() {
        let { dataIndo } = this.state
        return (
            <div>
                <h2 className="text-center">Covid-19 Indonesia Summary</h2>
                <div className="row text-center">
                    <div className="col-12 col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Amount Case</h5>
                                {
                                    dataIndo.jumlahKasus ?
                                        <h2>{dataIndo.jumlahKasus.toLocaleString()}</h2>
                                        :
                                        <h3>Waiting</h3>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Treatment</h5>
                                {
                                    dataIndo.perawatan ?
                                        <h2>{dataIndo.perawatan.toLocaleString()}</h2>
                                        :
                                        <h3>Waiting</h3>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Recovered</h5>
                                {
                                    dataIndo.sembuh ?
                                        <h2>{dataIndo.sembuh.toLocaleString()}</h2>
                                        :
                                        <h3>Waiting</h3>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Deaths</h5>
                                {
                                    dataIndo.meninggal ?
                                        <h2>{dataIndo.meninggal.toLocaleString()}</h2>
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

export default IndoInfo;