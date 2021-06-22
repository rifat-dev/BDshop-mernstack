import { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


import NavBar from '../components/layouts/Header/NavBar'
import Home from '../components/Home';
import Profile from '../components/user/Profile';
import UpdateProfile from '../components/user/UpdateProfile';
import UpdatePassword from '../components/user/UpdatePassword';
import SingleProduct from '../components/products/SingleProduct';
import Cart from '../components/cart/Cart';
import Shipping from '../components/cart/Shipping';
import Payment from '../components/cart/Payment';
import ConfirmOrder from '../components/cart/ConfirmOrder';
import Orders from '../components/order/Orders';
import OrderDetails from '../components/order/OrderDetails';
import Footer from '../components/layouts/Footer';

import ProtectedRoute from '../components/route/ProtectedRoute';



const HomePage = () => {
    return (
        <Fragment>
            <NavBar />
            <Switch>
                <div className="">
                    <Route path='/' component={Home} exact />
                    <Route path='/product/:id' component={SingleProduct} exact />
                    <Route path='/cart' component={Cart} exact />

                    <ProtectedRoute path="/profile/me" component={Profile} exact />
                    <ProtectedRoute path="/profile/me/edit-profile" component={UpdateProfile} exact />
                    <ProtectedRoute path="/profile/me/update-password" component={UpdatePassword} exact />

                    <ProtectedRoute path="/profile/me/orders" component={Orders} exact />
                    <ProtectedRoute path="/profile/me/orders/:id" component={OrderDetails} exact />

                    <ProtectedRoute path="/shipping" component={Shipping} exact />
                    <ProtectedRoute path="/payment" component={Payment} exact />
                    <ProtectedRoute path="/confirmOrder" component={ConfirmOrder} exact />
                </div>
            </Switch>
            <Footer />
        </Fragment>
    );
}

export default HomePage;
