import "./shop.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Slider from "@mui/material/Slider";
import axios from "axios";

import CartLoader from "../../components/layouts/Loader/CartLoader";
import MetaData from "../../components/layouts/MetaData";
import NotFound from "../../components/layouts/404";
import ProductCardTow from "../../components/ProductsCard/ProductCardTow";
import { getAllProducts, clearError } from "../../store/actions/productActions";

const Shop = () => {
  const [shopProducts, setShopProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { products, totalPage, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getAllProducts("", currentPage, searchTerm));
    const getAllCategorys = async () => {
      let { data } = await axios.get("/api/category/all");
      setCategorys(data.categorys);
    };
    getAllCategorys();
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch, alert]);

  useEffect(() => {
    setShopProducts(products);
  }, [products]);

  const onSearchedProducts = () => {
    // dispatch(getAllProducts("", 1, searchTerm));
  };

  const pagination = () => {
    let rows = [];
    for (let i = 0; i < totalPage; i++) {
      rows.push(
        <li className="page-item" onClick={() => setCurrentPage(i + 1)}>
          <a className="page-link" href="#">
            {i + 1}
          </a>
        </li>
      );
    }
    return rows;
  };

  return (
    <div className="shop">
      {loading ? (
        <CartLoader />
      ) : (
        <>
          <MetaData title={"Shop page- BDshop"} />

          <div className="shop_body container-fluid mb-5">
            <div className="row">
              <div className="col-md-3">
                <div className="shop-search">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search product"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <SearchIcon onClick={() => onSearchedProducts()} />
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
                {totalPage > 0 && (
                  <nav aria-label="Page navigation example mt-5 ">
                    <ul className="pagination justify-content-center ">
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                          <span className="sr-only">Previous</span>
                        </a>
                      </li>
                      {pagination()}
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                          <span className="sr-only">Next</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;
