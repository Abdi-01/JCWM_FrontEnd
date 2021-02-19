import React from 'react';
import Axios from 'axios';
import { API_URL } from '../support/url'
import { Button, Modal, ModalBody, ModalHeader, Table, Collapse, Card, UncontrolledCollapse } from 'reactstrap';
class TransactionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbTransactions: [],
            idx: null,
            modalOpen: false
        }
    }

    componentDidMount() {
        this.getTransaction()
    }

    getTransaction = () => {
        const headers = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        Axios.get(API_URL + `/transactions/`, headers)
            .then((res) => {
                console.log("userTransaction", res.data)
                this.setState({ dbTransactions: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    btPayment = (id) => {
        console.log("TRANSAKSI",id)
        Axios.patch(API_URL + `/transactions/paidTransaction/${id}`)
            .then((res) => {
                console.log(res.data)
                this.getTransaction()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    renderTransactions = () => {
        return this.state.dbTransactions.map((item, index) => {
            return (
                <>
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.date}</td>
                        <td>{item.invoice}</td>
                        <td>IDR. {item.total_payment.toLocaleString()}</td>
                        <td>{item.status}</td>
                        <td>
                            <Button color="info" id={`toggle${index}`} onClick={() => this.setState({ idx: index })}>Detail</Button>
                            <Button color="primary" onClick={() => this.btPayment(item.idtransactions)}>Payment</Button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="6">
                            <UncontrolledCollapse toggler={`#toggle${index}`}>
                                <Card>
                                    <Table>
                                        <thead>
                                            <th>No</th>
                                            <th>Product</th>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Size</th>
                                            <th>Qty</th>
                                            <th>Price</th>
                                            {/* <th>Amount Price</th> */}
                                        </thead>
                                        <tbody>
                                            {
                                                item.detail.map((val, ind) => {
                                                    return (
                                                        <tr key={ind}>
                                                            <th>{ind + 1}</th>
                                                            <th style={{ width: "10vw" }}><img src={val.image} width="100%" /> </th>
                                                            <th>{val.name}</th>
                                                            <th>{val.category}</th>
                                                            <th>{val.size}</th>
                                                            < div >
                                                                <p>{val.qty}</p>
                                                            </ div>
                                                            <th>IDR. {parseInt(val.price).toLocaleString()}</th>
                                                            {/* <th>{val.total}</th> */}
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </Card>
                            </UncontrolledCollapse >
                        </td>
                    </tr>
                </>
            )
        })
    }

    totalPayment = () => {
        let { dbTransactions, idx } = this.state
        let payment = 0
        if (idx != null) {
            dbTransactions[idx].cart.forEach(element => {
                payment += element.total
            });
        }

        return payment
    }

    render() {
        return (
            <div className="container">
                <Table>
                    <thead>
                        <th>No</th>
                        <th>Date</th>
                        <th>Invoice</th>
                        <th>Total Payment</th>
                        <th>Status</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {this.renderTransactions()}
                    </tbody>
                </Table>
                <Collapse>
                </Collapse>
            </div>
        );
    }
}

export default TransactionPage