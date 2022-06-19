import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import axios from "axios";

import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import HeroSlider from "./Home/hero-slider/HeroSlider";
import MetaData from "../components/layouts/MetaData";
import { getAllProducts, clearError } from "../store/actions/productActions";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { products, error } = useSelector((state) => state.products);

  useEffect(() => {
    const getAllFeaturedProducts = async () => {
      const { data } = await axios.get("/api/products/featuredProducts");

      setFeaturedProducts(data.results);
    };
    getAllFeaturedProducts();
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getAllProducts());
  }, [error, dispatch, alert]);

  return (
    <Fragment>
      <MetaData title={"Home-BDShop"} />
      <HeroSlider />
      <div className="container">
        {featuredProducts.map((res, key) => (
          <FeaturedProducts
            name={res.name}
            _id={res._id}
            products={res.products}
          />
        ))}
      </div>

      {/* <Products products={products[0]} /> */}
    </Fragment>
  );
};

export default Home;
