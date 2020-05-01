import React from 'react';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import './About.css';

const about = () => {
    return (

        <Carousel className="About">
            <Carousel.Item>
                <Image
                    src="http://prod-upp-image-read.ft.com/dd0f9378-b8a1-11e7-bff8-f9946607a6ba"
                    alt="First slide"
                    fluid rounded width={1200}
                    height={900}
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    // className="d-blockw-50 h-50"
                    src="http://prod-upp-image-read.ft.com/dd0f9378-b8a1-11e7-bff8-f9946607a6ba"
                    alt="Third slide"
                    fluid rounded width={1200} height={900}
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    // className="d-block w-50 h-50"
                    src="http://prod-upp-image-read.ft.com/dd0f9378-b8a1-11e7-bff8-f9946607a6ba"
                    alt="Third slide"
                    fluid rounded width={1200} height={900}
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>

    )
};

export default about;