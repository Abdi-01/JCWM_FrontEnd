import React from 'react';
import Axios from 'axios'

const API_URL = "http://localhost:2000"

class FormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataStaff: []
        }
    }

    componentDidMount() {
        console.log("Ini did Mount")
        this.getDataStaff()
    }

    getDataStaff = () => {
        Axios.get(API_URL + '/staff')
            .then((res) => {
                console.log("Cek get data :", res)
                this.setState({ dataStaff: res.data })
            }).catch((err) => {
                console.log("Error Bos :", err)
            })
    }

    render() {
        console.log("Ini render")
        console.log("Ini State Data Staff",this.state.dataStaff)
        return (
            <div className="container">
                Ini Form
            </div>
        );
    }
}

export default FormPage;