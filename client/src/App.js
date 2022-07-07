import "./App.css";
import "./scss/app.scss";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CartLoader from "./components/layouts/Loader/CartLoader";

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
  return (
    <div className="App">
      <Suspense fallback={<CartLoader />}>
        <BottomButton />
        <Router>
          <Switch>
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
