import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import Loader from "../../components/layouts/Loader/Loader";
import MetaData from "../../components/layouts/MetaData";

import {
  getAdminUsers,
  getAdminProducts,
  getAdminOrders,
  clearError,
} from "../../store/actions/adminActions";
const Dashbord = () => {
  const { users, error } = useSelector((state) => state.adminAllUsers);
  const { products } = useSelector((state) => state.adminAllProducts);
  const { orders, loading, totalAmount } = useSelector(
    (state) => state.adminAllOrders
  );

  const dispatch = useDispatch();
  const alert = useAlert();

  let stock = 0;

  products.forEach((p) => {
    if (p.stock === 0) {
      stock++;
    }
  });

  useEffect(() => {
    dispatch(getAdminUsers());
    dispatch(getAdminOrders());
    dispatch(getAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [error, alert, dispatch]);

  return (
    <Fragment>
      <MetaData title={"Amin Dashbord"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="row admin-dashbord" id="admin-dashbord">
          <div className="col-xl-12 col-sm-12 mb-3">
            <div className="admin-dashbord-card">
              <div className="text-center card-font-size">
                <h2>${totalAmount && totalAmount.toFixed(2)}</h2>
                <h4>Total Sales</h4>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6  mb-3">
            <div className="admin-dashbord-card">
              <div className="text-center card-font-size">
                <h2>{products && products.length}</h2>
                <h4>Total Products</h4>
              </div>

              <Link
                className="card-footer text-white clearfix small z-1"
                to="/admin/products"></Link>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="admin-dashbord-card ">
              <div className="text-center card-font-size">
                <h2>{orders && orders.length}</h2>
                <h4>Total Orders</h4>
              </div>

              <Link
                className="card-footer text-white clearfix small z-1"
                to="/admin/orders"></Link>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="admin-dashbord-card ">
              <div className="text-center card-font-size">
                <h2>{users && users.length}</h2>
                <h4>Total Users</h4>
              </div>

              <Link
                className="card-footer text-white clearfix small z-1"
                to="/admin/users"></Link>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="admin-dashbord-card ">
              <div className="text-center card-font-size">
                <h2>{stock}</h2>
                <h4>Out of Stock</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Dashbord;
