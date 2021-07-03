import validetor from 'validator'


export const loginValidator = (email, password) => {
    const error = {}

    if (!email) {
        error.email = 'Email cannot be empty'
    } else if (!validetor.isEmail(email)) {
        error.email = 'Please provide a valide email'
    }

    if (!password) {
        error.password = "Password cannot be empty"
    }

    const isValidate = Object.keys(error).length === 0
    return { isValidate, error }
}

export const registationValidator = (email, password, name) => {
    const error = {}

    if (!email) {
        error.email = 'Email cannot be empty'
    }
    // else if (validetor.isEmail(email)) {
    //     error.email = 'Please provide a valide email'
    // }

    if (!name) {
        error.name = "Please give your name"
    }

    if (!password) {
        error.password = "Password cannot be empty"
    } else if (password.length < 8) {
        error.password = "Password length must be grater than 8"
    }

    const isValidate = Object.keys(error).length === 0
    return { isValidate, error }
}

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