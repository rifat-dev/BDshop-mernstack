import React from "react";
import ProductCardTow from "../ProductsCard/ProductCardTow";

const FeaturedProducts = ({ name, _id, products }) => {
  return (
    <>
      {products.length !== 0 && (
        <div className="featured-product-container my-5">
          <h2 className="featured-category-name">{name}</h2>
          <div className="row">
            {products.map((product, i) => (
              <div className="col-md-4" key={i}>
                <ProductCardTow product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedProducts;
