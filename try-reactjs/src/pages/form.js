import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';

class FormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbUser: [],
            selectedID: null
        }
    }

    btAddPeople = () => {
        let nama = this.nama.value
        let alamat = this.address.value
        let pekerjaan = this.job.value
        let agama = this.agama.value

        console.log(nama, alamat, pekerjaan, agama)
        let temp = this.state.dbUser
        temp.push({ nama, alamat, pekerjaan, agama })
        this.setState({ dbUser: temp })
    }

    btEdit = (index) => {
        let temp = this.state.dbUser

        temp[index].nama = this.newnama.value
        temp[index].alamat = this.newaddress.value
        temp[index].pekerjaan = this.newjob.value
        temp[index].agama = this.newagama.value

        this.setState({ dbUser: temp,selectedID:null })
    }

    printData = () => {
        return this.state.dbUser.map((item, index) => {
            if (this.state.selectedID !== index) {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{item.nama}</td>
                        <td>{item.alamat}</td>
                        <td>{item.pekerjaan}</td>
                        <td>{item.agama}</td>
                        <td><Button onClick={() => this.setState({ selectedID: index })}>Edit </Button><Button >Delete</Button></td>
                    </tr>
                )
            } else {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td><Input type="text" name="text" innerRef={(newnama) => this.newnama = newnama} defaultValue={item.nama} /></td>
                        <td><Input type="text" name="text" innerRef={(newaddress) => this.newaddress = newaddress} defaultValue={item.alamat} /></td>
                        <td><Input type="text" name="text" innerRef={(newjob) => this.newjob = newjob} defaultValue={item.pekerjaan} /></td>
                        <td><Input type="select" name="select" innerRef={(newagama) => this.newagama = newagama} defaultValue={item.agama}>
                            <option >Choose...</option>
                            <option value="Islam">Islam</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Budha">Budha</option>
                            <option value="Kristen">Hindu</option>
                        </Input></td>
                        <td>{this.state.selectedID == null ? <><Button onClick={() => this.setState({ selectedID: index })}>Edit</Button><Button>Delete</Button></> :
                            <><Button onClick={() => this.setState({ selectedID: null })}>No</Button><Button onClick={() => this.btEdit(index)}>Yes</Button></>}</td>
                    </tr>
                )
            }
        })
    }

    render() {
        return (
            <div className="container">
                <Form width='90vw'>
                    <FormGroup>
                        <Label for="nama">Nama</Label>
                        <Input type="text" name="text" id="nama" innerRef={(nama) => this.nama = nama} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="alamat">Alamat</Label>
                        <Input type="text" name="text" id="alamat" innerRef={(address) => this.address = address} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pekerjaan">Pekerjaan</Label>
                        <Input type="text" id="pekerjaan" innerRef={(job) => this.job = job} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="religion">Agama</Label>
                        <Input type="select" name="select" id="religion" innerRef={(agama) => this.agama = agama}>
                            <option >Choose...</option>
                            <option value="Islam">Islam</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Budha">Budha</option>
                            <option value="Kristen">Hindu</option>
                        </Input>
                    </FormGroup>
                    <Button type='button' onClick={this.btAddPeople}>Submit</Button>
                </Form>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Pekerjaan</th>
                            <th>Agama</th>
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