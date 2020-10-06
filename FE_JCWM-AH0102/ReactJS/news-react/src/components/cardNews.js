import React from 'react';
import { Link } from 'react-router-dom';

class CardNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        console.log(this.props.berita)
        return (
            <div className="row my-3">
                <div className="col-12 col-md-6">
                    <div className="card my-2" >
                        <div className="row">
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h4 className="card-title font-weight-bold" >{this.props.kategori}</h4>
                                    {
                                        this.props.berita[0] ?
                                            <div>
                                                <h6 className="card-title" style={{ height: "11vh" }}>{this.props.berita[0].title}</h6>
                                                <p className="card-text"><small className="text-muted">September 2021</small></p>
                                                <p className="card-text">{this.props.berita[0].description}</p>
                                            </div>
                                            :
                                            null
                                    }
                                    <Link to={{ pathname: '/newsDetail', state: { dataBerita: this.props.berita[0] } }}>Baca Selanjutnya</Link>
                                </div>
                            </div>
                            <div className="col-md-4 d-none d-md-block">
                                <img src={this.props.berita[0] ? this.props.berita[0].urlToImage : null} height="100%" alt="newsImage" className="card-img" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="card my-2">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h4 className="card-title font-weight-bold">{this.props.kategori}</h4>
                                    {
                                        this.props.berita[1] ?
                                            <div>
                                                <h6 className="card-title" style={{ height: "11vh" }}>{this.props.berita[1].title}</h6>
                                                <p className="card-text"><small className="text-muted">September 2021</small></p>
                                                <p className="card-text">{this.props.berita[1].description}</p>
                                            </div>
                                            :
                                            null
                                    }
                                    <Link to={{ pathname: '/newsDetail', state: { dataBerita: this.props.berita[1] } }}>Baca Selanjutnya</Link>
                                </div>
                            </div>
                            <div className="col-md-4 d-none d-md-block">
                                <img src={this.props.berita[1] ? this.props.berita[1].urlToImage : null} height="100%" alt="newsImage" className="card-img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardNews;