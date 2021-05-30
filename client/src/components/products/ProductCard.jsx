import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import ProductRating from './ProductRating'

const ProductCard = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded '>
            <Link to={`/product/${product._id}`}>
                <Card.Img
                    style={{ height: '200px', objectFit: 'contain' }}
                    src={product.images[0].url}
                    variant='top' />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <ProductRating
                        value={product.ratings}
                        text={`${product.numOfReviews} reviews`}
                    />
                </Card.Text>

                <Card.Text as='h3'>${product.price}</Card.Text>
                <Link to={`/product/${product._id}`} >
                    <Card.Text as='button' className="btn btn-primary btn-block" style={{ color: 'white' }} >View Detailes</Card.Text>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default ProductCard