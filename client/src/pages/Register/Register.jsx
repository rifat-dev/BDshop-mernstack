import "./register.scss";
import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Compress from "react-image-file-resizer";

import Loader from "../../components/layouts/Loader/Loader";
import MetaData from "../../components/layouts/MetaData";
import { registationValidator } from "../../utils/validator";
import { userRegister, clearError } from "../../store/actions/authActions";

const Register = ({ history }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvater] = useState("");

  const [errors, setErrors] = useState({});

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handelChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      Compress.imageFileResizer(
        file, // the file from input
        480, // width
        480, // height
        "JPEG", // compress format WEBP, JPEG, PNG
        70, // quality
        0, // rotation
        (uri) => {
          setAvater(uri);
        },
        "base64" // blob or base64 default base64
      );
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    const { error, isValidate } = registationValidator(name, password, name);

    if (!isValidate) {
      return setErrors(error);
    }

    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    dispatch(userRegister(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      alert.success("User Registation Successfully");
      history.push("/profile/me");
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
          <MetaData title="Registation New Account" />

          <div className="container register-container">
            <div className="col-md-8 offset-md-2 my-5">
              <div className="register-form animate__animated animate__fadeInLeft">
                <form onSubmit={submitForm}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={handelChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="example@gmail.com"
                      name="email"
                      value={email}
                      onChange={handelChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={handelChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="avatar" className="form-label">
                      Select Profile Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="avatar"
                      id="avatar"
                      placeholder="avatar"
                      onChange={handelChange}
                    />
                  </div>

                  <button type="submit">Submit</button>
                </form>
                <p className="mt-3">
                  Already Have An Account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Register;
