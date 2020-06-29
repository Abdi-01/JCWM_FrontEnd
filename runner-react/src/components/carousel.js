import React from 'react';
import Slider from "react-slick"

export default (props) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        cssEase: "linear"
    };
    console.log("carousle", props.dataSlider)
    // console.log(props.dataSlider)
    return (
        <Slider {...settings}>
            {
                props.dataSlider !== null ?
                    props.dataSlider.map((item, index) => {
                        return (
                            <div>
                                <h5 style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    width: '100%',
                                    color: 'white',
                                    margin: 0,
                                    // opacity:0.5,
                                    background: "rgba(64,65,70,0.4)",
                                    background: "linear-gradient(90deg, rgba(64,65,70,0.6867880941439075) 0%, rgba(3,118,171,1) 50%, rgba(64,65,70,0) 100%)"
                                }}>{item.title}</h5>
                                {item.video != null ? <iframe width="100%" height="500"
                                    src={item.video}>
                                </iframe> : <img src={item.images} alt={`slider${index}`} width="100%" height="100%" />
                                }
                            </div>
                        )
                    }) :
                    null
            }
        </Slider>
    )
}