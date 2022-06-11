import ProductCardOne from "../ProductsCard/ProductCardOne";
import ProductCardTow from "../ProductsCard/ProductCardTow";

const Products = ({ products }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <ProductCardTow />
        </div>
      </div>
    </div>
  );
};

export default Products;
