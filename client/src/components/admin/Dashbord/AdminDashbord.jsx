import { useState } from 'react'

import SideNav from '../SideNav/SideNav';
import '../dashbord.css'


import Dashbord from './DashBord'
import DashboardNav from '../DashBordNav/DashBordNav'
import ProductList from '../Product/ProductList';
import NewProduct from '../Product/NewProduct'
import OrderList from '../Order/OrderList'
import UsersList from '../Users/UsersList';
import NotFound from '../../layouts/404';

const AdminDashbord = ({ match, history }) => {
    const { id } = match.params

    const [show, setShow] = useState(false)


    return (
        <div className="row" >
            <SideNav id={id} show={show} />
            <div className="dashboard_body">
                <div className="dashbord_body_inner">
                    <DashboardNav show={show} setShow={setShow} match={match} />
                    {
                        id === "dashboard" ? <Dashbord /> :
                            id === "products" ? <ProductList history={history} /> :
                                id === 'newproduct' ? <NewProduct history={history} /> :
                                    id === "orders" ? <OrderList /> :
                                        id === "users" ? <UsersList /> : <NotFound />
                    }
                </div>
            </div>
        </div>
    );
}

export default AdminDashbord;
