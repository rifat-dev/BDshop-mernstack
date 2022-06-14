import { NavLink } from "react-router-dom";

const ProfileDashbordNav = () => {
  return (
    <div className="profile-nav card card-body">
      <ul>
        <li>
          <NavLink
            to="/profile/dashbord"
            className={(isActive) => (isActive ? "profile-nav-active" : "")}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/dashbord/orders"
            className={(isActive) => (isActive ? "profile-nav-active" : "")}>
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/dashbord/downloads"
            className={(isActive) => (isActive ? "profile-nav-active" : "")}>
            Downloads
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/dashbord/addresses"
            className={(isActive) => (isActive ? "profile-nav-active" : "")}>
            Addresses
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/dashbord/my-account"
            className={(isActive) => (isActive ? "profile-nav-active" : "")}>
            My Account
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDashbordNav;
