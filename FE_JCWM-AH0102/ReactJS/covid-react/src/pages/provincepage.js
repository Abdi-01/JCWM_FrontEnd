import React from 'react';
import Axios from 'axios';
import CardProvince from '../components/cardProvinsi';

const API_URL_PROVINSI = "https://indonesia-covid-19-api.now.sh"
class Province extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProvince: []
        }
    }

    componentDidMount() {
        this.getDataProvinsi()
    }

    getDataProvinsi = () => {
        Axios.get(API_URL_PROVINSI + "/api/provinsi")
            .then((res) => {
                console.log("Get Provinsi SUccess :", res.data.data)
                this.setState({ dataProvince: res.data.data })
            })
            .catch((err) => {
                console.log("Get Provinsi Error :", err)
            })
    }

    renderCard = () => {
        return this.state.dataProvince.map((item, index) => {
            return (
                <CardProvince data={item} key={index}/>
            )
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.renderCard()}
                </div>
            </div>
        );
    }
}

export default Province;