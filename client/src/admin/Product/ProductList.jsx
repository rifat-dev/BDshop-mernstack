import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import ProductEditModal from "./ProductEditModal";
import Loader from "../../components/layouts/Loader/Loader";
import MetaData from "../../components/layouts/MetaData";

import {
  getAdminProducts,
  deleteAdminProduct,
} from "../../store/actions/adminActions";
import ProductCard from "./ProductCard";

import { clearError } from "../../store/actions/adminActions";
import {
  CLEAR_UPDATE_STATE,
  CLEAR_DELETE_STATE,
} from "../../store/Types/adminType";

const ProductList = () => {
  const [pId, setPid] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const alert = useAlert();

  const { products } = useSelector((state) => state.adminAllProducts);
  const { isUpdated, loading, error, isDeleted } = useSelector(
    (state) => state.dashboardTracker
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      dispatch({ type: CLEAR_UPDATE_STATE });
      dispatch(getAdminProducts());
      alert.success(" Product Update Success");
    }
  }, [dispatch, isUpdated, alert, error]);

  useEffect(() => {
    if (isDeleted) {
      dispatch({ type: CLEAR_DELETE_STATE });
      dispatch(getAdminProducts());
      alert.success(" Product Delete Success");
    }
  }, [dispatch, isDeleted, alert]);

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  const productDelete = (id) => {
    let res = window.confirm("Are you sure you want to delete this product?");
    console.log(res);
    if (res) {
      // dispatch(deleteAdminProduct(product._id))
    }
  };

  return (
    <div>
      <MetaData title="Product List-BDShop" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="product-list">
            <div className="product-list-top">
              <h4 className="product-list-title">All Products</h4>
            </div>
            <table className="table shadow-sm">
              <thead className="table-head">
                <tr>
                  <th scope="col">PID</th>
                  <th scope="col">Image</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, key) => (
                  <tr key={key}>
                    <th>{product._id}</th>
                    <td>
                      <img
                        className="table-image"
                        src={product.images[0].url}
                        alt=""
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <ModeEditIcon className="product-list-table-icon" />
                      <DeleteIcon
                        className="product-list-table-icon"
                        onClick={() => productDelete(product._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
