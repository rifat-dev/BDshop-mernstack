import validetor from 'validator'

export const newProductValidator = (product) => {
    const error = {}
    if (!product.name) {
        error.name = "Product name cannot empty"
    }
    if (!product.price) {
        error.price = "Price cannot empty"
    } else {
        if (!validetor.isInt(product.price)) {
            error.price = "Price must be a number"
        }
    }

    if (!product.description) {
        error.description = "Description cannot empty"
    }
    if (!product.category) {
        error.category = "Select a category"
    }
    if (!product.seller) {
        error.seller = "Seller cannot empty"
    }

    if (!product.stock) {
        error.stock = "Stock cannot be empty"
    } else {
        if (typeof product.stock !== 'number') {
            error.stock = "Stock must be a number"
        }
    }

    if (!product.image) {
        error.image = "Product image required"
    }

    const isValidate = Object.keys(error).length === 0


    return { isValidate, error }
}