import React from 'react';
import Axios from 'axios'
import CarouselComp from '../components/carousel'

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
        Axios.get(URL + "/slider")
            .then((res) => {
                console.log(res.data)
                this.setState({ slideImage: res.data })
            }).catch((err) => {
                console.log("Error BOS !", err)
            })
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', width: '100vw',overflow:'hidden' }}>
                    <div style={{ width: '50%' }}>
                        <img src={require('../assets/images/logoB.png')} width="100%" style={{marginTop:"20vh"}}/>
                    </div>
                    <div style={{ width: '50%',height:'45%' }}>

                        <CarouselComp dataSlider={this.state.slideImage} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;