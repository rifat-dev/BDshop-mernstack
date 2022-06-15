import "./profile.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";

import Loader from "../layouts/Loader/Loader";
import MetaData from "../layouts/MetaData";
import NavBar from "../layouts/Header/NavBar";
import Footer from "../layouts/Footer";

import ProfileDashbordNav from "./ProfileDashbordNav";
import MyAccount from "./MyAccount";
import Addresses from "./Addresses";

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
              <div className="col-12 col-md-4 col-lg-3 mb-4">
                <ProfileDashbordNav />
              </div>
              <div className="col-12 col-md-8 col-lg-9">
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
                    component={Addresses}
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
          <Footer />
        </>
      )}
    </>
  );
};

export default Profile;
