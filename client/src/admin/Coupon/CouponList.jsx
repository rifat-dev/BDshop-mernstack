import { useState, useEffect } from "react";
import axios from "axios";

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);

  const getAllCoupons = async () => {
    const { data } = await axios.get("/api/admin/coupon/getAll");
    setCoupons(data.coupons);
  };

  useEffect(() => {
    getAllCoupons();
  }, []);
  return (
    <div className="coupon-list" id="coupon-list">
      <div className="coupon-list-top">
        <h4 className="coupon-list-title">All coupons</h4>
      </div>
      <table className="table shadow-sm">
        <thead className="table-head">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Coupon Name</th>
            <th scope="col">Type</th>
            <th scope="col">Discount Value</th>
            <th scope="col">Usage Limit</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {coupons.map((coupon, key) => (
            <tr key={key}>
              <th>{coupon._id}</th>
              <td>{coupon.code}</td>
              <td>
                <span
                  className={`${
                    coupon.type === "Percentage" ? "percentage" : "fixedAmount"
                  }`}>
                  {coupon.type}
                </span>
              </td>
              <td>
                {coupon.type === "Percentage" ? (
                  <span>{coupon.discountValue} %</span>
                ) : (
                  <span>{coupon.discountValue} Tk</span>
                )}
              </td>
              <td>{coupon.usageLimit}</td>
              <td>{new Date(coupon.startDate).toDateString()}</td>
              <td>{new Date(coupon.endDate).toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CouponList;
