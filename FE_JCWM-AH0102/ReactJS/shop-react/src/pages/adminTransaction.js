import Axios from 'axios';
import React from 'react';
import { Button, Table } from 'reactstrap';
import { API_URL } from '../support/url';

class TransactionAdmin extends React.Component {
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
        Axios.get(API_URL + "/userTransactions")
            .then((res) => {
                this.setState({ dbTransactions: res.data })
            }).catch((err) => {
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
                        <Button color="primary" disabled={item.status != "Paid" ? true : false} onClick={() => this.btConfirm(item.id)}>Confirm</Button>
                    </td>
                </tr>
            )
        })
    }

    btConfirm = (id) => {
        Axios.patch(API_URL + `/userTransactions/${id}`, { status: "Success" })
            .then((res) => {
                this.getTransaction()
            })
            .catch((err) => {
                console.log(err)
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

export default TransactionAdmin;