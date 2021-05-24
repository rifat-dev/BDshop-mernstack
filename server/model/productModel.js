const { model, Schema } = require('mongoose')

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please enter name'],
        trim: true,
        maxLength: [100, 'Product name cannot extcecd 100 char']
    },
    price: {
        type: Number,
        required: [true, 'please enter  price'],
        maxLength: [5, 'Product price cannot extcecd 5 length'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'please enter discreption'],
        trim: true,
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: true,
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                "Books",
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: 'Please select correct catagory for project'
        }
    },
    seller: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: {
            type: Schema.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        ratings: {
            type: Number,
            required: true
        },
        comments: {
            type: String,
            required: true
        }
    }],
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Product = model('Product', productSchema)

module.exports = Product;