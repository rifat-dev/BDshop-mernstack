import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import "./scss/app.scss";

import BottomButton from "./components/layouts/Button/BottomButton";
import ProtectedRoute from "./components/route/ProtectedRoute";
import CartLoader from "./components/layouts/Loader/CartLoader";

const AdminDashbord = React.lazy(() =>
  import("./admin/Dashbord/AdminDashbord")
);
const HomePage = React.lazy(() => import("./pages/HomePage"));
const Profile = React.lazy(() => import("./components/user/Profile"));

function App() {
  return (
    <div className="App">
      <BottomButton />
      {/* <CartLoader /> */}
      <Suspense fallback={<CartLoader />}>
        <Router>
          <Switch>
            <ProtectedRoute path="/admin" component={AdminDashbord} />
            <ProtectedRoute path="/profile/dashbord" component={Profile} />
            <Route path="/" component={HomePage} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
