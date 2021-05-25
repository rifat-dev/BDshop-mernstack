import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

import Home from './components/Home'
import Login from './components/user/Login'
import Register from './components/user/Register'
import NavBar from './components/layouts/Header/NavBar'
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
function App() {
  return (
    <div className="App">

      <Router>
        <NavBar />
        <Switch>
          <div className="container">
            <Route path='/' component={Home} exact />
            <Route path='/login' component={Login} exact />
            <Route path='/register' component={Register} exact />

            <ProtectedRoute path="/profile/me" component={Profile} exact />
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
