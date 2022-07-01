import "./shop.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Slider from "@mui/material/Slider";

import axios from "axios";

import Loader from "../../components/layouts/Loader/Loader";
import MetaData from "../../components/layouts/MetaData";
import NotFound from "../../components/layouts/404";
import Category from "../../utils/ProductCategory";
import { getAllProducts, clearError } from "../../store/actions/productActions";

import "./Shop.css";
import ProductCardTow from "../../components/ProductsCard/ProductCardTow";
const Shop = () => {
  const [shopProducts, setShopProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
    const getAllCategorys = async () => {
      let { data } = await axios.get("/api/category/all");
      setCategorys(data.categorys);
    };
    getAllCategorys();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch, alert]);

  useEffect(() => {
    setShopProducts(products);
  }, [products]);

  return (
    <div className="shop">
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Shop page- BDshop"} />

          {/* <div className="search_filter container-fluid my-5">
            <div className=" col-md-3">
              <select className="select_shop">
                <option value="All">All</option>
              </select>
            </div>
            <div className="col-md-3 ">
              <input
                className="search_shop"
                type="text"
                placeholder="search by name , category"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div> */}

          <div className="shop_body container-fluid mb-5">
            <div className="row">
              <div className="col-md-3">
                <div className="shop-search">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search product"
                  />
                  <SearchIcon />
                </div>

                <div className="shop-category">
                  <h5>Product Categories</h5>
                  <hr />
                  {categorys && (
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="All"
                      name="radio-buttons-group">
                      <FormControlLabel
                        value="All"
                        control={<Radio />}
                        label="All"
                      />
                      {categorys.map((category, key) => (
                        <FormControlLabel
                          value={category.name}
                          control={<Radio />}
                          label={category.name}
                          key={key}
                        />
                      ))}
                    </RadioGroup>
                  )}
                </div>
                <hr />
                <div className="price-range">
                  <h5>Price</h5>
                  <Slider
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    min={100}
                    step={1000}
                    max={300000}
                    defaultValue={1000}
                  />
                </div>
                <hr />
                <button className="clear-filter">CLEAR FILTER</button>
              </div>
              <div className="row col-md-9 ">
                {shopProducts.length > 0 &&
                  shopProducts.map((product) => (
                    <div className="col-md-4 mb-4" key={product._id}>
                      <div className="card card-body">
                        <ProductCardTow product={product} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;
