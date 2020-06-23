import React, { Component } from 'react';
import Axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TableFooter, TextField } from '@material-ui/core';

const URL = "http://localhost:1010"

/*penuliasan class components biasanya digunakan untuk membuat page yang memang membutuhkan penyimpanan data
  state.
*/
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dbUsers: []
        }
    }

    //Life cycle method React dimana fungsi ini secara otomatis berjalan setelah fungsi render()
    componentDidMount() {
        console.log("second")
        //contoh memanggil fungsi didalam fungsi yang lain
        this.getData()
    }

    // Untuk membuat fungsi direact pastikan menggunakan arrow function
    /*fungsi getData dengan arrow function agar bisa dipanggil didalam class component dengan this.getData() dan dapat menjalankan
      property this.state maupun this.setState
    */
    getData = () => {
        /*  Axios.get digunakan untuk mengambil data dari server(json-server atau online free API seperti NewsAPI) 
            yg terdiri dari URL dan parameter atau query
            Axios memiliki property promise yaitu :
            🔹 .then((res)=>{you get data yeay !! 🤩}) jika Axios berhasil mendapat response yg berupa data ✅
            🔹 .catch((error)=>{you get ERROR !! 🤬}) jika Axios tidak mendapat response data dan menerima error ❌

            NOTE :
            🔹 Pastikan URL benar, mulai dari alamat, port maupun parameter
            🔹 Susunan URL terdiri dari==> http://domainnyaAPA:portnyaBERAPA/propertinyaAPA?queryAPA
                🔸 contoh domain : localhost(untuk local), api.zomato.com(jika domain online), 58.163.177.23(atau domain yg berupa IP)
                🔸 contoh port : 2020, 8081, 2324 =>>bebas umumnya terdiri dari 4 angka 
                🔸 Properti :  biasanya merujuk lokasi file atau path="/"

            🔹 PORT
                Port yang biasanya udah dipakek itu : 80,1280,8080, 3306(ini untuk MySQL biasanya), 3000(defaultnya react)
                port itu bergantung IP, apakah di IP tersebut port yg kita mau pakek udah ada yg makek apa belum.
                Jadi missal di 
                IP http://192.168.30.1:2020
                IP http://192.168.40.1:2020
                IP http://api.newsapi.com:2020
                IP http://localhost:2020
                ini gag masalah gag bakal bentrok selama IP, domain atau hostingnya  beda

        */
        Axios.get(URL + "/dbUsers")
            .then((res) => {
                console.log(res.data)
                this.setState({ dbUsers: res.data })
            })
            .catch((err) => {
                console.log("Error BOS❌❌", err)
            })
    }

    onBtAdd = () => {
        let username = this.username.value
        let password = this.password.value
        let email = this.email.value
        console.log(username, password, email)
    }

    printData = () => {
        return this.state.dbUsers.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        {item.username}
                    </TableCell>
                    <TableCell align="right">{item.password}</TableCell>
                    <TableCell align="right">{item.email}</TableCell>
                    <TableCell align="right">{item.role}</TableCell>
                    <TableCell align="right">
                        <Button variant="contained" color="secondary">
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    render() {
        console.log("first")
        // const classes = useStyles();

        return (
            <div>
                <h1>INI HOME</h1>
                <div style={{ width: '70vw', margin: 'auto' }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell align="right">Username</TableCell>
                                    <TableCell align="right">Password</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* ⬇⬇⬇ Memanggil javascript syntax didalam return(<element/>) harus menggunakan {bracket}, tapi hanya berlaku untuk single line syntax */}
                                {this.printData()}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell>+</TableCell>
                                    <TableCell align="right"><TextField id="standard-basic" label="Username" inputRef={(text) => this.username = text} /></TableCell>
                                    <TableCell align="right"><TextField id="standard-basic" label="Password" inputRef={(text) => this.password = text} /></TableCell>
                                    <TableCell align="right"><TextField id="standard-basic" label="Email" inputRef={(text) => this.email = text} /></TableCell>
                                    <TableCell align="right">
                                        <Button color="Primary" onClick={this.onBtAdd}>
                                            Add
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        );
    }
}

export default Home;