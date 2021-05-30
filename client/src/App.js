import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

import Home from './components/Home'
import Login from './components/user/Login'
import Register from './components/user/Register'
import NavBar from './components/layouts/Header/NavBar'
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import SingleProduct from './components/products/SingleProduct';
import Cart from './components/cart/Cart';
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
            <Route path='/product/:id' component={SingleProduct} exact />
            <Route path='/cart' component={Cart} exact />

            <ProtectedRoute path="/profile/me" component={Profile} exact />
            <ProtectedRoute path="/profile/me/edit-profile" component={UpdateProfile} exact />
            <ProtectedRoute path="/profile/me/update-password" component={UpdatePassword} exact />
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
