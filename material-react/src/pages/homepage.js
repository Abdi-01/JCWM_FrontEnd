import React, { Component } from 'react';
import Axios from 'axios'
import TableComponent from '../components/table'

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
            🔹 Susunan URL terdiri dari==> http://domainnyaAPA:portnyaBERAPA/parameternyaAPA?queryAPA
                🔸 contoh domain : localhost(untuk local), api.zomato.com(jika domain online), 58.163.177.23(atau domain yg berupa IP)
                🔸 contoh port : 2020, 8081, 2324 =>>bebas umumnya terdiri dari 4 angka 
                🔸 Parameter :  biasanya merujuk lokasi file atau path="/"

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
            })
            .catch((err) => {

            })
    }

    render() {
        console.log("first")
        return (
            <div>
                <h1>INI HOME</h1>
                <TableComponent />
                {/* Memanggil javascript syntax didalam return(<element/>) harus menggunakan {bracket}, tapi hanya berlaku untuk one line syntax */}
            </div>
        );
    }
}

export default Home;