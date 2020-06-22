import React, { Component } from 'react';


/*penuliasan class components biasanya digunakan untuk membuat page yang memang membutuhkan penyimpanan data
  state.
*/
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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
    getDat = () => {

    }


    render() {
        console.log("first")
        return (
            <div>
                <h1>INI HOME</h1>
                {/* Memanggil javascript syntax didalam return(<element/>) harus menggunakan {bracket}, tapi hanya berlaku untuk one line syntax */}
            </div>
        );
    }
}

export default Home;