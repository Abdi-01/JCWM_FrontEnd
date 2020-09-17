import React from 'react';

class Biodata extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listBiodata: [
                {
                    nama: "Abdi",
                    usia: 24,
                    alamat: "Kapuk Muara",
                    pekerjaan: "Job"
                }
            ],
            selectedIndex: null
        }
    }

    btSubmit = () => {
        let nama = this.refs.inNama.value
        let usia = this.refs.inUsia.value
        let alamat = this.refs.inAlamat.value
        let pekerjaan = this.refs.inPekerjaan.value
        this.state.listBiodata.push({ nama, usia, alamat, pekerjaan })
        console.log(this.state.listBiodata)
        this.setState({ listBiodata: this.state.listBiodata })
    }

    btDelete = (indx) => {
        this.state.listBiodata.splice(indx, 1)
        this.setState({ listBiodata: this.state.listBiodata })
    }

    btEdit = (indx) => {
        this.setState({ selectedIndex: indx })
    }

    btSave = () => {
        let { selectedIndex, listBiodata } = this.state
        let namaBaru = this.refs.editNama.value
        let usiaBaru = this.refs.editUsia.value
        let alamatBaru = this.refs.editAlamat.value
        let pekerjaanBaru = this.refs.editPekerjaan.value

        listBiodata[selectedIndex].nama = namaBaru
        listBiodata[selectedIndex].usia = usiaBaru
        listBiodata[selectedIndex].alamat = alamatBaru
        listBiodata[selectedIndex].pekerjaan = pekerjaanBaru
        this.setState({ selectedIndex: null, listBiodata })
    }

    printBiodata = () => {
        return this.state.listBiodata.map((item, index) => {
            if (this.state.selectedIndex === index) {
                return (
                    <tr key={index}>
                        <td>#</td>
                        <td><input className="form-control" type="text" placeholder="Nama Baru" ref="editNama" defaultValue={item.nama} /></td>
                        <td><input className="form-control" type="text" placeholder="Usia Baru" ref="editUsia" defaultValue={item.usia} /></td>
                        <td><input className="form-control" type="text" placeholder="Alamat Baru" ref="editAlamat" defaultValue={item.alamat} /></td>
                        <td><input className="form-control" type="text" placeholder="Pekerjaan Baru" ref="editPekerjaan" defaultValue={item.pekerjaan} /></td>
                        <td><button className="btn btn-success" onClick={this.btSave}>Save</button><button className="btn btn-warning" onClick={() => this.setState({ selectedIndex: null })}>Cancel</button></td>
                    </tr>
                )
            } else {
                return (
                    <tr key={index}>
                        <th>{index + 1}</th>
                        <th>{item.nama}</th>
                        <th>{item.usia}</th>
                        <th>{item.alamat}</th>
                        <th>{item.pekerjaan}</th>
                        <th><button className="btn btn-danger" onClick={() => this.btDelete(index)}>Hapus</button>
                            <button className="btn btn-warning" onClick={() => this.btEdit(index)}>Edit</button></th>
                    </tr>
                )
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Form Biodata</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th><input className="form-control" type="text" placeholder="Nama" ref="inNama" /></th>
                            <th><input className="form-control" type="text" placeholder="Usia" ref="inUsia" /></th>
                            <th><input className="form-control" type="text" placeholder="Alamat" ref="inAlamat" /></th>
                            <th><input className="form-control" type="text" placeholder="Pekerjaan" ref="inPekerjaan" /></th>
                            <th><button className="btn btn-primary" onClick={this.btSubmit}>Submit</button></th>
                        </tr>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Usia</th>
                            <th>Alamat</th>
                            <th>Pekerjaan</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printBiodata()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Biodata;