import React from 'react';
import './dashboard.css'


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbTodo: [
                { keg: 'Coba', det: 'coba' },{ keg: 'Coba', det: 'coba' }
            ]
        }
    }
    printToDO = () => {
        let { dbTodo } = this.state
        return dbTodo.map((item, index) => {
            return (
                <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{item.keg}</th>
                    <th>{item.det}</th>
                    <th><button type="button" onClick={() => this.delete(index)}>Delete</button></th>
                </tr>
            )
        })
    }

    delete = (index) => {
        let arr = this.state.dbTodo
        arr.splice(index, 1)
        this.setState({ dbTodo: arr })
    }

    add = () => {
        let keg = this.refs.kegiatan.value
        let det = this.refs.detail.value
        let arr = this.state.dbTodo
        arr.push({ keg, det })
        this.setState({ dbTodo: arr })
    }

    render() {
        return (
            <div className="container-dashboard">
                <h2>Your To Do List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Kegiatan</th>
                            <th>Detail</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printToDO()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>-</th>
                            <th><input type="text" placeholder="Add Kegiatan" ref="kegiatan" /></th>
                            <th><input type="text" placeholder="Add Detail" ref="detail" /></th>
                            <th><button type="button" onClick={this.add}>Add</button></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export default Dashboard;