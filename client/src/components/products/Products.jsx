

import ProductCard from './ProductCard'

const Products = ({ products }) => {

    return (
        <div className="container">
            <h4 style={{ color: '#12151F', fontSize: '40px', marginTop: '20px' }} >Latest Products</h4>
            <div className="row" >
                {products.map((product => (
                    <div className="col-12 col-sm-6 col-md-4" key={product._id} >
                        <ProductCard product={product} />
                    </div>
                )))}
            </div>
        </div>

    );
}

export default Products;
