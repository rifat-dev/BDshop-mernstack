import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { updateAdminOrder } from "../../store/actions/adminActions";
import { CLEAR_UPDATE_STATE, CLEAR_ERROR } from "../../store/Types/adminType";

const OrderListCard = ({ order_list, index }) => {
  const [status, setStatus] = useState(order_list.orderStatus);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [id, setId] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const { isUpdated, error } = useSelector((state) => state.dashboardTracker);

  const statusChange = (e) => {
    dispatch(updateAdminOrder(order_list._id, e.target.value));
    setUpdatedStatus(e.target.value);
    setId(order_list._id);
  };

  let customColor = "status_contain";
  if (status === "Processing") {
    customColor = "Processing status_contain";
  } else if (status === "Shipping") {
    customColor = "Shipping status_contain";
  } else if (status === "Deliverd") {
    customColor = "Deliverd status_contain";
  }

  useEffect(() => {}, [status]);

  useEffect(() => {
    if (id === order_list._id) {
      if (error) {
        alert.error(error);
        dispatch({ type: CLEAR_ERROR });
        setId("");
      }
      if (isUpdated) {
        dispatch({ type: CLEAR_UPDATE_STATE });
        alert.success(`Order status change to ${updatedStatus}`);
        setStatus(updatedStatus);
        setUpdatedStatus("");
        setId("");
      }
    }
  }, [isUpdated, order_list._id, error, alert, dispatch]);

  return (
    <div className="col-12 col-md-6 mt-3 mb-3">
      <div className="card m-2 p-1">
        <div className="mb-2 d-flex align-items-center justify-content-between p-4">
          <h5>{index + 1}.</h5>
          <div className="status_Container">
            <select
              className={customColor}
              onChange={statusChange}
              id="select1"
              name={order_list._id}>
              <option value={status} id="selected" defaultValue="selected">
                {order_list.orderStatus}
              </option>
              <option className="Processing" value="Processing">
                Processing
              </option>
              <option className="Shipping" value="Shipping">
                Shipping
              </option>
              <option className="Deliverd" value="Deliverd">
                Deliverd
              </option>
            </select>
          </div>
        </div>
        <div className="card-body order_list_card_body text-left">
          <div>
            <p className="mt-2 mb-2">
              <strong>Order ID: </strong>
              {order_list._id}
            </p>
            <p className="mt-2 mb-2">
              <strong>User ID: </strong>
              {order_list.user}
            </p>
            <p className="mt-2 mb-2">
              <strong>Order Date: </strong>
              {order_list.createdAt}
            </p>
          </div>

          <div id={order_list._id}>
            <div>
              <h5 style={{ color: "green" }}>Shipping Detail:</h5>
              <p className="mt-2 mb-2">
                <strong>Address </strong>
                {order_list.shippingInfo.address}
              </p>
              <p className="mt-2 mb-2">
                <strong>City </strong>
                {order_list.shippingInfo.city}
              </p>
              <p className="mt-2 mb-2">
                <strong>Phone : </strong>
                {order_list.shippingInfo.phone}
              </p>
            </div>
            <div>
              <h5 style={{ color: "green" }} className="mt-3">
                ProductDetail:
              </h5>
              <div>
                <div className="table-responsive">
                  <table className="table">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Product ID</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order_list.items.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">
                            <img
                              className="w-75 h-75"
                              src={item.image}
                              alt=""
                            />
                          </th>
                          <td>{item._id}</td>
                          <td className="text-center">{item.quantity}</td>
                          <td>TK {item.price}</td>
                          <td>TK {item.price * item.quantity}</td>
                        </tr>
                      ))}
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="my-4">
              <h5 style={{ color: "green" }} className="my-4">
                Payment Info:
              </h5>
              <p className="mt-2 mb-2">
                <strong>subtotal </strong>TK {order_list.subtotal}
              </p>
              <p className="mt-2 mb-2">
                <strong>shipping: </strong>TK {order_list.shipping}
              </p>
              <p className="mt-2 mb-2">
                <strong>discount: </strong>TK {order_list.discount}
              </p>
              <p className="mt-2 mb-2">
                <strong>Total: </strong>TK {order_list.total}
              </p>
              <p
                style={
                  order_list.paymentInfo.paid
                    ? { color: "green" }
                    : { color: "red" }
                }>
                <strong style={{ color: "black" }}>Payment Status:</strong> Paid
              </p>
              <p className="mt-2 mb-2">
                <strong>TransactionId: </strong>{" "}
                {order_list.paymentInfo.transactionId}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListCard;
