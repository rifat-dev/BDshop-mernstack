import { useState, useEffect } from "react";
import AddressForm from "./AddressForm";

const Addresses = () => {
  const [billingAddress, setBillingAddress] = useState({
    addressType: "Billing",
    city: "",
    address: "",
    mobile: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    addressType: "Shipping",
    city: "",
    address: "",
    mobile: "",
  });

  const onChangeBillingAddress = (e) => {
    setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value });
  };

  const onChangeShipingAddress = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  return (
    <div className="addresses row">
      <div className="col-12 col-md-6">
        <div className="billing-address card card-body">
          <h4>Billing Address</h4>
          <AddressForm onChange={onChangeBillingAddress} />
          <button className="address-update-btn">Update</button>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className="shipping-address card card-body">
          <h4>Shipping Address</h4>
          <AddressForm onChange={onChangeShipingAddress} />
          <button className="address-update-btn">Update</button>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
