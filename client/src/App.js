import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import "./scss/app.scss";

import AdminDashbord from "./admin/Dashbord/AdminDashbord";
import HomePage from "./pages/HomePage";
import BottomButton from "./components/layouts/Button/BottomButton";

import ProtectedRoute from "./components/route/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BottomButton />
      <Router>
        <Switch>
          <ProtectedRoute path="/admin" component={AdminDashbord} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
