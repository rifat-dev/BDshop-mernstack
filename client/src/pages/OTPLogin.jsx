import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import MetaData from "../components/layouts/MetaData";
import axios from "axios";

const OTPLogin = ({ history }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [hash, setHash] = useState("");
  const [sendEmail, setSendEmail] = useState(false);

  const alert = useAlert();
  const dispatch = useDispatch();
  const submitEmail = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/user/sendOTP", { email });
      setHash(data.hash);
      setSendEmail(true);
    } catch (e) {
      console.log(e.messege);
      alert.error("OTP send failed");
    }
  };

  const submitOtp = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/user/verifyOTP", {
        email,
        hash,
        otp,
      });
      alert.success("Login success");
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({
        type: "REGISTER_USER_SUCCESS",
        payload: data.user,
      });
      history.push("/");
    } catch (e) {
      console.log(e);
      alert.error("OTP not valid");
    }
  };

  return (
    <Fragment>
      <MetaData title="Login By Email" />

      <div className="container login-container">
        <div className="col-12 col-md-7 offset-md-3 my-5">
          {!sendEmail ? (
            <>
              <div className="alert alert-danger m-4" role="alert">
                <p>
                  <strong>Note That:</strong> Login by OTP which send in your
                  email.
                </p>
              </div>
              <div className="login-form animate__animated  animate__fadeInRight">
                <form onSubmit={submitEmail}>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button type="submit">Submit</button>
                </form>
                <p className="mt-3">
                  Don't Have Account? Please{" "}
                  <Link to="/register">Register</Link>
                </p>
              </div>
            </>
          ) : (
            <div className="login-form animate__animated  animate__fadeInRight">
              <form onSubmit={submitOtp}>
                <p className="alert alert-danger p-2">
                  OTP send to this address {`<${email}>`}
                </p>
                <div className="form-group">
                  <label htmlFor="otp">Enter OTP</label>
                  <input
                    type="text"
                    className="form-control"
                    id="otp"
                    placeholder="enter your OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default OTPLogin;
