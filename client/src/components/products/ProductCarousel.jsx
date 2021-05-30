import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'

const ProductCarousel = () => {
    const images = ['/images/banner1.jpg', '/images/slide-1.webp', '/images/slide-2.webp', '/images/slide-3.webp']
    return (
        <Carousel pause='hover' className='bg-dark'>
            {images.map((image) => (
                <Carousel.Item key={image} >
                    <Image style={{ width: '100%' }} src={image} alt="banner" fluid />
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel