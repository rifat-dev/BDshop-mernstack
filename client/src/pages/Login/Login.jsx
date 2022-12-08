import "./login.scss";
import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { userLogin, clearError } from "../../store/actions/authActions";

import Loader from "../../components/layouts/Loader/Loader";
import MetaData from "../../components/layouts/MetaData";
import { loginValidator } from "../../utils/validator";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const submitHandelar = (e) => {
    e.preventDefault();

    const { error, isValidate } = loginValidator(email, password);
    if (!isValidate) {
      return setErrors(error);
    }
    dispatch(userLogin(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      alert.success("User Login Success");
      history.push("/");
    }

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch, isAuthenticated, history, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Login Your Account" />

          <div className="container login-container">
            <div className="col-12 col-md-7 offset-md-3 my-5">
              <div className="alert alert-danger m-4" role="alert">
                <h4 className="alert-heading">Hello !</h4>
                <p>
                  <strong>Note That:</strong> If you want check Admin Panel?
                  Then you must use.
                </p>
                <p>
                  <strong>email:</strong> admin@gmail.com
                </p>
                <p>
                  <strong> Password: </strong> admin123
                </p>
              </div>
              <div className="login-form animate__animated  animate__fadeInRight">
                <form onSubmit={submitHandelar}>
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
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button type="submit">Submit</button>
                </form>
                <p className="mt-3">
                  Don't Have Account? Please{" "}
                  <Link to="/register">Register</Link>
                </p>
                <p className="mt-3">
                  <Link to="/recoverEmail"> Forget Password</Link>
                </p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
