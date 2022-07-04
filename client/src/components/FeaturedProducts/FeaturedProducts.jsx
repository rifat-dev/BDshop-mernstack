import "./featuredproducts.scss";
import ProductCardTow from "../ProductsCard/ProductCardTow";
import Slider from "react-slick";

const FeaturedProducts = ({ name, _id, products }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {products.length !== 0 && (
        <div className="featured-product-container my-5">
          <h2 className="featured-category-name" style={{ fontWeight: 600 }}>
            {name}
          </h2>
          <Slider {...settings}>
            {products.map((product, i) => (
              <div className="col-md-4 card card-body" key={i}>
                <ProductCardTow product={product} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default FeaturedProducts;
