import "./App.css";
import "./scss/app.scss";
import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

import CartLoader from "./components/layouts/Loader/CartLoader";
import VerifyEmail from "./pages/VerifyEmail";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const Profile = React.lazy(() => import("./components/user/Profile"));
const AdminDashbord = React.lazy(() =>
  import("./admin/Dashbord/AdminDashbord")
);

const BottomButton = React.lazy(() =>
  import("./components/layouts/Button/BottomButton")
);
const ProtectedRoute = React.lazy(() =>
  import("./components/route/ProtectedRoute")
);

function App() {
  const socket = io("http://localhost:4000");
  const { user, loading } = useSelector((state) => state.auth);
  const alert = useAlert();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("notification", (data) => {
      console.log(data);
      if (data.user == user._id) {
        alert.success(`Your order is now ${data.message}`);
      }
    });
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<CartLoader />}>
        <BottomButton />
        <Router>
          <Switch>
            <Route path="/verify/:token" component={VerifyEmail} />
            <ProtectedRoute path="/profile/dashbord" component={Profile} />
            <ProtectedRoute
              isAdmin={true}
              path="/admin"
              component={AdminDashbord}
            />
            <Route path="/" component={HomePage} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
