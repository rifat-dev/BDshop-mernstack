import React from "react";
import { Carousel } from "react-bootstrap";
import "./heroslider.scss";
import img from "../../../assets/images/Apple-Watch-with-macbook-.png";
import img2 from "../../../assets/images/asus-rog.png";

const data = [
  {
    id: 1,
    title: "Wonders Tech",
    subtitle: "Best Smart Gadget Shop",
    image: img,
    url: "/shop-grid-standard",
  },
  {
    id: 2,
    title: "Wonders Tech SmartShop",
    subtitle: "Expore Modern Gadget ",
    image: img2,
    url: "/shop-grid-standard",
  },
];

const HeroSlider = () => {
  return (
    <div className="hero-slider-warpper">
      <Carousel
        indicators={false}
        controls={false}
        pause={false}
        interval={4000}>
        {data.map((item, key) => (
          <Carousel.Item key={key}>
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-6 hero-slider-info">
                  <h3 className="animate__animated ">{item.title}</h3>
                  <h1 className="animate__animated ">{item.subtitle}</h1>
                  <button className="animate__animated ">Shop Now</button>
                </div>
                <div className="col-12 col-md-6 col-lg-6 hero-slider-img animate__animated ">
                  <img src={item.image} alt="First slide" />
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSlider;
