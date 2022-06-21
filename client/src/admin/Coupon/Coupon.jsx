import "./coupon.scss";
import { useState } from "react";

const Coupon = () => {
  const [coupon, setCoupon] = useState({
    code: "",
    type: "",
    discountValue: 0,
    usageLimit: 0,
    status: "",
    startDate: "",
    endDate: "",
  });

  const onChange = (e) => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };

  console.log(coupon);
  return (
    <div className="coupon" id="coupon">
      <div className="coupon-top">
        <h2>Add New Coupon</h2>
        <div>
          <button className="coupon-save-btn">Save</button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-8">
          <div className="basic-info card card-body">
            <h4 className="title">Basic information</h4>
            <form>
              <div className="my-3 form-group">
                <label htmlFor="code" className="form-label">
                  Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="code"
                  id="code"
                  placeholder="EID50"
                  onChange={onChange}
                />
              </div>
              <div className="my-3 form-group">
                <label className="form-label">Type</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="exampleRadios1"
                    value="Percentage"
                    onChange={onChange}
                  />
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    Percentage
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="exampleRadios2"
                    value="Fixed amount"
                    onChange={onChange}
                  />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    Fixed amount
                  </label>
                </div>
              </div>
              <div className="my-3 form-group">
                <label htmlFor="dvalue" className="form-label">
                  Discount value
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="discountValue"
                  id="dvalue"
                  value={coupon.discountValue}
                  placeholder="10.00"
                  onChange={onChange}
                />
              </div>
              <div className="my-3 form-group">
                <label htmlFor="usageLimit" className="form-label">
                  Usage limit
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="usageLimit"
                  id="usageLimit"
                  placeholder="100"
                  value={coupon.usageLimit}
                  onChange={onChange}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card card-body status">
            <h4 className="title">Status</h4>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="status"
                id="status1"
                value="Enabled"
                onChange={onChange}
              />
              <label className="form-check-label" htmlFor="status1">
                Enabled
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="status"
                id="status2"
                value="Disabled"
                onChange={onChange}
              />
              <label className="form-check-label" htmlFor="status2">
                Disabled
              </label>
            </div>
          </div>
          <div className="card card-body status">
            <h4 className="title">Schedule</h4>
            <div className="my-3">
              <label htmlFor="startDate" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                className="form-control"
                name="startDate"
                id="startDate"
                onChange={onChange}
              />
            </div>
            <div className="my-3">
              <label htmlFor="endDate" className="form-label">
                End Date
              </label>
              <input
                type="date"
                className="form-control"
                name="endDate"
                id="endDate"
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
