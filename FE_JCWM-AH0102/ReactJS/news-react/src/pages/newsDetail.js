import React from 'react';
import moment from 'moment'

const NewsDetail = ({ location }) => {
    console.log("Cek detail props :", location)
    let { dataBerita } = location.state
    return (
        <div>
            <img src={dataBerita.urlToImage} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
            <h1>{dataBerita.title}</h1>
            <p className="text-muted">{moment(dataBerita.publishedAt).format('DD MMMM YYYY h:mm:ss a')} </p>
            <p class="blockquote-footer">Author : {dataBerita.author} <cite title="Source Title">Source : {dataBerita.source.name}</cite></p>
            <p>
                {dataBerita.description}
            </p>
            <p>
                {dataBerita.content}
            </p>
        </div>
    )
}

export default NewsDetail