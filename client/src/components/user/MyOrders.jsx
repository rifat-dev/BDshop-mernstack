import React from "react";

const MyOrders = () => {
  return (
    <div className="my-orders card card-body">
      <h4 className="my-orders-title">Orders</h4>
      <table class="table">
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
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>View</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
