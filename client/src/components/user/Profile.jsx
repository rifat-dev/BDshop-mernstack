import "./profile.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";

import Loader from "../layouts/Loader/Loader";
import MetaData from "../layouts/MetaData";
import NavBar from "../layouts/Header/NavBar";

import ProfileDashbordNav from "./ProfileDashbordNav";
import MyAccount from "./MyAccount";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Your Profile - BDShop"} />
          <NavBar />
          <div className="container-fluid profile">
            <div className="row">
              <div className="col-12 col-md-3 mb-4">
                <ProfileDashbordNav />
              </div>
              <div className="col-12 col-md-9">
                <Switch>
                  <Route path="/profile/dashbord" component={MyAccount} exact />
                  <Route
                    path="/profile/dashbord/orders"
                    component={MyAccount}
                    exact
                  />
                  <Route
                    path="/profile/dashbord/downloads"
                    component={MyAccount}
                    exact
                  />
                  <Route
                    path="/profile/dashbord/addresses"
                    component={MyAccount}
                    exact
                  />
                  <Route
                    path="/profile/dashbord/my-account"
                    component={MyAccount}
                    exact
                  />
                </Switch>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
