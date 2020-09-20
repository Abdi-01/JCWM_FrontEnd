import React from 'react';

class CarouselComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [
                "https://storage.googleapis.com/pkg-portal-bucket/images/news/2020-03/himbauan-terkait-covid-19/_1200x630_crop_center-center_82_none/pg_notice-covid-19.png",
                "https://www.tsm.ac.id/wp-content/uploads/2020/03/Covid-19.jpg",
                "https://www.biem.co/wp-content/uploads/2020/04/sosial-distancing.jpg"
            ]
        }
    }

    renderCarousel = () => {
        return this.state.info.map((item, index) => {
            if (index === 0) {
                return (
                    <div key={index} className="carousel-item active" style={{height:"50%"}}>
                        <img className="d-block w-100"  src={item} alt={`Slide${index + 1}`} />
                    </div>
                )
            }
            return (
                <div key={index} className="carousel-item" >
                    <img className="d-block w-100" style={{height:386}} src={item} alt={`Slide${index + 1}`} />
                </div>
            )
        })
    }

    render() {
        return (
            <div id="carouselInfo" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner" >
                    {this.renderCarousel()}
                </div>
                <a className="carousel-control-prev" href="#carouselInfo" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselInfo" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
}

export default CarouselComp;