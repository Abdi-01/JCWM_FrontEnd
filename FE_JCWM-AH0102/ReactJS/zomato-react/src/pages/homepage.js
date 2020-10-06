import React from 'react';
import { Container, Typography } from '@material-ui/core';
import Jumbotron from '../components/jumbotron';
import Axios from 'axios';
import CardRestaurant from '../components/cardRestaurant';

const API_URL = "https://developers.zomato.com/api/v2.1"
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbRestaurant: []
        }
    }

    componentDidMount() {
        this.getRestaurant()
    }

    getRestaurant = () => {
        Axios.get(API_URL + "/search?start=61&count=20&sort=rating", {
            headers: {
                'user-key': 'e64ee227f3b748374e8bcc69d9ad499e'
            }
        })
            .then((res) => {
                console.log("Get Restaurant :", res.data)
                this.setState({ dbRestaurant: res.data.restaurants })
            }).catch((err) => {
                console.log("Error Get Restaurant :", err)
            })
    }

    renderCard = () => {
        return this.state.dbRestaurant.map((item, index) => {
            return (
                <CardRestaurant data={item.restaurant}/>
            )
        })
    }
    // nama restaurant, alamat, jam buka
    render() {
        console.log(this.state.dbRestaurant)
        return (
            <Container>
                <Jumbotron />
                <Typography variant="h5" align="center" style={{ margin: '1vh 0' }}>
                    Restaurant List
                </Typography>
                <div style={{display:'flex', flexWrap:'wrap'}}>
                    {this.renderCard()}
                </div>
            </Container>
        );
    }
}

export default HomePage;