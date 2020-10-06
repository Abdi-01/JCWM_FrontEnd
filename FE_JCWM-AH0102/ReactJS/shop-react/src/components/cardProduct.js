import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, CardImg, CardText, CardTitle } from 'reactstrap';

export default ({ data }) => {
    return (
        <Card className="col-sm-4 my-1" >
            <Link to={`/product-detail?id=${data.id}`}>
                <CardImg top width="100%" src={data.images[0]} alt="product img" />
                <CardBody>
                    <CardTitle>{data.name}</CardTitle>
                    <CardText>
                        Rp. {data.price.toLocaleString()}
                    </CardText>
                </CardBody>
            </Link>
        </Card>
    )
}