import React from 'react';
import Axios from 'axios'
import CarouselComp from '../components/carousel'
import { connect } from 'react-redux'
import { getSlider } from '../redux/actions'

const URL = "http://localhost:2500"
class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideImage: []
        }
    }

    componentDidMount() {
        this.getSlider()
    }

    getSlider = () => {
        let d = false
        Axios.get(URL + "/slider")
            .then((res) => {
                console.log(res.data)
                this.setState({ slideImage: res.data })
                this.props.getSlider(res.data)
                d = true
            }).catch((err) => {
                console.log("Error BOS !", err)
            })
    }

    render() {
        console.log("MapToprops", this.props.slide)
        return (
            <div>
                <div style={{ display: 'flex', width: '100vw', overflow: 'hidden' }}>
                    <div style={{ width: '50%' }}>
                        <img src={require('../assets/images/logoB.png')} width="100%" style={{ marginTop: "20vh" }} />
                    </div>
                    <div style={{ width: '50%', height: '45%' }}>
                        <CarouselComp dataSlider={this.props.slide} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    console.log("MapToprops", state.sliderReducer)
    return {
        slide: state.sliderReducer
    }
}

export default connect(mapToProps, { getSlider })(Homepage);