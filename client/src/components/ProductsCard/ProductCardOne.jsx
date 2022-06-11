import "./productcardone.scss";

const ProductCardOne = ({ product }) => {
  console.log(product);
  return (
    <div>
      {product && (
        <div class="container">
          <h3 class="h3">shopping Demo-1 </h3>
          <div class="row">
            <div class="col-md-4 col-sm-6">
              <div class="product-grid8">
                <div class="product-image8">
                  <a href="#">
                    <img class="pic-1" src={product.images[0].url} />
                    <img class="pic-2" src={product.images[0].url} />
                  </a>
                  <ul class="social">
                    <li>
                      <a href="" class="fa fa-search"></a>
                    </li>
                    <li>
                      <a href="" class="fa fa-shopping-bag"></a>
                    </li>
                    <li>
                      <a href="" class="fa fa-shopping-cart"></a>
                    </li>
                  </ul>
                  <span class="product-discount-label">-20%</span>
                </div>
                <div class="product-content">
                  <div class="price">
                    £ 8.00
                    <span>£ 10.00</span>
                  </div>
                  <span class="product-shipping">Free Shipping</span>
                  <h3 class="title">
                    <a href="#">Women's Plain Top</a>
                  </h3>
                  <a class="all-deals" href="">
                    See all deals <i class="fa fa-angle-right icon"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCardOne;
