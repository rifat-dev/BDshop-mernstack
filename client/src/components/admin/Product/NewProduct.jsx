import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Compress from "react-image-file-resizer";

import { useAlert } from 'react-alert'

import MetaData from '../../layouts/MetaData'
import ProductCategory from '../../../utils/ProductCategory'


import { newProductValidator } from '../../../utils/validator'
import { createAdminProducr, clearError } from '../../../store/actions/adminActions'
import { CLEAR_CREATE_STATE } from '../../../store/Types/adminType'


const NewProduct = ({ history }) => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('0.0')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState(0)
    const [seller, setSeller] = useState('')
    const [imagesPreview, setImagesPreview] = useState('')
    const [image, setImage] = useState('')
    const [errors, setError] = useState({})

    const alert = useAlert()
    const dispatch = useDispatch()
    const { isCreated, loading, error } = useSelector(state => state.dashboardTracker)


    const onChange = (e) => {
        const file = e.target.files[0];
        Compress.imageFileResizer(
            file, // the file from input
            480, // width
            480, // height
            "JPEG", // compress format WEBP, JPEG, PNG
            70, // quality
            0, // rotation
            (uri) => {
                setImagesPreview(uri)
                setImage(uri)
            },
            "base64" // blob or base64 default base64
        );

    }



    const submitHandler = (e) => {
        e.preventDefault()
        const product = {
            name, price, description, category, stock, seller, image
        }
        const { isValidate, error } = newProductValidator(product)

        if (isValidate) {
            let formData = new FormData()
            formData.append('name', name)
            formData.append('price', price)
            formData.append('description', description)
            formData.append('category', category)
            formData.append('stock', stock)
            formData.append('seller', seller)
            formData.append('image', image)

            dispatch(createAdminProducr(formData))


        } else {
            setError(error)
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (isCreated) {
            dispatch({ type: CLEAR_CREATE_STATE })
            history.push('/admin/products')
            alert.success(' Product Create Success')
        }
    }, [error, alert, dispatch, isCreated])



    return (
        <Fragment>
            <MetaData title="Create New Product - BDShop" />
            <div className="product_create row" >
                <div className="product_create_body col-12 col-md-6 col-lg-8 offset-md-2 ">
                    <div className="wrapper mb-5">
                        <form className="shadow-lg p-5 "
                            onSubmit={submitHandler}
                            encType='multipart/form-data' >
                            <h1 className="mb-4 text-center">Create New Product</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className={errors.name ? 'form-control is-invalid' : 'form-control'}
                                    value={name}
                                    placeholder="Enter Product Name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && <div className="invalid-feedback">
                                    {errors.name}
                                </div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Price</label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className={errors.price ? 'form-control is-invalid' : 'form-control'}

                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                {errors.price && <div className="invalid-feedback">
                                    {errors.price}
                                </div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea
                                    className={errors.description ? 'form-control is-invalid' : 'form-control'}
                                    id="description_field" rows="8"
                                    placeholder="Write a short description about product"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                                {errors.description && <div className="invalid-feedback">
                                    {errors.description}
                                </div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select
                                    className={errors.category ? 'form-control is-invalid' : 'form-control'}
                                    id="category_field"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="Select A Category">Select A Category</option>
                                    {ProductCategory.map(category => (
                                        <option key={category} value={category} >{category}</option>
                                    ))}

                                </select>
                                {errors.category && <div className="invalid-feedback">
                                    {errors.category}
                                </div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className={errors.stock ? 'form-control is-invalid' : 'form-control'}
                                    value={stock}
                                    onChange={(e) => setStock(Number(e.target.value))}
                                />
                                {errors.stock && <div className="invalid-feedback">
                                    {errors.stock}
                                </div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="seller_field">Seller Name</label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className={errors.seller ? 'form-control is-invalid' : 'form-control'}
                                    placeholder='Enter name of product seller'
                                    value={seller}
                                    onChange={(e) => setSeller(e.target.value)}
                                />
                                {errors.seller && <div className="invalid-feedback">
                                    {errors.seller}
                                </div>}
                            </div>

                            <div className='form-group'>
                                <label>Images</label>

                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='product_images'
                                        className={errors.image ? 'custom-file-input is-invalid' : 'custom-file-input'}
                                        id='customFile'
                                        onChange={onChange}
                                        multiple
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Images
                                    </label>
                                </div>
                                {errors.image && <div className="invalid-feedback my-4">
                                    {errors.image}
                                </div>}

                                {imagesPreview &&
                                    <img src={imagesPreview} alt="Images Preview" className="mt-3 mr-2" width="70" height="70" />
                                }
                            </div>


                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                            // disabled={loading ? true : false}
                            >
                                CREATE
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default NewProduct;
