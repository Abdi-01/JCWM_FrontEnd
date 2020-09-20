import React from 'react';
import IndoInfo from '../components/cardInfoIna';
import WorldInfo from '../components/cardInfoWorld';
import CarouselComp from '../components/carousel';
import Jumbo from '../components/jumbotron';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <CarouselComp/>
                    </div>
                    <div className="col-12 col-md-6">
                        <Jumbo/>
                    </div>
                </div>
                <WorldInfo/>
                <IndoInfo/>
            </div>
         );
    }
}
 
export default Home;