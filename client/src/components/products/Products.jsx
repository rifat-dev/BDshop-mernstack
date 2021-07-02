import { useState } from 'react'

import ProductCard from './ProductCard'

const Products = ({ products }) => {
    const [showItem, setShowItem] = useState(6)

    const handleButton = () => {
        if (showItem < products.length) {
            setShowItem(showItem + 3)
        } else {
            return;
        }
    }

    return (
        <div className="container">
            <h4 style={{ color: '#12151F', fontSize: '40px', marginTop: '20px' }} >Latest Products</h4>
            <div className="row" >
                {products.slice(0, showItem).map((p => (
                    <div className="col-12 col-sm-6 col-md-4" key={p._id} >
                        <ProductCard product={p} />
                    </div>
                )))}
            </div>
            <div className="load_more_section text-center my-3">
                {showItem < products.length &&
                    <button
                        className="my_btn"
                        onClick={handleButton}
                    >
                        Lode more..
                    </button>}
            </div>
        </div>

    );
}

export default Products;
