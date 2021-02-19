import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, CardImg, CardText, CardTitle } from 'reactstrap';

export default ({ data }) => {
    console.log("data", data)
    return (
        <Card className="col-sm-4 my-1" >
            <Link to={`/product-detail?idproduct=${data.idproduct}`}>
                <CardImg top width="100%" src={data.images[0].image} alt="product img" />
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