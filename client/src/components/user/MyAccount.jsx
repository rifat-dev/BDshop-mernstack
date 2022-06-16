import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  getUser,
  clearError,
  updateProfile,
} from "../../store/actions/authActions";
import { UPDATE_PROFILE_RESET } from "../../store/Types/authType";
import CartLoader from "../layouts/Loader/CartLoader";

const MyAccount = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    birthdate: "",
  });

  const { user } = useSelector((state) => state.auth);
  const { isUpdated, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const alert = useAlert();
  const onChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    setLoading(true);
    const data = new FormData();
    data.append("name", userInfo.name);
    data.append("email", userInfo.email);
    data.append("gender", userInfo.gender);
    data.append("mobile", userInfo.mobile);
    data.append("birthdate", userInfo.birthdate);

    dispatch(updateProfile(data));
  };

  useEffect(() => {
    if (isUpdated) {
      setLoading(false);
      alert.success("Profile Update Successfully");
      dispatch(getUser());
      dispatch({ type: UPDATE_PROFILE_RESET });
    }

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (user) {
      setUserInfo({
        name: "",
        email: "",
        mobile: "",
        gender: "",
        birthdate: "",
      });
    }
  }, [user, isUpdated, dispatch, error, alert]);

  useEffect(() => {
    setUserInfo({ ...userInfo, ...user });
  }, [user]);

  return (
    <>
      {loading ? (
        <CartLoader />
      ) : (
        <div className="my-account card card-body">
          <div className="my-account-top">
            <h4>Account details</h4>
            <button type="submit" onClick={() => submitForm()}>
              Update Account
            </button>
          </div>
          <div className="profile-image">
            <img src={user.avatar.url} alt="User Image" />
          </div>

          <form className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                placeholder="name"
                onChange={onChange}
                value={userInfo.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                onChange={onChange}
                value={userInfo.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Phone number</label>
              <input
                type="text"
                className="form-control"
                name="mobile"
                id="mobile"
                placeholder="phone number"
                onChange={onChange}
                value={userInfo.mobile}
              />
            </div>
            <label>Gender</label>
            <div className="d-flex profile-gender">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="Male"
                  value="Male"
                  onChange={onChange}
                />
                <label className="form-check-label" htmlFor="Male">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="Female"
                  value="Female"
                  onChange={onChange}
                />
                <label className="form-check-label" htmlFor="Female">
                  Female
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="Other"
                  value="Other"
                  onChange={onChange}
                />
                <label className="form-check-label" htmlFor="Other">
                  Other
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="birthdate">Birthdate</label>
              <input
                type="date"
                className="form-control"
                name="birthdate"
                id="birthdate"
                onChange={onChange}
                value={
                  userInfo.birthdate &&
                  new Date(userInfo.birthdate).toISOString().substring(0, 10)
                }
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default MyAccount;
