import "./App.css";
import "./scss/app.scss";
import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import Profile from "./components/user/Profile";
import AdminDashbord from "./admin/Dashbord/AdminDashbord";

import BottomButton from "./components/layouts/Button/BottomButton";
import ProtectedRoute from "./components/route/ProtectedRoute";
import CartLoader from "./components/layouts/Loader/CartLoader";

function App() {
  return (
    <div className="App">
      <BottomButton />
      <Router>
        <Switch>
          <ProtectedRoute path="/profile/dashbord" component={Profile} />
          <ProtectedRoute path="/admin" component={AdminDashbord} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
