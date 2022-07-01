import "./cart.scss";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="row checkout-steps ">
      {step1 ? (
        <div className=" col-12 col-sm-4 col-md-4 mx-4 mb-4" id="pointerActive">
          <p>Shipping</p>
        </div>
      ) : (
        <div
          className=" col-12 col-sm-4 col-md-4 mx-4 mb-4"
          id="pointerInActive">
          <p>Shipping</p>
        </div>
      )}
      {step2 ? (
        <div className=" col-12 col-sm-4 col-md-4 mb-4" id="pointerActive">
          <p>Confirm Order</p>
        </div>
      ) : (
        <div className=" col-12 col-sm-4 col-md-4 mb-4" id="pointerInActive">
          <p>Confirm Order</p>
        </div>
      )}

      {step3 ? (
        <div className=" col-12 col-sm-4 col-md-4 mx-4 mb-4" id="pointerActive">
          <p>Payment</p>
        </div>
      ) : (
        <div
          className=" col-12 col-sm-4 col-md-4 mx-4 mb-4"
          id="pointerInActive">
          <p>Payment</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutSteps;
