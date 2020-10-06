import React from 'react';
import Axios from 'axios'
const API_URL = "https://indonesia-covid-19-api.now.sh"

class InfoCorona extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // data:{}
        }
    }
    componentDidMount() {
        this.getData()
    }

    getData = () => {
        Axios.get(API_URL + "/api")
            .then((res) => {
                console.log("Get Indo Success :", res.data)
                this.setState({ data: res.data })
            }).catch((err) => {
                console.log("Get Indo Error :", err)
            })
    }
    render() {

        return (
            <div>
                {
                    this.state.data ?
                        <>
                            <div className="card">
                                <div className="card-header">Total Kasus</div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{this.state.data.jumlahKasus.toLocaleString()}</li>
                                </ul>
                            </div>
                            <div className="card">
                                <div className="card-header">Penanganan</div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{this.state.data.perawatan.toLocaleString()}</li>
                                </ul>
                            </div>
                            <div className="card">
                                <div className="card-header">Sembuh</div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{this.state.data.sembuh.toLocaleString()}</li>
                                </ul>
                            </div>
                            <div className="card">
                                <div className="card-header">Meninggal</div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{this.state.data.meninggal.toLocaleString()}</li>
                                </ul>
                            </div>
                        </>
                        :
                        null
                }

            </div>

        )
    }
}

export default InfoCorona;