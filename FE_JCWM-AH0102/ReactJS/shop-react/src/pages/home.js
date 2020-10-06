import React from 'react';
import Axios from 'axios';
import { Button, Jumbotron } from 'reactstrap';
import { API_URL } from '../support/url'
import CarouselComp from '../components/carousel';
import { connect } from 'react-redux'
import { getSlide } from '../redux/actions'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbCarousel: []
        }
    }

    componentDidMount() {
        this.getCarousel()
    }

    getCarousel = () => {
        Axios.get(API_URL + '/carousel')
            .then((res) => {
                console.log("success carousel :", res.data)
                this.props.getSlide(res.data)
            })
            .catch((err) => {
                console.log("err carousel :", err)
            })
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">Welcome to</h1>
                    <hr className="my-2" />
                    <p>This is The New World of Sport</p>
                    <p className="lead">
                        <Button color="primary">Shop Now</Button>
                    </p>
                </Jumbotron>
                <CarouselComp carousel={this.props.slide} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        slide: state.slideReducer.slide
    }
}

export default connect(mapStateToProps, { getSlide })(HomePage);