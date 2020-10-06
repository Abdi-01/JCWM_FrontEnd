import React, { useState } from 'react';
import { Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem } from 'reactstrap';

export default ({ carousel }) => {
    const [activeIndex, setActive] = useState(0)
    const [anim, setAnim] = useState(false)

    const next = () => {
        if (anim) return
        const nextIndex = activeIndex === carousel.length - 1 ? 0 : activeIndex + 1
        setActive(nextIndex)
    }

    const previous = () => {
        if (anim) return
        const prevIndex = activeIndex === 0 ? carousel.length - 1 : activeIndex - 1
        setActive(prevIndex)
    }

    const goToIndex = (index) => {
        if (anim) return
        setActive(index)
    }

    const slides = carousel.map((item, index) => {
        return (
            <CarouselItem
                onExiting={() => setAnim(true)}
                onExited={() => setAnim(false)}
                key={index}
            >
                <img src={item.image} alt={`slide-${index}`} width="100%" />
                <CarouselCaption captionHeader={item.title} />
            </CarouselItem>
        )
    })

    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
        >
            <CarouselIndicators items={carousel} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    )
}