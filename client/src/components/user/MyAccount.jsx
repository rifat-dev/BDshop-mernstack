import { useState } from "react";
import { useSelector } from "react-redux";

const MyAccount = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    birthdate: "",
  });
  const { user } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  console.log(user);
  return (
    <div className="my-account card card-body">
      <div className="my-account-top">
        <h4>Account details</h4>
        <button>Update Account</button>
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
            value={user.name ? user.name : ""}
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
            value={user.email ? user.email : ""}
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
            value={user.mobile ? user.mobile : ""}
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
            value={user.birthdate ? new Date(user.birthdate) : ""}
          />
        </div>
      </form>
    </div>
  );
};

export default MyAccount;
