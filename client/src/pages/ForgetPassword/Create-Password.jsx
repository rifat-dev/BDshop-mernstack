import React, { Fragment, useRef } from "react";
import { useAlert } from "react-alert";
import axios from "axios";

const CreatePassword = (props) => {
  let PasswordRef,
    ConfirmPasswordRef = useRef();

  const history = props.history;
  const alert = useAlert();
  let email = JSON.parse(localStorage.getItem("verifyEmail"));
  let otp = JSON.parse(localStorage.getItem("verifyOTP"));

  const ResetPass = async () => {
    let Password = PasswordRef.value;
    let ConfirmPassword = ConfirmPasswordRef.value;
    if (Password == "") {
      alert.error("Password Required");
    } else if (ConfirmPassword == "") {
      alert.error("Confirm Password Required");
    } else if (Password !== ConfirmPassword) {
      alert.error("Password & Confirm Password Should be Same");
    } else {
      try {
        let data = {
          email,
          OTP: otp,
          password: Password,
        };
        const res = await axios.post(`/api/user/RecoverResetPass`, data);

        if (res.status == 200 && res.data["status"] == "fail") {
          alert.error("New password created failed! Try again");
        } else {
          alert.success("New password created success!");
          history.push("/login");
        }
      } catch (err) {
        alert.error("New password created failed! Try again");
      }
    }
  };

  return (
    <Fragment>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90 p-4">
              <div className="card-body">
                <h4>SET NEW PASSWORD</h4>
                <br />
                <label>Your email address</label>
                <input
                  readOnly={true}
                  value={email}
                  placeholder="User Email"
                  className="form-control animated fadeInUp"
                  type="email"
                />
                <br />
                <label>New Password</label>
                <input
                  ref={(input) => (PasswordRef = input)}
                  placeholder="New Password"
                  className="form-control animated fadeInUp"
                  type="password"
                />
                <br />
                <label>Confirm Password</label>
                <input
                  ref={(input) => (ConfirmPasswordRef = input)}
                  placeholder="Confirm Password"
                  className="form-control animated fadeInUp"
                  type="password"
                />
                <br />
                <button
                  onClick={ResetPass}
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
export default CreatePassword;
