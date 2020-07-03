import React from 'react';
import { Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, DialogTitle, DialogContent, List, ListItem, ListItemText } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Axios from 'axios'

const URL = "http://localhost:2500"

class AdminTransPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbTrans: [],
            dialog: false,
            selectedId: null
        }
    }

    componentDidMount() {
        this.getTransaction()
    }

    getTransaction = () => {
        Axios.get(URL + "/userTransaction")
            .then((res) => {
                this.setState({ dbTrans: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    detailProduct = (id) => {
        this.setState({ selectedId: id, dialog: !this.state.dialog })
    }

    printData = () => {
        return this.state.dbTrans.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableCell align="center" component="th" scope="row">
                        {index + 1}
                    </TableCell>
                    <TableCell align="center">{item.date}</TableCell>
                    <TableCell align="center">{item.userID}</TableCell>
                    <TableCell align="center">IDR. {item.total.toLocaleString()}</TableCell>
                    <TableCell align="center">
                        <Button variant="contained" style={{ backgroundColor: '#0376AB', color: 'white' }} onClick={() => this.detailProduct(item.id)}>
                            Open Detail
                        </Button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    printDetail = () => {
        return this.state.dbTrans.map((item, index) => {
            if (item.id === this.state.selectedId) {
                return (
                    <Dialog onClose={() => this.setState({ dialog: !this.state.dialog })} aria-labelledby="customized-dialog-title" open={this.state.dialog}>
                        <DialogTitle id="customized-dialog-title" style={{ backgroundColor: '#0376AB', color: 'white' }} onClose={() => this.setState({ dialog: !this.state.dialog })}>
                            Transaction Detail
                        </DialogTitle>
                        <DialogContent dividers style={{ backgroundColor: '#404146', color: 'white' }}>
                            {item.cart.map((val) => {
                                return (
                                    <List component="nav" aria-label="secondary mailbox folders">
                                        <ListItem>
                                            <ListItemText primary={"⏺ " + val.name} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={"⏺ " + val.brand} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={"⏺ " + val.color} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={"⏺ " + val.qty} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={"⏺ IDR. " + val.total.toLocaleString()} />
                                        </ListItem>
                                    </List>
                                )
                            })}
                        </DialogContent>
                    </Dialog>
                )
            }
        })
    }

    render() {
        return (
            <div>
                <div style={{ marginTop: '3%' }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead style={{ backgroundColor: '#404146', color: 'white' }}>
                                <TableRow >
                                    <TableCell align="center" style={{ color: 'white' }}>No</TableCell>
                                    <TableCell align="center" style={{ color: 'white' }}>Date</TableCell>
                                    <TableCell align="center" style={{ color: 'white' }}>UserID</TableCell>
                                    <TableCell align="center" style={{ color: 'white' }}>Total</TableCell>
                                    <TableCell align="center" style={{ color: 'white' }}>Detail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.printData()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                {this.printDetail()}
            </div>
        );
    }
}

export default AdminTransPage;