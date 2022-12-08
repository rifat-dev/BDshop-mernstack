import { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import axios from "axios";

import NavBar from "../components/layouts/Header/NavBar";
import Home from "../components/Home";
import Shop from "./Shop/Shop";
import SingleProduct from "../components/products/SingleProduct";
import Cart from "../components/cart/Cart";
import Checkout from "../components/cart/Checkout";
import OrderSuccess from "../components/cart/OrderSuccess";

import Footer from "../components/layouts/Footer";
import NotFound from "../components/layouts/404";

import ProtectedRoute from "../components/route/ProtectedRoute";
import Login from "./Login/Login";
import OTPLogin from "./OTPLogin";
import Register from "./Register/Register";
import SendOTP from "./ForgetPassword/Send-OTP";
import VerifyOTP from "./ForgetPassword/Verify-OTP";
import CreatePassword from "./ForgetPassword/Create-Password";

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);

  const alert = useAlert();
  const onClick = async () => {
    try {
      const { data } = await axios.post("/api/user/sendTokenInEmail");
      console.log(data);
      alert.success("Check Email !");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Fragment>
      <NavBar />
      {user && !user.isVerified && (
        <div className="container">
          <div
            class="alert alert-danger mt-5 d-flex  justify-content-between align-items-center"
            role="alert">
            <p>Please verify your email address !</p>
            <button
              type="button"
              class="btn btn-danger"
              onClick={() => onClick()}>
              Send Verify Token
            </button>
          </div>
        </div>
      )}
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/shop" component={Shop} exact />
        <Route path="/product/:id" component={SingleProduct} exact />
        <Route path="/cart" component={Cart} exact />
        <ProtectedRoute path="/checkout" component={Checkout} exact />
        <ProtectedRoute path="/order-success" component={OrderSuccess} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/otp-login" component={OTPLogin} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/recoverEmail" component={SendOTP} exact />
        <Route path="/VerifyOTP" component={VerifyOTP} exact />
        <Route path="/CreatePassword" component={CreatePassword} exact />

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </Fragment>
  );
};

export default HomePage;
