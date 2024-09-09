import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
    margin: 0,
    height: '160px',
    width: '200px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
export const CarouselApp = (props) => {
    return (
        <Carousel
            autoplaySpeed={5000}
        >
            {props.images?.map((image, i) => <div className='carousel-img' key={i}>
                <img src={process.env.REACT_APP_API_URL + image} alt="" />

            </div>)}
        </Carousel>
    );
};