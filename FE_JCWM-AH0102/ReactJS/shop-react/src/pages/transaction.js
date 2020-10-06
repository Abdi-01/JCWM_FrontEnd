import React from 'react';
import Axios from 'axios';
import { API_URL } from '../support/url'
import { Button, Table } from 'reactstrap';
class TransactionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbTransactions: []
        }
    }

    componentDidMount() {
        this.getTransaction()
    }

    getTransaction = () => {
        Axios.get(API_URL + `/userTransactions?iduser=${localStorage.getItem("id")}`)
            .then((res) => {
                console.log("userTransaction", res.data)
                this.setState({ dbTransactions: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    renderTransactions = () => {
        return this.state.dbTransactions.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.date}</td>
                    <td>{item.username}</td>
                    <td>{item.status}</td>
                    <td>
                        <Button color="info">Detail</Button>
                        <Button color="primary">Payment</Button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container">
                <Table>
                    <thead>
                        <th>No</th>
                        <th>Date</th>
                        <th>Username</th>
                        <th>Status</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {this.renderTransactions()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default TransactionPage