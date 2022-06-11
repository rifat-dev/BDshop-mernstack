import "./product.scss";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Compress from "react-image-file-resizer";
import { useAlert } from "react-alert";
import { convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

import axios from "axios";

import MetaData from "../../components/layouts/MetaData";
import ProductCategory from "../../utils/ProductCategory";

import { newProductValidator } from "../../utils/validator";
import {
  createAdminProduct,
  clearError,
} from "../../store/actions/adminActions";
import { CLEAR_CREATE_STATE } from "../../store/Types/adminType";

const NewProduct = ({ history }) => {
  const [categoryList, setCategoryList] = useState([]);

  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");

  const [costPrice, setCostPrice] = useState("0.0");
  const [regularPrice, setRegularPrice] = useState("0.0");
  const [price, setPrice] = useState("0.0");
  const [discount, setDiscount] = useState({
    active: false,
    persent: 0,
    startDate: "",
    endDate: "",
  });
  const [stock, setStock] = useState(0);

  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [images, setImages] = useState([]);

  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");

  const [imagesPreview, setImagesPreview] = useState([]);
  const [errors, setError] = useState({});

  const alert = useAlert();
  const dispatch = useDispatch();
  const { isCreated, error } = useSelector((state) => state.dashboardTracker);

  // get all categorys
  useEffect(() => {
    const getAllCategory = async () => {
      const { data } = await axios.get("/api/category/all");

      setCategoryList(data.categorys);
    };
    getAllCategory();
  }, []);

  const onImageChange = (e) => {
    const files = [...e.target.files];
    console.log(files);
    files.map((file) => {
      Compress.imageFileResizer(
        file, // the file from input
        480, // width
        480, // height
        "JPEG", // compress format WEBP, JPEG, PNG
        70, // quality
        0, // rotation
        (uri) => {
          setImagesPreview((prev) => [...prev, uri]);
          setImages((prev) => [...prev, uri]);
        },
        "base64" // blob or base64 default base64
      );
    });
  };

  const submitHandler = () => {
    const data = {
      name,
      summary,
      description,
      additionalInformation,
      costPrice,
      regularPrice,
      price,
      discount,
      stock,
      isFeatured,
      isActive,
      images: JSON.stringify(images),
      category,
      filter,
    };

    // console.log(data);
    dispatch(createAdminProduct(data));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isCreated) {
      dispatch({ type: CLEAR_CREATE_STATE });
      history.push("/admin/products");
      alert.success(" Product Create Success");
    }
  }, [error, alert, dispatch, isCreated, history]);

  const onDescriptionChange = (editorState) => {
    setDescription(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const onAdditionalInfoChange = (editorState) => {
    setAdditionalInformation(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  const onDiscountChange = (e) => {
    if (e.target.name === "active") {
      setDiscount((prev) => ({
        ...prev,
        [e.target.name]: e.target.checked,
      }));
    } else {
      setDiscount((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  return (
    <Fragment>
      <MetaData title="Create New Product - BDShop" />
      <div className="new-product">
        <div className="top">
          <h1>Add Product</h1>
          <button className="save-button" onClick={submitHandler}>
            Save
          </button>
        </div>
        <div className="row">
          <div className="col-12 col-md-6  col-lg-8 card-left">
            {/*  Basic information section  */}
            <div className="card card-body basic-info">
              <h3 className="card-title">Basic information</h3>

              {/* product name  */}
              <div className="my-3 from-group">
                <label htmlFor="name" className="form-label">
                  Enter Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="Enter Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* short Description */}
              <div className="my-3 from-group">
                <label htmlFor="summary" className="form-label">
                  Short description
                </label>
                <textarea
                  className="form-control"
                  name="summary"
                  id="summary"
                  placeholder="Write a short summary about product"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows="3"></textarea>
              </div>

              {/* Description */}

              <div className="my-3 from-group">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <Editor
                  // editorState={description}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  toolbarClassName="toolbar-className"
                  onEditorStateChange={onDescriptionChange}
                />
              </div>

              <p>Preview</p>
              <div className="p-2">
                <div
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              </div>

              <div className="my-3 from-group">
                <label htmlFor="additionalInformation" className="form-label">
                  Additional Information
                </label>
                <Editor
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  toolbarClassName="toolbar-className"
                  onEditorStateChange={onAdditionalInfoChange}
                />
              </div>
            </div>

            {/*  prices and descount section  */}
            <div className="card card-body product-price">
              <h3 className="card-title">Price</h3>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="costPrice" className="form-label">
                      Cost Price
                    </label>
                    <input
                      type="number"
                      name="costPrice"
                      id="costPrice"
                      className="form-control"
                      placeholder="Product Cost Price"
                      value={costPrice}
                      onChange={(e) => setCostPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="regularPrice" className="form-label">
                      Regular Price
                    </label>
                    <input
                      type="number"
                      name="regularPrice"
                      id="regularPrice"
                      className="form-control"
                      placeholder="Product Regular Price"
                      value={regularPrice}
                      onChange={(e) => setRegularPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="price" className="form-label">
                      Sales Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="form-control"
                      placeholder=" Product Sales Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/*  Discount descount section  */}
              <h3 className="card-title mt-5">Discount</h3>
              <div className="form-check form-switch pl-5">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="active"
                  value={discount.active}
                  id="flexSwitchCheckChecked"
                  onClick={onDiscountChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked">
                  Have Discount
                </label>
              </div>

              {discount.active && (
                <div className="row discount mt-4">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="startDate" className="form-label">
                        Discount Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        className="form-control"
                        onChange={onDiscountChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="endDate" className="form-label">
                        Discount End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        id="endDate"
                        className="form-control"
                        onChange={onDiscountChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="persent" className="form-label">
                        Discount Persent
                      </label>
                      <input
                        type="number"
                        name="persent"
                        id="persent"
                        className="form-control"
                        value={discount.persent}
                        onChange={onDiscountChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/*  stock  section  */}
              <div className="form-group mt-5">
                <label htmlFor="stock" className="form-label">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  className="form-control"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </div>
            {/*  images section  */}
            <div className="card card-body product-images">
              <h3 className="card-title">Product Images</h3>
              <div className="mb-3 form-group">
                <input
                  type="file"
                  className="form-control"
                  name="images"
                  id="images"
                  multiple
                  onChange={onImageChange}
                />
              </div>
              <div className="d-flex mt-4">
                {imagesPreview &&
                  imagesPreview.map((image, index) => (
                    <div className="col-md-4">
                      <img
                        style={{ width: "100%" }}
                        src={image}
                        alt="Product Image"
                      />
                    </div>
                  ))}
              </div>
              {imagesPreview.length > 0 && (
                <button
                  className="mt-4"
                  onClick={() => {
                    setImages([]);
                    setImagesPreview([]);
                  }}>
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 card-right">
            {/*  isFeatured and isActive section  */}
            <div className="card card-body">
              <div className=" featured-product d-flex justify-content-between align-items-center">
                <p className=" mb-0">Featured Product</p>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    onClick={(e) => setIsFeatured(e.target.checked)}
                  />
                </div>
              </div>

              <div className="active-product d-flex justify-content-between align-items-center mt-4">
                <p className=" mb-0">Active Product</p>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    onClick={(e) => setIsActive(e.target.checked)}
                    checked={isActive}
                  />
                </div>
              </div>
            </div>
            {/*  category section  */}
            <div className="card card-body product-category">
              <h3 className="card-title">Product Category</h3>
              <select
                className="form-select my-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                <option selected value="">
                  Open this select menu
                </option>
                {categoryList.map((ctg, i) => (
                  <option
                    key={i}
                    value={ctg._id}
                    onChange={() => setCategory(ctg._id)}>
                    {ctg.name}
                  </option>
                ))}
              </select>
            </div>

            {/*  filter section  */}
            <div className="card card-body product-filter">
              <h3 className="card-title">Product Filter</h3>
              <select
                className="form-select my-2"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}>
                <option selected value="">
                  Open this select menu
                </option>
                <option value="New">New</option>
                <option value="Hot">Hot</option>
                <option value="Best saller">Best saller</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
