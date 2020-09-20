import React from 'react';
import Axios from 'axios'
import { Button, Input, Table } from 'reactstrap';

const API_URL = "http://localhost:2000"

class FormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataStaff: [],
            dataPosisi: ["Product Manager", "Senior Programmer", "Front-end", "Back-end", "UI/UX", "QA"],
            selectedIndex: null
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

    btSubmit = () => {
        let nama = this.nama.value
        let phone = this.phone.value
        let email = this.email.value
        let password = this.password.value
        let posisi = this.posisi.value

        Axios.post(API_URL + '/staff', { nama, phone, email, password, posisi })
            .then((res) => {
                console.log("Post data :", res.data)
                this.getDataStaff()
            }).catch((err) => {
                console.log("Error Bos :", err)
            })
    }

    btDelete = (id) => {
        console.log(id)
        Axios.delete(API_URL + `/staff/${id}`)
            .then((res) => {
                this.getDataStaff()
            })
            .catch((err) => {
                console.log("Error Bos :", err)
            })
    }

    btSave = (id) => {
        let nama = this.namaNew.value
        let phone = this.phoneNew.value
        let email = this.emailNew.value
        let password = this.passwordNew.value
        let posisi = this.posisiNew.value

        // Model 1 menggunakan put : mengganti data keseluruhan pada id menjadi data baru yg dikirim oleh url
        // Axios.put(API_URL + `/staff/${id}`, { nama, phone, email, password, posisi })
        //     .then((res) => {
        //         this.getDataStaff()
        //         this.setState({ selectedIndex: null })
        //     })
        //     .catch((err) => {
        //         console.log("Error Bos :", err)
        //     })

        // Model 2 menggunakan patch : hanya mengganti data yang diperlukan
        let dataEdit = { nama, phone, email, password, posisi }
        let data = {}
        // untuk memilih data mana yg berubah
        for (let key in dataEdit) {
            if (dataEdit[key] !== this.state.dataStaff[this.state.selectedIndex][key]) {
                data[key] = dataEdit[key]
            }
        }
        Axios.patch(API_URL + `/staff/${id}`, data)
            .then((res) => {
                this.getDataStaff()
                this.setState({ selectedIndex: null })
            })
            .catch((err) => {
                console.log("Error Bos :", err)
            })
    }

    printData = () => {
        return this.state.dataStaff.map((item, index) => {
            if (this.state.selectedIndex === index) {
                return (
                    <tr>
                        <th></th>
                        <th><Input type="text" placeholder="Masukkan Nama" innerRef={(text) => this.namaNew = text} defaultValue={item.nama} /></th>
                        <th><Input type="text" placeholder="Masukkan Phone" innerRef={(item) => this.phoneNew = item} defaultValue={item.phone} /></th>
                        <th><Input type="text" placeholder="Masukkan Email" innerRef={(item) => this.emailNew = item} defaultValue={item.email} /></th>
                        <th><Input type="text" placeholder="Masukkan Password" innerRef={(item) => this.passwordNew = item} defaultValue={item.password} /></th>
                        <th><Input type="select" placeholder="Masukkan Posisi" innerRef={(item) => this.posisiNew = item} defaultValue={item.posisi}>
                            {this.printPosisi()}
                        </Input></th>
                        <th><Button color="success" onClick={() => this.btSave(item.id)}>Save</Button>
                            <Button color="danger" onClick={() => this.setState({ selectedIndex: null })}>Cancel</Button></th>
                    </tr>
                )
            }
            return (
                <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.nama}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>{item.posisi}</td>
                    <td><Button color="warning" onClick={() => this.setState({ selectedIndex: index })}>Edit</Button><Button color="danger" onClick={() => this.btDelete(item.id)}>Delete</Button></td>
                </tr>
            )
        })
    }

    printPosisi = () => {
        return this.state.dataPosisi.map((item, index) => {
            return (
                <option key={index} value={item}>{item}</option>
            )
        })
    }

    render() {
        console.log("Ini render")
        console.log("Ini State Data Staff", this.state.dataStaff)
        return (
            <div className="container">
                Ini Form
                <Table hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th><Input type="text" placeholder="Masukkan Nama" innerRef={(text) => this.nama = text} /></th>
                            <th><Input type="text" placeholder="Masukkan Phone" innerRef={(item) => this.phone = item} /></th>
                            <th><Input type="text" placeholder="Masukkan Email" innerRef={(item) => this.email = item} /></th>
                            <th><Input type="text" placeholder="Masukkan Password" innerRef={(item) => this.password = item} /></th>
                            <th><Input type="select" placeholder="Masukkan Posisi" innerRef={(item) => this.posisi = item}>
                                {this.printPosisi()}
                            </Input></th>
                            <th><Button color="primary" onClick={this.btSubmit}>Submit</Button></th>
                        </tr>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Posisi</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printData()}
                    </tbody>

                </Table>
            </div>
        );
    }
}

export default FormPage;