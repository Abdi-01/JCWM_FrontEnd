import React, { Component } from 'react';
import Axios from 'axios'
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TableFooter, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AlertComponent from '../components/alert'
const URL = "http://localhost:1010"

/*penuliasan class components biasanya digunakan untuk membuat page yang memang membutuhkan penyimpanan data
  state.
*/
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dbUsers: [],
            selectedID: null,
            openAlert: false,
            infoAlert: "",
            messageAlert: ""
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
        /*🟡Axios.get digunakan untuk mengambil data dari server(json-server atau online free API seperti NewsAPI) 
            yg terdiri dari URL dan properti atau query
                Axios.post(URL,body,header)
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
                IP http://192.168.30.1:2020 ✅
                IP http://192.168.40.1:2020 ✅
                IP http://api.newsapi.com:2020 ✅
                IP http://localhost:2020 ✅
                IP http://localhost:2020 ⛔ salah karena sudah digunakan sebelumnya
                ini gag masalah gag bakal bentrok selama IP, domain atau hostingnya  beda

          🟡Axios.post : menambah data baru
                Axios.post(URL,body,header)
          🟡Axios.put : mengganti SELURUH data pada id yg dituju
                Axios.put(URL,body,header)
          🟡Axios.patch : mengganti SEBAGIAN data pada id yg dituju
                Axios.patch(URL,body,header)
          🟡Axios.delete : menghapus data berdasarkan id yg dituju
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
        let role = 'user'
        console.log("cek inputan", username, password, email, role)

        //  ⬇⬇⬇ ini merupakan proteksi sederhana untuk mengetahui data yg diinput sudah terisi atau tidak
        //  ⬇⬇⬇ Dalam membuat kondisi perhatikan LOGIC OPERATOR yg digunakan direact dianjurkan jika menggunakan pembanding sama dengan gunakan "===" karena bertujuan sekaligus memproteksi tipe data dan data yg dibandingkan sama.
        if (username === "" | password === "" | email === "") {
            //  ⬇⬇⬇ Konfigurasi penyimpanan data pada state yang akan dikirim melalui props ke AlertComponent
            this.setState({ openAlert: !this.state.openAlert, infoAlert: "error", messageAlert: "Isi semua form !!! ⛔ " })
        }
        else {
            //  ⬇⬇⬇ perhatikan susunan Axios.post yaitu Axios.post(URL,body/data,header). Yang wajib ada adalah URL dan BODY/DATA
            //         ----⬇⬇⬇ URL-----   ---⬇⬇⬇ body/data berupa object--- 
            Axios.post(URL + "/dbUsers", { username, password, email, role })
                .then((res) => {
                    console.log("response", res.data)
                    //   ⬇⬇⬇  Setiap selesai melakukan POST, PUT/PATCH atau DELETE jangan lupa data di GET ULANG
                    this.getData()
                })
                .catch((err) => {
                    console.log("Error", err)
                })
            //  ⬇⬇⬇ Konfigurasi penyimpanan data pada state yang akan dikirim melalui props ke AlertComponent
            this.setState({ openAlert: !this.state.openAlert, infoAlert: "success", messageAlert: "Data masuk ✅ " })
        }
    }

    onBtDelete = (id) => {
        //  ⬇⬇⬇ perhatikan susunan Axios.delete yaitu Axios.post(URL+idData). Yang wajib ada adalah URL dan BODY/DATA
        //          ----⬇⬇⬇ URL+⬇id data---- 
        Axios.delete(URL + `/dbUsers/${id}`)
            .then((res) => {
                this.getData()
            })
            .catch((err) => {
                console.log("Error", err)
            })
    }

    onBtEdit = (id) => {
        let username = this.newUsername.value
        let password = this.newPassword.value
        let email = this.newEmail.value
        let role = 'user'
        Axios.patch(URL + `/dbUsers/${id}`, { username, password, email, role })
            .then((res) => {
                this.getData()
                this.setState({selectedID:null})
            })
            .catch((err) => {
                console.log("Error", err)
            })
    }

    printData = () => {
        return this.state.dbUsers.map((item, index) => {
            if (item.id === this.state.selectedID) {
                return (
                    <TableRow key={index}>
                        <TableCell component="th" scope="row">
                            {index + 1}
                        </TableCell>
                        <TableCell align="right"><TextField id="standard-basic" label={item.username} defaultValue={item.username} inputRef={(text) => this.newUsername = text} /></TableCell>
                        <TableCell align="right"><TextField id="standard-basic" label={item.password} defaultValue={item.password} inputRef={(text) => this.newPassword = text} /></TableCell>
                        <TableCell align="right"><TextField id="standard-basic" label={item.email} defaultValue={item.email} inputRef={(text) => this.newEmail = text} /></TableCell>
                        <TableCell align="right">
                            <Button variant="contained" color="secondary" onClick={() => this.setState({ selectedID: null })}>
                                No
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => this.onBtEdit(item.id)}>
                                Yes
                            </Button>
                        </TableCell>
                    </TableRow>
                )
            } else {
                return (
                    <TableRow key={index}>
                        <TableCell component="th" scope="row">
                            {index + 1}
                        </TableCell>
                        <TableCell align="right">{item.username}</TableCell>
                        <TableCell align="right">{item.password}</TableCell>
                        <TableCell align="right">{item.email}</TableCell>
                        <TableCell align="right">
                            <Button variant="contained" color="secondary" onClick={() => this.onBtDelete(item.id)}>
                                Delete
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => this.setState({ selectedID: item.id })}>
                                Edit
                            </Button>
                        </TableCell>
                    </TableRow>
                )
            }
        })
    }

    render() {
        console.log("first")
        return (
            <div>
                <h1>INI HOME</h1>
                <div style={{ width: '70vw', margin: 'auto' }}>
                    {/* AlertComponent : merupakan component yg di import dari file alert.js, karena alert hanya ingin dimuculkan sebagai notif pada table yg ada
                        di homepage maka di import di homepage.js  
                        Cara memberi data pada components react bisa melalui props jika component yg dibuat dengan functional component.
                        Props dibuat didalam <tag> componentnya.
                        Tipe data yg dikirim lewat props dapat berupa STRING,NUMBER,FUNGSI, atau COMPONENT
                        *Note : TERGANTUNG KEBUTUHAN
                        Examp : <Component_yg_di_import namaProps=data>props.children</Component_yg_di_import>
                        open = nama props yg dikirim ke AlertComponent berupa boolean
                        close = nama props yg dikirim ke AlertComponent berupa component

                        Semua data propsnya diambil dari data state kecuali props.close yg berupa component
                        contoh code dibawah ini 
                        ⬇
                        ⬇                        
                    */}
                    <AlertComponent info={this.state.infoAlert} message={this.state.messageAlert} open={this.state.openAlert}
                        close={<IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => this.setState({ openAlert: !this.state.openAlert })}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>}
                    />
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
                                    <TableCell></TableCell>
                                    <TableCell align="right"><TextField id="standard-basic" label="Username" inputRef={(text) => this.username = text} /></TableCell>
                                    <TableCell align="right"><TextField id="standard-basic" label="Password" inputRef={(text) => this.password = text} /></TableCell>
                                    <TableCell align="right"><TextField id="standard-basic" label="Email" inputRef={(text) => this.email = text} /></TableCell>
                                    <TableCell align="right">
                                        <Button color="primary" onClick={this.onBtAdd}>
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