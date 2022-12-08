import React, { Fragment, useRef } from "react";
import { useAlert } from "react-alert";
import axios from "axios";

const SendOTP = (props) => {
  let emailRef = useRef();
  const alert = useAlert();

  const history = props.history;
  const VerifyEmail = async () => {
    let email = emailRef.value;
    if (email == "") {
      alert.error("Valid Email Address Required !");
    } else {
      try {
        const res = await axios.get(`/api/user/recoverVerifyEmail/${email}`);
        console.log(res);
        if (res.status == 200 && res.data["status"] == "fail") {
          alert.error("OTP send failed! Try again");
        } else {
          localStorage.setItem("verifyEmail", JSON.stringify(email));
          history.push("/VerifyOTP");
        }
      } catch (err) {
        alert.error("OTP send failed! Try again");
      }
      //   RecoverVerifyEmailRequest(email).then((result) => {
      //     if (result === true) {
      //       navigate("/VerifyOTP");
      //     }
      //   });
    }
  };
  return (
    <Fragment>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90  p-4">
              <div className="card-body">
                <h4>EMAIL ADDRESS</h4>
                <br />
                <label>Your email address</label>
                <input
                  ref={(input) => (emailRef = input)}
                  placeholder="User Email"
                  className="form-control animated fadeInUp"
                  type="email"
                />
                <br />
                <button
                  onClick={VerifyEmail}
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

export default SendOTP;
