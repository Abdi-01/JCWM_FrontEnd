import React from 'react';
import { Button } from 'reactstrap'
import '../assets/css/home.css'
import Carousel from '../components/carousel'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listBiodata: [
                { nama: "Abdi", usia: 20, pekerjaan: "Entepreneur" }
            ],
            listNama: ["Adnan", "Alex", "Ade"],
            angka: 0
        }
    }

    renderListNama = () => {
        return this.state.listNama.map((item, index) => {
            return <li key={index}>{item}</li>
        })
    }

    renderTableNama = () => {
        return this.state.listNama.map((item, index) => {
            return <tr key={index}>
                <th>{index + 1}</th>
                <td>{item}</td>
            </tr>
        })
    }

    btIncrease = () => {
        console.log(this.refs.angkaSatu)
        alert(this.refs.angkaSatu.value)
        this.state.angka += 1
        // this.refs.angkaSatu.disabled = true
        this.setState({ angka: this.state.angka, angka2: "Ini Angka 2" })
    }

    btInNama = () => {
        // Model 1
        // let temp = this.state.listNama
        // let nama = this.refs.inNama.value //untuk mengambil data dari form reference
        // temp.push(nama)
        // this.setState({ listNama: temp })

        // Model 2
        this.state.listNama.push({ name: "abdi", usia: 20, pekerjaan: "Enterpreneur" })
        this.setState({ listNama: this.state.listNama })
    }

    btSubmit = () => {
        this.state.listBiodata.push({ nama: this.refs.nama.value, usia: this.refs.usia.value, pekerjaan: this.refs.pekerjaan.value })
        this.setState({ listBiodata: this.state.listBiodata })
    }

    printTable = () => {
        return this.state.listBiodata.map((item, index) => {
            return (
                <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.nama}</td>
                    <td>{item.usia}</td>
                    <td>{item.pekerjaan}</td>
                    <td></td>
                </tr>
            )
        })
    }

    render() {
        console.log(this.state.listNama)
        return (
            <div>
                <h2>Ini Home {this.props.nama} {this.props.usia} {this.props.children}</h2>

                <input type="text" placeholder="angka pertama" ref="angkaSatu" />
                <h5>{this.state.angka}</h5>
                <button className="btn btn-primary" type="button" onClick={this.btIncrease}>Increase</button>
                <br></br>
                <input type="text" placeholder="Masukkan Nama" ref="inNama" />
                {/* <Carousel /> */}
                <button className="btn btn-secondary" type="button" onClick={this.btInNama}>Increase</button>
                <ol>
                    {this.renderListNama()}
                </ol>

                <table className="table" style={{ width: "30vw" }}>
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Nama</th>
                            <th>Usia</th>
                            <th>Pekerjaan</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       {this.printTable()}
                    </tbody>
                    <tfoot>
                        <td></td>
                        <td><input type="text" placeholder="Nama" ref="nama" /></td>
                        <td><input type="text" placeholder="Usia" ref="usia" /></td>
                        <td><input type="text" placeholder="Pekerjaan" ref="pekerjaan" /></td>
                        <td><button className="btn btn-primary" onClick={this.btSubmit}>Submit</button></td>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export default Home;