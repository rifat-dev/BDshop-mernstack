import React, { Fragment, useState } from "react";
import ReactCodeInput from "react-code-input";
import axios from "axios";
import { useAlert } from "react-alert";

const VerifyOTP = (props) => {
  const alert = useAlert();
  const history = props.history;
  let defaultInputStyle = {
    fontFamily: "monospace",
    MozAppearance: "textfield",
    margin: "4px",
    paddingLeft: "8px",
    width: "45px",
    borderRadius: "3px",
    height: "45px",
    fontSize: "32px",
    border: "1px solid lightskyblue",
    boxSizing: "border-box",
    color: "black",
    backgroundColor: "white",
    borderColor: "lightgrey",
  };

  let [OTP, SetOTP] = useState("");

  const SubmitOTP = async () => {
    let email = JSON.parse(localStorage.getItem("verifyEmail"));
    if (OTP.length === 6) {
      try {
        const res = await axios.get(
          `/api/user/recoverVerifyOTP/${email}/${OTP}`
        );

        if (res.status == 200 && res.data["status"] == "fail") {
          alert.error("OTP verify failed! Try again");
        } else {
          localStorage.setItem("verifyOTP", JSON.stringify(OTP));
          history.push("/CreatePassword");
        }
      } catch (err) {
        alert.error("OTP verify failed! Try again");
      }
    } else {
      alert.error("Enter 6 Digit Code");
    }
  };

  return (
    <Fragment>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90  p-4">
              <div className="card-body">
                <h4>OTP VERIFICATION </h4>
                <p>
                  A 6 Digit verification code has been sent to your email
                  address.{" "}
                </p>
                <ReactCodeInput
                  onChange={(value) => SetOTP(value)}
                  inputStyle={defaultInputStyle}
                  fields={6}
                />
                <br /> <br />
                <button
                  onClick={SubmitOTP}
                  className="btn w-100 animated fadeInUp float-end btn-primary">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default VerifyOTP;
