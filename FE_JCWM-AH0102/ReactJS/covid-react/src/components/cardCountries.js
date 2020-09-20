import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    return (
        <div className="col-4 col-sm-4">
            <Link to={`/countries-detail/${props.data.name}/${props.data.iso3}`}>
                <div class="card-header ">
                    {props.data.name}
                </div>
            </Link>
        </div>
    )
}
