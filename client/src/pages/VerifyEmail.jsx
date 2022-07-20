import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import axios from "axios";

const VerifyEmail = (props) => {
  const { token } = props.match.params;

  const alert = useAlert();

  useEffect(() => {
    const emailVerification = async () => {
      const { data } = await axios.post("/api/user/emailVerify", {
        token: token,
      });

      console.log(data);
      alert.success("Email verification success");
      props.history.push("/");
    };

    emailVerification();
  }, [token]);

  return (
    <div className="container h-100 w-100">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          {" "}
          Verifying your email account. Please await a minute!....
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
