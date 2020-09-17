import React from 'react';

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listGambar: [
                {
                    image: "https://images.unsplash.com/photo-1599944200857-d610a6aa21ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
                    alt: "slide1"
                },
                {
                    image: "https://images.unsplash.com/photo-1595278712101-fee14738bf52?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                    alt: "slide2"
                },
                {
                    image: "https://images.unsplash.com/photo-1582555869391-cb552edd4274?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
                    alt: "slide3"
                }
            ]
        }
    }

renderCarousel = () => {
    return this.state.listGambar.map((item, index) => {
        if (index == 0) {
            return (
                <div className="carousel-item active" key={index}>
                    <img src={item.image} className="d-block w-100" alt={item.alt} />
                </div>
            )
        }
        return (
            <div className="carousel-item" key={index}>
                <img src={item.image} className="d-block w-100" alt={item.alt} />
            </div>
        )
    })
}

render() {
    return (
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                {this.renderCarousel()}
            </div>
        </div>
    );
}
}

export default Carousel;