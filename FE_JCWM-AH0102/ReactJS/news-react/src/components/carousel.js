import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    console.log(props)
    let { headline } = props
    return (
        <div className="jumbotron shadow p-3 p-md-5 rounded bg-transparent text-white" style={{ backgroundImage: `url(${headline.urlToImage})`, backgroundRepeat: "no-repeat", backgroundSize: 'cover', height: '40vh' }}>
            <div className="p-3" style={{ backgroundColor: 'rgba(128,128,128,0.9' }}>
                <h2 className="font-italic font-weight-bold">{headline.title}</h2>
                <p className="lead my-3">
                    {headline.description}
                </p>
                <Link to={{ pathname: '/newsDetail', state: { dataBerita: headline } }}
                className="text-white font-weight-bold"
                >Baca Selanjutnya</Link>
            </div>
        </div>
    )
}