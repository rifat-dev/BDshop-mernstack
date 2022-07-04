import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getMyOrders } from "../../store/actions/orderActions";

const MyOrders = () => {
  const { orders } = useSelector((state) => state.myOrders);
  const dispatch = useDispatch();

  // console.log(orders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, []);

  return (
    <div className="my-orders card card-body">
      <h4 className="my-orders-title">Orders</h4>
      <div className="responsive-table table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order Id</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order, key) => (
                <tr key={key}>
                  <th scope="row">{order._id}</th>
                  <td>{order.createdAt}</td>
                  <td>{order.orderStatus}</td>
                  <td>Tk {order.total}</td>
                  <td>
                    <Link to={`/profile/dashbord/orders/${order._id}`}>
                      <i
                        className="bi bi-eye-fill "
                        style={{ fontSize: "22px" }}></i>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
