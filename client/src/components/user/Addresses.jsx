import { useState, useEffect } from "react";
import AddressForm from "./AddressForm";
import axios from "axios";

import CartLoader from "../layouts/Loader/CartLoader";

const Addresses = () => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const getAddresses = async () => {
    setLoading(true);
    let { data } = await axios.get("/api/user/addresses");
    console.log(data);
    if (data.addresses.length !== 0) {
      data.addresses.map((address) => {
        if (address.addressType === "Billing") {
          setBillingAddress({ ...billingAddress, ...address });
        } else {
          setShippingAddress({ ...shippingAddress, ...address });
        }
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    let cancle = false;
    if (!cancle) {
      getAddresses();
    }
    return () => {
      cancle = true;
    };
  }, []);

  const onUpdateBillingAddress = async () => {
    setLoading(true);
    let { data } = await axios.post(
      "/api/user/address/billing-address",
      billingAddress
    );
    if (data.success) {
      setBillingAddress({ ...billingAddress, ...data.address });
      setLoading(false);
    }
  };

  const onUpdateShippingAddress = async () => {
    setLoading(true);
    let { data } = await axios.post(
      "/api/user/address/shipping-address",
      shippingAddress
    );
    if (data.success) {
      setShippingAddress({ ...shippingAddress, ...data.address });
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <CartLoader />
      ) : (
        <div className="addresses row">
          <div className="col-12 col-md-6">
            <div className="billing-address card card-body">
              <h4>Billing Address</h4>
              <AddressForm
                onChange={onChangeBillingAddress}
                address={billingAddress}
              />
              <button
                className="address-update-btn"
                type="submit"
                onClick={() => onUpdateBillingAddress()}>
                Update
              </button>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="shipping-address card card-body">
              <h4>Shipping Address</h4>
              <AddressForm
                onChange={onChangeShipingAddress}
                address={shippingAddress}
              />
              <button
                className="address-update-btn"
                type="submit"
                onClick={() => onUpdateShippingAddress()}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Addresses;
